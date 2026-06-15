import { notFound } from 'next/navigation'
import { getBlogPostBySlug, blogPosts } from '@/lib/data/blog-posts'
import { Badge } from '@/components/ui/Badge'
import { Clock, CalendarBlank } from '@phosphor-icons/react/ssr'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <Badge category={post.category} />
          <span className="flex items-center gap-1 text-text-muted text-sm">
            <Clock size={14} />
            {post.readTime} min read
          </span>
          <span className="flex items-center gap-1 text-text-muted text-sm">
            <CalendarBlank size={14} />
            {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
        <h1 className="text-4xl font-black text-text-primary leading-tight mb-4">{post.title}</h1>
        <p className="text-text-secondary text-xl leading-relaxed">{post.excerpt}</p>
        <p className="text-text-muted text-sm mt-4">By {post.author}</p>
      </div>

      {/* Cover image */}
      <div className="rounded-2xl overflow-hidden mb-12 aspect-video">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover opacity-80" />
      </div>

      {/* Body */}
      <div className="prose prose-invert prose-lg max-w-none text-text-secondary leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <p className="text-text-muted text-sm mt-8 p-4 border border-border-subtle rounded-lg bg-surface">
          This article is for informational purposes only. All content is related to scientific research. Not for human consumption. For research use only.
        </p>
      </div>
    </article>
  )
}
