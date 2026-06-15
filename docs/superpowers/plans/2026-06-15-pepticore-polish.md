# PEPTICORE Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove all em dashes from copy, swap Lucide React for Phosphor Icons across 25 files, and fix mobile/desktop UX issues.

**Architecture:** Three sequential change sets — em dash text replacement, mechanical icon import swap following a consistent pattern, then targeted UX component fixes. All changes are UI surface only; no data, routing, or context changes.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS, `@phosphor-icons/react`

---

## File Map

**Em dash removal (text edits):**
`components/home/FeaturedProducts.tsx`, `components/home/CategoryGrid.tsx`, `components/home/Testimonials.tsx`, `components/cart/OrderSummary.tsx`, `app/products/page.tsx`, `app/products/[slug]/page.tsx`, `app/layout.tsx`, `lib/data/products.ts`

**Icon swap (import + JSX):**
`components/layout/Navbar.tsx`, `components/layout/Footer.tsx`, `components/ui/ComplianceBanner.tsx`, `components/ui/Toast.tsx`, `components/home/HeroSection.tsx`, `components/home/TrustBar.tsx`, `components/home/DualAudience.tsx`, `components/home/Testimonials.tsx`, `components/home/BlogPreview.tsx`, `components/home/CategoryGrid.tsx`, `components/products/ProductCard.tsx`, `components/products/ProductTabs.tsx`, `components/products/AddToCartButton.tsx`, `components/products/StickyAddToCart.tsx`, `components/cart/CartItem.tsx`, `components/cart/CartDrawer.tsx`, `components/cart/OrderSummary.tsx`, `app/products/[slug]/page.tsx`, `app/about/page.tsx`, `app/compliance/page.tsx`, `app/checkout/page.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/cart/page.tsx`, `app/account/page.tsx`

**UX fixes:**
`components/products/FilterSidebar.tsx`, `components/cart/CartItem.tsx`, `app/checkout/page.tsx`, `components/home/HeroSection.tsx`, `components/products/ProductCard.tsx`, `components/home/BlogPreview.tsx`, `app/blog/page.tsx`, `components/ui/ComplianceBanner.tsx`

---

## Task 1: Install Phosphor Icons + Remove Em Dashes

**Files:** `package.json`, 8 copy files

- [ ] **Step 1: Install Phosphor Icons**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm install @phosphor-icons/react
```

Expected: package added successfully.

- [ ] **Step 2: Fix em dashes in `components/home/FeaturedProducts.tsx`**

Change line with subtitle:
```tsx
subtitle="Our most researched, highest-purity compounds — tested, verified, and ready for your protocol."
```
To:
```tsx
subtitle="Our most researched, highest-purity compounds, tested, verified, and ready for your protocol."
```

- [ ] **Step 3: Fix em dashes in `components/home/CategoryGrid.tsx`**

Change:
```tsx
subtitle="From molecular research to cosmetic applications — find the peptides built for your work."
```
To:
```tsx
subtitle="From molecular research to cosmetic applications. Find the peptides built for your work."
```

- [ ] **Step 4: Fix em dash in `components/home/Testimonials.tsx`**

Change the quote string:
```tsx
quote: 'The purity levels are consistently above what\'s advertised. COA matches every time — that\'s rare in this space.',
```
To:
```tsx
quote: 'The purity levels are consistently above what\'s advertised. COA matches every time. That\'s rare in this space.',
```

- [ ] **Step 5: Fix em dash in `components/cart/OrderSummary.tsx`**

Find and change:
```tsx
Secure checkout — SSL encrypted
```
To:
```tsx
Secure checkout · SSL encrypted
```

- [ ] **Step 6: Fix em dash in `app/products/page.tsx`**

Change:
```tsx
subtitle={`${filtered.length} products — all third-party lab tested with COA.`}
```
To:
```tsx
subtitle={`${filtered.length} products, all third-party lab tested with COA.`}
```

- [ ] **Step 7: Fix em dash in `app/products/[slug]/page.tsx`**

Change:
```tsx
{ icon: ShieldCheck, text: 'Third-party lab tested — COA available' },
```
To:
```tsx
{ icon: ShieldCheck, text: 'Third-party lab tested · COA available' },
```

- [ ] **Step 8: Fix em dash in `app/layout.tsx` metadata**

Change:
```tsx
title: 'PEPTICORE — Research-grade. Results-driven.',
```
To:
```tsx
title: 'PEPTICORE | Research-grade. Results-driven.',
```

- [ ] **Step 9: Fix em dashes in `lib/data/products.ts`**

Find and update these three `shortDescription` fields:

```ts
// BPC-157 — change from:
shortDescription: 'Body Protection Compound — one of the most studied regenerative peptides.',
// to:
shortDescription: 'Body Protection Compound, one of the most studied regenerative peptides.',

