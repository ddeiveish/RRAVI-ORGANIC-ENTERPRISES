from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

import os
import re
import time
import ipaddress
import logging
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from datetime import datetime, timezone, timedelta
from typing import List, Optional, Annotated

import bcrypt
import jwt
import httpx
from bson import ObjectId
from fastapi import FastAPI, APIRouter, Request, Response, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr, ConfigDict, BeforeValidator
from starlette.middleware.cors import CORSMiddleware


mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI()
api_router = APIRouter(prefix="/api")

PyObjectId = Annotated[str, BeforeValidator(str)]

logger = logging.getLogger(__name__)


# ─────────────────────────────────────────────────────────────────────────────
# Managed email via Resend
# ─────────────────────────────────────────────────────────────────────────────

RESEND_API_URL = "https://api.resend.com/emails"
RESEND_API_KEY = os.environ["RESEND_API_KEY"]
EMAIL_FROM = os.environ["EMAIL_FROM"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")


_SHORTENERS = (
    "bit.ly",
    "tinyurl.com",
    "t.co",
    "is.gd",
    "cutt.ly",
    "goo.gl",
    "rebrand.ly",
)

_CRED_ASK = (
    "reply with your password",
    "reply with the code",
    "send your password",
    "cvv",
    "send us your password",
    "enter your password below",
    "confirm your card number",
    "your full card number",
    "seed phrase",
    "recovery phrase",
    "verify your card",
    "social security number",
    "confirm your bank details",
)

_HOSTISH = re.compile(
    r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})",
    re.I,
)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False

    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass

    return not any(
        host == s or host.endswith("." + s)
        for s in _SHORTENERS
    )


def _same_site(shown: str, real: str) -> bool:
    return (
        shown == real
        or real.endswith("." + shown)
        or shown.endswith("." + real)
    )


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = set()
        self.urls = []
        self.anchors = []
        self._href = None
        self._text = []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())

        self.urls += [
            v
            for k, v in attrs
            if k.lower() in ("href", "src") and v
        ]

        if tag.lower() == "a":
            self._href = dict(
                (k.lower(), v)
                for k, v in attrs
            ).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append(
                (
                    self._href,
                    "".join(self._text),
                )
            )
            self._href = None
            self._text = []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)

    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError(
            "No forms or input fields in email (G2)"
        )

    body = f"{subject}\n{html}".lower()

    for p in _CRED_ASK:
        if p in body:
            raise ValueError(
                f"Email asks the recipient for credentials: {p!r} (G2)"
            )

    for url in scan.urls:
        low = url.strip().lower()

        if low.startswith(
            ("mailto:", "tel:", "cid:", "#")
        ):
            continue

        if not low.startswith("https://"):
            raise ValueError(
                f"Email links/assets must be absolute https: {url!r} (G3)"
            )

        host = urlparse(low).hostname or ""

        if (
            not _host_ok(host)
            or urlparse(low).username is not None
        ):
            raise ValueError(
                f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)"
            )

    for href, text in scan.anchors:
        real = urlparse(
            href.strip().lower()
        ).hostname or ""

        if not real:
            continue

        for m in _HOSTISH.finditer(text):
            if not _same_site(
                m.group(1).lower(),
                real,
            ):
                raise ValueError(
                    f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)"
                )


async def send_email(
    *,
    to: str,
    subject: str,
    html: str,
    reply_to: str | None = None,
) -> str | None:

    _assert_safe_email(subject, html)

    payload = {
        "from": EMAIL_FROM,
        "to": [to],
        "subject": subject,
        "html": html,
    }

    effective_reply_to = reply_to or EMAIL_REPLY_TO

    if effective_reply_to:
        payload["reply_to"] = effective_reply_to

    try:
        async with httpx.AsyncClient(timeout=30) as http_client:
            resp = await http_client.post(
                RESEND_API_URL,
                headers={
                    "Authorization": f"Bearer {RESEND_API_KEY}",
                    "Content-Type": "application/json",
                },
                json=payload,
            )

        resp.raise_for_status()

        return resp.json().get("id")

    except httpx.HTTPStatusError as e:
        logger.error(
            f"Email send failed: "
            f"{e.response.status_code} "
            f"{e.response.text}"
        )
        raise HTTPException(
            status_code=502,
            detail="Failed to send email",
        )

    except Exception as e:
        logger.error(
            f"Email send error: {str(e)}"
        )
        raise HTTPException(
            status_code=500,
            detail="Failed to send email",
        )


