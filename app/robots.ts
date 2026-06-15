import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout', '/cart', '/account'],
    },
    sitemap: 'https://pepticore.com/sitemap.xml',
  }
}
