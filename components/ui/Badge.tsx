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
