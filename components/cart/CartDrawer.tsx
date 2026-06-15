'use client'

import Link from 'next/link'
import { X, ShoppingBag } from '@phosphor-icons/react'
import { useCart } from '@/lib/context/CartContext'
import { useCartDrawer } from '@/lib/context/CartDrawerContext'
import { CartItem } from '@/components/cart/CartItem'
import { Button } from '@/components/ui/Button'

export function CartDrawer() {
  const { items, totalPrice, totalItems } = useCart()
  const { isOpen, closeDrawer } = useCartDrawer()
  const shipping = totalPrice > 150 ? 0 : 9.99

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-[420px] bg-background border-l border-border-subtle flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-subtle flex-shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="text-text-primary font-bold text-lg">Your Cart</h2>
            {totalItems > 0 && (
              <span className="bg-accent text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <ShoppingBag size={48} className="text-text-muted mb-4" />
              <p className="text-text-primary font-semibold mb-1">Your cart is empty</p>
              <p className="text-text-muted text-sm mb-6">Add some peptides to get started.</p>
              <Button variant="outline" size="sm" onClick={closeDrawer}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="flex-shrink-0 border-t border-border-subtle px-6 py-5 space-y-4 bg-background">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal</span>
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
              <div className="border-t border-border-subtle pt-2 flex justify-between font-bold">
                <span className="text-text-primary">Total</span>
                <span className="text-accent text-lg">${(totalPrice + shipping).toFixed(2)}</span>
              </div>
            </div>
            <Link href="/checkout" onClick={closeDrawer}>
              <Button size="lg" variant="primary" className="w-full">
                Checkout
              </Button>
            </Link>
            <button
              onClick={closeDrawer}
              className="w-full text-center text-text-secondary text-sm hover:text-text-primary transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
