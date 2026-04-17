import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { posts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog — AirDial',
  description:
    'Notes on calls, collections, compliance, and the numbers behind customer conversations at scale.',
  alternates: { canonical: 'https://caantin.ai/blog' },
}

export default function Blog() {
  return (
    <>
      <Nav />
      <main>
        <section className="bg-pink pt-32 pb-16 md:pt-40 md:pb-24 border-b-2 border-pink-ink">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <p className="type-label text-pink-ink/70 mb-5">Blog</p>
            <h1 className="type-display-xl text-pink-ink mb-6">
              Intelligence.
            </h1>
            <p className="type-body-lg text-pink-ink/80 max-w-2xl font-semibold">
              Notes on calls, collections, compliance, and the numbers behind customer conversations at scale. From Lagos, Nairobi, Kigali, and everywhere in between.
            </p>
          </div>
        </section>

        <section className="bg-pink py-16 md:py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="divide-y-2 divide-pink-ink">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-16 py-10 md:py-14"
                >
                  <div className="flex-1 max-w-3xl">
                    <h2 className="type-headline text-pink-ink text-2xl md:text-4xl mb-4 leading-none">
                      {post.title}
                    </h2>
                    <p className="type-body text-pink-ink/80 text-base md:text-lg font-medium leading-snug">
                      {post.description}
                    </p>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-4 md:gap-6 flex-shrink-0">
                    <span className="type-mono text-pink-ink/60 text-xs font-bold tracking-widest whitespace-nowrap uppercase">
                      {post.dateFormatted}
                    </span>
                    <span className="type-mono text-pink-ink font-bold text-xs tracking-widest uppercase group-hover:underline">
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