# ─────────────────────────────────────────────────────────────────────────────
# Auth (JWT, single admin)
# ─────────────────────────────────────────────────────────────────────────────

JWT_ALGORITHM = "HS256"


def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def hash_password(password: str) -> str:
    return bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt(),
    ).decode("utf-8")


def verify_password(
    plain_password: str,
    hashed_password: str,
) -> bool:
    return bcrypt.checkpw(
        plain_password.encode("utf-8"),
        hashed_password.encode("utf-8"),
    )


def create_access_token(
    user_id: str,
    email: str,
) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc)
        + timedelta(minutes=15),
        "type": "access",
    }

    return jwt.encode(
        payload,
        get_jwt_secret(),
        algorithm=JWT_ALGORITHM,
    )


def create_refresh_token(
    user_id: str,
) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc)
        + timedelta(days=7),
        "type": "refresh",
    }

    return jwt.encode(
        payload,
        get_jwt_secret(),
        algorithm=JWT_ALGORITHM,
    )


def set_auth_cookies(
    response: Response,
    user_id: str,
    email: str,
) -> None:

    response.set_cookie(
        key="access_token",
        value=create_access_token(
            user_id,
            email,
        ),
        httponly=True,
        secure=True,
        samesite="none",
        max_age=900,
        path="/",
    )

    response.set_cookie(
        key="refresh_token",
        value=create_refresh_token(user_id),
        httponly=True,
        secure=True,
        samesite="none",
        max_age=604800,
        path="/",
    )


async def get_current_admin(
    request: Request,
) -> dict:

    token = request.cookies.get("access_token")

    if not token:
        auth_header = request.headers.get(
            "Authorization",
            "",
        )

        if auth_header.startswith("Bearer "):
            token = auth_header[7:]

    if not token:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated",
        )

    try:
        payload = jwt.decode(
            token,
            get_jwt_secret(),
            algorithms=[JWT_ALGORITHM],
        )

        if payload.get("type") != "access":
            raise HTTPException(
                status_code=401,
                detail="Invalid token type",
            )

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=401,
            detail="Token expired",
        )

    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token",
        )

    user = await db.users.find_one(
        {
            "_id": ObjectId(payload["sub"]),
            "role": "admin",
        }
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="User not found",
        )

    return {
        "id": str(user["_id"]),
        "email": user["email"],
        "name": user.get("name", "Admin"),
        "role": "admin",
    }


async def seed_admin() -> None:

    admin_email = os.environ["ADMIN_EMAIL"].lower()
    admin_password = os.environ["ADMIN_PASSWORD"]

    existing = await db.users.find_one(
        {"email": admin_email}
    )

    if existing is None:

        await db.users.insert_one(
            {
                "email": admin_email,
                "password_hash": hash_password(
                    admin_password
                ),
                "name": "Ravi Dwivedi",
                "role": "admin",
                "created_at": datetime.now(
                    timezone.utc
                ).isoformat(),
            }
        )

    elif not verify_password(
        admin_password,
        existing["password_hash"],
    ):

        await db.users.update_one(
            {"email": admin_email},
            {
                "$set": {
                    "password_hash": hash_password(
                        admin_password
                    )
                }
            },
        )


# ─────────────────────────────────────────────────────────────────────────────
# Models
# ─────────────────────────────────────────────────────────────────────────────

class BaseDocument(BaseModel):

    model_config = ConfigDict(
        populate_by_name=True
    )

    id: Optional[PyObjectId] = Field(
        default=None,
        alias="_id",
    )

    def to_mongo(self):
        data = self.model_dump(
            by_alias=True,
            exclude_none=True,
        )

        data.pop("_id", None)

        return data

    @classmethod
    def from_mongo(cls, doc):

        if doc is None:
            return None

        if "_id" in doc:
            doc["_id"] = str(doc["_id"])

        return cls(**doc)


class EnquiryCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    country: Optional[str] = None
    phone: Optional[str] = None
    category: str = "General Enquiry"
    message: str


