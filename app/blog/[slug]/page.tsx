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
    title: `${post.title} · AirDial`,
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
        {/* Post hero — pink, loud */}
        <section className="bg-pink pt-32 pb-16 md:pt-44 md:pb-24 border-b-2 border-pink-ink">
          <div className="max-w-[900px] mx-auto px-6 md:px-12 w-full">
            <Reveal>
              <p className="type-label text-pink-ink/70 mb-8">
                Intelligence
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="type-display-xl text-pink-ink mb-6">
                {post.title}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="type-body-lg text-pink-ink/80 mb-6 font-semibold max-w-2xl">
                {post.description}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="type-mono text-pink-ink/50 text-xs font-bold uppercase tracking-widest">
                {post.dateFormatted}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Post body */}
        <section className="bg-pink py-16 md:py-24">
          <div className="max-w-[900px] mx-auto px-6 md:px-12">
            <div className="prose-airdial">
              {post.body}
            </div>

            <div className="mt-20 pt-16 border-t-2 border-pink-ink">
              <Reveal>
                <p className="type-headline text-pink-ink text-2xl md:text-3xl mb-8 max-w-lg">
                  If this is the problem you&apos;re carrying, we should talk.
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
        <section className="bg-pink-ink py-16 md:py-24">
          <div className="max-w-[900px] mx-auto px-6 md:px-12">
            <Reveal>
              <p className="type-label text-pink mb-10">
                More from Intelligence
              </p>
            </Reveal>
            <div className="divide-y-2 divide-white/10">
              {posts
                .filter((p) => p.slug !== slug)
                .map((p, i) => (
                  <Reveal key={p.slug} delay={i * 0.1}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group flex items-start justify-between gap-8 py-8"
                    >
                      <p className="type-headline text-white text-xl md:text-2xl group-hover:text-pink transition-colors duration-200">
                        {p.title}
                      </p>
                      <span className="type-mono text-pink font-bold text-xs tracking-widest uppercase flex-shrink-0">
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
