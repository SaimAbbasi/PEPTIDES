# PEPTICORE E-Commerce Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full-featured, dark-aesthetic peptide e-commerce website (PEPTICORE) using Next.js 14 App Router and Tailwind CSS with mock data.

**Architecture:** Next.js 14 App Router with TypeScript and Tailwind CSS. All data is mock/static — products, blog posts, and categories are defined in `lib/data/`. Cart state is managed via React Context. Pages are server components by default; interactive components are client components with `"use client"`.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide React, React Context API

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tailwind.config.ts`, `next.config.ts`, `tsconfig.json`, `app/globals.css`, `app/layout.tsx`

- [ ] **Step 1: Scaffold Next.js project**

```bash
cd /Users/saim/Downloads/PEPTIDES
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```

When prompted: choose all defaults (Yes to all).

- [ ] **Step 2: Install additional dependencies**

```bash
npm install lucide-react
```

- [ ] **Step 3: Replace `tailwind.config.ts` with PEPTICORE theme**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0B0D',
        surface: '#111318',
        'surface-elevated': '#1A1D24',
        'border-subtle': '#1E2028',
        accent: '#00C2FF',
        'accent-hover': '#00A8E0',
        teal: '#00857A',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A0A8B8',
        'text-muted': '#5A6070',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 4: Replace `app/globals.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    background-color: #0A0B0D;
    color: #FFFFFF;
    font-family: 'Inter', system-ui, sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #111318;
  }

  ::-webkit-scrollbar-thumb {
    background: #1E2028;
    border-radius: 3px;
  }
}
```

- [ ] **Step 5: Update `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartProvider } from '@/lib/context/CartContext'

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
    <html lang="en">
      <body className="bg-background text-text-primary min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 6: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts on http://localhost:3000 with no errors (default Next.js page for now).

- [ ] **Step 7: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 14 project with PEPTICORE Tailwind theme"
```

---

## Task 2: TypeScript Types

**Files:**
- Create: `lib/types.ts`

- [ ] **Step 1: Create `lib/types.ts`**

```ts
export type ProductCategory = 'research' | 'cosmetic' | 'performance' | 'bundle'

