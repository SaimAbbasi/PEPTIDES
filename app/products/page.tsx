import { Suspense } from 'react'
import { products } from '@/lib/data/products'
import { ProductCard } from '@/components/products/ProductCard'
import { FilterSidebar } from '@/components/products/FilterSidebar'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProductCategory } from '@/lib/types'

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; sort?: string }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category, sort } = await searchParams

  let filtered = category && category !== 'all'
    ? products.filter((p) => p.category === (category as ProductCategory))
    : products

  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price)

  const title = category
    ? `${category.charAt(0).toUpperCase() + category.slice(1)} Peptides`
    : 'All Peptides'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading
        title={title}
        subtitle={`${filtered.length} products, all third-party lab tested with COA.`}
      />
      <div className="flex flex-col md:flex-row gap-10">
        <Suspense fallback={<div className="w-56 h-48 bg-surface rounded-xl animate-pulse" />}>
          <FilterSidebar />
        </Suspense>
        <div className="flex-1">
          {filtered.length === 0 ? (
            <p className="text-text-secondary">No products found in this category.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