// TB-500 — change from:
shortDescription: 'Thymosin Beta-4 — studied for its role in actin regulation and tissue repair.',
// to:
shortDescription: 'Thymosin Beta-4, studied for its role in actin regulation and tissue repair.',

// Recovery Bundle — change from:
shortDescription: 'BPC-157 + TB-500 — the most researched recovery peptide combination.',
// to:
shortDescription: 'BPC-157 + TB-500, the most researched recovery peptide combination.',
```

- [ ] **Step 10: Build check**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm run build 2>&1 | tail -5
```

- [ ] **Step 11: Commit**

```bash
cd /Users/saim/Downloads/PEPTIDES && git add -A && git commit -m "chore: install phosphor icons and remove all em dashes from copy"
```

---

## Task 2: Icon Swap — Layout + UI Components

**Files:** `components/layout/Navbar.tsx`, `components/layout/Footer.tsx`, `components/ui/ComplianceBanner.tsx`, `components/ui/Toast.tsx`

Read each file before editing to confirm current content.

- [ ] **Step 1: Update `components/layout/Navbar.tsx`**

Change the import line from:
```tsx
import { ShoppingCart, User, Search, Menu, X, FlaskConical } from 'lucide-react'
```
To:
```tsx
import { ShoppingCart, User, MagnifyingGlass, List, X, Flask } from '@phosphor-icons/react'
```

Then in the JSX, make these replacements:
- `<FlaskConical` → `<Flask`
- `<Search` → `<MagnifyingGlass`
- `<Menu` → `<List`

(ShoppingCart, User, X keep the same name — no JSX change needed for those.)

- [ ] **Step 2: Update `components/layout/Footer.tsx`**

Change import:
```tsx
import { FlaskConical, Globe, MessageCircle, Play } from 'lucide-react'
```
To:
```tsx
import { Flask, Globe, ChatCircle, YoutubeLogo } from '@phosphor-icons/react'
```

JSX replacements:
- `<FlaskConical` → `<Flask`
- `<MessageCircle` → `<ChatCircle`
- `<Play` → `<YoutubeLogo`

(Globe keeps same name.)

- [ ] **Step 3: Update `components/ui/ComplianceBanner.tsx`**

Change import:
```tsx
import { AlertTriangle } from 'lucide-react'
```
To:
```tsx
import { Warning } from '@phosphor-icons/react'
```

JSX: `<AlertTriangle` → `<Warning`

- [ ] **Step 4: Update `components/ui/Toast.tsx`**

Change import:
```tsx
import { X, CheckCircle } from 'lucide-react'
```
To:
```tsx
import { X, CheckCircle } from '@phosphor-icons/react'
```

In JSX, add `weight="fill"` to CheckCircle:
```tsx
// Before:
<CheckCircle size={13} className="text-accent flex-shrink-0" />
// After:
<CheckCircle size={13} weight="fill" className="text-accent flex-shrink-0" />
```

(X keeps same name, no weight change needed.)

