import { HeroSection } from '@/components/home/HeroSection'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { TrustBar } from '@/components/home/TrustBar'
import { DualAudience } from '@/components/home/DualAudience'
import { Testimonials } from '@/components/home/Testimonials'
import { BlogPreview } from '@/components/home/BlogPreview'
import { Marquee } from '@/components/ui/Marquee'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <Marquee />
      <CategoryGrid />
      <FeaturedProducts />
      <DualAudience />
      <Testimonials />
      <BlogPreview />
    </>
  )
}
