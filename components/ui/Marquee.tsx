'use client'

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
