import type { MetadataRoute } from 'next'
import { posts } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://shylock.ai'

  const blogPosts = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/how-it-works`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/results`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/use-cases/fintech`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/use-cases/microfinance`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/use-cases/banking`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...blogPosts,
    // /for/* pages intentionally excluded — noindex, ad destinations only
  ]
}
