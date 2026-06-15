import Link from 'next/link'
import { Microscope, Barbell, ArrowRight } from '@phosphor-icons/react/ssr'
import { Button } from '@/components/ui/Button'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function DualAudience() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* For Researchers */}
        <AnimateIn direction="left">
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
        </AnimateIn>

        {/* For Athletes */}
        <AnimateIn direction="right" delay={0.1}>
        <div className="relative overflow-hidden rounded-2xl bg-surface border border-border-subtle p-10 group hover:border-teal/40 transition-colors">
          <div className="absolute top-0 right-0 w-48 h-48 bg-teal/5 rounded-full blur-3xl group-hover:bg-teal/10 transition-colors" />
          <Barbell size={40} className="text-teal mb-6" />
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
        </AnimateIn>
      </div>
    </section>
  )
}
