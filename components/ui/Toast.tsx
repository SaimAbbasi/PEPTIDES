'use client'

import { X, CheckCircle } from 'lucide-react'
import { useToast } from '@/lib/context/ToastContext'

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 bg-surface-elevated border border-border-subtle rounded-xl px-4 py-3 shadow-2xl min-w-[280px] max-w-[340px]"
          style={{ animation: 'toastSlideIn 0.25s ease-out' }}
        >
          <img
            src={toast.productImage}
            alt={toast.productName}
            className="w-10 h-10 rounded-lg object-cover flex-shrink-0 opacity-90"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <CheckCircle size={13} className="text-accent flex-shrink-0" />
              <span className="text-accent text-xs font-semibold">Added to cart</span>
            </div>
            <p className="text-text-primary text-sm font-medium truncate">{toast.productName}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-text-muted hover:text-text-primary transition-colors flex-shrink-0"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
