# PEPTICORE Polish — Design Spec
Date: 2026-06-15

## Overview

Three categories of polish: remove all em dashes from copy, swap Lucide React for Phosphor Icons, and fix mobile/desktop UI/UX issues across the site.

---

## 1. Em Dash Removal

Replace every ` — ` (space-em-dash-space) with contextually appropriate punctuation. No em dashes anywhere on the site.

| File | Before | After |
|------|--------|-------|
| `components/home/FeaturedProducts.tsx` | `compounds — tested, verified, and ready for your protocol.` | `compounds, tested, verified, and ready for your protocol.` |
| `components/home/CategoryGrid.tsx` | `applications — find the peptides built for your work.` | `applications. Find the peptides built for your work.` |
| `components/home/Testimonials.tsx` | `every time — that's rare in this space.` | `every time. That's rare in this space.` |
| `components/cart/OrderSummary.tsx` | `Secure checkout — SSL encrypted` | `Secure checkout · SSL encrypted` |
| `app/products/page.tsx` | `products — all third-party lab tested with COA.` | `products, all third-party lab tested with COA.` |
| `app/products/[slug]/page.tsx` | `Third-party lab tested — COA available` | `Third-party lab tested · COA available` |
| `app/layout.tsx` (metadata title) | `PEPTICORE — Research-grade. Results-driven.` | `PEPTICORE \| Research-grade. Results-driven.` |
| `lib/data/products.ts` (BPC-157) | `Body Protection Compound — one of the most studied` | `Body Protection Compound, one of the most studied` |
| `lib/data/products.ts` (TB-500) | `Thymosin Beta-4 — studied for its role` | `Thymosin Beta-4, studied for its role` |
| `lib/data/products.ts` (Bundle) | `BPC-157 + TB-500 — the most researched` | `BPC-157 + TB-500, the most researched` |

---

## 2. Icon Library Swap: Lucide → Phosphor

**Install:** `@phosphor-icons/react`
**Remove:** `lucide-react` (uninstall after all references replaced)

Phosphor icons use a `weight` prop: `"regular"` (default), `"bold"`, `"fill"`, `"duotone"`. Use `weight="regular"` unless specified below.

### Icon Mapping

| Lucide import | Phosphor import | Weight override |
|---------------|-----------------|-----------------|
| `FlaskConical` | `Flask` | — |
| `MagnifyingGlass` (was `Search`) | `MagnifyingGlass` | — |
| `ShoppingCart` | `ShoppingCart` | — |
| `ShoppingBag` | `ShoppingBag` | — |
| `User` | `User` | — |
| `Menu` | `List` | — |
| `X` | `X` | — |
| `AlertTriangle` | `Warning` | — |
| `ArrowRight` | `ArrowRight` | — |
| `Check` | `Check` | — |
| `CheckCircle` | `CheckCircle` | `weight="fill"` |
| `XCircle` | `XCircle` | `weight="fill"` |
| `Star` | `Star` | `weight="fill"` |
| `Trash2` | `Trash` | — |
| `FileCheck` | `FileCheck` | — |
| `Zap` | `Lightning` | — |
| `ShieldCheck` | `ShieldCheck` | — |
| `Shield` | `Shield` | — |
| `Microscope` | `Microscope` | — |
| `Dumbbell` | `Barbell` | — |
| `Globe` | `Globe` | — |
| `MessageCircle` | `ChatCircle` | — |
| `Play` | `YoutubeLogo` | — |
| `Clock` | `Clock` | — |
| `ExternalLink` | `ArrowSquareOut` | — |
| `Award` | `Medal` | — |
| `Scale` | `Scales` | — |
| `Package` | `Package` | — |
| `Users` | `Users` | — |
| `UserCheck` | `UserCheck` | — |
| `Calendar` | `CalendarBlank` | — |

### Files to update

Every file that imports from `'lucide-react'`:
- `components/layout/Navbar.tsx`
- `components/layout/Footer.tsx`
- `components/ui/ComplianceBanner.tsx`
- `components/ui/Toast.tsx`
- `components/ui/Button.tsx` (if any icons)
- `components/home/HeroSection.tsx`
- `components/home/TrustBar.tsx`
- `components/home/DualAudience.tsx`
- `components/home/Testimonials.tsx`
- `components/home/BlogPreview.tsx`
- `components/products/ProductCard.tsx`
- `components/products/AddToCartButton.tsx`
- `components/products/StickyAddToCart.tsx`
- `components/cart/CartItem.tsx`
- `components/cart/CartDrawer.tsx`
- `app/products/[slug]/page.tsx`
- `app/checkout/page.tsx`
- `app/blog/page.tsx` (if any)
- Any other file found with `lucide-react` import

