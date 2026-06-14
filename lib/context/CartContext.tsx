'use client'
import { ReactNode } from 'react'

type Product = { id: string; price: number; [key: string]: unknown }
type CartItem = { product: Product; quantity: number }

export function CartProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function useCart() {
  return {
    totalItems: 0 as number,
    items: [] as CartItem[],
    addItem: (_product: Product, _quantity?: number) => {},
    removeItem: (_productId: string) => {},
    updateQuantity: (_productId: string, _quantity: number) => {},
    clearCart: () => {},
    totalPrice: 0 as number,
  }
}
