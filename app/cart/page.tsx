'use client'

import Link from 'next/link'
import { useCart } from '@/lib/context/CartContext'
import { CartItem } from '@/components/cart/CartItem'
import { OrderSummary } from '@/components/cart/OrderSummary'
import { Button } from '@/components/ui/Button'
import { ShoppingBag } from '@phosphor-icons/react'

export default function CartPage() {
  const { items } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <ShoppingBag size={64} className="text-text-muted mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-text-primary mb-3">Your cart is empty</h1>
        <p className="text-text-secondary mb-8">Browse our catalog to find research-grade peptides.</p>
        <Link href="/products">
          <Button variant="primary" size="lg">Shop Peptides</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-text-primary mb-12">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}
