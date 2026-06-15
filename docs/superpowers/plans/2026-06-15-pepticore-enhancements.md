# PEPTICORE UI Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 7 premium UI enhancements (animated hero, marquee, cart drawer, toast notifications, product badges, testimonials, sticky add-to-cart) to make PEPTICORE feel like a high-end e-commerce site.

**Architecture:** Pure CSS/Tailwind animations (no new npm packages). Two new React contexts (CartDrawerContext, ToastContext) added to the provider stack in `app/layout.tsx`. All interactive components are client components; static sections remain server components.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS, Lucide React, React Context API

---

## Task 1: Animated Hero + CSS Keyframes

**Files:**
- Modify: `app/globals.css`
- Modify: `components/home/HeroSection.tsx`

- [ ] **Step 1: Read existing files**

```bash
cat /Users/saim/Downloads/PEPTIDES/app/globals.css
cat /Users/saim/Downloads/PEPTIDES/components/home/HeroSection.tsx
```

- [ ] **Step 2: Add keyframe animations to `app/globals.css`**

Add these keyframes at the end of the file:

```css
/* Hero gradient animation */
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Gradient text shimmer */
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

/* Floating particles */
@keyframes floatUp {
  0% { transform: translateY(0) translateX(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 0.6; }
  100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
}

/* Marquee scroll */
@keyframes marqueeScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-33.333%); }
}

/* Toast slide in */
@keyframes toastSlideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* Counter up (used via JS) */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 3: Replace `components/home/HeroSection.tsx`**

```tsx
'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ArrowRight, FlaskConical } from 'lucide-react'

