'use client'

import { useEffect, useRef, useState } from 'react'
import { ShoppingCart } from '@phosphor-icons/react'
import { Product } from '@/lib/types'
import { useCart } from '@/lib/context/CartContext'
import { useToast } from '@/lib/context/ToastContext'
import { useCartDrawer } from '@/lib/context/CartDrawerContext'
import { Button } from '@/components/ui/Button'

interface StickyAddToCartProps {
  product: Product
  addToCartRef: React.RefObject<HTMLDivElement | null>
}

export function StickyAddToCart({ product, addToCartRef }: StickyAddToCartProps) {
  const { addItem } = useCart()
  const { addToast } = useToast()
  const { openDrawer } = useCartDrawer()
  const [visible, setVisible] = useState(false)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    if (!addToCartRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(addToCartRef.current)
    return () => observer.disconnect()
  }, [addToCartRef])

  function handleAdd() {
    addItem(product, qty)
    addToast({ productName: product.name, productImage: product.image })
    openDrawer()
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t border-border-subtle hidden md:flex transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4 flex items-center justify-between gap-8">
        {/* Product info */}
        <div className="flex items-center gap-4 min-w-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 rounded-lg object-cover opacity-80 flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="text-text-primary font-bold truncate">{product.name}</p>
            <p className="text-accent font-bold">${product.price.toFixed(2)}</p>
          </div>
        </div>

        {/* Quantity + CTA */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="flex items-center border border-border-subtle rounded-md overflow-hidden">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-9 h-9 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors text-sm"
            >
              −
            </button>
            <span className="w-9 h-9 flex items-center justify-center text-text-primary font-medium text-sm">
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-9 h-9 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors text-sm"
            >
              +
            </button>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={handleAdd}
            disabled={!product.inStock}
            className="gap-2"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