- [ ] **Step 5: Build check**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm run build 2>&1 | tail -5
```

- [ ] **Step 6: Commit**

```bash
cd /Users/saim/Downloads/PEPTIDES && git add components/layout/Navbar.tsx components/layout/Footer.tsx components/ui/ComplianceBanner.tsx components/ui/Toast.tsx && git commit -m "feat: swap Lucide to Phosphor icons in layout and UI components"
```

---

## Task 3: Icon Swap — Home Components

**Files:** `components/home/HeroSection.tsx`, `components/home/TrustBar.tsx`, `components/home/DualAudience.tsx`, `components/home/Testimonials.tsx`, `components/home/BlogPreview.tsx`, `components/home/CategoryGrid.tsx`

- [ ] **Step 1: Update `components/home/HeroSection.tsx`**

Change import:
```tsx
import { ArrowRight, FlaskConical } from 'lucide-react'
```
To:
```tsx
import { ArrowRight, Flask } from '@phosphor-icons/react'
```

JSX: `<FlaskConical` → `<Flask`

- [ ] **Step 2: Update `components/home/TrustBar.tsx`**

Change import:
```tsx
import { FlaskConical, FileCheck, Zap, ShieldCheck } from 'lucide-react'
```
To:
```tsx
import { Flask, FileCheck, Lightning, ShieldCheck } from '@phosphor-icons/react'
```

JSX replacements:
- `<FlaskConical` → `<Flask`
- `<Zap` → `<Lightning`

(FileCheck, ShieldCheck keep same name.)

- [ ] **Step 3: Update `components/home/DualAudience.tsx`**

Change import:
```tsx
import { Microscope, Dumbbell, ArrowRight } from 'lucide-react'
```
To:
```tsx
import { Microscope, Barbell, ArrowRight } from '@phosphor-icons/react'
```

JSX: `<Dumbbell` → `<Barbell`

- [ ] **Step 4: Update `components/home/Testimonials.tsx`**

Change import:
```tsx
import { Star } from 'lucide-react'
```
To:
```tsx
import { Star } from '@phosphor-icons/react'
```

Add `weight="fill"` to the Star in JSX:
```tsx
// Before:
<Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />
// After:
<Star key={j} size={16} weight="fill" className="text-yellow-400" />
```

(Remove `fill-yellow-400` Tailwind class — Phosphor's `weight="fill"` handles the fill; color is still set by `text-yellow-400`.)

- [ ] **Step 5: Update `components/home/BlogPreview.tsx`**

Change import:
```tsx
import { Clock, ArrowRight } from 'lucide-react'
```
To:
```tsx
import { Clock, ArrowRight } from '@phosphor-icons/react'
```

(Both names are identical in Phosphor — no JSX changes needed.)

- [ ] **Step 6: Update `components/home/CategoryGrid.tsx`**

Change import:
```tsx
import { ArrowRight } from 'lucide-react'
```
To:
```tsx
import { ArrowRight } from '@phosphor-icons/react'
```

(Name is identical — no JSX changes needed.)

- [ ] **Step 7: Build check**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm run build 2>&1 | tail -5
```

- [ ] **Step 8: Commit**

```bash
cd /Users/saim/Downloads/PEPTIDES && git add components/home/ && git commit -m "feat: swap Lucide to Phosphor icons in home components"
```

---

## Task 4: Icon Swap — Products, Cart, and App Pages

**Files:** `components/products/ProductCard.tsx`, `components/products/ProductTabs.tsx`, `components/products/AddToCartButton.tsx`, `components/products/StickyAddToCart.tsx`, `components/cart/CartItem.tsx`, `components/cart/CartDrawer.tsx`, `components/cart/OrderSummary.tsx`, `app/products/[slug]/page.tsx`, `app/about/page.tsx`, `app/compliance/page.tsx`, `app/checkout/page.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/cart/page.tsx`, `app/account/page.tsx`

- [ ] **Step 1: Update `components/products/ProductCard.tsx`**

Change import:
```tsx
import { ShoppingCart, CheckCircle, XCircle } from 'lucide-react'
```
To:
```tsx
import { ShoppingCart, CheckCircle, XCircle } from '@phosphor-icons/react'
```

Add `weight="fill"` to both CheckCircle and XCircle in JSX:
```tsx
// CheckCircle usage — add weight="fill":
<CheckCircle size={11} weight="fill" />
// XCircle usage — add weight="fill":
<XCircle size={11} weight="fill" />
```

- [ ] **Step 2: Update `components/products/ProductTabs.tsx`**

Change import:
```tsx
import { ExternalLink } from 'lucide-react'
```
To:
```tsx
import { ArrowSquareOut } from '@phosphor-icons/react'
```

JSX: `<ExternalLink` → `<ArrowSquareOut`

- [ ] **Step 3: Update `components/products/AddToCartButton.tsx`**