const particles = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 7) % 90}%`,
  size: `${2 + (i % 3)}px`,
  duration: `${8 + (i % 7)}s`,
  delay: `${(i * 1.3) % 8}s`,
}))

const stats = [
  { target: 99, suffix: '%+', label: 'Average Purity' },
  { target: 3, prefix: '', suffix: 'rd Party', label: 'Lab Verified' },
  { target: 50, suffix: '+', label: 'Peptide SKUs' },
]

function useCountUp(target: number, duration = 1500, active: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, active])
  return count
}

function StatCounter({ target, suffix, prefix = '', label }: { target: number; suffix: string; prefix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const count = useCountUp(target, 1400, active)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      <p className="text-2xl font-bold text-accent">
        {prefix}{count}{suffix}
      </p>
      <p className="text-text-muted text-xs uppercase tracking-wide mt-0.5">{label}</p>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1920&q=80')` }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: 'linear-gradient(135deg, #0A0B0D 0%, #0d1520 25%, #0A0B0D 50%, #0d1a18 75%, #0A0B0D 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 12s ease infinite',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-accent/30 pointer-events-none"
          style={{
            left: p.left,
            bottom: '-10px',
            width: p.size,
            height: p.size,
            animation: `floatUp ${p.duration} ${p.delay} linear infinite`,
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-8">
            <FlaskConical size={14} className="text-accent" />
            <span className="text-accent text-xs font-semibold uppercase tracking-wider">
              Third-Party Lab Tested
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight mb-6">
            RESEARCH
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #00C2FF, #00FFD1, #ffffff, #00C2FF)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer 3s linear infinite',
              }}
            >
              GRADE.
            </span>
            <br />
            RESULTS
            <br />
            DRIVEN.
          </h1>

          <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
            Premium peptides with verified purity. Every batch independently tested and backed by a Certificate of Analysis.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/products">
              <Button size="lg" variant="primary" className="gap-2">
                Shop All Peptides
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/blog">
              <Button size="lg" variant="outline">
                View Research
              </Button>
            </Link>
          </div>

          {/* Animated stats */}
          <div className="flex gap-8 mt-14 pt-8 border-t border-border-subtle">
            {stats.map((s) => (
              <StatCounter key={s.label} target={s.target} suffix={s.suffix} prefix={s.prefix} label={s.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Build check**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm run build 2>&1 | tail -10
```

Expected: Clean build.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css components/home/HeroSection.tsx
git commit -m "feat: animated hero with gradient shimmer, particles, and stat counters"
```

---

## Task 2: Marquee Strip

**Files:**
- Create: `components/ui/Marquee.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Read `app/page.tsx`**

```bash
cat /Users/saim/Downloads/PEPTIDES/app/page.tsx
```

- [ ] **Step 2: Create `components/ui/Marquee.tsx`**

```tsx
const items = [
  'THIRD-PARTY TESTED',
  'COA VERIFIED',
  '99%+ PURITY',
  'FAST DISPATCH',
  'RESEARCH GRADE',
  'LAB CERTIFIED',
  'HPLC ANALYSIS',
  'MASS SPEC CONFIRMED',
]

const repeated = [...items, ...items, ...items]

export function Marquee() {
  return (
    <div className="bg-surface border-y border-border-subtle py-3 overflow-hidden">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'marqueeScroll 25s linear infinite' }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'running')}
      >
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-4">
            <span className="text-text-muted text-xs font-semibold uppercase tracking-[0.15em]">{item}</span>
            <span className="text-accent text-sm">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Update `app/page.tsx`**

```tsx
import { HeroSection } from '@/components/home/HeroSection'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { TrustBar } from '@/components/home/TrustBar'
import { DualAudience } from '@/components/home/DualAudience'
import { BlogPreview } from '@/components/home/BlogPreview'
import { Testimonials } from '@/components/home/Testimonials'
import { Marquee } from '@/components/ui/Marquee'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <Marquee />
      <CategoryGrid />
      <FeaturedProducts />
      <DualAudience />
      <Testimonials />
      <BlogPreview />
    </>
  )
}
```

Note: `Testimonials` is imported here even though it's created in Task 9 — if building incrementally, temporarily remove the Testimonials import and add it back in Task 9.

- [ ] **Step 4: Build check**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm run build 2>&1 | tail -5
```

- [ ] **Step 5: Commit**

```bash
git add components/ui/Marquee.tsx app/page.tsx
git commit -m "feat: add infinite marquee strip with trust signals"
```

---

## Task 3: CartDrawerContext

**Files:**
- Create: `lib/context/CartDrawerContext.tsx`

- [ ] **Step 1: Create `lib/context/CartDrawerContext.tsx`**

```tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface CartDrawerContextType {
  isOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
}

const CartDrawerContext = createContext<CartDrawerContextType | null>(null)

export function CartDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <CartDrawerContext.Provider
      value={{
        isOpen,
        openDrawer: () => setIsOpen(true),
        closeDrawer: () => setIsOpen(false),
      }}
    >
      {children}
    </CartDrawerContext.Provider>
  )
}

export function useCartDrawer(): CartDrawerContextType {
  const ctx = useContext(CartDrawerContext)
  if (!ctx) throw new Error('useCartDrawer must be used inside CartDrawerProvider')
  return ctx
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/context/CartDrawerContext.tsx
git commit -m "feat: add CartDrawerContext for slide-out cart"
```

---

## Task 4: CartDrawer Component

**Files:**
- Create: `components/cart/CartDrawer.tsx`

- [ ] **Step 1: Read existing CartItem component**

```bash
cat /Users/saim/Downloads/PEPTIDES/components/cart/CartItem.tsx
```

- [ ] **Step 2: Create `components/cart/CartDrawer.tsx`**

```tsx
'use client'

import Link from 'next/link'
import { X, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/context/CartContext'
import { useCartDrawer } from '@/lib/context/CartDrawerContext'
import { CartItem } from '@/components/cart/CartItem'
import { Button } from '@/components/ui/Button'

export function CartDrawer() {
  const { items, totalPrice, totalItems } = useCart()
  const { isOpen, closeDrawer } = useCartDrawer()
  const shipping = totalPrice > 150 ? 0 : 9.99

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-[420px] bg-background border-l border-border-subtle flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-subtle flex-shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="text-text-primary font-bold text-lg">Your Cart</h2>
            {totalItems > 0 && (
              <span className="bg-accent text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <ShoppingBag size={48} className="text-text-muted mb-4" />
              <p className="text-text-primary font-semibold mb-1">Your cart is empty</p>
              <p className="text-text-muted text-sm mb-6">Add some peptides to get started.</p>
              <Button variant="outline" size="sm" onClick={closeDrawer}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="flex-shrink-0 border-t border-border-subtle px-6 py-5 space-y-4 bg-background">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal</span>
                <span className="text-text-primary">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Shipping</span>
                <span className={shipping === 0 ? 'text-green-400 font-medium' : 'text-text-primary'}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-text-muted text-xs">Free shipping on orders over $150</p>
              )}
              <div className="border-t border-border-subtle pt-2 flex justify-between font-bold">
                <span className="text-text-primary">Total</span>
                <span className="text-accent text-lg">${(totalPrice + shipping).toFixed(2)}</span>
              </div>
            </div>
            <Link href="/checkout" onClick={closeDrawer}>
              <Button size="lg" variant="primary" className="w-full">
                Checkout
              </Button>
            </Link>
            <button
              onClick={closeDrawer}
              className="w-full text-center text-text-secondary text-sm hover:text-text-primary transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/cart/CartDrawer.tsx
git commit -m "feat: add CartDrawer slide-out panel component"
```

---

## Task 5: Wire Navbar + Layout to Cart Drawer

**Files:**
- Modify: `app/layout.tsx`
- Modify: `components/layout/Navbar.tsx`

- [ ] **Step 1: Read both files**

```bash
cat /Users/saim/Downloads/PEPTIDES/app/layout.tsx
cat /Users/saim/Downloads/PEPTIDES/components/layout/Navbar.tsx
```

- [ ] **Step 2: Update `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartProvider } from '@/lib/context/CartContext'
import { CartDrawerProvider } from '@/lib/context/CartDrawerContext'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { ToastProvider } from '@/lib/context/ToastContext'
import { ToastContainer } from '@/components/ui/Toast'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'PEPTICORE — Research-grade. Results-driven.',
  description: 'Premium peptides for research and performance. Lab-tested, third-party verified.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-text-primary min-h-screen flex flex-col font-sans">
        <CartProvider>
          <CartDrawerProvider>
            <ToastProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
              <ToastContainer />
            </ToastProvider>
          </CartDrawerProvider>
        </CartProvider>
      </body>
    </html>
  )
}
```

Note: `ToastProvider` and `ToastContainer` are used here even though they're created in Task 6. If building incrementally, temporarily remove them and add back in Task 6.

- [ ] **Step 3: Update `components/layout/Navbar.tsx`**

Replace the cart `<Link>` with a button that calls `openDrawer`:

```tsx
'use client'

import Link from 'next/link'
import { ShoppingCart, User, Search, Menu, X, FlaskConical } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCart } from '@/lib/context/CartContext'
import { useCartDrawer } from '@/lib/context/CartDrawerContext'
import { ComplianceBanner } from '@/components/ui/ComplianceBanner'

