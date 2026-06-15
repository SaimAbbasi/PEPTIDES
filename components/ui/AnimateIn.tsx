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
