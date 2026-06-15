'use client'

import { Trash } from '@phosphor-icons/react'
import { CartItem as CartItemType } from '@/lib/types'
import { useCart } from '@/lib/context/CartContext'

export function CartItem({ item }: { item: CartItemType }) {
  const { removeItem, updateQuantity } = useCart()

  return (
    <div className="py-5 border-b border-border-subtle">
      {/* Row 1: image + info */}
      <div className="flex items-start gap-4 mb-3">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg opacity-80 flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-text-primary font-semibold truncate">{item.product.name}</h3>
          <p className="text-text-muted text-sm mt-0.5">{item.product.purity}% purity</p>
          <p className="text-accent font-bold mt-1">${item.product.price.toFixed(2)}</p>
        </div>
        {/* Remove button — top right on mobile */}
        <button
          onClick={() => removeItem(item.product.id)}
          className="text-text-muted hover:text-red-400 transition-colors flex-shrink-0 sm:hidden"
        >
          <Trash size={16} />
        </button>
      </div>

      {/* Row 2: qty stepper + total + remove (desktop) */}
      <div className="flex items-center justify-between pl-20 sm:pl-24">
        <div className="flex items-center border border-border-subtle rounded-md overflow-hidden">
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors text-sm"
          >
            −
          </button>
          <span className="w-8 h-8 flex items-center justify-center text-text-primary text-sm">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors text-sm"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-text-primary font-bold">
            ${(item.product.price * item.quantity).toFixed(2)}
          </p>
          {/* Remove button — desktop only */}
          <button
            onClick={() => removeItem(item.product.id)}
            className="text-text-muted hover:text-red-400 transition-colors hidden sm:block"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