const navLinks = [
  { href: '/products?category=research', label: 'Research' },
  { href: '/products?category=cosmetic', label: 'Cosmetic' },
  { href: '/products?category=performance', label: 'Performance' },
  { href: '/products?category=bundle', label: 'Bundles' },
  { href: '/blog', label: 'Research Blog' },
]

export function Navbar() {
  const { totalItems } = useCart()
  const { openDrawer } = useCartDrawer()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <ComplianceBanner />
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/95 backdrop-blur border-b border-border-subtle shadow-lg'
            : 'bg-background/80 backdrop-blur'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <FlaskConical className="text-accent" size={22} />
              <span className="text-xl font-black tracking-wider text-text-primary group-hover:text-accent transition-colors">
                PEPTICORE
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="text-text-secondary hover:text-text-primary transition-colors">
                <Search size={20} />
              </button>
              <Link href="/account" className="text-text-secondary hover:text-text-primary transition-colors">
                <User size={20} />
              </Link>
              <button
                onClick={openDrawer}
                className="relative text-text-secondary hover:text-text-primary transition-colors"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden pb-4 border-t border-border-subtle mt-2 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </header>
    </>
  )
}
```

- [ ] **Step 4: Build check**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm run build 2>&1 | tail -10
```

If build fails because `ToastProvider`/`ToastContainer` don't exist yet, temporarily remove those 2 imports and their JSX from `layout.tsx`, build to verify, then restore before continuing to Task 6.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx components/layout/Navbar.tsx
git commit -m "feat: wire cart drawer to navbar and layout"
```

---

## Task 6: Toast Context + Toast Component

**Files:**
- Create: `lib/context/ToastContext.tsx`
- Create: `components/ui/Toast.tsx`

- [ ] **Step 1: Create `lib/context/ToastContext.tsx`**

```tsx
'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export interface ToastData {
  id: string
  productName: string
  productImage: string
}

