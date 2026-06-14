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
