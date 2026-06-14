'use client'

import Link from 'next/link'
import { ShoppingCart, CheckCircle, XCircle } from 'lucide-react'
import { Product } from '@/lib/types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/lib/context/CartContext'
import { useToast } from '@/lib/context/ToastContext'
import { useCartDrawer } from '@/lib/context/CartDrawerContext'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart()
  const { addToast } = useToast()
  const { openDrawer } = useCartDrawer()

  return (
    <div className={cn('bg-surface border border-border-subtle rounded-xl overflow-hidden group hover:border-accent/30 transition-all duration-300 flex flex-col', className)}>
      {/* Image */}
      <div className="relative">
        <Link href={`/products/${product.slug}`} className="block overflow-hidden h-52">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
          />
        </Link>
        {(product as any).badge && (
          <span className={cn(
            'absolute top-3 left-3 z-10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide rounded-full',
            (product as any).badge === 'bestseller' && 'bg-accent text-black',
            (product as any).badge === 'new' && 'bg-teal text-white',
            (product as any).badge === 'low-stock' && 'bg-amber-500 text-black',
            (product as any).badge === 'sale' && 'bg-red-500 text-white',
          )}>
            {(product as any).badge === 'bestseller' && 'Best Seller'}
            {(product as any).badge === 'new' && 'New'}
            {(product as any).badge === 'low-stock' && 'Low Stock'}
            {(product as any).badge === 'sale' && 'Sale'}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Badge category={product.category} />
          <span className="text-text-muted text-xs">{product.purity}% purity</span>
        </div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-text-primary font-bold text-lg hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-text-secondary text-sm mt-1 leading-relaxed line-clamp-2 flex-1">
          {product.shortDescription}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-border-subtle">
          <div>
            <p className="text-accent text-xl font-bold">${product.price.toFixed(2)}</p>
            <div className={cn('flex items-center gap-1 text-xs mt-0.5', product.inStock ? 'text-green-400' : 'text-text-muted')}>
              {product.inStock
                ? <><CheckCircle size={11} /> In Stock</>
                : <><XCircle size={11} /> Out of Stock</>
              }
            </div>
          </div>
          <Button
            size="sm"
            variant="primary"
            onClick={() => { addItem(product); addToast({ productName: product.name, productImage: product.image }); openDrawer() }}
            disabled={!product.inStock}
            className="gap-1.5"
          >
            <ShoppingCart size={14} />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