interface ToastContextType {
  toasts: ToastData[]
  addToast: (data: Omit<ToastData, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback((data: Omit<ToastData, 'id'>) => {
    const id = `${Date.now()}-${Math.random()}`
    setToasts((prev) => {
      const next = [...prev, { ...data, id }]
      return next.slice(-3) // max 3 toasts
    })
    setTimeout(() => removeToast(id), 3000)
  }, [removeToast])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextType {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}
```

- [ ] **Step 2: Create `components/ui/Toast.tsx`**

```tsx
'use client'

import { X, CheckCircle } from 'lucide-react'
import { useToast } from '@/lib/context/ToastContext'

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 bg-surface-elevated border border-border-subtle rounded-xl px-4 py-3 shadow-2xl min-w-[280px] max-w-[340px]"
          style={{ animation: 'toastSlideIn 0.25s ease-out' }}
        >
          <img
            src={toast.productImage}
            alt={toast.productName}
            className="w-10 h-10 rounded-lg object-cover flex-shrink-0 opacity-90"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <CheckCircle size={13} className="text-accent flex-shrink-0" />
              <span className="text-accent text-xs font-semibold">Added to cart</span>
            </div>
            <p className="text-text-primary text-sm font-medium truncate">{toast.productName}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-text-muted hover:text-text-primary transition-colors flex-shrink-0"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Build check**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add lib/context/ToastContext.tsx components/ui/Toast.tsx
git commit -m "feat: add ToastContext and ToastContainer component"
```

---

## Task 7: Wire Toasts to AddToCartButton + ProductCard

**Files:**
- Modify: `components/products/AddToCartButton.tsx`
- Modify: `components/products/ProductCard.tsx`

- [ ] **Step 1: Read both files**

```bash
cat /Users/saim/Downloads/PEPTIDES/components/products/AddToCartButton.tsx
cat /Users/saim/Downloads/PEPTIDES/components/products/ProductCard.tsx
```

- [ ] **Step 2: Update `components/products/AddToCartButton.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import { Product } from '@/lib/types'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/lib/context/CartContext'
import { useToast } from '@/lib/context/ToastContext'
import { useCartDrawer } from '@/lib/context/CartDrawerContext'

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { addToast } = useToast()
  const { openDrawer } = useCartDrawer()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem(product, qty)
    addToast({ productName: product.name, productImage: product.image })
    openDrawer()
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border border-border-subtle rounded-md overflow-hidden">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="w-10 h-11 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
        >
          −
        </button>
        <span className="w-10 h-11 flex items-center justify-center text-text-primary font-medium text-sm">
          {qty}
        </span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="w-10 h-11 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
        >
          +
        </button>
      </div>

      <Button
        size="lg"
        variant={added ? 'secondary' : 'primary'}
        onClick={handleAdd}
        disabled={!product.inStock}
        className="flex-1 gap-2 transition-all"
      >
        {added ? <Check size={18} /> : <ShoppingCart size={18} />}
        {added ? 'Added!' : 'Add to Cart'}
      </Button>
    </div>
  )
}
```

- [ ] **Step 3: Update `components/products/ProductCard.tsx`**

Add `useToast` and `useCartDrawer` calls alongside `useCart`:

```tsx
'use client'

