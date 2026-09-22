# PRD — RRAVI ORGANIC ENTERPRISES Website

## Original Problem Statement
Multi-page website for an India-based agro export business (RRAVI ORGANIC ENTERPRISES). Apple-like aesthetic but more vibrant/natural; deep forest green + warm earth accents; glassmorphism navbar; micro-animations (framer-motion + lenis smooth scroll); 8 product category sections (Herbal Extracts, Premium Herbal Powders, Therapeutic Herbal Oils, Dehydrated Fruit Powders & Extracts, Functional Vegetable & Root Powders, Seeds Flowers & Carom Derivatives, Authentic Bark Powders, Moringa Product Range); stock image per category; "Request Quote" per category feeding an enquiry form; contact via both WhatsApp and form; fully responsive.

## Architecture
- Frontend: React 19 (CRA/craco), Tailwind, framer-motion (scroll reveals, masked hero reveal, parallax), lenis (smooth momentum scroll), react-router-dom v7, sonner toasts, shadcn/ui (dialog, input, select, textarea).
- Backend: FastAPI + motor (MongoDB). Endpoints: GET /api/, POST /api/enquiries, GET /api/enquiries.
- Data: full catalogue hardcoded in src/data/catalog.js (from user's business document). Contact: Ravi Dwivedi, +91 7570055669 / +91 7570016699, sales@rraviorganicenterprises.net / info@rraviorganicenterprises.com, WhatsApp wa.me/917570055669.

## User Personas
- International importer/distributor browsing the catalogue and requesting quotes.
- Business buyer who prefers instant WhatsApp contact.

## Implemented (2026-09-20)
- 5 pages: Home (kinetic masked hero, editorial marquee, numbered manifesto 01–04, category bento, stats, CTA), Products (sticky category nav, 8 full catalogue sections with all real product data, per-category Request Quote), About (story, values, founder card), Why Us (6 pillars + RRAVI vs typical trader comparison table), Contact (WhatsApp card + phone/email cards + enquiry form).
- Quote drawer pre-filled with the chosen category; enquiry form POSTs to backend, stored in MongoDB, sonner confirmation.
- Design system: Fraunces display serif + Outfit body + JetBrains Mono labels; palette #0B2219 forest / #F9F6F0 cream / #D96B27 terracotta / #F49E4C amber; grain textures, glassmorphism navbar + badges.
- Verified: API health/create/list via curl; home hero + bento, products quote drawer flow, contact form submit with toast, mobile menu — all via screenshots.

## Updates (2026-09-22)
- Hero background replaced (people in field → lush green crop rows, Unsplash photo-1625246333195).
- Emails changed site-wide to sales@rraviorganicenterprises.net + info@rraviorganicenterprises.com (single source: CONTACT in catalog.js).
- New custom SVG logo (components/Logo.jsx): terracotta→amber gradient circle, italic Fraunces "R" with sprouting leaves; used in navbar + footer.
## Backlog
- P1: Buyer auto-reply email ("we received your enquiry") via Resend.
- P2: Certificate/compliance page, language switcher, blog/insights, SEO metadata per page.
- P2: Enquiry status labels (new/contacted/closed) in the admin dashboard.

- Motion pass: stronger Reveal (blur+scale+rise), page fade transitions (AnimatePresence), staggered product-chip reveals, global pill-button hover-lift/press, navbar slide-in, floating hero glow blobs, marquee pause-on-hover.

## Updates (2026-09-22, second pass)
- Email alerts: every enquiry POST sends a branded HTML notification to sales@rraviorganicenterprises.net via Emergent-managed Resend (guardrail gate enforced, non-blocking on failure). Verified: proxy returned 202.
- Product-level quotes: every product chip on /products is now tappable — opens the quote drawer with category preselected and message pre-filled ("I'd like a quote for X (Category)…"). Verified in browser.
- Enquiry dashboard at /admin: JWT auth (httpOnly cookies, access 15min + refresh 7d, bcrypt, 5-attempt/15min lockout, admin seeded from env), protected GET/DELETE /api/enquiries, CORS locked to FRONTEND_URL. Verified: login, 401 without auth, inbox list, delete.
- Admin credentials: admin@rraviorganicenterprises.com / Rravi@2026Admin (see test_credentials.md).

## Update - 22 Sep 2026
- Changed contact email `info@rraviorganicenterprises.com` -> `info@rraviorganicenterprises.net` (catalog.js CONTACT).
- Polished custom scrollbar (brand forest thumb, terra hover accent, Firefox scrollbar-color support); Lenis smooth scroll already active.
- Expanded Moringa Product Range > Powders into 6 varieties: Dried, Organic, USDA Certified Organic, EU Organic Certified, Herbal, Private Label Moringa Leaves Powder.
- Replaced all em dashes (—) across frontend src with hyphens (-).
