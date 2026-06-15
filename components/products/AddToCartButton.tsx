'use client'

import { useState } from 'react'
import { ShoppingCart, Check } from '@phosphor-icons/react'
import { Product } from '@/lib/types'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/lib/context/CartContext'
import { useToast } from '@/lib/context/ToastContext'
import { useCartDrawer } from '@/lib/context/CartDrawerContext'

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { addToast } = useToast()
  const { openDrawer } = useCartDrawer()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem(product, qty)
    addToast({ productName: product.name, productImage: product.image })
    openDrawer()
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border border-border-subtle rounded-md overflow-hidden">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="w-10 h-11 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
        >
          −
        </button>
        <span className="w-10 h-11 flex items-center justify-center text-text-primary font-medium text-sm">
          {qty}
        </span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="w-10 h-11 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
        >
          +
        </button>
      </div>

      <Button
        size="lg"
        variant={added ? 'secondary' : 'primary'}
        onClick={handleAdd}
        disabled={!product.inStock}
        className="flex-1 gap-2 transition-all"
      >
        {added ? <Check size={18} /> : <ShoppingCart size={18} />}
        {added ? 'Added!' : 'Add to Cart'}
      </Button>
    </div>
  )
}
