import { blogPosts } from '@/lib/data/blog-posts'
import { Badge } from '@/components/ui/Badge'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Clock } from '@phosphor-icons/react/ssr'
import Link from 'next/link'

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading
        title="Research & Science"
        subtitle="In-depth analysis of peptide research, protocols, and scientific literature."
        centered
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group bg-surface border border-border-subtle rounded-xl overflow-hidden hover:border-accent/30 transition-all"
          >
            <div className="h-52 overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 opacity-80 group-hover:opacity-100"
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
              <h2 className="text-text-primary font-bold leading-snug mb-2 group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
              <p className="text-text-muted text-xs mt-4">{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
