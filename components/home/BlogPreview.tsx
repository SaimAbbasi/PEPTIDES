import Link from 'next/link'
import { blogPosts } from '@/lib/data/blog-posts'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import { Clock, ArrowRight } from '@phosphor-icons/react/ssr'
import { Button } from '@/components/ui/Button'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function BlogPreview() {
  const posts = blogPosts.slice(0, 3)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="flex items-end justify-between mb-12">
        <SectionHeading
          title="Research & Science"
          subtitle="Peer-reviewed breakdowns and protocol analysis from our research team."
          className="mb-0"
        />
        <Link href="/blog" className="hidden md:flex items-center gap-2 text-accent text-sm font-medium hover:gap-3 transition-all">
          All articles <ArrowRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <AnimateIn key={post.id} delay={i * 0.1}>
          <Link
            href={`/blog/${post.slug}`}
            className="block group bg-surface border border-border-subtle rounded-xl overflow-hidden hover:border-accent/30 transition-all"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Badge category={post.category} />
                <span className="flex items-center gap-1 text-text-muted text-xs">
                  <Clock size={12} />
                  {post.readTime} min read
                </span>
              </div>
              <h3 className="text-text-primary font-bold leading-snug mb-2 group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
            </div>
          </Link>
          </AnimateIn>
        ))}
      </div>
      <div className="flex md:hidden justify-center mt-8">
        <Link href="/blog">
          <Button variant="outline">View All Articles</Button>
        </Link>
      </div>
    </section>
  )
}