Change import:
```tsx
import { ShoppingCart, Check } from 'lucide-react'
```
To:
```tsx
import { ShoppingCart, Check } from '@phosphor-icons/react'
```

(Both names identical — no JSX changes needed.)

- [ ] **Step 4: Update `components/products/StickyAddToCart.tsx`**

Change import:
```tsx
import { ShoppingCart } from 'lucide-react'
```
To:
```tsx
import { ShoppingCart } from '@phosphor-icons/react'
```

(Name identical — no JSX change needed.)

- [ ] **Step 5: Update `components/cart/CartItem.tsx`**

Change import:
```tsx
import { Trash2 } from 'lucide-react'
```
To:
```tsx
import { Trash } from '@phosphor-icons/react'
```

JSX: `<Trash2` → `<Trash`

- [ ] **Step 6: Update `components/cart/CartDrawer.tsx`**

Change import:
```tsx
import { X, ShoppingBag } from 'lucide-react'
```
To:
```tsx
import { X, ShoppingBag } from '@phosphor-icons/react'
```

(Both names identical — no JSX changes needed.)

- [ ] **Step 7: Update `components/cart/OrderSummary.tsx`**

Change import:
```tsx
import { ShieldCheck } from 'lucide-react'
```
To:
```tsx
import { ShieldCheck } from '@phosphor-icons/react'
```

(Name identical — no JSX change needed.)

- [ ] **Step 8: Update `app/products/[slug]/page.tsx`**

Change import:
```tsx
import { AlertTriangle, CheckCircle, XCircle, ShieldCheck } from 'lucide-react'
```
To:
```tsx
import { Warning, CheckCircle, XCircle, ShieldCheck } from '@phosphor-icons/react'
```

JSX changes:
- `<AlertTriangle` → `<Warning`
- Add `weight="fill"` to `<CheckCircle` and `<XCircle`

- [ ] **Step 9: Update `app/about/page.tsx`**

Change import:
```tsx
import { FlaskConical, Award, Shield, Users } from 'lucide-react'
```
To:
```tsx
import { Flask, Medal, Shield, Users } from '@phosphor-icons/react'
```

JSX:
- `<FlaskConical` → `<Flask`
- `<Award` → `<Medal`

(Shield, Users keep same name.)

- [ ] **Step 10: Update `app/compliance/page.tsx`**

Change import:
```tsx
import { AlertTriangle, Scale, Globe, UserCheck } from 'lucide-react'
```
To:
```tsx
import { Warning, Scales, Globe, UserCheck } from '@phosphor-icons/react'
```

JSX:
- `<AlertTriangle` → `<Warning`
- `<Scale` → `<Scales`

(Globe, UserCheck keep same name.)

- [ ] **Step 11: Update `app/checkout/page.tsx`**

Change import:
```tsx
import { CheckCircle } from 'lucide-react'
```
To:
```tsx
import { CheckCircle } from '@phosphor-icons/react'
```

Add `weight="fill"` to CheckCircle in JSX:
```tsx
<CheckCircle size={64} weight="fill" className="text-green-400 mx-auto mb-6" />
```

- [ ] **Step 12: Update `app/blog/page.tsx`**

Change import:
```tsx
import { Clock } from 'lucide-react'
```
To:
```tsx
import { Clock } from '@phosphor-icons/react'
```

(Name identical — no JSX change needed.)

- [ ] **Step 13: Update `app/blog/[slug]/page.tsx`**

Change import:
```tsx
import { Clock, Calendar } from 'lucide-react'
```
To:
```tsx
import { Clock, CalendarBlank } from '@phosphor-icons/react'
```

JSX: `<Calendar` → `<CalendarBlank`

- [ ] **Step 14: Update `app/cart/page.tsx`**

Change import:
```tsx
import { ShoppingBag } from 'lucide-react'
```
To:
```tsx
import { ShoppingBag } from '@phosphor-icons/react'
```

(Name identical — no JSX change needed.)

- [ ] **Step 15: Update `app/account/page.tsx`**

Change import:
```tsx
import { User, Package } from 'lucide-react'
```
To:
```tsx
import { User, Package } from '@phosphor-icons/react'
```

