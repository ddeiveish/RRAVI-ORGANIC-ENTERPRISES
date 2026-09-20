# PRD — RRAVI ORGANIC ENTERPRISES Website

## Original Problem Statement
Multi-page website for an India-based agro export business (RRAVI ORGANIC ENTERPRISES). Apple-like aesthetic but more vibrant/natural; deep forest green + warm earth accents; glassmorphism navbar; micro-animations (framer-motion + lenis smooth scroll); 8 product category sections (Herbal Extracts, Premium Herbal Powders, Therapeutic Herbal Oils, Dehydrated Fruit Powders & Extracts, Functional Vegetable & Root Powders, Seeds Flowers & Carom Derivatives, Authentic Bark Powders, Moringa Product Range); stock image per category; "Request Quote" per category feeding an enquiry form; contact via both WhatsApp and form; fully responsive.

## Architecture
- Frontend: React 19 (CRA/craco), Tailwind, framer-motion (scroll reveals, masked hero reveal, parallax), lenis (smooth momentum scroll), react-router-dom v7, sonner toasts, shadcn/ui (dialog, input, select, textarea).
- Backend: FastAPI + motor (MongoDB). Endpoints: GET /api/, POST /api/enquiries, GET /api/enquiries.
- Data: full catalogue hardcoded in src/data/catalog.js (from user's business document). Contact: Ravi Dwivedi, +91 7570055669 / +91 7570016699, ravie5702@gmail.com / deiveishdiwaakardwivedi@gmail.com, WhatsApp wa.me/917570055669.

## User Personas
- International importer/distributor browsing the catalogue and requesting quotes.
- Business buyer who prefers instant WhatsApp contact.

## Implemented (2026-09-20)
- 5 pages: Home (kinetic masked hero, editorial marquee, numbered manifesto 01–04, category bento, stats, CTA), Products (sticky category nav, 8 full catalogue sections with all real product data, per-category Request Quote), About (story, values, founder card), Why Us (6 pillars + RRAVI vs typical trader comparison table), Contact (WhatsApp card + phone/email cards + enquiry form).
- Quote drawer pre-filled with the chosen category; enquiry form POSTs to backend, stored in MongoDB, sonner confirmation.
- Design system: Fraunces display serif + Outfit body + JetBrains Mono labels; palette #0B2219 forest / #F9F6F0 cream / #D96B27 terracotta / #F49E4C amber; grain textures, glassmorphism navbar + badges.
- Verified: API health/create/list via curl; home hero + bento, products quote drawer flow, contact form submit with toast, mobile menu — all via screenshots.

## Backlog
- P0: Email notification on new enquiry (Resend).
- P1: Admin view for enquiries (currently GET /api/enquiries only).
- P1: Per-product enquiry (not just per-category).
- P2: Certificate/compliance page, language switcher, blog/insights, SEO metadata per page.

## Next Tasks
1. Wire Resend email alerts for enquiries.
2. Simple password-protected enquiries dashboard.
3. Product-level quote selection inside each category.
