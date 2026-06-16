# PEPTICORE

> Research-grade. Results-driven.

A full-stack e-commerce storefront for research-grade peptides. Dark, premium aesthetic — built with a dual audience of researchers and athletes in mind.

**Live site:** https://pepticore.vercel.app

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 (custom design tokens) |
| Animations | Framer Motion 12 |
| Icons | Phosphor Icons (`@phosphor-icons/react`) |
| Images | Next.js `<Image>` with Unsplash CDN |
| Font | Inter via `next/font/google` |
| State | React Context API (Cart, CartDrawer, Toast) |
| Deployment | Vercel (auto-deploy on push to `main`) |
| Source control | GitHub |

---

## Architecture

### App Router

All routes live under `app/`. The project uses standard Next.js App Router file conventions:

- `page.tsx` — route UI
- `layout.tsx` — shared layout or metadata wrapper for client-component routes
- `template.tsx` — re-mounts on every navigation, used for page transition animations
- `loading.tsx` — Suspense-based skeleton loaders
- `not-found.tsx` — custom 404 page
- `sitemap.ts` / `robots.ts` — auto-generated SEO outputs

### Server vs Client Components

- **Server components** (default): all static pages, product/blog rendering, metadata exports
- **Client components** (`'use client'`): cart, checkout, account, search modal, filters, animations, context consumers
- Context providers are isolated in `components/layout/Providers.tsx` to keep the root layout a pure server component

### State Management

Three React Context providers composed in `Providers.tsx`:

| Context | Responsibility |
|---------|----------------|
| `CartContext` | Items, add/remove/update/clear. Persisted to `localStorage` under `pepticore-cart`. |
| `CartDrawerContext` | Open/close state of the slide-in cart drawer |
| `ToastContext` | Toast notification queue (max 3, auto-dismiss after 3s) |

---

## Project Structure

```
/
├── app/                            # All Next.js routes
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout — Navbar, Footer, Providers
│   ├── template.tsx                # Page transition (Framer Motion)
│   ├── not-found.tsx               # Custom 404
│   ├── sitemap.ts                  # Auto-generated /sitemap.xml
│   ├── robots.ts                   # Auto-generated /robots.txt
│   ├── globals.css                 # Tailwind base + keyframe animations
│   ├── products/
│   │   ├── page.tsx                # Listing with category, search, in-stock filters
│   │   ├── loading.tsx             # Skeleton loader
│   │   └── [slug]/page.tsx         # Detail page (SSG, generateStaticParams)
│   ├── blog/
│   │   ├── page.tsx                # Blog listing
│   │   └── [slug]/page.tsx         # Blog post (SSG)
│   ├── peptides/
│   │   ├── page.tsx                # Peptide research library (37 peptides)
│   │   └── layout.tsx              # Metadata wrapper
│   ├── cart/page.tsx               # Full-page cart
│   ├── checkout/page.tsx           # 4-step checkout
│   ├── account/page.tsx            # Sign in / register / dashboard
│   ├── about/page.tsx
│   ├── compliance/page.tsx
│   ├── faq/page.tsx                # Interactive accordion FAQ
│   ├── contact/page.tsx            # Contact cards + form
│   ├── privacy/page.tsx            # Privacy Policy
│   └── terms/page.tsx              # Terms of Service
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              # Responsive nav, search modal, mobile menu
│   │   ├── Footer.tsx              # Links, social, legal section
│   │   └── Providers.tsx           # Client boundary for all context providers
│   ├── home/
│   │   ├── HeroSection.tsx         # Video background, animated stats, CTA
│   │   ├── TrustBar.tsx            # Four trust signal icons
│   │   ├── CategoryGrid.tsx        # Category browse cards
│   │   ├── FeaturedProducts.tsx    # Featured product grid
│   │   ├── DualAudience.tsx        # Researcher vs athlete split
│   │   ├── Testimonials.tsx        # Testimonial cards
│   │   └── BlogPreview.tsx         # Latest 3 blog posts
│   ├── products/
│   │   ├── ProductCard.tsx         # Card component for grids
│   │   ├── ProductTabs.tsx         # Description / Research / COA tabs
│   │   ├── AddToCartButton.tsx     # Qty stepper + add to cart
│   │   ├── StickyAddToCart.tsx     # Sticky bottom bar on scroll
│   │   ├── FilterSidebar.tsx       # Category + in-stock filters (collapsible mobile)
│   │   └── LabVideoSection.tsx     # Lab footage embed
│   ├── cart/
│   │   ├── CartDrawer.tsx          # Slide-in cart panel
│   │   ├── CartItem.tsx            # Line item (responsive 2-row mobile layout)
│   │   └── OrderSummary.tsx        # Subtotal / shipping / total
│   └── ui/
│       ├── AnimateIn.tsx           # Framer Motion scroll-entrance wrapper
│       ├── Button.tsx              # Shared button
│       ├── ComplianceBanner.tsx    # Top-of-page research disclaimer
│       ├── CookieBanner.tsx        # GDPR cookie consent
│       ├── Marquee.tsx             # Infinite scrolling trust strip
│       ├── SectionHeading.tsx      # Reusable section title
│       └── Toast.tsx               # Toast notification
│
├── lib/
│   ├── context/
│   │   ├── CartContext.tsx
│   │   ├── CartDrawerContext.tsx
│   │   └── ToastContext.tsx
│   ├── data/
│   │   ├── products.ts             # 22 products with full metadata
│   │   ├── categories.ts           # 4 categories with counts
│   │   └── blog-posts.ts           # 3 blog posts with full content
│   ├── types.ts                    # Shared TypeScript interfaces
│   └── utils.ts                    # cn() class merging helper
│
└── public/
    └── favicon.svg                 # SVG favicon
```

