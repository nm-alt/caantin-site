import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { posts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog — Shylock',
  description:
    'Perspectives on AI communication infrastructure, collections, compliance, and the economics of customer engagement at scale.',
  alternates: { canonical: 'https://shylock.ai/blog' },
}

export default function Blog() {
  return (
    <>
      <Nav />
      <main>
        <section className="bg-near-white pt-32 pb-16 md:pt-36 md:pb-20">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10">
            <p className="type-label text-accent mb-3">Blog</p>
            <h1 className="type-headline text-stone-black text-display-lg mb-4">
              Intelligence
            </h1>
            <p className="type-body text-mid text-lg max-w-xl">
              Perspectives on collections, compliance, and the unit economics of customer engagement at scale.
            </p>
          </div>
        </section>

        <section className="bg-white py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10">
            <div className="divide-y divide-stone/10">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-12 py-10 md:py-12"
                >
                  <div className="flex-1 max-w-2xl">
                    <h2 className="type-headline-lg text-stone-black text-xl md:text-2xl mb-3 group-hover:text-accent transition-colors duration-200 leading-snug">
                      {post.title}
                    </h2>
                    <p className="type-body text-mid text-sm md:text-base leading-relaxed">
                      {post.description}
                    </p>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-4 md:gap-6 flex-shrink-0">
                    <span className="type-label text-silver text-xs tracking-widest whitespace-nowrap">
                      {post.dateFormatted}
                    </span>
                    <span className="type-label text-accent text-xs tracking-widest group-hover:gap-3 transition-all duration-300">
                      Read &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