(Both names identical — no JSX changes needed.)

- [ ] **Step 16: Build check**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm run build 2>&1 | tail -15
```

Fix any errors. Common issue: if a Phosphor icon name doesn't exist, TypeScript will error. Double-check the import name against `@phosphor-icons/react` exports.

- [ ] **Step 17: Commit**

```bash
cd /Users/saim/Downloads/PEPTIDES && git add components/products/ components/cart/ app/ && git commit -m "feat: swap Lucide to Phosphor icons in products, cart, and page components"
```

---

## Task 5: Uninstall lucide-react

**Files:** `package.json`

- [ ] **Step 1: Verify no lucide-react imports remain**

```bash
grep -r "lucide-react" /Users/saim/Downloads/PEPTIDES/components /Users/saim/Downloads/PEPTIDES/app --include="*.tsx" --include="*.ts"
```

Expected: no output. If any files still import from `lucide-react`, fix them before proceeding.

- [ ] **Step 2: Uninstall**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm uninstall lucide-react
```

- [ ] **Step 3: Build check**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm run build 2>&1 | tail -5
```

Expected: clean build with no `lucide-react` references.

- [ ] **Step 4: Commit**

```bash
cd /Users/saim/Downloads/PEPTIDES && git add package.json package-lock.json && git commit -m "chore: uninstall lucide-react, fully migrated to Phosphor Icons"
```

---

## Task 6: Mobile UX Fixes

**Files:** `components/products/FilterSidebar.tsx`, `components/cart/CartItem.tsx`, `app/checkout/page.tsx`, `components/home/HeroSection.tsx`

- [ ] **Step 1: Read all four files**

```bash
cat /Users/saim/Downloads/PEPTIDES/components/products/FilterSidebar.tsx
cat /Users/saim/Downloads/PEPTIDES/components/cart/CartItem.tsx
cat "/Users/saim/Downloads/PEPTIDES/app/checkout/page.tsx"
cat /Users/saim/Downloads/PEPTIDES/components/home/HeroSection.tsx | grep -A3 "flex gap-8 mt-14"
```

- [ ] **Step 2: Add mobile filter toggle to `components/products/FilterSidebar.tsx`**

Replace the entire file with:

```tsx
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ProductCategory } from '@/lib/types'
import { SlidersHorizontal, X } from '@phosphor-icons/react'

const categoryOptions: { value: ProductCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Products' },
  { value: 'research', label: 'Research' },
  { value: 'cosmetic', label: 'Cosmetic' },
  { value: 'performance', label: 'Performance' },
  { value: 'bundle', label: 'Bundles' },
]

