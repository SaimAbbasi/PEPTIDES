'use client'

import Link from 'next/link'
import { useCart } from '@/lib/context/CartContext'
import { Button } from '@/components/ui/Button'
import { ShieldCheck } from '@phosphor-icons/react'

export function OrderSummary() {
  const { totalPrice, totalItems } = useCart()
  const shipping = totalPrice > 150 ? 0 : 9.99
  const total = totalPrice + shipping

  return (
    <div className="bg-surface border border-border-subtle rounded-xl p-6 sticky top-24">
      <h3 className="text-text-primary font-bold text-lg mb-6">Order Summary</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-text-secondary">Subtotal ({totalItems} items)</span>
          <span className="text-text-primary">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Shipping</span>
          <span className={shipping === 0 ? 'text-green-400 font-medium' : 'text-text-primary'}>
            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        {shipping > 0 && (
          <p className="text-text-muted text-xs">Free shipping on orders over $150</p>
        )}
        <div className="border-t border-border-subtle pt-3 flex justify-between font-bold">
          <span className="text-text-primary">Total</span>
          <span className="text-accent text-lg">${total.toFixed(2)}</span>
        </div>
      </div>
      <Link href="/checkout" className="block mt-6">
        <Button size="lg" variant="primary" className="w-full">
          Proceed to Checkout
        </Button>
      </Link>
      <Link href="/products" className="block mt-3 text-center text-text-secondary text-sm hover:text-text-primary transition-colors">
        Continue Shopping
      </Link>
      <div className="flex items-center justify-center gap-2 mt-4 text-text-muted text-xs">
        <ShieldCheck size={13} />
        Secure checkout · SSL encrypted
      </div>
    </div>
  )
}
