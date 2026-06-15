import { Star } from '@phosphor-icons/react/ssr'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AnimateIn } from '@/components/ui/AnimateIn'

const testimonials = [
  {
    id: 1,
    name: 'Dr. Marcus Chen',
    role: 'Research Biochemist',
    stars: 5,
    quote: 'The purity levels are consistently above what\'s advertised. COA matches every time. That\'s rare in this space.',
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
          <div
            className="bg-surface border border-border-subtle border-t-2 border-t-accent rounded-xl p-8 flex flex-col gap-4 h-full"
          >
            {/* Stars */}
            <div className="flex gap-1">
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star key={i} size={16} weight="fill" className="text-yellow-400" />
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
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}