export interface Product {
  id: string
  slug: string
  name: string
  category: ProductCategory
  price: number
  purity: number          // e.g. 99.5 for 99.5%
  inStock: boolean
  image: string           // path under /public or external URL
  shortDescription: string
  description: string
  researchNotes: string
  coaUrl: string          // Certificate of Analysis PDF URL
  tags: string[]
  featured: boolean
}

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  image: string
  productCount: number
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: 'research' | 'science' | 'performance'
  coverImage: string
  author: string
  publishedAt: string     // ISO date string
  readTime: number        // minutes
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartState {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/types.ts
git commit -m "feat: add TypeScript types for Product, Category, BlogPost, Cart"
```

---

## Task 3: Mock Data

**Files:**
- Create: `lib/data/products.ts`
- Create: `lib/data/categories.ts`
- Create: `lib/data/blog-posts.ts`

- [ ] **Step 1: Create `lib/data/categories.ts`**

```ts
import { Category } from '@/lib/types'

export const categories: Category[] = [
  {
    id: 'cat-1',
    slug: 'research',
    name: 'Research Peptides',
    description: 'Laboratory-grade peptides for scientific research and study.',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&q=80',
    productCount: 12,
  },
  {
    id: 'cat-2',
    slug: 'cosmetic',
    name: 'Cosmetic Peptides',
    description: 'Advanced peptide formulations for skin health and rejuvenation research.',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80',
    productCount: 8,
  },
  {
    id: 'cat-3',
    slug: 'performance',
    name: 'Performance Peptides',
    description: 'Peptides studied for their role in physical recovery and performance.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    productCount: 10,
  },
  {
    id: 'cat-4',
    slug: 'bundle',
    name: 'Research Bundles',
    description: 'Curated peptide stacks for comprehensive research protocols.',
    image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&q=80',
    productCount: 4,
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}
```

- [ ] **Step 2: Create `lib/data/products.ts`**

```ts
import { Product } from '@/lib/types'

export const products: Product[] = [
  {
    id: 'prod-1',
    slug: 'bpc-157',
    name: 'BPC-157',
    category: 'research',
    price: 49.99,
    purity: 99.5,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80',
    shortDescription: 'Body Protection Compound — one of the most studied regenerative peptides.',
    description: 'BPC-157 is a pentadecapeptide composed of 15 amino acids. It is a partial sequence of body protection compound (BPC) that is discovered in and isolated from human gastric juice. This peptide has been extensively studied in research settings.',
    researchNotes: 'Multiple studies have investigated BPC-157\'s role in tissue repair, angiogenesis, and inflammatory response modulation. Research is ongoing and results are preliminary.',
    coaUrl: '/coa/bpc-157-coa.pdf',
    tags: ['regenerative', 'popular', 'gut health'],
    featured: true,
  },
  {
    id: 'prod-2',
    slug: 'tb-500',
    name: 'TB-500',
    category: 'research',
    price: 59.99,
    purity: 99.2,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=600&q=80',
    shortDescription: 'Thymosin Beta-4 — studied for its role in actin regulation and tissue repair.',
    description: 'TB-500 is a synthetic version of the naturally occurring peptide Thymosin Beta-4. It is present in virtually all human and animal cells and plays an important role in building new blood vessels, new small muscle tissue fibers, cell migration and blood cell reproduction.',
    researchNotes: 'Research suggests potential roles in wound healing, hair follicle activation, and inflammation modulation. All findings are from preclinical or early-stage studies.',
    coaUrl: '/coa/tb-500-coa.pdf',
    tags: ['recovery', 'popular', 'tissue repair'],
    featured: true,
  },
  {
    id: 'prod-3',
    slug: 'ipamorelin',
    name: 'Ipamorelin',
    category: 'performance',
    price: 44.99,
    purity: 99.0,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    shortDescription: 'A selective GH secretagogue studied for growth hormone release properties.',
    description: 'Ipamorelin is a pentapeptide (Aib-His-D-2-Nal-D-Phe-Lys-NH2) that acts as a ghrelin mimetic and growth hormone secretagogue. It selectively stimulates the release of growth hormone from the pituitary gland.',
    researchNotes: 'Studies have explored Ipamorelin\'s selectivity profile, showing minimal effect on cortisol and prolactin compared to other secretagogues. Research use only.',
    coaUrl: '/coa/ipamorelin-coa.pdf',
    tags: ['GH secretagogue', 'performance', 'selective'],
    featured: true,
  },
  {
    id: 'prod-4',
    slug: 'cjc-1295',
    name: 'CJC-1295',
    category: 'performance',
    price: 54.99,
    purity: 99.3,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80',
    shortDescription: 'A long-acting GHRH analogue with extended half-life for research applications.',
    description: 'CJC-1295 is a synthetic analogue of growth hormone-releasing hormone (GHRH) with the addition of a Drug Affinity Complex (DAC). The DAC extends its half-life significantly compared to endogenous GHRH.',
    researchNotes: 'Research has focused on CJC-1295\'s pharmacokinetics and its sustained GH release properties. Often studied in combination with Ipamorelin.',
    coaUrl: '/coa/cjc-1295-coa.pdf',
    tags: ['GHRH analogue', 'performance', 'long-acting'],
    featured: true,
  },
  {
    id: 'prod-5',
    slug: 'matrixyl-3000',
    name: 'Matrixyl 3000',
    category: 'cosmetic',
    price: 39.99,
    purity: 98.8,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80',
    shortDescription: 'A dual-peptide complex studied for collagen synthesis and skin rejuvenation.',
    description: 'Matrixyl 3000 is a combination of two matrikines (palmitoyl tripeptide-1 and palmitoyl tetrapeptide-7) that have been extensively studied in dermatological research for their role in stimulating skin matrix proteins.',
    researchNotes: 'In vitro and in vivo studies have examined its effects on collagen I, III, and fibronectin production. Results suggest potential anti-aging applications in cosmetic research.',
    coaUrl: '/coa/matrixyl-3000-coa.pdf',
    tags: ['collagen', 'anti-aging', 'cosmetic', 'skin'],
    featured: true,
  },
  {
    id: 'prod-6',
    slug: 'epithalon',
    name: 'Epithalon',
    category: 'research',
    price: 64.99,
    purity: 99.1,
    inStock: false,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    shortDescription: 'A tetrapeptide studied for telomere elongation and longevity research.',
    description: 'Epithalon (Epitalon) is a synthetic tetrapeptide (Ala-Glu-Asp-Gly) based on the natural tetrapeptide Epithalamin extracted from the pineal gland. It has been studied extensively in Russia for several decades.',
    researchNotes: 'Research has investigated Epithalon\'s role in telomerase activation, melatonin production regulation, and antioxidant properties. Most studies originate from Eastern European research institutions.',
    coaUrl: '/coa/epithalon-coa.pdf',
    tags: ['longevity', 'telomere', 'pineal', 'anti-aging'],
    featured: false,
  },
  {
    id: 'prod-7',
    slug: 'selank',
    name: 'Selank',
    category: 'research',
    price: 42.99,
    purity: 99.4,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=600&q=80',
    shortDescription: 'A nootropic heptapeptide studied for anxiolytic and cognitive effects.',
    description: 'Selank is a synthetic analogue of the immunomodulatory peptide tuftsin (Thr-Lys-Pro-Arg-Pro-Gly-Pro). It was developed at the Institute of Molecular Genetics at the Russian Academy of Sciences.',
    researchNotes: 'Studies have examined Selank\'s effects on BDNF expression, anxiety modulation, and immune function. Preliminary data suggests anxiolytic properties without sedative effects.',
    coaUrl: '/coa/selank-coa.pdf',
    tags: ['nootropic', 'anxiolytic', 'cognitive', 'research'],
    featured: false,
  },
  {
    id: 'prod-8',
    slug: 'recovery-research-bundle',
    name: 'Recovery Research Bundle',
    category: 'bundle',
    price: 99.99,
    purity: 99.2,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&q=80',
    shortDescription: 'BPC-157 + TB-500 — the most researched recovery peptide combination.',
    description: 'This bundle combines our two most popular research peptides: BPC-157 (5mg) and TB-500 (5mg). Both peptides have extensive research literature and are frequently studied together in tissue repair protocols.',
    researchNotes: 'Combined research protocols often pair BPC-157 and TB-500 due to their complementary mechanisms. See individual product pages for detailed research notes.',
    coaUrl: '/coa/recovery-bundle-coa.pdf',
    tags: ['bundle', 'BPC-157', 'TB-500', 'recovery', 'popular'],
    featured: true,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}
```

- [ ] **Step 3: Create `lib/data/blog-posts.ts`**

```ts
import { BlogPost } from '@/lib/types'

export const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'bpc-157-mechanisms-tissue-repair',
    title: 'BPC-157: Mechanisms of Action in Tissue Repair Research',
    excerpt: 'A comprehensive review of the current literature on BPC-157\'s proposed mechanisms in tendon, ligament, and gut tissue repair studies.',
    content: `# BPC-157: Mechanisms of Action in Tissue Repair Research\n\nBPC-157 (Body Protection Compound-157) is a pentadecapeptide consisting of 15 amino acids...`,
    category: 'research',
    coverImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80',
    author: 'Dr. Research Team',
    publishedAt: '2026-05-20',
    readTime: 8,
  },
  {
    id: 'post-2',
    slug: 'peptide-purity-understanding-coa',
    title: 'Understanding Peptide Purity: How to Read a Certificate of Analysis',
    excerpt: 'Learn what HPLC purity percentages mean, what mass spectrometry confirms, and why third-party testing matters for research integrity.',
    content: `# Understanding Peptide Purity: How to Read a Certificate of Analysis\n\nWhen purchasing peptides for research, purity is the most critical factor...`,
    category: 'science',
    coverImage: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&q=80',
    author: 'Lab Quality Team',
    publishedAt: '2026-05-10',
    readTime: 6,
  },
  {
    id: 'post-3',
    slug: 'ipamorelin-cjc-1295-research-review',
    title: 'Ipamorelin + CJC-1295: A Review of Combined Protocol Research',
    excerpt: 'Exploring the published literature on combining selective GH secretagogues with GHRH analogues in preclinical and clinical research settings.',
    content: `# Ipamorelin + CJC-1295: A Review of Combined Protocol Research\n\nThe combination of Ipamorelin and CJC-1295 has become one of the most studied peptide stacks...`,
    category: 'performance',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    author: 'Performance Research Desk',
    publishedAt: '2026-04-28',
    readTime: 10,
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
```

- [ ] **Step 4: Commit**

```bash
git add lib/
git commit -m "feat: add TypeScript types and mock data for products, categories, and blog posts"
```

---

## Task 4: Cart Context

**Files:**
- Create: `lib/context/CartContext.tsx`

- [ ] **Step 1: Create `lib/context/CartContext.tsx`**

```tsx
'use client'

import { createContext, useContext, useState, useMemo, ReactNode } from 'react'
import { CartItem, CartState, Product } from '@/lib/types'

const CartContext = createContext<CartState | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  function addItem(product: Product, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [...prev, { product, quantity }]
    })
  }

  function removeItem(productId: string) {
    setItems((prev) => prev.filter((i) => i.product.id !== productId))
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    )
  }

  function clearCart() {
    setItems([])
  }

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  )

  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items]
  )

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartState {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/context/CartContext.tsx
git commit -m "feat: add CartContext with add/remove/update/clear operations"
```

---

## Task 5: UI Primitives

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Badge.tsx`
- Create: `components/ui/SectionHeading.tsx`
- Create: `components/ui/ComplianceBanner.tsx`

- [ ] **Step 1: Create `components/ui/Button.tsx`**

```tsx
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary: 'bg-accent text-black hover:bg-accent-hover',
      secondary: 'bg-teal text-white hover:bg-teal/80',
      ghost: 'bg-transparent text-text-secondary hover:text-white hover:bg-surface-elevated',
      outline: 'bg-transparent border border-border-subtle text-text-primary hover:border-accent hover:text-accent',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm rounded',
      md: 'px-6 py-3 text-sm rounded-md',
      lg: 'px-8 py-4 text-base rounded-md',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
```

- [ ] **Step 2: Create `lib/utils.ts`** (needed for `cn` helper)

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 3: Install clsx and tailwind-merge**

```bash
npm install clsx tailwind-merge
```

- [ ] **Step 4: Create `components/ui/Badge.tsx`**

```tsx
import { cn } from '@/lib/utils'
import { ProductCategory } from '@/lib/types'

interface BadgeProps {
  category: ProductCategory | string
  className?: string
}

const categoryStyles: Record<string, string> = {
  research: 'bg-accent/10 text-accent border-accent/20',
  cosmetic: 'bg-teal/10 text-teal border-teal/20',
  performance: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  bundle: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  science: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
}

const categoryLabels: Record<string, string> = {
  research: 'Research',
  cosmetic: 'Cosmetic',
  performance: 'Performance',
  bundle: 'Bundle',
  science: 'Science',
}

export function Badge({ category, className }: BadgeProps) {
  const style = categoryStyles[category] ?? 'bg-surface text-text-secondary border-border-subtle'
  const label = categoryLabels[category] ?? category

  return (
    <span
      className={cn(
        'inline-block px-2.5 py-0.5 text-xs font-medium border rounded uppercase tracking-wide',
        style,
        className
      )}
    >
      {label}
    </span>
  )
}
```

- [ ] **Step 5: Create `components/ui/SectionHeading.tsx`**

```tsx
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeading({ title, subtitle, centered = false, className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center', className)}>
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-text-secondary text-lg max-w-2xl">{subtitle}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 6: Create `components/ui/ComplianceBanner.tsx`**

```tsx
import { AlertTriangle } from 'lucide-react'

export function ComplianceBanner() {
  return (
    <div className="bg-surface border border-border-subtle py-2 px-4 text-center">
      <p className="text-text-muted text-xs flex items-center justify-center gap-2">
        <AlertTriangle size={12} className="text-yellow-500 flex-shrink-0" />
        For research use only. Not for human consumption. Must be 18+ to purchase.
      </p>
    </div>
  )
}
```

- [ ] **Step 7: Commit**

```bash
git add components/ui/ lib/utils.ts
git commit -m "feat: add UI primitives — Button, Badge, SectionHeading, ComplianceBanner"
```

---

## Task 6: Navbar + Footer

**Files:**
- Create: `components/layout/Navbar.tsx`
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Create `components/layout/Navbar.tsx`**

```tsx
'use client'

import Link from 'next/link'
import { ShoppingCart, User, Search, Menu, X, FlaskConical } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCart } from '@/lib/context/CartContext'
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
              <Link href="/cart" className="relative text-text-secondary hover:text-text-primary transition-colors">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
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

