import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import Link from 'next/link'
import { posts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Intelligence · Caantin',
  description:
    'Perspectives on collections, compliance, and the unit economics of debt recovery for digital lenders.',
  alternates: { canonical: 'https://caantin.ai/blog' },
}

export default function Blog() {
  return (
    <>
      <Nav />
      <main>
        {/* Dark hero */}
        <section
          className="grain-heavy relative min-h-[55vh] flex items-end overflow-hidden pb-20 md:pb-28"
          style={{ backgroundColor: '#0d0c0a' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 90% at 50% 100%, #151310 0%, #090807 100%)',
            }}
          />
          <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full">
            <Reveal>
              <h1
                className="type-headline text-white"
                style={{
                  fontSize: 'clamp(4rem, 10vw, 11rem)',
                  letterSpacing: '-0.04em',
                  lineHeight: '0.88',
                }}
              >
                Intelligence.
              </h1>
            </Reveal>
          </div>
        </section>

        {/* Post list */}
        <section className="bg-white py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="divide-y divide-stone/10">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.08}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-12 py-10 md:py-12 cursor-none"
                  >
                    <div className="flex-1 max-w-2xl">
                      <h2 className="type-headline-lg text-stone-black text-xl md:text-2xl mb-3 group-hover:opacity-60 transition-opacity duration-300 leading-snug">
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
                      <span className="type-label text-stone-black text-xs tracking-widest group-hover:gap-3 transition-all duration-300">
                        Read →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