After replacing all references, run:
```bash
npm uninstall lucide-react
npm run build
```

---

## 3. UI/UX Fixes

### 3a. Mobile: Products Page Filter Toggle

**File:** `components/products/FilterSidebar.tsx`

Current problem: on mobile the sidebar sits above the product grid as a full-width block with no way to collapse it, wasting screen space.

Fix:
- Add internal `isOpen` state (default `false` on mobile)
- Render a `"Filters"` toggle button on mobile (`md:hidden`) that shows/hides the filter panel
- The filter panel itself is hidden by default on mobile, shown when toggled
- On desktop (`md:`) it always shows as before — no change to desktop layout

```tsx
'use client'
// Add useState for isOpen
// Mobile: show toggle button + collapsible panel
// Desktop: always show panel (no toggle button)
```

### 3b. Mobile: CartItem Layout

**File:** `components/cart/CartItem.tsx`

Current problem: single flex row with image + name + qty stepper + price + delete button is too cramped on mobile.

Fix: two-row layout on mobile:
- **Row 1:** image (left) + name/purity/price (right)
- **Row 2:** qty stepper (left) + item total + delete button (right)

Use `flex-col sm:flex-row` pattern so desktop keeps the current single-row layout.

### 3c. Mobile: Checkout Step Labels

**File:** `app/checkout/page.tsx`

Current problem: step labels ("Contact", "Shipping", "Payment", "Review") overflow on narrow screens because they sit inline with numbered circles.

Fix: hide the text labels on mobile (`hidden sm:inline`) — show only numbered circles on small screens.

### 3d. Mobile: Hero Stats Wrap

**File:** `components/home/HeroSection.tsx`

Current problem: three stats in a flex row can be tight on small phones (320px).

Fix: change `flex gap-8` to `flex flex-wrap gap-x-8 gap-y-4` so stats wrap gracefully on very small screens.

### 3e. Desktop: ProductCard Height Uniformity

**File:** `components/products/ProductCard.tsx`

Current problem: cards in an animated grid vary in height because `AnimateIn` wraps them in a `div` that doesn't stretch to fill grid rows.

Fix: ensure the outer `AnimateIn` call sites pass `className="h-full"` and that `ProductCard`'s root div has `h-full`. The card already has `flex flex-col flex-1` — confirm the outer div is `h-full`.

The fix belongs in `ProductCard.tsx`: change the root `<div className="bg-surface border...">` to include `h-full`. Then at call sites (FeaturedProducts, products page grid) wrap `<AnimateIn className="h-full">`.

### 3f. Desktop/Mobile: Blog Image Opacity

**File:** `components/home/BlogPreview.tsx`, `app/blog/page.tsx`

Current problem: blog card images render at `opacity-70` which looks dull.

Fix: change to `opacity-80 group-hover:opacity-100` for a more polished reveal.

### 3g. ComplianceBanner Cleanup

**File:** `components/ui/ComplianceBanner.tsx`

Current problem: uses full border on all sides which looks heavy for a top-of-page notice.

Fix: change `border border-border-subtle` to `border-b border-border-subtle` and tighten vertical padding from `py-2` to `py-1.5`.

---

## Architecture Notes

- `bg-surface-elevated` (`#1A1D24`) is confirmed defined in `tailwind.config.ts` — no substitution needed.
- Phosphor icon components are tree-shakeable — only imported icons are bundled.
- `lucide-react` is uninstalled after all references are replaced.
- No new npm packages beyond `@phosphor-icons/react`.
- All changes are UI-only — no context, data, or routing changes.

---

## Out of Scope

- Replacing copy/content beyond em dashes
- Adding new pages or sections
- Changing the color palette or typography
- Adding icon animations or interactive icon states
- Fixing the sticky add-to-cart bar on mobile (already intentionally hidden via `hidden md:flex`)