- [ ] **Step 2: Create `components/layout/Footer.tsx`**

```tsx
import Link from 'next/link'
import { FlaskConical, Twitter, Instagram, Youtube } from 'lucide-react'

const footerLinks = {
  Shop: [
    { href: '/products?category=research', label: 'Research Peptides' },
    { href: '/products?category=cosmetic', label: 'Cosmetic Peptides' },
    { href: '/products?category=performance', label: 'Performance Peptides' },
    { href: '/products?category=bundle', label: 'Bundles' },
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/blog', label: 'Research Blog' },
    { href: '/compliance', label: 'Compliance' },
  ],
  Support: [
    { href: '/account', label: 'My Account' },
    { href: '/cart', label: 'Cart' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border-subtle mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <FlaskConical className="text-accent" size={20} />
              <span className="text-lg font-black tracking-wider">PEPTICORE</span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Research-grade peptides with verified purity. Every batch is third-party tested and comes with a full Certificate of Analysis.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-text-muted hover:text-text-primary transition-colors"><Twitter size={18} /></a>
              <a href="#" className="text-text-muted hover:text-text-primary transition-colors"><Instagram size={18} /></a>
              <a href="#" className="text-text-muted hover:text-text-primary transition-colors"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-text-primary font-semibold text-sm uppercase tracking-widest mb-4">{group}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-text-secondary hover:text-text-primary text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border-subtle mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} PEPTICORE. All rights reserved.
          </p>
          <p className="text-text-muted text-xs text-center max-w-lg">
            All products are for research purposes only. Not for human consumption. Not intended to diagnose, treat, cure, or prevent any disease. Must be 18+ to purchase.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/layout/
git commit -m "feat: add Navbar with cart badge and mobile menu, and Footer"
```

---

## Task 7: Homepage Components

**Files:**
- Create: `components/home/HeroSection.tsx`
- Create: `components/home/CategoryGrid.tsx`
- Create: `components/home/TrustBar.tsx`
- Create: `components/home/DualAudience.tsx`
- Create: `components/home/BlogPreview.tsx`

