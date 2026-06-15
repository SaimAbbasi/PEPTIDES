export type ProductCategory = 'research' | 'cosmetic' | 'performance' | 'bundle'

export type ProductBadge = 'bestseller' | 'new' | 'low-stock' | 'sale'

export interface Product {
  id: string
  slug: string
  name: string
  category: ProductCategory
  price: number
  purity: number          // e.g. 99.5 for 99.5%
  inStock: boolean
  image: string           // path under /public or external URL
  shortDescription: string
  description: string
  researchNotes: string
  coaUrl?: string         // Certificate of Analysis PDF URL (optional)
  tags: string[]
  featured: boolean
  badge?: ProductBadge
}

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  image: string
  productCount: number
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: 'research' | 'science' | 'performance'
  coverImage: string
  author: string
  publishedAt: string     // ISO date string
  readTime: number        // minutes
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartState {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}
