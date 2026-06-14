'use client'

import { useEffect, useRef } from 'react'
import { Product } from '@/lib/types'
import { StickyAddToCart } from '@/components/products/StickyAddToCart'

export function StickyAddToCartWrapper({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    ref.current = document.getElementById('add-to-cart-anchor') as HTMLDivElement | null
  }, [])

  return <StickyAddToCart product={product} addToCartRef={ref} />
}