- [ ] **Step 1: Create `components/home/HeroSection.tsx`**

```tsx
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRight, FlaskConical } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

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
            <span className="text-accent">GRADE.</span>
            <br />
            RESULTS
            <br />
            DRIVEN.
          </h1>

          <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
            Premium peptides with verified purity. Every batch independently tested and backed by a Certificate of Analysis.
          </p>

          {/* CTAs */}
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

          {/* Stats */}
          <div className="flex gap-8 mt-14 pt-8 border-t border-border-subtle">
            {[
              { value: '99%+', label: 'Average Purity' },
              { value: '3rd Party', label: 'Lab Verified' },
              { value: '50+', label: 'Peptide SKUs' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-accent">{stat.value}</p>
                <p className="text-text-muted text-xs uppercase tracking-wide mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `components/home/CategoryGrid.tsx`**

```tsx
import Link from 'next/link'
import { categories } from '@/lib/data/categories'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArrowRight } from 'lucide-react'

export function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <SectionHeading
        title="Shop by Category"
        subtitle="From molecular research to cosmetic applications — find the peptides built for your work."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className="group relative overflow-hidden rounded-xl bg-surface border border-border-subtle hover:border-accent/50 transition-all duration-300"
          >
            {/* Image */}
            <div className="h-48 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-80"
              />
            </div>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-text-primary font-bold text-lg leading-tight">{cat.name}</h3>
              <p className="text-text-muted text-xs mt-1">{cat.productCount} products</p>
              <div className="flex items-center gap-1 mt-3 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Shop now <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `components/home/TrustBar.tsx`**

