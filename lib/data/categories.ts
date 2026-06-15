import { Category } from '@/lib/types'

export const categories: Category[] = [
  {
    id: 'cat-1',
    slug: 'research',
    name: 'Research Peptides',
    description: 'Laboratory-grade peptides for scientific research and study.',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&q=80',
    productCount: 4,
  },
  {
    id: 'cat-2',
    slug: 'cosmetic',
    name: 'Cosmetic Peptides',
    description: 'Advanced peptide formulations for skin health and rejuvenation research.',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80',
    productCount: 1,
  },
  {
    id: 'cat-3',
    slug: 'performance',
    name: 'Performance Peptides',
    description: 'Peptides studied for their role in physical recovery and performance.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    productCount: 2,
  },
  {
    id: 'cat-4',
    slug: 'bundle',
    name: 'Research Bundles',
    description: 'Curated peptide stacks for comprehensive research protocols.',
    image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&q=80',
    productCount: 1,
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}
