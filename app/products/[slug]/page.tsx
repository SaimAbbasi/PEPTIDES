import { notFound } from 'next/navigation'
import { getProductBySlug, products } from '@/lib/data/products'
import { ProductTabs } from '@/components/products/ProductTabs'
import { ProductCard } from '@/components/products/ProductCard'
import { Badge } from '@/components/ui/Badge'
import { AddToCartButton } from '@/components/products/AddToCartButton'
import { StickyAddToCartWrapper } from '@/components/products/StickyAddToCartWrapper'
import { AlertTriangle, CheckCircle, XCircle, ShieldCheck } from 'lucide-react'

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Product hero */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden bg-surface border border-border-subtle aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Badge category={product.category} />
            <span className="text-text-muted text-sm">{product.purity}% Purity (HPLC)</span>
          </div>

          <h1 className="text-4xl font-black text-text-primary mb-2">{product.name}</h1>
          <p className="text-text-secondary text-lg leading-relaxed mb-8">{product.shortDescription}</p>

          {/* Price + stock */}
          <div className="flex items-center gap-6 mb-8">
            <p className="text-4xl font-bold text-accent">${product.price.toFixed(2)}</p>
            <div className={`flex items-center gap-1.5 text-sm font-medium ${product.inStock ? 'text-green-400' : 'text-text-muted'}`}>
              {product.inStock ? <CheckCircle size={16} /> : <XCircle size={16} />}
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </div>
          </div>

          {/* Add to cart */}
          <div id="add-to-cart-anchor"><AddToCartButton product={product} /></div>

          {/* Trust signals */}
          <div className="mt-8 space-y-3 border-t border-border-subtle pt-8">
            {[
              { icon: ShieldCheck, text: 'Third-party lab tested — COA available' },
              { icon: AlertTriangle, text: 'For research use only. Not for human consumption.' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-2 text-text-muted text-sm">
                <Icon size={15} className="flex-shrink-0 mt-0.5" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-surface border border-border-subtle rounded-2xl p-8 mb-16">
        <ProductTabs product={product} />
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
    <StickyAddToCartWrapper product={product} />
    </>
  )
}
