import Link from 'next/link'
import { categories } from '@/lib/data/categories'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArrowRight } from '@phosphor-icons/react'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <SectionHeading
        title="Shop by Category"
        subtitle="From molecular research to cosmetic applications. Find the peptides built for your work."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <AnimateIn key={cat.id} delay={i * 0.1}>
          <Link
            href={`/products?category=${cat.slug}`}
            className="block group relative overflow-hidden rounded-xl bg-surface border border-border-subtle hover:border-accent/50 transition-all duration-300"
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
