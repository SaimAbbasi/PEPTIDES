import { BlogPost } from '@/lib/types'

export const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'bpc-157-mechanisms-tissue-repair',
    title: 'BPC-157: Mechanisms of Action in Tissue Repair Research',
    excerpt: "A comprehensive review of the current literature on BPC-157's proposed mechanisms in tendon, ligament, and gut tissue repair studies.",
    content: `# BPC-157: Mechanisms of Action in Tissue Repair Research\n\nBPC-157 (Body Protection Compound-157) is a pentadecapeptide consisting of 15 amino acids...`,
    category: 'research',
    coverImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80',
    author: 'Dr. Research Team',
    publishedAt: '2026-05-20',
    readTime: 8,
  },
  {
    id: 'post-2',
    slug: 'peptide-purity-understanding-coa',
    title: 'Understanding Peptide Purity: How to Read a Certificate of Analysis',
    excerpt: 'Learn what HPLC purity percentages mean, what mass spectrometry confirms, and why third-party testing matters for research integrity.',
    content: `# Understanding Peptide Purity: How to Read a Certificate of Analysis\n\nWhen purchasing peptides for research, purity is the most critical factor...`,
    category: 'science',
    coverImage: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&q=80',
    author: 'Lab Quality Team',
    publishedAt: '2026-05-10',
    readTime: 6,
  },
  {
    id: 'post-3',
    slug: 'ipamorelin-cjc-1295-research-review',
    title: 'Ipamorelin + CJC-1295: A Review of Combined Protocol Research',
    excerpt: 'Exploring the published literature on combining selective GH secretagogues with GHRH analogues in preclinical and clinical research settings.',
    content: `# Ipamorelin + CJC-1295: A Review of Combined Protocol Research\n\nThe combination of Ipamorelin and CJC-1295 has become one of the most studied peptide stacks...`,
    category: 'performance',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    author: 'Performance Research Desk',
    publishedAt: '2026-04-28',
    readTime: 10,
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
