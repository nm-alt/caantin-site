import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import Link from 'next/link'
import { posts, getPost } from '@/lib/posts'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} · Caantin`,
    description: post.description,
    alternates: { canonical: `https://caantin.ai/blog/${post.slug}` },
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <>
      <Nav />
      <main>
        {/* Post hero */}
        <section
          className="grain relative min-h-[50vh] flex items-end overflow-hidden pb-16 md:pb-24 pt-32"
          style={{ backgroundColor: '#0d0c0a' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 90% at 50% 100%, #151310 0%, #090807 100%)',
            }}
          />
          <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-12 w-full">
            <Reveal>
              <p className="type-label text-white/25 text-xs tracking-[0.2em] mb-8">
                Intelligence
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1
                className="type-headline text-white mb-6"
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 4rem)',
                  letterSpacing: '-0.025em',
                  lineHeight: '1.0',
                }}
              >
                {post.title}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="type-serif text-silver text-base md:text-lg mb-6 italic">
                {post.description}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="type-label text-white/25 text-xs tracking-[0.12em]">
                {post.dateFormatted}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Post body */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-[900px] mx-auto px-6 md:px-12">
            <div
              className="prose-caantin"
              style={{
                // Typography styles applied via CSS class below
              }}
            >
              {post.body}
            </div>

            {/* CTA at end of every post */}
            <div className="mt-20 pt-16 border-t border-stone/10">
              <Reveal>
                <p className="type-serif text-stone-black text-xl md:text-2xl italic mb-8 max-w-lg">
                  If this is the problem you are carrying, we should talk.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <Link href="/contact" className="btn-cta btn-cta-dark">
                  Talk to us →
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Other posts */}
        <section
          className="grain py-16 md:py-24"
          style={{ backgroundColor: '#0d0c0a' }}
        >
          <div className="max-w-[900px] mx-auto px-6 md:px-12">
            <Reveal>
              <p className="type-label text-white/25 text-xs tracking-[0.15em] mb-10">
                More from Intelligence
              </p>
            </Reveal>
            <div className="divide-y divide-white/5">
              {posts
                .filter((p) => p.slug !== slug)
                .map((p, i) => (
                  <Reveal key={p.slug} delay={i * 0.1}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group flex items-start justify-between gap-8 py-8 cursor-none"
                    >
                      <p className="type-headline-lg text-white text-base md:text-xl group-hover:opacity-50 transition-opacity duration-300 leading-snug">
                        {p.title}
                      </p>
                      <span className="type-label text-white/30 text-xs tracking-widest flex-shrink-0">
                        Read →
                      </span>
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
