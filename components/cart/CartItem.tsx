'use client'

import { Trash } from '@phosphor-icons/react'
import { CartItem as CartItemType } from '@/lib/types'
import { useCart } from '@/lib/context/CartContext'

export function CartItem({ item }: { item: CartItemType }) {
  const { removeItem, updateQuantity } = useCart()

  return (
    <div className="flex items-center gap-6 py-6 border-b border-border-subtle">
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-20 h-20 object-cover rounded-lg opacity-80"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-text-primary font-semibold truncate">{item.product.name}</h3>
        <p className="text-text-muted text-sm mt-0.5">{item.product.purity}% purity</p>
        <p className="text-accent font-bold mt-1">${item.product.price.toFixed(2)}</p>
      </div>
      {/* Quantity */}
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
      {/* Total */}
      <p className="text-text-primary font-bold w-20 text-right">
        ${(item.product.price * item.quantity).toFixed(2)}
      </p>
      {/* Remove */}
      <button
        onClick={() => removeItem(item.product.id)}
        className="text-text-muted hover:text-red-400 transition-colors"
      >
        <Trash size={16} />
      </button>
    </div>
  )
}