class Enquiry(BaseDocument):
    name: str
    email: EmailStr
    company: Optional[str] = None
    country: Optional[str] = None
    phone: Optional[str] = None
    category: str = "General Enquiry"
    message: str
    created_at: str


class LoginInput(BaseModel):
    email: EmailStr
    password: str


def enquiry_email_html(
    doc: Enquiry,
) -> str:

    dashboard = (
        f"{os.environ.get('FRONTEND_URL', '')}/admin"
    )

    fields = [
        ("Name", doc.name),
        ("Email", doc.email),
        ("Phone / WhatsApp", doc.phone or "-"),
        ("Company", doc.company or "-"),
        ("Country", doc.country or "-"),
        ("Category", doc.category),
    ]

    rows = "".join(
        f'<tr><td style="padding:8px 16px;font-size:11px;color:#5A6E64;text-transform:uppercase;letter-spacing:1px;white-space:nowrap">{escape(k)}</td>'
        f'<td style="padding:8px 16px;font-size:14px;color:#121A16">{escape(str(v))}</td></tr>'
        for k, v in fields
    )

    return (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F9F6F0;padding:32px 0">'
        '<tr><td align="center">'

        '<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;font-family:Arial,sans-serif">'

        '<tr><td style="background:#0B2219;padding:24px 32px">'
        '<span style="color:#F49E4C;font-size:11px;letter-spacing:3px;text-transform:uppercase">New Website Enquiry</span>'

        f'<h1 style="color:#F9F6F0;font-size:22px;margin:8px 0 0;font-weight:600">{escape(doc.category)}</h1>'

        '</td></tr>'

        f'<tr><td style="padding:16px 32px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">{rows}</table></td></tr>'

        '<tr><td style="padding:0 32px 8px">'
        '<span style="font-size:11px;color:#5A6E64;text-transform:uppercase;letter-spacing:1px">Message</span>'

        f'<p style="font-size:14px;color:#121A16;line-height:1.6;background:#F9F6F0;border-radius:12px;padding:16px">{escape(doc.message)}</p>'

        '</td></tr>'

        '<tr><td style="padding:8px 32px 28px">'

        f'<a href="mailto:{escape(doc.email)}" style="display:inline-block;background:#D96B27;color:#F9F6F0;text-decoration:none;font-size:13px;padding:12px 24px;border-radius:999px">Reply to buyer</a>'

        f'<a href="{escape(dashboard)}" style="display:inline-block;margin-left:8px;color:#0B2219;text-decoration:none;font-size:13px;padding:12px 24px;border:1px solid #0B2219;border-radius:999px">Open Dashboard</a>'

        '</td></tr>'

        '<tr><td style="padding:16px 32px;border-top:1px solid #ECE6D8">'

        f'<p style="font-size:11px;color:#A3B8AD;margin:0">Sent by {escape(EMAIL_FROM)} — automated enquiry notification.</p>'

        '</td></tr>'

        '</table></td></tr></table>'
    )


# ─────────────────────────────────────────────────────────────────────────────
# Public routes
# ─────────────────────────────────────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {
        "message": "RRAVI ORGANIC ENTERPRISES API"
    }


@api_router.post(
    "/enquiries",
    response_model=Enquiry,
)
async def create_enquiry(
    input: EnquiryCreate,
):

    enquiry = Enquiry(
        **input.model_dump(),
        created_at=datetime.now(
            timezone.utc
        ).isoformat(),
    )

    result = await db.enquiries.insert_one(
        enquiry.to_mongo()
    )

    created = await db.enquiries.find_one(
        {"_id": result.inserted_id}
    )

    doc = Enquiry.from_mongo(created)

    try:

        await send_email(
            to=os.environ["OWNER_EMAIL"],
            subject=(
                f"New enquiry: "
                f"{doc.category} - "
                f"{doc.name}"
            ),
            html=enquiry_email_html(doc),
        )

    except Exception as exc:

        logger.error(
            f"Enquiry notification email failed: {exc}"
        )

    return doc


# ─────────────────────────────────────────────────────────────────────────────
# Auth routes
# ─────────────────────────────────────────────────────────────────────────────

