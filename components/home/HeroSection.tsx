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
