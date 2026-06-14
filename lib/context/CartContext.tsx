'use client'
import { ReactNode } from 'react'
export function CartProvider({ children }: { children: ReactNode }) { return <>{children}</> }
export function useCart() { return { totalItems: 0, items: [], addItem: () => {}, removeItem: () => {}, updateQuantity: () => {}, clearCart: () => {}, totalPrice: 0 } }
