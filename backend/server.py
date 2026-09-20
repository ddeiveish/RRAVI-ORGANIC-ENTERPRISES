from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict, BeforeValidator
from typing import List, Optional, Annotated
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

PyObjectId = Annotated[str, BeforeValidator(str)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    def to_mongo(self):
        data = self.model_dump(by_alias=True, exclude_none=True)
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


@api_router.get("/")
async def root():
    return {"message": "RRAVI ORGANIC ENTERPRISES API"}


@api_router.post("/enquiries", response_model=Enquiry)
async def create_enquiry(input: EnquiryCreate):
    enquiry = Enquiry(**input.model_dump(), created_at=datetime.now(timezone.utc).isoformat())
    result = await db.enquiries.insert_one(enquiry.to_mongo())
    created = await db.enquiries.find_one({"_id": result.inserted_id})
    return Enquiry.from_mongo(created)


@api_router.get("/enquiries", response_model=List[Enquiry])
async def list_enquiries():
    docs = await db.enquiries.find().sort("created_at", -1).to_list(200)
    return [Enquiry.from_mongo(d) for d in docs]


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
