# PEPTICORE

> Research-grade. Results-driven.

A full-featured peptide e-commerce website built with Next.js 16, TypeScript, and Tailwind CSS. Dark, premium aesthetic inspired by enhanced.com — built for a dual audience of researchers and athletes.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)

---

## Features

- **Homepage** — cinematic hero, category grid, featured products, trust bar, dual-audience section, blog preview
- **Product Listing** — filter by category (Research / Cosmetic / Performance / Bundles)
- **Product Detail** — image, purity info, tabbed content (Description / Research Notes / COA), related products
- **Cart** — add/remove/update quantities, order summary, free shipping threshold
- **Checkout** — multi-step flow (Contact → Shipping → Payment → Review)
- **Blog** — research article listing and detail pages
- **About** — lab credentials, testing methodology (HPLC, MS, third-party audit)
- **Compliance** — research use only policy, age verification, jurisdictional restrictions
- **Account** — sign in / register UI

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 16 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| React Context API | Cart state |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
# Production build
npm run build
npm start
```

## Project Structure

```
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Homepage
│   ├── products/               # Product listing + detail
│   ├── cart/                   # Cart page
│   ├── checkout/               # Multi-step checkout
│   ├── blog/                   # Blog listing + articles
│   ├── about/                  # About page
│   ├── compliance/             # Legal / compliance
│   └── account/                # Login / register
├── components/
│   ├── layout/                 # Navbar, Footer
│   ├── ui/                     # Button, Badge, SectionHeading, ComplianceBanner
│   ├── home/                   # Homepage section components
│   ├── products/               # ProductCard, FilterSidebar, ProductTabs, AddToCartButton
│   └── cart/                   # CartItem, OrderSummary
├── lib/
│   ├── types.ts                # TypeScript interfaces
│   ├── utils.ts                # cn() helper
│   ├── context/CartContext.tsx # Cart state management
│   └── data/                   # Mock product, category, blog data
└── docs/
    └── superpowers/            # Design spec and implementation plan
```

## Design System

| Token | Value | Use |
|-------|-------|-----|
| `background` | `#0A0B0D` | Page background |
| `surface` | `#111318` | Cards, panels |
| `accent` | `#00C2FF` | CTAs, highlights |
| `teal` | `#00857A` | Secondary accent |
| `text-primary` | `#FFFFFF` | Headings |
| `text-secondary` | `#A0A8B8` | Body text |
| `text-muted` | `#5A6070` | Labels, captions |

## Disclaimer

All products are for **research use only**. Not for human consumption. Not intended to diagnose, treat, cure, or prevent any disease. Must be 18+ to purchase.

---

Built with [Claude Code](https://claude.ai/claude-code)