---

## Pages

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Homepage — hero video, trust bar, featured products, testimonials |
| `/products` | Dynamic (SSR) | Catalog with category, text search, and in-stock filters |
| `/products/[slug]` | SSG x22 | Product detail — tabs, lab video, sticky CTA, JSON-LD schema |
| `/peptides` | Static | Research library — 37 peptides with search and category filter |
| `/blog` | Static | Blog listing |
| `/blog/[slug]` | SSG x3 | Blog post with breadcrumbs |
| `/cart` | Static | Full-page cart |
| `/checkout` | Static | 4-step form checkout |
| `/account` | Static | Sign in / register / dashboard |
| `/about` | Static | Company story |
| `/compliance` | Static | Research-use-only policy |
| `/faq` | Static | Accordion FAQ (10 items) |
| `/contact` | Static | Contact cards + validated form |
| `/privacy` | Static | Privacy Policy |
| `/terms` | Static | Terms of Service |
| `/sitemap.xml` | Auto | Generated from product + blog data |
| `/robots.txt` | Auto | Disallows checkout / cart / account |

**Total: 42 routes**

---

## Product Catalog

22 products across 4 categories:

**Research (9):** BPC-157, TB-500, Selank, Epithalon, Semax, GHK-Cu, KPV, Thymalin, Dihexa

**Performance (6):** Ipamorelin, CJC-1295, GHRP-2, HGH Fragment 176-191, Tesamorelin, Hexarelin

**Cosmetic (4):** Matrixyl 3000, Argireline, Leuphasyl, Palmitoyl Tripeptide-1

**Bundles (3):** Recovery Stack (BPC-157 + TB-500), CJC-1295 + Ipamorelin Stack, Cognitive Stack (Semax + Selank)

---

## Key Features

### Shopping Experience
- Slide-in cart drawer accessible from any page
- Cart state persisted to `localStorage` — survives page refreshes
- Toast notifications on add-to-cart
- Product badges: Bestseller, New, Low Stock, Sale
- Quantity selector on product pages
- Related products section per product page
- Full-text search across product names and descriptions

### Checkout
- 4-step flow: Contact, Shipping, Payment, Review
- Per-field validation with inline error messages
- Shipping tiers: Standard $9.99 / Express $19.99 / Overnight $39.99
- Free shipping on orders over $150
- 8% tax calculation
- Coupon codes: `RESEARCH10`, `WELCOME10`, `PEPTIDE10` (10% off)
- Card number formatting (groups of 4) and expiry auto-formatting (MM/YY)
- Generated order number on confirmation screen
- Cart cleared automatically after order placed

### Peptide Research Library
- 37 peptides with mechanism descriptions and research area tags
- Categories: Research, Performance, Cosmetic, Cognitive, Metabolic
- Live client-side search and category filter tabs
- Links to product pages for the 15 peptides sold in-store

### SEO
- Per-page `metadata` with unique titles via `title.template`
- `generateMetadata` on all dynamic routes
- Open Graph and Twitter card tags throughout
- JSON-LD `Product` structured data on every product page
- Auto-generated `sitemap.xml` and `robots.txt`

### Animations
- Hero video background (Mixkit free stock, `autoPlay muted loop playsInline`)
- Scroll-triggered entrance animations via `AnimateIn` (Framer Motion `whileInView`)
- Page fade transitions via `app/template.tsx`
- Animated stat counters using `IntersectionObserver`
- Infinite-scrolling trust marquee strip

### Accessibility
- Skip-to-main-content link on every page
- `aria-label` on all icon-only interactive elements
- `htmlFor` / `id` associations on all checkout form fields
- Focus management in cart drawer on open
- Semantic breadcrumb navigation

---

## Design System

Custom design tokens defined in `tailwind.config.ts`:

| Token | Value | Usage |
|-------|-------|-------|
| `bg-background` | `#0A0B0D` | Page background |
| `bg-surface` | `#111318` | Cards, panels |
| `bg-surface-elevated` | `#1A1D24` | Inputs, hover states |
| `text-accent` | `#00C2FF` | Brand cyan — CTAs, links, highlights |
| `text-teal` | `#00857A` | Secondary accent |
| `text-primary` | `#FFFFFF` | Headings |
| `text-secondary` | `#A0A8B8` | Body text |
| `text-muted` | `#5A6070` | Labels, captions |
| `border-border-subtle` | `#1E2028` | Card borders, dividers |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server (Turbopack)
npm run dev

# Production build
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment

Connected to Vercel via GitHub. Every push to `main` triggers an automatic production deployment.

Manual deploy:

```bash
vercel --prod
```

---

## Disclaimer

All products are for **research use only**. Not intended for human consumption. Not intended to diagnose, treat, cure, or prevent any disease. Must be 18 or older to purchase. See `/compliance` for full terms.

---

Built with [Claude Code](https://claude.ai/claude-code)
