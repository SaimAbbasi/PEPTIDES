import { HeroSection } from '@/components/home/HeroSection'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { TrustBar } from '@/components/home/TrustBar'
import { DualAudience } from '@/components/home/DualAudience'
import { BlogPreview } from '@/components/home/BlogPreview'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <CategoryGrid />
      <FeaturedProducts />
      <DualAudience />
      <BlogPreview />
    </>
  )
}
