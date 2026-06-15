# PEPTICORE Video & Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a looping hero video background, a product lab video section, scroll-triggered entrance animations on all homepage sections, and page fade transitions.

**Architecture:** Framer Motion handles both scroll animations (via `whileInView` on a reusable `AnimateIn` client component) and page transitions (via `template.tsx`). Free Mixkit.co MP4 stock videos are embedded directly with `<video autoPlay muted loop playsInline>`. Server components can render the `AnimateIn` client component directly without becoming client components themselves — this is the correct Next.js App Router boundary pattern.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS, Framer Motion

---

## File Map

| File | Action |
|------|--------|
| `package.json` | Add `framer-motion` dependency |
| `components/home/HeroSection.tsx` | Replace static background div with `<video>` element |
| `components/ui/AnimateIn.tsx` | Create reusable scroll-triggered animation wrapper |
| `components/home/CategoryGrid.tsx` | Wrap each category card in `<AnimateIn>` |
| `components/home/TrustBar.tsx` | Wrap each trust item in `<AnimateIn>` |
| `components/home/DualAudience.tsx` | Wrap left column (direction left) and right column (direction right) |
| `components/home/FeaturedProducts.tsx` | Wrap each product card in `<AnimateIn>` |
| `components/home/Testimonials.tsx` | Wrap each testimonial card in `<AnimateIn>` |
| `components/home/BlogPreview.tsx` | Wrap each blog card in `<AnimateIn>` |
| `app/template.tsx` | Create page transition wrapper |
| `components/products/LabVideoSection.tsx` | Create lab video section component |
| `app/products/[slug]/page.tsx` | Insert `<LabVideoSection />` between tabs and related products |

---

## Task 1: Install Framer Motion

**Files:**
- Modify: `package.json` (via npm install)

- [ ] **Step 1: Install the package**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm install framer-motion
```

Expected output: `added 1 package` (or similar, framer-motion installs as a single package)

- [ ] **Step 2: Build check**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm run build 2>&1 | tail -5
```

Expected: Clean build, no errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/saim/Downloads/PEPTIDES && git add package.json package-lock.json && git commit -m "chore: install framer-motion for animations"
```

---

## Task 2: Hero Video Background

**Files:**
- Modify: `components/home/HeroSection.tsx`

- [ ] **Step 1: Find a working free lab stock video URL**

Use WebFetch to verify this Mixkit CDN URL returns a valid response (not 404):

```
https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-scientist-in-laboratory-4020-large.mp4
```

If that URL returns 404, use WebSearch with query: `mixkit laboratory science stock video filetype:mp4 site:assets.mixkit.co`
and pick any working `.mp4` URL from the results.

Also find a second URL for the lab section video (a different clip, e.g. laboratory equipment/analysis):
Try: `https://assets.mixkit.co/videos/preview/mixkit-scientist-working-in-laboratory-4021-large.mp4`

Save both working URLs — you'll need them in Tasks 2 and 6.

- [ ] **Step 2: Read the current HeroSection**

Read `/Users/saim/Downloads/PEPTIDES/components/home/HeroSection.tsx` to see the existing structure.

- [ ] **Step 3: Replace static background with video**

In `HeroSection()`, replace this block:

```tsx
{/* Animated gradient background */}
<div
  className="absolute inset-0 bg-cover bg-center"
  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1920&q=80')` }}
/>
```

With:

```tsx
{/* Video background */}
<video
  autoPlay
  muted
  loop
  playsInline
  poster="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1920&q=80"
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="HERO_VIDEO_URL" type="video/mp4" />
</video>
```

Replace `HERO_VIDEO_URL` with the working Mixkit MP4 URL found in Step 1.

Keep all other elements unchanged (gradient overlays, particles, headline, stats).

The complete modified `HeroSection()` return block should look like:

```tsx
export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1920&q=80"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="HERO_VIDEO_URL" type="video/mp4" />
      </video>

      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 opacity-70"
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
cd /Users/saim/Downloads/PEPTIDES && git add components/home/HeroSection.tsx && git commit -m "feat: replace hero static image with looping video background"
```

---

## Task 3: AnimateIn Reusable Component

**Files:**
- Create: `components/ui/AnimateIn.tsx`

- [ ] **Step 1: Create `components/ui/AnimateIn.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimateInProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
  className?: string
}