export function FilterSidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category') ?? 'all'
  const [mobileOpen, setMobileOpen] = useState(false)

  function setCategory(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all') {
      params.delete('category')
    } else {
      params.set('category', value)
    }
    router.push(`/products?${params.toString()}`)
    setMobileOpen(false)
  }

  const filterContent = (
    <div className="bg-surface border border-border-subtle rounded-xl p-6">
      <h3 className="text-text-primary font-semibold text-sm uppercase tracking-wider mb-4">Category</h3>
      <ul className="space-y-1">
        {categoryOptions.map((opt) => (
          <li key={opt.value}>
            <button
              onClick={() => setCategory(opt.value)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                currentCategory === opt.value
                  ? 'bg-accent/10 text-accent font-medium'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
              }`}
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="border-t border-border-subtle mt-6 pt-6">
        <h3 className="text-text-primary font-semibold text-sm uppercase tracking-wider mb-4">Stock</h3>
        <label className="flex items-center gap-2 text-text-secondary text-sm cursor-pointer">
          <input type="checkbox" className="accent-accent" />
          In Stock Only
        </label>
      </div>
    </div>
  )

  return (
    <aside className="w-full md:w-56 flex-shrink-0">
      {/* Mobile toggle button */}
      <button
        className="md:hidden w-full flex items-center justify-between bg-surface border border-border-subtle rounded-xl px-4 py-3 mb-3 text-text-primary text-sm font-medium"
        onClick={() => setMobileOpen((v) => !v)}
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal size={16} />
          Filters
          {currentCategory !== 'all' && (
            <span className="bg-accent text-black text-xs font-bold rounded-full px-1.5 py-0.5 leading-none">1</span>
          )}
        </span>
        {mobileOpen ? <X size={16} /> : null}
      </button>

      {/* Mobile: collapsible */}
      <div className={`md:block ${mobileOpen ? 'block' : 'hidden'}`}>
        {filterContent}
      </div>
    </aside>
  )
}
```

- [ ] **Step 3: Fix mobile layout in `components/cart/CartItem.tsx`**

Replace the entire file with a responsive two-row layout on mobile:

```tsx
'use client'

import { Trash } from '@phosphor-icons/react'
import { CartItem as CartItemType } from '@/lib/types'
import { useCart } from '@/lib/context/CartContext'

export function CartItem({ item }: { item: CartItemType }) {
  const { removeItem, updateQuantity } = useCart()

  return (
    <div className="py-5 border-b border-border-subtle">
      {/* Row 1: image + info */}
      <div className="flex items-start gap-4 mb-3">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg opacity-80 flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-text-primary font-semibold truncate">{item.product.name}</h3>
          <p className="text-text-muted text-sm mt-0.5">{item.product.purity}% purity</p>
          <p className="text-accent font-bold mt-1">${item.product.price.toFixed(2)}</p>
        </div>
        {/* Remove button — top right on mobile */}
        <button
          onClick={() => removeItem(item.product.id)}
          className="text-text-muted hover:text-red-400 transition-colors flex-shrink-0 sm:hidden"
        >
          <Trash size={16} />
        </button>
      </div>

      {/* Row 2: qty stepper + total + remove (desktop) */}
      <div className="flex items-center justify-between pl-20 sm:pl-24">
        <div className="flex items-center border border-border-subtle rounded-md overflow-hidden">
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors text-sm"
          >
            −
          </button>
          <span className="w-8 h-8 flex items-center justify-center text-text-primary text-sm">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors text-sm"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-text-primary font-bold">
            ${(item.product.price * item.quantity).toFixed(2)}
          </p>
          {/* Remove button — desktop only */}
          <button
            onClick={() => removeItem(item.product.id)}
            className="text-text-muted hover:text-red-400 transition-colors hidden sm:block"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Fix checkout step labels on mobile in `app/checkout/page.tsx`**

Find the step label text in the progress bar. It's rendered like:
```tsx
<span className="text-xs font-medium hidden sm:block">{step.label}</span>
```

If the label is currently rendered without the `hidden sm:block` classes, find the step label span and add `hidden sm:inline` to it so labels only show on `sm+` screens. Read the file to find the exact pattern, then update just the label span to add these classes.

The step number circle and connector lines should remain visible on all screen sizes. Only the text label (e.g. "Contact", "Shipping") should be hidden on mobile.

- [ ] **Step 5: Fix hero stats wrapping on small screens in `components/home/HeroSection.tsx`**

Find this line:
```tsx
<div className="flex gap-8 mt-14 pt-8 border-t border-border-subtle">
```

Change to:
```tsx
<div className="flex flex-wrap gap-x-8 gap-y-4 mt-14 pt-8 border-t border-border-subtle">
```

- [ ] **Step 6: Build check**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm run build 2>&1 | tail -10
```

- [ ] **Step 7: Commit**

```bash
cd /Users/saim/Downloads/PEPTIDES && git add components/products/FilterSidebar.tsx components/cart/CartItem.tsx "app/checkout/page.tsx" components/home/HeroSection.tsx && git commit -m "fix: mobile UX — filter toggle, cart item layout, checkout steps, hero stats"
```

---

## Task 7: Desktop/General UX Fixes

**Files:** `components/products/ProductCard.tsx`, `components/home/FeaturedProducts.tsx`, `components/home/BlogPreview.tsx`, `app/blog/page.tsx`, `components/ui/ComplianceBanner.tsx`

- [ ] **Step 1: Fix ProductCard height uniformity**

Read `components/products/ProductCard.tsx`.

Find the outer root div — it should look like:
```tsx
<div className={cn('bg-surface border border-border-subtle rounded-xl overflow-hidden group hover:border-accent/30 transition-all duration-300 flex flex-col', className)}>
```

Add `h-full` to the className string:
```tsx
<div className={cn('bg-surface border border-border-subtle rounded-xl overflow-hidden group hover:border-accent/30 transition-all duration-300 flex flex-col h-full', className)}>
```

- [ ] **Step 2: Fix AnimateIn wrappers in FeaturedProducts to pass h-full**

Read `components/home/FeaturedProducts.tsx`.

Find the AnimateIn wrapping ProductCard:
```tsx
<AnimateIn key={product.id} delay={i * 0.1}>
  <ProductCard product={product} />
</AnimateIn>
```

Add `className="h-full"` to AnimateIn:
```tsx
<AnimateIn key={product.id} delay={i * 0.1} className="h-full">
  <ProductCard product={product} />
</AnimateIn>
```

- [ ] **Step 3: Fix blog image opacity in `components/home/BlogPreview.tsx`**

Find the blog card image:
```tsx
className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
```

Change to:
```tsx
className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
```

- [ ] **Step 4: Fix blog image opacity in `app/blog/page.tsx`**

Same fix — find:
```tsx
className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
```

Change to:
```tsx
className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
```

- [ ] **Step 5: Clean up ComplianceBanner**

Replace the entire `components/ui/ComplianceBanner.tsx` with:

```tsx
import { Warning } from '@phosphor-icons/react'

export function ComplianceBanner() {
  return (
    <div className="bg-surface border-b border-border-subtle py-1.5 px-4 text-center">
      <p className="text-text-muted text-xs flex items-center justify-center gap-2">
        <Warning size={12} className="text-yellow-500 flex-shrink-0" />
        For research use only. Not for human consumption. Must be 18+ to purchase.
      </p>
    </div>
  )
}
```

Note: ComplianceBanner was already updated to use Phosphor in Task 2. This step refines the styling only (border-b instead of full border, tighter padding). If the icon is already `Warning` from Task 2, just update the className on the wrapper div.

- [ ] **Step 6: Build check**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm run build 2>&1 | tail -5
```

- [ ] **Step 7: Commit**

```bash
cd /Users/saim/Downloads/PEPTIDES && git add components/products/ProductCard.tsx components/home/FeaturedProducts.tsx components/home/BlogPreview.tsx app/blog/page.tsx components/ui/ComplianceBanner.tsx && git commit -m "fix: product card height, blog image opacity, compliance banner polish"
```

---

## Task 8: Final Verification + Push

- [ ] **Step 1: Verify no lucide-react remains**

```bash
grep -r "lucide-react" /Users/saim/Downloads/PEPTIDES --include="*.tsx" --include="*.ts" --include="*.json" | grep -v node_modules | grep -v ".next"
```

Expected: no output.

- [ ] **Step 2: Verify no em dashes remain**

```bash
grep -r " — " /Users/saim/Downloads/PEPTIDES/components /Users/saim/Downloads/PEPTIDES/app /Users/saim/Downloads/PEPTIDES/lib --include="*.tsx" --include="*.ts"
```

Expected: no output.

- [ ] **Step 3: Full build**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm run build 2>&1
```

Expected: 21+ routes, 0 TypeScript errors.

- [ ] **Step 4: Fix any remaining issues**

Common issues:
- Phosphor icon name typo: verify against `node_modules/@phosphor-icons/react/dist/index.d.ts` if needed
- `SlidersHorizontal` import in FilterSidebar: this is a valid Phosphor icon name
- ComplianceBanner using Phosphor but `'use client'` not needed (it's a server component — Phosphor icons work in server components)

- [ ] **Step 5: Push to GitHub**

```bash
cd /Users/saim/Downloads/PEPTIDES && git push origin main
```

---

## Summary

| Task | Changes |
|------|---------|
| 1 | Install Phosphor, remove 10 em dashes across 8 files |
| 2 | Icon swap: Navbar, Footer, ComplianceBanner, Toast |
| 3 | Icon swap: 6 home components |
| 4 | Icon swap: products, cart, all app pages (15 files) |
| 5 | Uninstall lucide-react |
| 6 | Mobile: filter toggle, cart item 2-row layout, checkout step labels, hero stats wrap |
| 7 | Desktop: card height uniformity, blog opacity, compliance banner cleanup |
| 8 | Final verification + push |