```tsx
import { FlaskConical, FileCheck, Zap, ShieldCheck } from 'lucide-react'

const trustItems = [
  { icon: FlaskConical, title: '3rd Party Lab Tested', desc: 'Every batch verified by independent labs' },
  { icon: FileCheck, title: 'Certificate of Analysis', desc: 'Full COA available for every product' },
  { icon: Zap, title: 'Fast Dispatch', desc: 'Orders processed within 24 hours' },
  { icon: ShieldCheck, title: 'Secure Checkout', desc: 'SSL encrypted, multiple payment options' },
]

export function TrustBar() {
  return (
    <section className="bg-surface border-y border-border-subtle py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustItems.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <div className="bg-accent/10 rounded-lg p-2.5 flex-shrink-0">
                <item.icon size={20} className="text-accent" />
              </div>
              <div>
                <h4 className="text-text-primary font-semibold text-sm">{item.title}</h4>
                <p className="text-text-muted text-xs mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create `components/home/DualAudience.tsx`**

```tsx
import Link from 'next/link'
import { Microscope, Dumbbell, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function DualAudience() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* For Researchers */}
        <div className="relative overflow-hidden rounded-2xl bg-surface border border-border-subtle p-10 group hover:border-accent/40 transition-colors">
          <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors" />
          <Microscope size={40} className="text-accent mb-6" />
          <h3 className="text-2xl font-bold text-text-primary mb-3">For Researchers</h3>
          <p className="text-text-secondary leading-relaxed mb-6">
            Bulk quantities, full documentation, and dedicated COAs for every product. Designed to meet the standards of serious scientific research.
          </p>
          <ul className="space-y-2 mb-8">
            {['Full Certificate of Analysis', 'Bulk order discounts', 'HPLC & mass spec verified', 'Dedicated account manager'].map((item) => (
              <li key={item} className="flex items-center gap-2 text-text-secondary text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <Link href="/products?category=research">
            <Button variant="outline" className="gap-2">
              Research Catalog <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        {/* For Athletes */}
        <div className="relative overflow-hidden rounded-2xl bg-surface border border-border-subtle p-10 group hover:border-teal/40 transition-colors">
          <div className="absolute top-0 right-0 w-48 h-48 bg-teal/5 rounded-full blur-3xl group-hover:bg-teal/10 transition-colors" />
          <Dumbbell size={40} className="text-teal mb-6" />
          <h3 className="text-2xl font-bold text-text-primary mb-3">For Athletes</h3>
          <p className="text-text-secondary leading-relaxed mb-6">
            Performance and recovery peptides studied by sports scientists worldwide. Curated stacks built around the best-researched compounds.
          </p>
          <ul className="space-y-2 mb-8">
            {['Curated performance stacks', 'Recovery-focused compounds', 'Research-backed selection', 'Fast worldwide shipping'].map((item) => (
              <li key={item} className="flex items-center gap-2 text-text-secondary text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <Link href="/products?category=performance">
            <Button variant="secondary" className="gap-2">
              Performance Catalog <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create `components/home/BlogPreview.tsx`**

```tsx
import Link from 'next/link'
import { blogPosts } from '@/lib/data/blog-posts'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import { Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function BlogPreview() {
  const posts = blogPosts.slice(0, 3)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="flex items-end justify-between mb-12">
        <SectionHeading
          title="Research & Science"
          subtitle="Peer-reviewed breakdowns and protocol analysis from our research team."
          className="mb-0"
        />
        <Link href="/blog" className="hidden md:flex items-center gap-2 text-accent text-sm font-medium hover:gap-3 transition-all">
          All articles <ArrowRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group bg-surface border border-border-subtle rounded-xl overflow-hidden hover:border-accent/30 transition-all"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Badge category={post.category} />
                <span className="flex items-center gap-1 text-text-muted text-xs">
                  <Clock size={12} />
                  {post.readTime} min read
                </span>
              </div>
              <h3 className="text-text-primary font-bold leading-snug mb-2 group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex md:hidden justify-center mt-8">
        <Link href="/blog">
          <Button variant="outline">View All Articles</Button>
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add components/home/
git commit -m "feat: add all homepage section components"
```

---

## Task 8: Featured Products Component

**Files:**
- Create: `components/products/ProductCard.tsx`
- Create: `components/home/FeaturedProducts.tsx`

- [ ] **Step 1: Create `components/products/ProductCard.tsx`**

```tsx
'use client'

import Link from 'next/link'
import { ShoppingCart, CheckCircle, XCircle } from 'lucide-react'
import { Product } from '@/lib/types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/lib/context/CartContext'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <div className={cn('bg-surface border border-border-subtle rounded-xl overflow-hidden group hover:border-accent/30 transition-all duration-300 flex flex-col', className)}>
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block overflow-hidden h-52">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
        />
      </Link>

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

        {/* Footer */}
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
            onClick={() => addItem(product)}
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

- [ ] **Step 2: Create `components/home/FeaturedProducts.tsx`**

```tsx
import { getFeaturedProducts } from '@/lib/data/products'
import { ProductCard } from '@/components/products/ProductCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function FeaturedProducts() {
  const featured = getFeaturedProducts()

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <SectionHeading
        title="Featured Peptides"
        subtitle="Our most researched, highest-purity compounds — tested, verified, and ready for your protocol."
        centered
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="text-center mt-12">
        <Link href="/products">
          <Button variant="outline" size="lg">View All Products</Button>
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/products/ProductCard.tsx components/home/FeaturedProducts.tsx
git commit -m "feat: add ProductCard and FeaturedProducts components"
```

---

## Task 9: Homepage Assembly

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import { HeroSection } from '@/components/home/HeroSection'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { TrustBar } from '@/components/home/TrustBar'
import { DualAudience } from '@/components/home/DualAudience'
import { BlogPreview } from '@/components/home/BlogPreview'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <CategoryGrid />
      <FeaturedProducts />
      <DualAudience />
      <BlogPreview />
    </>
  )
}
```

- [ ] **Step 2: Verify homepage renders**

```bash
npm run dev
```

Visit http://localhost:3000 — verify: dark hero, trust bar, category grid, product cards, dual-audience section, blog preview, and footer all render without errors.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble homepage with all sections"
```

---

## Task 10: Products Listing Page

**Files:**
- Create: `components/products/FilterSidebar.tsx`
- Create: `app/products/page.tsx`

- [ ] **Step 1: Create `components/products/FilterSidebar.tsx`**

```tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ProductCategory } from '@/lib/types'

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

  function setCategory(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all') {
      params.delete('category')
    } else {
      params.set('category', value)
    }
    router.push(`/products?${params.toString()}`)
  }

  return (
    <aside className="w-full md:w-56 flex-shrink-0">
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
    </aside>
  )
}
```

- [ ] **Step 2: Create `app/products/page.tsx`**

```tsx
import { Suspense } from 'react'
import { products } from '@/lib/data/products'
import { ProductCard } from '@/components/products/ProductCard'
import { FilterSidebar } from '@/components/products/FilterSidebar'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProductCategory } from '@/lib/types'

interface ProductsPageProps {
  searchParams: { category?: string; sort?: string }
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category, sort } = searchParams

  let filtered = category && category !== 'all'
    ? products.filter((p) => p.category === (category as ProductCategory))
    : products

  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price)

  const title = category
    ? `${category.charAt(0).toUpperCase() + category.slice(1)} Peptides`
    : 'All Peptides'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading
        title={title}
        subtitle={`${filtered.length} products — all third-party lab tested with COA.`}
      />
      <div className="flex flex-col md:flex-row gap-10">
        <Suspense>
          <FilterSidebar />
        </Suspense>
        <div className="flex-1">
          {filtered.length === 0 ? (
            <p className="text-text-secondary">No products found in this category.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/products/FilterSidebar.tsx app/products/page.tsx
git commit -m "feat: add product listing page with category filter sidebar"
```

---

## Task 11: Product Detail Page

**Files:**
- Create: `components/products/ProductTabs.tsx`
- Create: `app/products/[slug]/page.tsx`

- [ ] **Step 1: Create `components/products/ProductTabs.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { Product } from '@/lib/types'
import { ExternalLink } from 'lucide-react'

interface ProductTabsProps {
  product: Product
}

type Tab = 'description' | 'research' | 'coa'

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('description')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'description', label: 'Description' },
    { id: 'research', label: 'Research Notes' },
    { id: 'coa', label: 'Certificate of Analysis' },
  ]

  return (
    <div>
      {/* Tab headers */}
      <div className="flex border-b border-border-subtle">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-accent text-accent'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-8">
        {activeTab === 'description' && (
          <p className="text-text-secondary leading-relaxed">{product.description}</p>
        )}
        {activeTab === 'research' && (
          <div>
            <p className="text-text-secondary leading-relaxed mb-4">{product.researchNotes}</p>
            <p className="text-text-muted text-sm bg-surface-elevated border border-border-subtle rounded-lg p-4">
              Note: All research notes are for informational purposes only. These statements have not been evaluated by any regulatory authority. For research use only.
            </p>
          </div>
        )}
        {activeTab === 'coa' && (
          <div>
            <p className="text-text-secondary mb-6">
              Every PEPTICORE product is independently tested by a third-party laboratory. Download the Certificate of Analysis for this batch below.
            </p>
            <a
              href={product.coaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 rounded-lg px-6 py-3 text-sm font-medium transition-colors"
            >
              <ExternalLink size={16} />
              Download COA (PDF)
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `app/products/[slug]/page.tsx`**

```tsx
import { notFound } from 'next/navigation'
import { getProductBySlug, products } from '@/lib/data/products'
import { ProductTabs } from '@/components/products/ProductTabs'
import { ProductCard } from '@/components/products/ProductCard'
import { Badge } from '@/components/ui/Badge'
import { AddToCartButton } from '@/components/products/AddToCartButton'
import { AlertTriangle, CheckCircle, XCircle, ShieldCheck } from 'lucide-react'

interface ProductDetailPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Product hero */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden bg-surface border border-border-subtle aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Badge category={product.category} />
            <span className="text-text-muted text-sm">{product.purity}% Purity (HPLC)</span>
          </div>

          <h1 className="text-4xl font-black text-text-primary mb-2">{product.name}</h1>
          <p className="text-text-secondary text-lg leading-relaxed mb-8">{product.shortDescription}</p>

          {/* Price + stock */}
          <div className="flex items-center gap-6 mb-8">
            <p className="text-4xl font-bold text-accent">${product.price.toFixed(2)}</p>
            <div className={`flex items-center gap-1.5 text-sm font-medium ${product.inStock ? 'text-green-400' : 'text-text-muted'}`}>
              {product.inStock ? <CheckCircle size={16} /> : <XCircle size={16} />}
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </div>
          </div>

          {/* Add to cart */}
          <AddToCartButton product={product} />

          {/* Trust signals */}
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

      {/* Tabs */}
      <div className="bg-surface border border-border-subtle rounded-2xl p-8 mb-16">
        <ProductTabs product={product} />
      </div>

      {/* Related products */}
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
  )
}
```

- [ ] **Step 3: Create `components/products/AddToCartButton.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import { Product } from '@/lib/types'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/lib/context/CartContext'

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex items-center gap-4">
      {/* Quantity stepper */}
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
        {added ? 'Added to Cart!' : 'Add to Cart'}
      </Button>
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add components/products/ app/products/
git commit -m "feat: add product detail page with tabs, add-to-cart, and related products"
```

---

## Task 12: Cart Page

**Files:**
- Create: `components/cart/CartItem.tsx`
- Create: `components/cart/OrderSummary.tsx`
- Create: `app/cart/page.tsx`

- [ ] **Step 1: Create `components/cart/CartItem.tsx`**

```tsx
'use client'

import { Trash2 } from 'lucide-react'
import { CartItem as CartItemType } from '@/lib/types'
import { useCart } from '@/lib/context/CartContext'

export function CartItem({ item }: { item: CartItemType }) {
  const { removeItem, updateQuantity } = useCart()

  return (
    <div className="flex items-center gap-6 py-6 border-b border-border-subtle">
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-20 h-20 object-cover rounded-lg opacity-80"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-text-primary font-semibold truncate">{item.product.name}</h3>
        <p className="text-text-muted text-sm mt-0.5">{item.product.purity}% purity</p>
        <p className="text-accent font-bold mt-1">${item.product.price.toFixed(2)}</p>
      </div>
      {/* Quantity */}
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
      {/* Total */}
      <p className="text-text-primary font-bold w-20 text-right">
        ${(item.product.price * item.quantity).toFixed(2)}
      </p>
      {/* Remove */}
      <button
        onClick={() => removeItem(item.product.id)}
        className="text-text-muted hover:text-red-400 transition-colors"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Create `components/cart/OrderSummary.tsx`**

```tsx
'use client'

import Link from 'next/link'
import { useCart } from '@/lib/context/CartContext'
import { Button } from '@/components/ui/Button'
import { ShieldCheck } from 'lucide-react'

export function OrderSummary() {
  const { totalPrice, totalItems } = useCart()
  const shipping = totalPrice > 150 ? 0 : 9.99
  const total = totalPrice + shipping

  return (
    <div className="bg-surface border border-border-subtle rounded-xl p-6 sticky top-24">
      <h3 className="text-text-primary font-bold text-lg mb-6">Order Summary</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-text-secondary">Subtotal ({totalItems} items)</span>
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
        <div className="border-t border-border-subtle pt-3 flex justify-between font-bold">
          <span className="text-text-primary">Total</span>
          <span className="text-accent text-lg">${total.toFixed(2)}</span>
        </div>
      </div>
      <Link href="/checkout" className="block mt-6">
        <Button size="lg" variant="primary" className="w-full">
          Proceed to Checkout
        </Button>
      </Link>
      <Link href="/products" className="block mt-3 text-center text-text-secondary text-sm hover:text-text-primary transition-colors">
        Continue Shopping
      </Link>
      <div className="flex items-center justify-center gap-2 mt-4 text-text-muted text-xs">
        <ShieldCheck size={13} />
        Secure checkout — SSL encrypted
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create `app/cart/page.tsx`**

```tsx
'use client'

import Link from 'next/link'
import { useCart } from '@/lib/context/CartContext'
import { CartItem } from '@/components/cart/CartItem'
import { OrderSummary } from '@/components/cart/OrderSummary'
import { Button } from '@/components/ui/Button'
import { ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const { items } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <ShoppingBag size={64} className="text-text-muted mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-text-primary mb-3">Your cart is empty</h1>
        <p className="text-text-secondary mb-8">Browse our catalog to find research-grade peptides.</p>
        <Link href="/products">
          <Button variant="primary" size="lg">Shop Peptides</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-text-primary mb-12">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add components/cart/ app/cart/
git commit -m "feat: add cart page with line items, quantity controls, and order summary"
```

---

## Task 13: Checkout Page

**Files:**
- Create: `app/checkout/page.tsx`

- [ ] **Step 1: Create `app/checkout/page.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { useCart } from '@/lib/context/CartContext'
import { Button } from '@/components/ui/Button'
import { CheckCircle } from 'lucide-react'

type Step = 'contact' | 'shipping' | 'payment' | 'review' | 'complete'

const steps: { id: Step; label: string }[] = [
  { id: 'contact', label: 'Contact' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' },
]

const stepOrder: Step[] = ['contact', 'shipping', 'payment', 'review', 'complete']

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<Step>('contact')
  const { totalPrice, items } = useCart()
  const shipping = totalPrice > 150 ? 0 : 9.99

  function nextStep() {
    const idx = stepOrder.indexOf(currentStep)
    if (idx < stepOrder.length - 1) {
      setCurrentStep(stepOrder[idx + 1])
    }
  }

  if (currentStep === 'complete') {
    return (
      <div className="max-w-lg mx-auto px-4 py-32 text-center">
        <CheckCircle size={64} className="text-green-400 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-text-primary mb-3">Order Placed!</h1>
        <p className="text-text-secondary">
          Thank you for your order. You'll receive a confirmation email shortly.
        </p>
      </div>
    )
  }

  const currentIdx = steps.findIndex((s) => s.id === currentStep)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-text-primary mb-10">Checkout</h1>

      {/* Progress bar */}
      <div className="flex items-center mb-12">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className={`flex items-center gap-2 ${idx <= currentIdx ? 'text-accent' : 'text-text-muted'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                idx < currentIdx ? 'bg-accent border-accent text-black' :
                idx === currentIdx ? 'border-accent text-accent' :
                'border-border-subtle text-text-muted'
              }`}>
                {idx < currentIdx ? '✓' : idx + 1}
              </div>
              <span className="text-sm font-medium hidden sm:block">{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-px mx-4 ${idx < currentIdx ? 'bg-accent' : 'bg-border-subtle'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form */}
        <div className="lg:col-span-2 bg-surface border border-border-subtle rounded-xl p-8">
          {currentStep === 'contact' && (
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-6">Contact & Shipping</h2>
              <div className="space-y-4">
                {['Full Name', 'Email Address', 'Phone Number', 'Street Address', 'City', 'Postcode / ZIP', 'Country'].map((field) => (
                  <div key={field}>
                    <label className="block text-text-secondary text-sm mb-1">{field}</label>
                    <input
                      type="text"
                      placeholder={field}
                      className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 'shipping' && (
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-6">Shipping Method</h2>
              <div className="space-y-3">
                {[
                  { id: 'standard', label: 'Standard Shipping', eta: '5–7 business days', price: '$9.99' },
                  { id: 'express', label: 'Express Shipping', eta: '2–3 business days', price: '$19.99' },
                  { id: 'overnight', label: 'Overnight Shipping', eta: 'Next business day', price: '$39.99' },
                ].map((option) => (
                  <label key={option.id} className="flex items-center gap-4 p-4 border border-border-subtle rounded-lg cursor-pointer hover:border-accent/50 transition-colors">
                    <input type="radio" name="shipping" value={option.id} className="accent-accent" />
                    <div className="flex-1">
                      <p className="text-text-primary font-medium text-sm">{option.label}</p>
                      <p className="text-text-muted text-xs">{option.eta}</p>
                    </div>
                    <span className="text-accent font-bold text-sm">{option.price}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentStep === 'payment' && (
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-6">Payment Details</h2>
              <div className="space-y-4">
                {['Cardholder Name', 'Card Number', 'Expiry Date (MM/YY)', 'CVV'].map((field) => (
                  <div key={field}>
                    <label className="block text-text-secondary text-sm mb-1">{field}</label>
                    <input
                      type="text"
                      placeholder={field}
                      className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 'review' && (
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-6">Review Order</h2>
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4 py-3 border-b border-border-subtle">
                  <img src={item.product.image} alt={item.product.name} className="w-14 h-14 object-cover rounded-lg opacity-80" />
                  <div className="flex-1">
                    <p className="text-text-primary text-sm font-medium">{item.product.name}</p>
                    <p className="text-text-muted text-xs">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-text-primary font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}

          <Button size="lg" variant="primary" onClick={nextStep} className="w-full mt-8">
            {currentStep === 'review' ? 'Place Order' : 'Continue'}
          </Button>
        </div>

        {/* Order summary sidebar */}
        <div className="bg-surface border border-border-subtle rounded-xl p-6 h-fit">
          <h3 className="text-text-primary font-bold mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Subtotal</span>
              <span className="text-text-primary">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Shipping</span>
              <span className="text-text-primary">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="border-t border-border-subtle pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-accent">${(totalPrice + shipping).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/checkout/
git commit -m "feat: add multi-step checkout page with contact, shipping, payment, and review steps"
```

---

## Task 14: Blog Pages

**Files:**
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Create `app/blog/page.tsx`**

```tsx
import { blogPosts } from '@/lib/data/blog-posts'
import { Badge } from '@/components/ui/Badge'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Clock } from 'lucide-react'
import Link from 'next/link'

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading
        title="Research & Science"
        subtitle="In-depth analysis of peptide research, protocols, and scientific literature."
        centered
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group bg-surface border border-border-subtle rounded-xl overflow-hidden hover:border-accent/30 transition-all"
          >
            <div className="h-52 overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Badge category={post.category} />
                <span className="flex items-center gap-1 text-text-muted text-xs">
                  <Clock size={12} />
                  {post.readTime} min read
                </span>
              </div>
              <h2 className="text-text-primary font-bold leading-snug mb-2 group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
              <p className="text-text-muted text-xs mt-4">{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `app/blog/[slug]/page.tsx`**

```tsx
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, blogPosts } from '@/lib/data/blog-posts'
import { Badge } from '@/components/ui/Badge'
import { Clock, Calendar } from 'lucide-react'

interface BlogPostPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <Badge category={post.category} />
          <span className="flex items-center gap-1 text-text-muted text-sm">
            <Clock size={14} />
            {post.readTime} min read
          </span>
          <span className="flex items-center gap-1 text-text-muted text-sm">
            <Calendar size={14} />
            {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
        <h1 className="text-4xl font-black text-text-primary leading-tight mb-4">{post.title}</h1>
        <p className="text-text-secondary text-xl leading-relaxed">{post.excerpt}</p>
        <p className="text-text-muted text-sm mt-4">By {post.author}</p>
      </div>

      {/* Cover image */}
      <div className="rounded-2xl overflow-hidden mb-12 aspect-video">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover opacity-80" />
      </div>

      {/* Body */}
      <div className="prose prose-invert prose-lg max-w-none text-text-secondary leading-relaxed">
        <p>{post.excerpt}</p>
        <p className="text-text-muted text-sm mt-8 p-4 border border-border-subtle rounded-lg bg-surface">
          This article is for informational purposes only. All content is related to scientific research. Not for human consumption. For research use only.
        </p>
      </div>
    </article>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/blog/
git commit -m "feat: add blog listing and article detail pages"
```

---

## Task 15: About, Compliance, and Account Pages

**Files:**
- Create: `app/about/page.tsx`
- Create: `app/compliance/page.tsx`
- Create: `app/account/page.tsx`

- [ ] **Step 1: Create `app/about/page.tsx`**

```tsx
import { FlaskConical, Award, Shield, Users } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'

const milestones = [
  { icon: FlaskConical, title: 'In-House Testing', desc: 'Every product undergoes internal QC before shipment.' },
  { icon: Award, title: 'Third-Party Verified', desc: 'Independent lab certification for every batch.' },
  { icon: Shield, title: 'Research Standards', desc: 'Manufactured to research-grade quality specifications.' },
  { icon: Users, title: 'Expert Team', desc: 'Biochemists and research professionals guiding our catalog.' },
]

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="max-w-3xl mb-24">
        <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-4">About PEPTICORE</p>
        <h1 className="text-5xl font-black text-text-primary leading-tight mb-6">
          Research-Grade Quality.<br />No Compromises.
        </h1>
        <p className="text-text-secondary text-xl leading-relaxed">
          PEPTICORE was founded by a team of biochemists and research professionals who were frustrated by the lack of verifiable quality in the peptide market. We set out to build the standard we wished existed.
        </p>
      </div>

      {/* Standards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
        {milestones.map((item) => (
          <div key={item.title} className="bg-surface border border-border-subtle rounded-xl p-6">
            <item.icon size={32} className="text-accent mb-4" />
            <h3 className="text-text-primary font-bold mb-2">{item.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Testing methodology */}
      <div className="bg-surface border border-border-subtle rounded-2xl p-10 mb-16">
        <SectionHeading title="Our Testing Methodology" subtitle="Every peptide we sell goes through a rigorous verification process before it reaches you." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'HPLC Analysis', desc: 'High-performance liquid chromatography verifies purity percentage for every batch.' },
            { step: '02', title: 'Mass Spectrometry', desc: 'MS confirms the exact molecular weight and identity of each compound.' },
            { step: '03', title: 'Third-Party Audit', desc: 'Independent laboratory reviews and certifies results before we issue a COA.' },
          ].map((item) => (
            <div key={item.step}>
              <p className="text-accent/40 text-5xl font-black mb-3">{item.step}</p>
              <h4 className="text-text-primary font-bold mb-2">{item.title}</h4>
              <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `app/compliance/page.tsx`**

```tsx
import { AlertTriangle, Scale, Globe, UserCheck } from 'lucide-react'

export default function CompliancePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Warning banner */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-12 flex items-start gap-4">
        <AlertTriangle size={24} className="text-yellow-500 flex-shrink-0 mt-0.5" />
        <div>
          <h2 className="text-yellow-400 font-bold text-lg mb-1">Research Use Only</h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            All products sold by PEPTICORE are intended solely for laboratory research and scientific study. They are NOT approved for human consumption, therapeutic use, or veterinary applications. Purchasers must be 18 years or older.
          </p>
        </div>
      </div>

      <h1 className="text-4xl font-black text-text-primary mb-8">Compliance & Legal</h1>

      {[
        {
          icon: AlertTriangle,
          title: 'Research Use Only Policy',
          content: `All PEPTICORE products are sold for research purposes only. By purchasing from our store, you confirm that you are a qualified researcher or are obtaining these products for lawful scientific research. These products have not been evaluated by the FDA or equivalent regulatory bodies. They are not intended to diagnose, treat, cure, or prevent any disease or condition.`,
        },
        {
          icon: UserCheck,
          title: 'Age Verification',
          content: `You must be 18 years of age or older to purchase from PEPTICORE. By completing a purchase, you confirm you are of legal age in your jurisdiction.`,
        },
        {
          icon: Globe,
          title: 'Jurisdictional Restrictions',
          content: `It is your responsibility to understand the laws governing peptide research compounds in your jurisdiction. PEPTICORE does not ship to countries or regions where these products are prohibited. We reserve the right to cancel orders to restricted regions.`,
        },
        {
          icon: Scale,
          title: 'Terms of Sale',
          content: `By purchasing from PEPTICORE, you agree that products are for research purposes only. You agree to use products in compliance with all applicable laws. PEPTICORE assumes no liability for misuse of products. All sales are final for opened peptide vials due to the nature of the product.`,
        },
      ].map((section) => (
        <div key={section.title} className="bg-surface border border-border-subtle rounded-xl p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <section.icon size={20} className="text-accent" />
            <h3 className="text-text-primary font-bold text-lg">{section.title}</h3>
          </div>
          <p className="text-text-secondary leading-relaxed">{section.content}</p>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Create `app/account/page.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { User, Package } from 'lucide-react'

type AccountTab = 'login' | 'register'

export default function AccountPage() {
  const [tab, setTab] = useState<AccountTab>('login')

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-10">
        <User size={48} className="text-accent mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-text-primary">My Account</h1>
      </div>

      {/* Tabs */}
      <div className="flex bg-surface border border-border-subtle rounded-xl overflow-hidden mb-8">
        {(['login', 'register'] as AccountTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-semibold transition-colors capitalize ${
              tab === t ? 'bg-accent text-black' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {t === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="bg-surface border border-border-subtle rounded-xl p-8">
        <div className="space-y-4">
          {tab === 'register' && (
            <div>
              <label className="block text-text-secondary text-sm mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          )}
          <div>
            <label className="block text-text-secondary text-sm mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-surface-elevated border border-border-subtle rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          {tab === 'register' && (
            <p className="text-text-muted text-xs">
              By creating an account you confirm you are 18+ and agree to purchase products for research purposes only.
            </p>
          )}
          <Button size="lg" variant="primary" className="w-full mt-2">
            {tab === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </div>
      </div>

      {/* Order history placeholder */}
      <div className="mt-12">
        <div className="flex items-center gap-2 mb-4">
          <Package size={20} className="text-text-muted" />
          <h2 className="text-text-primary font-bold">Order History</h2>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-8 text-center">
          <p className="text-text-muted text-sm">Sign in to view your order history.</p>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add app/about/ app/compliance/ app/account/
git commit -m "feat: add About, Compliance, and Account pages"
```

---

## Task 16: Final Build Verification

**Files:** none (verification only)

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build completes successfully with no TypeScript or Next.js errors.

- [ ] **Step 2: Fix any build errors**

Common issues to watch for:
- Missing `'use client'` on components that use hooks (`useState`, `useRouter`, `useSearchParams`, `useCart`)
- `useSearchParams()` requires a `<Suspense>` boundary — already wrapped in `app/products/page.tsx`
- Any component importing `useCart` must be a client component

- [ ] **Step 3: Run dev server and smoke test all routes**

```bash
npm run dev
```

Verify each route loads without a white screen or console errors:
- `/` — homepage
- `/products` — product listing
- `/products/bpc-157` — product detail
- `/cart` — cart (add a product from `/products/bpc-157` first)
- `/checkout` — checkout flow
- `/blog` — blog listing
- `/blog/bpc-157-mechanisms-tissue-repair` — blog article
- `/about` — about page
- `/compliance` — compliance page
- `/account` — account page

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete PEPTICORE e-commerce website — all pages and components"
```

---

## Summary

| Task | Deliverable |
|------|-------------|
| 1 | Next.js project scaffolded with PEPTICORE Tailwind theme |
| 2 | TypeScript types for all data models |
| 3 | Mock data for products, categories, and blog posts |
| 4 | Cart context with add/remove/update/clear |
| 5 | UI primitives: Button, Badge, SectionHeading, ComplianceBanner |
| 6 | Navbar (sticky, mobile, cart badge) + Footer |
| 7 | All homepage section components |
| 8 | ProductCard + FeaturedProducts |
| 9 | Homepage assembled |
| 10 | Products listing with filter sidebar |
| 11 | Product detail with tabs + AddToCartButton |
| 12 | Cart page with line items and order summary |
| 13 | Multi-step checkout page |
| 14 | Blog listing + article detail |
| 15 | About, Compliance, and Account pages |
| 16 | Build verification + smoke test |
