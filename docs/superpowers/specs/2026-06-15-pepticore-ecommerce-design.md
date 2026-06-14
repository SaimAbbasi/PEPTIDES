# PEPTICORE E-Commerce Website — Design Spec
Date: 2026-06-15

## Overview

A full-featured peptide e-commerce store inspired by enhanced.com's dark, premium aesthetic. Sells a mix of research, cosmetic, and sports performance peptides to a dual audience: general consumers/fitness enthusiasts (B2C) and researchers/labs (B2B).

---

## Brand Identity

- **Name:** PEPTICORE
- **Tagline:** "Research-grade. Results-driven."
- **Background:** `#0A0B0D` (near-black)
- **Primary accent:** `#00C2FF` (electric blue)
- **Secondary accent:** `#00857A` (deep teal)
- **Text:** white / `#A0A8B8` (light gray)
- **Card background:** `#111318`
- **Typography:** Inter (Google Fonts)
- **Tone:** Scientific credibility meets premium performance brand

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Icons:** Lucide React
- **Data:** Static/mock data (ready to wire up Shopify, Stripe, or any backend)

---

## Site Architecture

```
/                     → Homepage
/products             → Product Listing (with filters)
/products/[slug]      → Product Detail Page
/cart                 → Cart
/checkout             → Checkout (multi-step)
/blog                 → Blog / Research Articles
/blog/[slug]          → Article Detail
/about                → About / Lab Credentials
/compliance           → Research Use / Legal
/account              → Login / Register / Order History
```

---

## Page Designs

### Homepage (`/`)

Sections top to bottom:

1. **Sticky Nav** — logo (PEPTICORE), category links, search icon, cart icon (with badge), account icon. Dark background, border-bottom on scroll.
2. **Cinematic Hero** — full-width dark image/video background, large headline, subheadline, two CTAs ("Shop Now" + "View Research"). Electric blue accent on primary CTA.
3. **Category Grid** — 4 cards: Research Peptides / Cosmetic Peptides / Performance Peptides / Bundles. Dark cards with hover glow effect.
4. **Featured Products Carousel** — 4–6 product cards with image, name, price, "Add to Cart" button.
5. **Trust Bar** — 4 icons: "3rd Party Lab Tested" / "Certificate of Analysis" / "Fast Dispatch" / "Secure Checkout".
6. **Dual Audience Split** — two-column section: left "For Researchers" (B2B, bulk ordering, COAs), right "For Athletes" (B2C, performance stacks, results).
7. **Blog Preview** — 3 latest research article cards with image, category tag, title, excerpt.
8. **Footer** — nav links, compliance disclaimer ("For research use only. Not for human consumption."), newsletter signup, social links.

---

### Product Listing (`/products`)

- **Filter sidebar:** category (Research / Cosmetic / Performance / Bundles), price range, purity grade, in-stock only
- **Sort bar:** Featured / Price: Low-High / Price: High-Low / Newest
- **Product grid:** 3-column (desktop), 2-column (tablet), 1-column (mobile)
- **Product card:** image, category badge, name, purity %, price, "Add to Cart" / "View Details"

---

### Product Detail (`/products/[slug]`)

- Image gallery (main + thumbnails)
- Product name, category badge, purity %, price, stock status
- Quantity selector + "Add to Cart" CTA (electric blue)
- Tabs: Description / Research / Certificate of Analysis / Reviews
- "For Research Use Only" disclaimer block
- Related products section at bottom

---

### Cart (`/cart`)

- Line items with image, name, quantity stepper, remove button
- Order summary sidebar: subtotal, shipping estimate, total
- "Proceed to Checkout" CTA
- "Continue Shopping" link

---

### Checkout (`/checkout`)

Multi-step:
1. Contact info + shipping address
2. Shipping method
3. Payment details
4. Order review + place order

Progress indicator at top. Dark form inputs styled to match brand.

---

### Blog (`/blog` and `/blog/[slug]`)

- Grid of article cards: cover image, category tag (Research / Science / Performance), title, excerpt, date
- Article detail: full-width hero image, author, date, rich body content, related articles

---

### About (`/about`)

- Lab credentials and certifications
- Team section
- Testing methodology
- Mission statement
- Third-party testing partners

---

### Compliance (`/compliance`)

- "For Research Use Only" full policy
- Terms of service summary
- Age verification note
- Jurisdiction restrictions
- Links to full legal docs

---

### Account (`/account`)

- Login / Register tabs
- Order history table
- Address book
- Account settings

---

## Component Library

Shared components used across pages:

- `Navbar` — sticky, dark, with cart/account icons
- `Footer` — full-width, dark, with disclaimer
- `ProductCard` — image, badge, name, price, CTA
- `Button` — primary (electric blue), secondary (outline), ghost
- `Badge` — category label (Research / Cosmetic / Performance)
- `TrustBar` — icon + label strip
- `HeroSection` — full-width cinematic with overlay
- `SectionHeading` — large title + subtitle
- `ComplianceBanner` — persistent "For Research Use Only" notice

---

## Compliance Requirements

- Persistent "For Research Use Only. Not for human consumption." disclaimer in footer and on all product pages
- Dedicated `/compliance` page
- No medical claims in copy
- COA (Certificate of Analysis) documents linked on each product

---

## Scope: Out of Launch

The following are intentionally excluded from the initial build and can be added later:

- Real payment processing (Stripe integration)
- Real inventory/backend (Shopify API)
- Email notifications
- Live search
- Customer reviews backend
- Admin dashboard
