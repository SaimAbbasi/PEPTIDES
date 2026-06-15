# PEPTICORE UI Enhancements — Design Spec
Date: 2026-06-15

## Overview

Seven UI enhancements to elevate the PEPTICORE website from a functional e-commerce site to a premium, polished experience matching the quality of enhanced.com.

---

## Enhancement 1: Animated Hero

**File:** `components/home/HeroSection.tsx`

- Replace static background with a CSS gradient animation cycling through dark blue/teal hues layered behind the existing Unsplash image
- Headline `GRADE.` text uses an animated gradient shimmer (electric blue → cyan → white → electric blue loop)
- Floating particle dots: 12–15 small CSS-only dots (no library) positioned absolutely, drifting upward with randomized `animation-delay` and `animation-duration` values
- Stats (99%+, 3rd Party, 50+) animate from 0 to their target value using a `useEffect` counter when they enter the viewport (IntersectionObserver)

---

## Enhancement 2: Marquee Strip

**File:** `components/ui/Marquee.tsx`

- New reusable component: full-width horizontal scrolling band
- Text: `THIRD-PARTY TESTED ✦ COA VERIFIED ✦ 99%+ PURITY ✦ FAST DISPATCH ✦ RESEARCH GRADE ✦ LAB CERTIFIED ✦` repeated 3× for seamless loop
- Pure CSS `@keyframes` scroll animation (no library)
- Pauses on hover (`animation-play-state: paused`)
- Electric blue `✦` dividers, `text-text-muted` body text, `bg-surface` background, subtle top/bottom borders
- **Placement:** inserted in `app/page.tsx` between `<TrustBar />` and `<CategoryGrid />`

---

## Enhancement 3: Cart Drawer

**Files:**
- Create: `components/cart/CartDrawer.tsx`
- Create: `lib/context/CartDrawerContext.tsx`
- Modify: `components/layout/Navbar.tsx` (cart icon opens drawer)
- Modify: `app/layout.tsx` (add CartDrawerProvider + render CartDrawer)

**Behaviour:**
- `CartDrawerContext` exposes `isOpen`, `openDrawer()`, `closeDrawer()` — client context, `'use client'`
- `CartDrawer` is a fixed right-side panel: `fixed inset-y-0 right-0 z-50 w-full max-w-[420px]`
- Backdrop: `fixed inset-0 bg-black/60 backdrop-blur-sm z-40` — clicking it closes the drawer
- Slide-in animation: `translate-x-full` → `translate-x-0` with `transition-transform duration-300`
- Contents: header (title + close button), scrollable line items (using existing `CartItem` component), sticky footer (subtotal + "Checkout" link to `/checkout` + "Continue Shopping" button)
- Navbar cart icon: `onClick={openDrawer}` instead of `<Link href="/cart">`
- `/cart` page remains for direct URL access

---

## Enhancement 4: Toast Notifications

**Files:**
- Create: `lib/context/ToastContext.tsx`
- Create: `components/ui/Toast.tsx`
- Modify: `app/layout.tsx` (add ToastProvider + render Toast container)
- Modify: `lib/context/CartContext.tsx` (call `addToast` after `addItem`)

**Behaviour:**
- `ToastContext` exposes `addToast({ productName, productImage })` — manages array of toasts with auto-generated IDs
- Each toast auto-dismisses after 3000ms via `setTimeout`
- `Toast` container: `fixed bottom-6 right-6 z-50 flex flex-col gap-3`
- Individual toast card: dark `bg-surface-elevated` with `border border-border-subtle`, product thumbnail (40×40), checkmark icon in accent, product name, "Added to cart" text, manual close ×
- Slide-in from right with CSS animation
- Stacks up to 3 toasts; oldest dismissed first if limit exceeded

**Note:** CartContext cannot directly call ToastContext (circular dependency risk). Instead, `AddToCartButton` and `ProductCard` call both `addItem` and `addToast` directly after the click.

---

## Enhancement 5: Product Badges

**Files:**
- Modify: `lib/types.ts` (add optional `badge?: 'bestseller' | 'new' | 'low-stock' | 'sale'` to Product)
- Modify: `lib/data/products.ts` (add badges to select products)
- Modify: `components/products/ProductCard.tsx` (render badge overlay)

**Badge data:**
- BPC-157 → `bestseller`
- TB-500 → `bestseller`
- Ipamorelin → `new`
- Recovery Research Bundle → `bestseller`
- Matrixyl 3000 → `new`
- Epithalon → `low-stock` (already out of stock — use `low-stock` label instead)
- Selank → `new`

**Rendering:**
- Absolute positioned top-left of the product card image: `absolute top-3 left-3 z-10`
- Pill shape: `px-2.5 py-1 text-xs font-bold uppercase tracking-wide rounded-full`
- Colors: bestseller=`bg-accent text-black`, new=`bg-teal text-white`, low-stock=`bg-amber-500 text-black`, sale=`bg-red-500 text-white`
- Label text: "Best Seller" / "New" / "Low Stock" / "Sale"

---

## Enhancement 6: Testimonials Section

**Files:**
- Create: `components/home/Testimonials.tsx`
- Modify: `app/page.tsx` (insert between DualAudience and BlogPreview)

**Content (3 static testimonials):**
1. Name: "Dr. Marcus Chen", role: "Research Biochemist", stars: 5, quote: "The purity levels are consistently above what's advertised. COA matches every time — that's rare in this space."
2. Name: "Jake Morrison", role: "Professional Athlete", stars: 5, quote: "Finally a supplier that takes quality seriously. BPC-157 from PEPTICORE is the only one I trust for my recovery protocols."
3. Name: "Sarah O'Brien", role: "Sports Science PhD Candidate", stars: 5, quote: "I've compared COAs from 6 suppliers. PEPTICORE's mass spec data is the cleanest. Their research-grade designation is earned."

**Layout:**
- Section heading: "Trusted by Researchers & Athletes"
- 3-column grid on desktop, 1-column on mobile
- Dark cards with a `border-t-2 border-accent` top accent line
- Star icons (5 filled yellow stars), quote text, customer name + role, "Verified Buyer" badge in teal

---

## Enhancement 7: Sticky Add-to-Cart Bar

**File:** `app/products/[slug]/page.tsx` + new `components/products/StickyAddToCart.tsx`

**Behaviour:**
- `StickyAddToCart` is a `'use client'` component
- Uses `IntersectionObserver` to watch the main `<AddToCartButton>` — shows sticky bar when that button scrolls out of view
- Sticky bar: `fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t border-border-subtle`
- Contents: product image (small, 48×48) + product name + price on the left, quantity stepper + "Add to Cart" button on the right
- Slide-up animation: `translate-y-full` → `translate-y-0` with `transition-transform duration-300`
- Hidden on mobile (`hidden md:flex`)
- Receives `product` prop from the product detail page

---

## Architecture Notes

- No new npm packages required — all animations are pure CSS/Tailwind
- Two new React contexts: `CartDrawerContext` and `ToastContext`
- Both added to `app/layout.tsx` provider stack alongside existing `CartProvider`
- Provider order: `CartProvider` → `CartDrawerContext` → `ToastProvider` → children
- `AddToCartButton` and `ProductCard` are the integration points for toast + cart drawer trigger

---

## Out of Scope

- Real animation libraries (Framer Motion, GSAP)
- Video hero background
- Announcement bar (scrolling top banner)
- Quick-view modal on product cards