import Link from 'next/link'
import { ShoppingCart, CheckCircle, XCircle } from 'lucide-react'
import { Product } from '@/lib/types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/lib/context/CartContext'
import { useToast } from '@/lib/context/ToastContext'
import { useCartDrawer } from '@/lib/context/CartDrawerContext'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  className?: string
}

const badgeStyles: Record<string, string> = {
  bestseller: 'bg-accent text-black',
  new: 'bg-teal text-white',
  'low-stock': 'bg-amber-500 text-black',
  sale: 'bg-red-500 text-white',
}

const badgeLabels: Record<string, string> = {
  bestseller: 'Best Seller',
  new: 'New',
  'low-stock': 'Low Stock',
  sale: 'Sale',
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart()
  const { addToast } = useToast()
  const { openDrawer } = useCartDrawer()

  function handleAdd() {
    addItem(product)
    addToast({ productName: product.name, productImage: product.image })
    openDrawer()
  }

  return (
    <div className={cn('bg-surface border border-border-subtle rounded-xl overflow-hidden group hover:border-accent/30 transition-all duration-300 flex flex-col', className)}>
      {/* Image */}
      <div className="relative">
        <Link href={`/products/${product.slug}`} className="block overflow-hidden h-52">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
          />
        </Link>
        {/* Badge overlay */}
        {product.badge && (
          <span className={cn(
            'absolute top-3 left-3 z-10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide rounded-full',
            badgeStyles[product.badge] ?? 'bg-surface text-text-primary'
          )}>
            {badgeLabels[product.badge] ?? product.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Badge category={product.category} />
          <span className="text-text-muted text-xs">{product.purity}% purity</span>
        </div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-text-primary font-bold text-lg hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-text-secondary text-sm mt-1 leading-relaxed line-clamp-2 flex-1">
          {product.shortDescription}
        </p>

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-border-subtle">
          <div>
            <p className="text-accent text-xl font-bold">${product.price.toFixed(2)}</p>
            <div className={cn('flex items-center gap-1 text-xs mt-0.5', product.inStock ? 'text-green-400' : 'text-text-muted')}>
              {product.inStock
                ? <><CheckCircle size={11} /> In Stock</>
                : <><XCircle size={11} /> Out of Stock</>
              }
            </div>
          </div>
          <Button
            size="sm"
            variant="primary"
            onClick={handleAdd}
            disabled={!product.inStock}
            className="gap-1.5"
          >
            <ShoppingCart size={14} />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Build check**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm run build 2>&1 | tail -5
```

- [ ] **Step 5: Commit**

```bash
git add components/products/AddToCartButton.tsx components/products/ProductCard.tsx
git commit -m "feat: wire toast notifications and cart drawer to add-to-cart actions"
```

---

## Task 8: Product Badges Data

**Files:**
- Modify: `lib/types.ts`
- Modify: `lib/data/products.ts`

- [ ] **Step 1: Read both files**

```bash
cat /Users/saim/Downloads/PEPTIDES/lib/types.ts
cat /Users/saim/Downloads/PEPTIDES/lib/data/products.ts
```

- [ ] **Step 2: Add `badge` field to `lib/types.ts`**

Find the `Product` interface and add `badge` as an optional field after `featured`:

```ts
export type ProductBadge = 'bestseller' | 'new' | 'low-stock' | 'sale'

export interface Product {
  id: string
  slug: string
  name: string
  category: ProductCategory
  price: number
  purity: number
  inStock: boolean
  image: string
  shortDescription: string
  description: string
  researchNotes: string
  coaUrl: string
  tags: string[]
  featured: boolean
  badge?: ProductBadge
}
```

- [ ] **Step 3: Add badges to `lib/data/products.ts`**

Add `badge` fields to the following products. Keep every other field unchanged — only add the badge line to each object:

- `prod-1` (BPC-157): add `badge: 'bestseller' as const,`
- `prod-2` (TB-500): add `badge: 'bestseller' as const,`
- `prod-3` (Ipamorelin): add `badge: 'new' as const,`
- `prod-5` (Matrixyl 3000): add `badge: 'new' as const,`
- `prod-6` (Epithalon): add `badge: 'low-stock' as const,`
- `prod-7` (Selank): add `badge: 'new' as const,`
- `prod-8` (Recovery Research Bundle): add `badge: 'bestseller' as const,`

(prod-4 / CJC-1295 gets no badge)

- [ ] **Step 4: Build check**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm run build 2>&1 | tail -5
```

- [ ] **Step 5: Commit**

```bash
git add lib/types.ts lib/data/products.ts
git commit -m "feat: add badge field to Product type and mock data"
```

---

## Task 9: Testimonials Section

**Files:**
- Create: `components/home/Testimonials.tsx`

(Note: `app/page.tsx` already imports `Testimonials` from Task 2. This task creates the component.)

- [ ] **Step 1: Create `components/home/Testimonials.tsx`**

```tsx
import { Star } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'

const testimonials = [
  {
    id: 1,
    name: 'Dr. Marcus Chen',
    role: 'Research Biochemist',
    stars: 5,
    quote: 'The purity levels are consistently above what\'s advertised. COA matches every time — that\'s rare in this space.',
  },
  {
    id: 2,
    name: 'Jake Morrison',
    role: 'Professional Athlete',
    stars: 5,
    quote: 'Finally a supplier that takes quality seriously. BPC-157 from PEPTICORE is the only one I trust for my recovery protocols.',
  },
  {
    id: 3,
    name: 'Sarah O\'Brien',
    role: 'Sports Science PhD Candidate',
    stars: 5,
    quote: 'I\'ve compared COAs from 6 suppliers. PEPTICORE\'s mass spec data is the cleanest. Their research-grade designation is earned.',
  },
]

export function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <SectionHeading
        title="Trusted by Researchers & Athletes"
        subtitle="Real results from the people who demand the most from their peptides."
        centered
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-surface border border-border-subtle border-t-2 border-t-accent rounded-xl p-8 flex flex-col gap-4"
          >
            {/* Stars */}
            <div className="flex gap-1">
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            {/* Quote */}
            <p className="text-text-secondary text-sm leading-relaxed flex-1">
              &ldquo;{t.quote}&rdquo;
            </p>
            {/* Author */}
            <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
              <div>
                <p className="text-text-primary font-semibold text-sm">{t.name}</p>
                <p className="text-text-muted text-xs mt-0.5">{t.role}</p>
              </div>
              <span className="bg-teal/10 text-teal border border-teal/20 text-xs font-medium px-2 py-0.5 rounded-full">
                Verified
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Build check**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add components/home/Testimonials.tsx
git commit -m "feat: add Testimonials section with star ratings and verified badges"
```

---

## Task 10: Sticky Add-to-Cart Bar

**Files:**
- Create: `components/products/StickyAddToCart.tsx`
- Modify: `app/products/[slug]/page.tsx`

- [ ] **Step 1: Read `app/products/[slug]/page.tsx`**

```bash
cat /Users/saim/Downloads/PEPTIDES/app/products/[slug]/page.tsx
```

- [ ] **Step 2: Create `components/products/StickyAddToCart.tsx`**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Product } from '@/lib/types'
import { useCart } from '@/lib/context/CartContext'
import { useToast } from '@/lib/context/ToastContext'
import { useCartDrawer } from '@/lib/context/CartDrawerContext'
import { Button } from '@/components/ui/Button'

interface StickyAddToCartProps {
  product: Product
  addToCartRef: React.RefObject<HTMLDivElement | null>
}

export function StickyAddToCart({ product, addToCartRef }: StickyAddToCartProps) {
  const { addItem } = useCart()
  const { addToast } = useToast()
  const { openDrawer } = useCartDrawer()
  const [visible, setVisible] = useState(false)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    if (!addToCartRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(addToCartRef.current)
    return () => observer.disconnect()
  }, [addToCartRef])

  function handleAdd() {
    addItem(product, qty)
    addToast({ productName: product.name, productImage: product.image })
    openDrawer()
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t border-border-subtle hidden md:flex transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4 flex items-center justify-between gap-8">
        {/* Product info */}
        <div className="flex items-center gap-4 min-w-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 rounded-lg object-cover opacity-80 flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="text-text-primary font-bold truncate">{product.name}</p>
            <p className="text-accent font-bold">${product.price.toFixed(2)}</p>
          </div>
        </div>

        {/* Quantity + CTA */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="flex items-center border border-border-subtle rounded-md overflow-hidden">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-9 h-9 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors text-sm"
            >
              −
            </button>
            <span className="w-9 h-9 flex items-center justify-center text-text-primary font-medium text-sm">
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-9 h-9 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors text-sm"
            >
              +
            </button>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={handleAdd}
            disabled={!product.inStock}
            className="gap-2"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Update `app/products/[slug]/page.tsx`**

Add `StickyAddToCart` and a `ref` on the add-to-cart section:

```tsx
import { notFound } from 'next/navigation'
import { getProductBySlug, products } from '@/lib/data/products'
import { ProductTabs } from '@/components/products/ProductTabs'
import { ProductCard } from '@/components/products/ProductCard'
import { Badge } from '@/components/ui/Badge'
import { AddToCartButton } from '@/components/products/AddToCartButton'
import { StickyAddToCart } from '@/components/products/StickyAddToCart'
import { AlertTriangle, CheckCircle, XCircle, ShieldCheck } from 'lucide-react'

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <div className="rounded-2xl overflow-hidden bg-surface border border-border-subtle aspect-square">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge category={product.category} />
              <span className="text-text-muted text-sm">{product.purity}% Purity (HPLC)</span>
            </div>

            <h1 className="text-4xl font-black text-text-primary mb-2">{product.name}</h1>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">{product.shortDescription}</p>

            <div className="flex items-center gap-6 mb-8">
              <p className="text-4xl font-bold text-accent">${product.price.toFixed(2)}</p>
              <div className={`flex items-center gap-1.5 text-sm font-medium ${product.inStock ? 'text-green-400' : 'text-text-muted'}`}>
                {product.inStock ? <CheckCircle size={16} /> : <XCircle size={16} />}
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>

            {/* This div is observed by StickyAddToCart */}
            <div id="add-to-cart-anchor">
              <AddToCartButton product={product} />
            </div>

            <div className="mt-8 space-y-3 border-t border-border-subtle pt-8">
              {[
                { icon: ShieldCheck, text: 'Third-party lab tested — COA available' },
                { icon: AlertTriangle, text: 'For research use only. Not for human consumption.' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-2 text-text-muted text-sm">
                  <Icon size={15} className="flex-shrink-0 mt-0.5" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border-subtle rounded-2xl p-8 mb-16">
          <ProductTabs product={product} />
        </div>

        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky bar — client component that observes the add-to-cart anchor */}
      <StickyAddToCartWrapper product={product} />
    </>
  )
}

// Separate client wrapper to avoid making the whole page a client component
import { StickyAddToCartWrapper } from '@/components/products/StickyAddToCartWrapper'
```

- [ ] **Step 4: Create `components/products/StickyAddToCartWrapper.tsx`**

The product detail page is a server component. We need a thin client wrapper that creates the ref and passes it to both the anchor div observer and `StickyAddToCart`:

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { Product } from '@/lib/types'
import { StickyAddToCart } from '@/components/products/StickyAddToCart'

export function StickyAddToCartWrapper({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    ref.current = document.getElementById('add-to-cart-anchor') as HTMLDivElement | null
  }, [])

  return <StickyAddToCart product={product} addToCartRef={ref} />
}
```

- [ ] **Step 5: Fix the import in `app/products/[slug]/page.tsx`**

Remove the inline `import` at the bottom of the page (that was for illustration). The actual file should have all imports at the top. Rewrite the file with this corrected structure — imports at top, then the page component:

```tsx
import { notFound } from 'next/navigation'
import { getProductBySlug, products } from '@/lib/data/products'
import { ProductTabs } from '@/components/products/ProductTabs'
import { ProductCard } from '@/components/products/ProductCard'
import { Badge } from '@/components/ui/Badge'
import { AddToCartButton } from '@/components/products/AddToCartButton'
import { StickyAddToCartWrapper } from '@/components/products/StickyAddToCartWrapper'
import { AlertTriangle, CheckCircle, XCircle, ShieldCheck } from 'lucide-react'

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <div className="rounded-2xl overflow-hidden bg-surface border border-border-subtle aspect-square">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge category={product.category} />
              <span className="text-text-muted text-sm">{product.purity}% Purity (HPLC)</span>
            </div>

            <h1 className="text-4xl font-black text-text-primary mb-2">{product.name}</h1>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">{product.shortDescription}</p>

            <div className="flex items-center gap-6 mb-8">
              <p className="text-4xl font-bold text-accent">${product.price.toFixed(2)}</p>
              <div className={`flex items-center gap-1.5 text-sm font-medium ${product.inStock ? 'text-green-400' : 'text-text-muted'}`}>
                {product.inStock ? <CheckCircle size={16} /> : <XCircle size={16} />}
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>

            <div id="add-to-cart-anchor">
              <AddToCartButton product={product} />
            </div>

            <div className="mt-8 space-y-3 border-t border-border-subtle pt-8">
              {[
                { icon: ShieldCheck, text: 'Third-party lab tested — COA available' },
                { icon: AlertTriangle, text: 'For research use only. Not for human consumption.' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-2 text-text-muted text-sm">
                  <Icon size={15} className="flex-shrink-0 mt-0.5" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border-subtle rounded-2xl p-8 mb-16">
          <ProductTabs product={product} />
        </div>

        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <StickyAddToCartWrapper product={product} />
    </>
  )
}
```

- [ ] **Step 6: Build check**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm run build 2>&1 | tail -10
```

- [ ] **Step 7: Commit**

```bash
git add components/products/StickyAddToCart.tsx components/products/StickyAddToCartWrapper.tsx app/products/[slug]/page.tsx
git commit -m "feat: add sticky add-to-cart bar on product detail pages"
```

---

## Task 11: Final Verification + Push to GitHub

**Files:** none (verification only)

- [ ] **Step 1: Full build**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm run build 2>&1
```

Expected: All 21+ routes generated, 0 TypeScript errors.

- [ ] **Step 2: Verify all 10 tasks are reflected**

Check the build output includes:
- `/` — homepage (animated hero, marquee, testimonials)
- `/products/[slug]` — 8 static pages (sticky add-to-cart)
- All other routes unchanged

- [ ] **Step 3: Fix any remaining issues**

Common issues:
- Missing `'use client'` on any component using hooks
- `useEffect` / `IntersectionObserver` only available client-side — must be in `'use client'` components
- `ref.current` typed as `HTMLDivElement | null` — ensure the ref type matches
- Provider order in `layout.tsx`: CartProvider → CartDrawerProvider → ToastProvider → children

- [ ] **Step 4: Push to GitHub**

```bash
cd /Users/saim/Downloads/PEPTIDES && git push origin main
```

Expected: All commits pushed to https://github.com/SaimAbbasi/PEPTIDES

- [ ] **Step 5: Final commit if any fixes**

```bash
git add -A && git commit -m "fix: resolve final build issues" && git push origin main
```

---

## Summary

| Task | Deliverable |
|------|-------------|
| 1 | Animated hero: gradient bg, shimmer text, floating particles, stat counters |
| 2 | Marquee strip with infinite CSS scroll |
| 3 | CartDrawerContext (isOpen, openDrawer, closeDrawer) |
| 4 | CartDrawer slide-out panel component |
| 5 | Navbar wired to drawer, layout providers updated |
| 6 | ToastContext + ToastContainer with slide-in animation |
| 7 | AddToCartButton + ProductCard trigger toast + open drawer |
| 8 | Product badges (Best Seller, New, Low Stock) in types + data |
| 9 | Testimonials section with stars and verified badges |
| 10 | Sticky add-to-cart bar on product detail (desktop only) |
| 11 | Final build + push to GitHub |