@api_router.post("/auth/login")
async def login(
    input: LoginInput,
    request: Request,
    response: Response,
):

    email = input.email.lower()

    identifier = (
        f"{request.client.host}:{email}"
    )

    attempts = await db.login_attempts.find_one(
        {"identifier": identifier}
    )

    now = time.time()

    if (
        attempts
        and attempts.get("count", 0) >= 5
        and now - attempts.get("last", 0) < 900
    ):

        raise HTTPException(
            status_code=429,
            detail=(
                "Too many failed attempts. "
                "Try again in 15 minutes."
            ),
        )

    user = await db.users.find_one(
        {
            "email": email,
            "role": "admin",
        }
    )

    if (
        not user
        or not verify_password(
            input.password,
            user["password_hash"],
        )
    ):

        await db.login_attempts.update_one(
            {"identifier": identifier},
            {
                "$inc": {"count": 1},
                "$set": {"last": now},
            },
            upsert=True,
        )

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    await db.login_attempts.delete_one(
        {"identifier": identifier}
    )

    set_auth_cookies(
        response,
        str(user["_id"]),
        email,
    )

    return {
        "email": email,
        "name": user.get("name", "Admin"),
        "role": "admin",
    }


@api_router.post("/auth/logout")
async def logout(
    response: Response,
):

    response.delete_cookie(
        key="access_token",
        path="/",
    )

    response.delete_cookie(
        key="refresh_token",
        path="/",
    )

    return {
        "status": "logged_out"
    }


@api_router.get("/auth/me")
async def me(
    request: Request,
):

    return await get_current_admin(request)


@api_router.post("/auth/refresh")
async def refresh(
    request: Request,
    response: Response,
):

    token = request.cookies.get(
        "refresh_token"
    )

    if not token:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated",
        )

    try:

        payload = jwt.decode(
            token,
            get_jwt_secret(),
            algorithms=[JWT_ALGORITHM],
        )

        if payload.get("type") != "refresh":
            raise HTTPException(
                status_code=401,
                detail="Invalid token type",
            )

    except jwt.ExpiredSignatureError:

        raise HTTPException(
            status_code=401,
            detail="Token expired",
        )

    except jwt.InvalidTokenError:

        raise HTTPException(
            status_code=401,
            detail="Invalid token",
        )

    user = await db.users.find_one(
        {
            "_id": ObjectId(payload["sub"]),
            "role": "admin",
        }
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="User not found",
        )

    response.set_cookie(
        key="access_token",
        value=create_access_token(
            str(user["_id"]),
            user["email"],
        ),
        httponly=True,
        secure=True,
        samesite="none",
        max_age=900,
        path="/",
    )

    return {
        "status": "refreshed"
    }


# ─────────────────────────────────────────────────────────────────────────────
# Protected admin routes
# ─────────────────────────────────────────────────────────────────────────────

@api_router.get(
    "/enquiries",
    response_model=List[Enquiry],
)
async def list_enquiries(
    request: Request,
):

    await get_current_admin(request)

    docs = await db.enquiries.find().sort(
        "created_at",
        -1,
    ).to_list(200)

    return [
        Enquiry.from_mongo(d)
        for d in docs
    ]


@api_router.delete(
    "/enquiries/{enquiry_id}"
)
async def delete_enquiry(
    enquiry_id: str,
    request: Request,
):

    await get_current_admin(request)

    result = await db.enquiries.delete_one(
        {
            "_id": ObjectId(enquiry_id)
        }
    )

    if result.deleted_count == 0:

        raise HTTPException(
            status_code=404,
            detail="Enquiry not found",
        )

    return {
        "deleted": True
    }


# ─────────────────────────────────────────────────────────────────────────────
# Startup / shutdown
# ─────────────────────────────────────────────────────────────────────────────

@app.on_event("startup")
async def startup_event():

    await db.users.create_index(
        "email",
        unique=True,
    )

    await db.login_attempts.create_index(
        "identifier"
    )

    await seed_admin()


app.include_router(api_router)


app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[
        os.environ["FRONTEND_URL"]
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)


logging.basicConfig(
    level=logging.INFO,
    format=(
        "%(asctime)s - "
        "%(name)s - "
        "%(levelname)s - "
        "%(message)s"
    ),
)


@app.on_event("shutdown")
async def shutdown_db_client():

    client.close()