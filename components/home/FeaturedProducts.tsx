import { getFeaturedProducts } from '@/lib/data/products'
import { ProductCard } from '@/components/products/ProductCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function FeaturedProducts() {
  const featured = getFeaturedProducts()

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <SectionHeading
        title="Featured Peptides"
        subtitle="Our most researched, highest-purity compounds — tested, verified, and ready for your protocol."
        centered
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="text-center mt-12">
        <Link href="/products">
          <Button variant="outline" size="lg">View All Products</Button>
        </Link>
      </div>
    </section>
  )
}
