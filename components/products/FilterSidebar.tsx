'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ProductCategory } from '@/lib/types'
import { SlidersHorizontal, X } from '@phosphor-icons/react'

const categoryOptions: { value: ProductCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Products' },
  { value: 'research', label: 'Research' },
  { value: 'cosmetic', label: 'Cosmetic' },
  { value: 'performance', label: 'Performance' },
  { value: 'bundle', label: 'Bundles' },
]

export function FilterSidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category') ?? 'all'
  const inStockOnly = searchParams.get('inStock') === '1'
  const [mobileOpen, setMobileOpen] = useState(false)

  function toggleInStock(checked: boolean) {
    const params = new URLSearchParams(searchParams.toString())
    if (checked) {
      params.set('inStock', '1')
    } else {
      params.delete('inStock')
    }
    router.push(`/products?${params.toString()}`)
  }

  function setCategory(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all') {
      params.delete('category')
    } else {
      params.set('category', value)
    }
    router.push(`/products?${params.toString()}`)
    setMobileOpen(false)
  }

  const filterContent = (
    <div className="bg-surface border border-border-subtle rounded-xl p-6">
      <h3 className="text-text-primary font-semibold text-sm uppercase tracking-wider mb-4">Category</h3>
      <ul className="space-y-1">
        {categoryOptions.map((opt) => (
          <li key={opt.value}>
            <button
              onClick={() => setCategory(opt.value)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                currentCategory === opt.value
                  ? 'bg-accent/10 text-accent font-medium'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
              }`}
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="border-t border-border-subtle mt-6 pt-6">
        <h3 className="text-text-primary font-semibold text-sm uppercase tracking-wider mb-4">Stock</h3>
        <label className="flex items-center gap-2 text-text-secondary text-sm cursor-pointer">
          <input
            type="checkbox"
            className="accent-accent"
            checked={inStockOnly}
            onChange={e => toggleInStock(e.target.checked)}
          />
          In Stock Only
        </label>
      </div>
    </div>
  )

  return (
    <aside className="w-full md:w-56 flex-shrink-0">
      {/* Mobile toggle button */}
      <button
        className="md:hidden w-full flex items-center justify-between bg-surface border border-border-subtle rounded-xl px-4 py-3 mb-3 text-text-primary text-sm font-medium"
        onClick={() => setMobileOpen((v) => !v)}
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal size={16} />
          Filters
          {currentCategory !== 'all' && (
            <span className="bg-accent text-black text-xs font-bold rounded-full px-1.5 py-0.5 leading-none">1</span>
          )}
        </span>
        {mobileOpen ? <X size={16} /> : null}
      </button>

      {/* Mobile: collapsible */}
      <div className={`md:block ${mobileOpen ? 'block' : 'hidden'}`}>
        {filterContent}
      </div>
    </aside>
  )
}
