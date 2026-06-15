# PEPTICORE Video & Animations — Design Spec
Date: 2026-06-15

## Overview

Four enhancements to make PEPTICORE feel cinematic and premium: a hero video background, a lab video section on product pages, scroll-triggered entrance animations across all homepage sections, and smooth page transitions — all powered by Framer Motion.

---

## Tech Stack Addition

- **Framer Motion** (`npm install framer-motion`) — React animation library, ~35kb gzipped
- All existing stack unchanged: Next.js 16 App Router, TypeScript, Tailwind CSS

---

## Enhancement 1: Hero Video Background

**File:** `components/home/HeroSection.tsx`

- Add a `<video>` element as the first child of the hero `<section>`
- Attributes: `autoPlay muted loop playsInline`
- Styles: `position: absolute, inset: 0, width: 100%, height: 100%, objectFit: cover`
- Source: a free lab/science stock video from Coverr.co or Mixkit.co (direct CDN MP4 URL, no auth required)
  - Selected during implementation — criteria: dark-toned lab footage, 1080p, loop-friendly
- `poster` attribute: the existing Unsplash image URL as fallback while video loads
- All existing layers (gradient overlay, particles, shimmer headline, stat counters) remain unchanged on top of the video
- The dark gradient overlays already suppress the background sufficiently — no new overlay needed

---

## Enhancement 2: Product Page Lab Video Section

**Files:**
- Create: `components/products/LabVideoSection.tsx`
- Modify: `app/products/[slug]/page.tsx`

### LabVideoSection component

- Server component (no hooks, no interactivity needed)
- Layout: full-width section with max-width container, `py-16`
- Heading: `"Lab-Verified Process"` (uses existing `SectionHeading` component or inline heading)
- Subtitle: `"Every batch undergoes rigorous HPLC and mass spectrometry analysis before dispatch."`
- Video element: `autoPlay muted loop playsInline`
  - 16:9 aspect ratio wrapper (`aspect-video`)
  - `rounded-2xl overflow-hidden border border-border-subtle`
  - Subtle outer glow: `shadow-lg shadow-accent/5`
  - No browser controls (`controls` attribute omitted)
- Same video source URL as hero (or a different lab clip — decided during implementation)
- `objectFit: cover` on the video

### Placement in product page

- Inserted between `<ProductTabs>` and the related products grid
- Wrapped in the same `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` container pattern

---

## Enhancement 3: Scroll-Triggered Animations

**Files:**
- Create: `components/ui/AnimateIn.tsx`
- Modify: `components/home/CategoryGrid.tsx`
- Modify: `components/home/FeaturedProducts.tsx`
- Modify: `components/home/TrustBar.tsx`
- Modify: `components/home/DualAudience.tsx`
- Modify: `components/home/Testimonials.tsx`
- Modify: `components/home/BlogPreview.tsx`

### AnimateIn component

```tsx
'use client'
// Props: children, delay (default 0), direction (default 'up')
// Uses motion.div with whileInView, viewport once: true, amount: 0.1
// Default animation: opacity 0→1, y 20→0 (or x ±30→0 for left/right)
// Duration: 0.5s, ease: easeOut
```

Interface:
```ts
interface AnimateInProps {
  children: React.ReactNode
  delay?: number          // seconds, default 0
  direction?: 'up' | 'left' | 'right'  // default 'up'
  className?: string
}
```

### Per-section application

| Section | Animation pattern |
|---------|-------------------|
| `CategoryGrid` | 4 cards, stagger 0.1s apart, direction: up |
| `FeaturedProducts` | product cards, stagger 0.1s apart, direction: up |
| `TrustBar` | 4 icons, stagger 0.08s apart, direction: up |
| `DualAudience` | left column: direction left, right column: direction right |
| `Testimonials` | 3 cards, stagger 0.1s apart, direction: up |
| `BlogPreview` | 3 cards, stagger 0.1s apart, direction: up |

Each section component that is currently a server component must have `'use client'` added if it uses Framer Motion hooks. Because `AnimateIn` is a client component, any server component that renders it must either be converted to `'use client'` or the `AnimateIn` component must handle the client boundary internally.

**Approach:** Mark `AnimateIn` as `'use client'`. Server components can import and render client components directly in Next.js App Router without becoming client components themselves — this is the correct boundary. No section component needs `'use client'` added.

---

## Enhancement 4: Page Transitions

**File:** `app/template.tsx` (new file)

- `template.tsx` in Next.js App Router re-mounts on every navigation, making it the correct location for page transitions (unlike `layout.tsx` which persists)
- Wraps `children` in `AnimatePresence` (mode: `"wait"`) + `motion.div`
- Enter animation: `opacity: 0 → 1`, `y: 8 → 0`, duration 0.3s, ease easeOut
- Exit animation: `opacity: 1 → 0`, duration 0.15s — fast exit feels snappy
- Must be a `'use client'` component

```tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

---

## Architecture Notes

- **No server component pollution:** `AnimateIn` handles its own `'use client'` boundary. Server components can render it without becoming client components.
- **`template.tsx` vs `layout.tsx`:** Only `template.tsx` re-mounts on navigation. Using `layout.tsx` would break page transitions.
- **Video autoplay:** Modern browsers allow `autoPlay` only when `muted` is set. Both attributes are required.
- **Performance:** Videos are loaded lazily by the browser. The `poster` image shows instantly while the video buffers.
- **Framer Motion tree-shaking:** Only `motion`, `AnimatePresence` are imported — no full bundle import.

---

## Out of Scope

- Per-product custom videos
- Lottie animations
- 3D/WebGL effects
- Video upload/CMS integration
- Parallax scroll effects (beyond simple translate)
- Sound or interactive video controls
