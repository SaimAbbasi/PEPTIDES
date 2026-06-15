'use client'

import { ReactNode } from 'react'
import { CartProvider } from '@/lib/context/CartContext'
import { CartDrawerProvider } from '@/lib/context/CartDrawerContext'
import { ToastProvider } from '@/lib/context/ToastContext'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <CartDrawerProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </CartDrawerProvider>
    </CartProvider>
  )
}