export function AnimateIn({ children, delay = 0, direction = 'up', className }: AnimateInProps) {
  const initial = {
    opacity: 0,
    y: direction === 'up' ? 24 : 0,
    x: direction === 'left' ? -32 : direction === 'right' ? 32 : 0,
  }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Build check**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm run build 2>&1 | tail -5
```

Expected: Clean build.

- [ ] **Step 3: Commit**

```bash
cd /Users/saim/Downloads/PEPTIDES && git add components/ui/AnimateIn.tsx && git commit -m "feat: add AnimateIn reusable scroll-trigger animation component"
```

---

## Task 4: Scroll Animations on Homepage Sections

**Files:**
- Modify: `components/home/CategoryGrid.tsx`
- Modify: `components/home/TrustBar.tsx`
- Modify: `components/home/DualAudience.tsx`
- Modify: `components/home/FeaturedProducts.tsx`
- Modify: `components/home/Testimonials.tsx`
- Modify: `components/home/BlogPreview.tsx`

Read each file before modifying. The pattern for every section is the same: import `AnimateIn` and wrap each repeating card/item with `<AnimateIn delay={index * 0.1}>`. The parent `<section>` itself does NOT get wrapped — only the individual cards.

- [ ] **Step 1: Read all 6 files**

```bash
cat /Users/saim/Downloads/PEPTIDES/components/home/CategoryGrid.tsx
cat /Users/saim/Downloads/PEPTIDES/components/home/TrustBar.tsx
cat /Users/saim/Downloads/PEPTIDES/components/home/DualAudience.tsx
cat /Users/saim/Downloads/PEPTIDES/components/home/FeaturedProducts.tsx
cat /Users/saim/Downloads/PEPTIDES/components/home/Testimonials.tsx
cat /Users/saim/Downloads/PEPTIDES/components/home/BlogPreview.tsx
```

- [ ] **Step 2: Update `components/home/CategoryGrid.tsx`**

Add `import { AnimateIn } from '@/components/ui/AnimateIn'` at the top.

Wrap each `<Link>` card in the grid with `<AnimateIn delay={i * 0.1}>`. Use the index from `.map()`:

```tsx
import Link from 'next/link'
import { categories } from '@/lib/data/categories'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArrowRight } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <SectionHeading
        title="Shop by Category"
        subtitle="From molecular research to cosmetic applications — find the peptides built for your work."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <AnimateIn key={cat.id} delay={i * 0.1}>
            <Link
              href={`/products?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-xl bg-surface border border-border-subtle hover:border-accent/50 transition-all duration-300 block"
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
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}
```

Note: Added `block` class to the `<Link>` since `AnimateIn` wraps it in a `div` — the link needs to be block-level to fill the grid cell.

- [ ] **Step 3: Update `components/home/TrustBar.tsx`**

```tsx
import { FlaskConical, FileCheck, Zap, ShieldCheck } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'

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
          {trustItems.map((item, i) => (
            <AnimateIn key={item.title} delay={i * 0.08}>
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 rounded-lg p-2.5 flex-shrink-0">
                  <item.icon size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="text-text-primary font-semibold text-sm">{item.title}</h4>
                  <p className="text-text-muted text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Update `components/home/DualAudience.tsx`**

Read the file fully. Add `AnimateIn` import. Wrap the left card with `direction="left"` and the right card with `direction="right"`:

```tsx
import Link from 'next/link'
import { Microscope, Dumbbell, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function DualAudience() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimateIn direction="left">
          {/* For Researchers card — paste exact existing JSX here */}
          <div className="relative overflow-hidden rounded-2xl bg-surface border border-border-subtle p-10 group hover:border-accent/40 transition-colors">
            {/* ... keep all existing content exactly as-is ... */}
          </div>
        </AnimateIn>
        <AnimateIn direction="right" delay={0.1}>
          {/* For Athletes card — paste exact existing JSX here */}
          <div className="relative overflow-hidden rounded-2xl bg-surface border border-border-subtle p-10 group hover:border-teal/40 transition-colors">
            {/* ... keep all existing content exactly as-is ... */}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
```

IMPORTANT: Read the full current DualAudience.tsx first. Keep all existing content inside each card exactly as-is. Only wrap the two card divs with `<AnimateIn>`.

- [ ] **Step 5: Update `components/home/FeaturedProducts.tsx`**

Add `AnimateIn` import. Wrap each `<ProductCard>` with `<AnimateIn delay={i * 0.1}>`. Also wrap the "View All" button with `<AnimateIn delay={0.3}>`:

```tsx
import { getFeaturedProducts } from '@/lib/data/products'
import { ProductCard } from '@/components/products/ProductCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { AnimateIn } from '@/components/ui/AnimateIn'

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
        {featured.map((product, i) => (
          <AnimateIn key={product.id} delay={i * 0.1}>
            <ProductCard product={product} />
          </AnimateIn>
        ))}
      </div>
      <div className="text-center mt-12">
        <AnimateIn delay={0.3}>
          <Link href="/products">
            <Button variant="outline" size="lg">View All Products</Button>
          </Link>
        </AnimateIn>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Update `components/home/Testimonials.tsx`**

Add `AnimateIn` import. Wrap each testimonial card:

```tsx
import { Star } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AnimateIn } from '@/components/ui/AnimateIn'

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
        {testimonials.map((t, i) => (
          <AnimateIn key={t.id} delay={i * 0.1}>
            <div className="bg-surface border border-border-subtle border-t-2 border-t-accent rounded-xl p-8 flex flex-col gap-4 h-full">
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-text-secondary text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
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
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}
```

Note: Added `h-full` to the inner card div so cards stretch to equal height within the AnimateIn wrapper div.

- [ ] **Step 7: Update `components/home/BlogPreview.tsx`**

Read the full file. Add `AnimateIn` import. Wrap each blog post `<Link>` card in the grid:

In the `.map()` over `posts`, change:
```tsx
{posts.map((post) => (
  <Link key={post.id} href={...} className="group ...">
    ...
  </Link>
))}
```

To:
```tsx
{posts.map((post, i) => (
  <AnimateIn key={post.id} delay={i * 0.1}>
    <Link href={...} className="group ... block">
      ...
    </Link>
  </AnimateIn>
))}
```

Add `block` to the Link's className (same reason as CategoryGrid — AnimateIn wraps in a div).

- [ ] **Step 8: Build check**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm run build 2>&1 | tail -10
```

Expected: Clean build.

- [ ] **Step 9: Commit**

```bash
cd /Users/saim/Downloads/PEPTIDES && git add components/home/CategoryGrid.tsx components/home/TrustBar.tsx components/home/DualAudience.tsx components/home/FeaturedProducts.tsx components/home/Testimonials.tsx components/home/BlogPreview.tsx && git commit -m "feat: add scroll-triggered entrance animations to all homepage sections"
```

---

## Task 5: Page Transitions

**Files:**
- Create: `app/template.tsx`

- [ ] **Step 1: Create `app/template.tsx`**

In Next.js App Router, `template.tsx` (unlike `layout.tsx`) re-mounts on every navigation, making it the correct place for page transition animations. `AnimatePresence` is NOT needed here — Next.js handles unmounting; `motion.div` with `initial`/`animate` on the entering page is sufficient for a clean fade-in effect.

```tsx
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Build check**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm run build 2>&1 | tail -5
```

Expected: Clean build.

- [ ] **Step 3: Commit**

```bash
cd /Users/saim/Downloads/PEPTIDES && git add app/template.tsx && git commit -m "feat: add page transition fade animation via template.tsx"
```

---

## Task 6: Lab Video Section on Product Pages

**Files:**
- Create: `components/products/LabVideoSection.tsx`
- Modify: `app/products/[slug]/page.tsx`

- [ ] **Step 1: Confirm the lab video URL**

Use the second Mixkit URL found in Task 2 Step 1. If not saved, find one now with WebSearch.

- [ ] **Step 2: Create `components/products/LabVideoSection.tsx`**

```tsx
const LAB_VIDEO_URL = 'LAB_VIDEO_URL_HERE'

export function LabVideoSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Lab-Verified Process</h2>
        <p className="text-text-secondary">
          Every batch undergoes rigorous HPLC and mass spectrometry analysis before dispatch.
        </p>
      </div>
      <div className="aspect-video rounded-2xl overflow-hidden border border-border-subtle shadow-lg shadow-accent/5">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={LAB_VIDEO_URL} type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
```

Replace `LAB_VIDEO_URL_HERE` with the actual URL.

- [ ] **Step 3: Read `app/products/[slug]/page.tsx`**

```bash
cat "/Users/saim/Downloads/PEPTIDES/app/products/[slug]/page.tsx"
```

- [ ] **Step 4: Update `app/products/[slug]/page.tsx`**

Add `import { LabVideoSection } from '@/components/products/LabVideoSection'` at the top.

Insert `<LabVideoSection />` between the tabs section and the related products section. Find the block that ends `</div> {/* Tabs */}` and insert before the related products block:

```tsx
{/* Tabs */}
<div className="bg-surface border border-border-subtle rounded-2xl p-8 mb-16">
  <ProductTabs product={product} />
</div>

{/* Lab video */}
<LabVideoSection />

{/* Related products */}
{related.length > 0 && (
  ...
)}
```

- [ ] **Step 5: Build check**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm run build 2>&1 | tail -10
```

Expected: Clean build, all 8 product static pages generated.

- [ ] **Step 6: Commit**

```bash
cd /Users/saim/Downloads/PEPTIDES && git add components/products/LabVideoSection.tsx "app/products/[slug]/page.tsx" && git commit -m "feat: add lab video section to product detail pages"
```

---

## Task 7: Final Verification + Push to GitHub

- [ ] **Step 1: Full build**

```bash
cd /Users/saim/Downloads/PEPTIDES && npm run build 2>&1
```

Expected: 21+ routes generated, 0 TypeScript errors.

- [ ] **Step 2: Fix any issues**

Common issues:
- Framer Motion `motion` import: use `import { motion } from 'framer-motion'` — not a default import
- `AnimateIn` wrapping a `<Link>` makes the grid cell a `<div>` — add `block` to the Link className if height/layout breaks
- TypeScript complaining about `autoPlay` on `<video>`: use `autoPlay` (camelCase, no value needed) — this is correct React JSX
- Server component importing client component: valid in App Router, no fix needed

- [ ] **Step 3: Push to GitHub**

```bash
cd /Users/saim/Downloads/PEPTIDES && git push origin main
```

Expected: All commits pushed to https://github.com/SaimAbbasi/PEPTIDES

---

## Summary

| Task | Deliverable |
|------|-------------|
| 1 | Framer Motion installed |
| 2 | Hero video background (looping lab footage replaces static image) |
| 3 | `AnimateIn` reusable component |
| 4 | Scroll animations on 6 homepage sections |
| 5 | Page fade transitions via `template.tsx` |
| 6 | Lab video section on all product detail pages |
| 7 | Final build + push to GitHub |
