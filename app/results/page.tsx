'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Link from 'next/link'
import { TESTIMONIALS } from '@/lib/testimonials'
import { useInView } from '@/hooks/useInView'
import { useEffect, useRef } from 'react'

function CountUp({
  target,
  suffix = '',
}: {
  target: number
  suffix?: string
}) {
  const { ref, inView } = useInView(0.3)
  const displayRef = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current || !displayRef.current) return
    started.current = true

    const duration = 1500
    const start = performance.now()
    const el = displayRef.current

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const value = Math.round(eased * target)
      el.textContent = value.toLocaleString() + suffix
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, target, suffix])

  return (
    <div ref={ref}>
      <span ref={displayRef} className="type-mono font-bold">
        0
      </span>
    </div>
  )
}

function Artifact({ type }: { type: 'ledger' | 'coin' }) {
  if (type === 'ledger') {
    return (
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <div className="space-y-2 opacity-20">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex gap-4 items-center">
              <div
                className="h-px bg-white flex-1"
                style={{ opacity: 0.3 + (i % 3) * 0.15 }}
              />
              <span className="type-mono text-white text-xs opacity-60">
                {String(1000 + i * 47).padStart(6, '0')}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 opacity-10 type-mono text-white text-xs">
          LEDGER · RECOVERED ACCOUNTS
        </div>
      </div>
    )
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="w-40 h-40 rounded-full border border-white/10 flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.03)' }}
      >
        <svg
          viewBox="0 0 120 120"
          className="w-32 h-32 opacity-15"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
        >
          <circle cx="60" cy="60" r="55" />
          <circle cx="60" cy="60" r="48" />
          <text x="60" y="56" textAnchor="middle" fontSize="7" fill="white" stroke="none" fontFamily="monospace" letterSpacing="2">SHYLOCK</text>
          <text x="60" y="68" textAnchor="middle" fontSize="6" fill="white" stroke="none" fontFamily="monospace" letterSpacing="1">MMXXVI</text>
        </svg>
      </div>
    </div>
  )
}

export default function Results() {
  const [active, setActive] = useState(0)
  const t = TESTIMONIALS[active]

  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Results"
          headline={
            <>
              Numbers don&apos;t negotiate.
              <br />
              Neither does our agent.
            </>
          }
        />

        <section className="bg-white py-28 md:py-40">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <Reveal>
              <h2
                className="type-headline text-stone-black mb-16 md:mb-20"
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 4rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                Lenders trust Shylock.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
                <div
                  className="relative aspect-[4/5] md:aspect-square max-w-sm overflow-hidden"
                  style={{ background: '#0f0e0d' }}
                >
                  <Artifact type={t.artifact} />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E\")",
                      backgroundSize: '200px',
                    }}
                  />
                </div>

                <div className="flex flex-col justify-between py-4 md:py-8">
                  <blockquote className="type-serif text-stone-black text-xl md:text-2xl lg:text-3xl leading-snug mb-10">
                    {t.quote}
                  </blockquote>
                  <div>
                    <p className="type-serif text-stone-black text-base not-italic mb-1">
                      {t.name}
                    </p>
                    <p className="type-label text-mid text-xs tracking-[0.12em]">
                      {t.title} · {t.company}
                    </p>
                  </div>
                </div>
              </div>

              {TESTIMONIALS.length > 1 && (
                <div className="flex items-center gap-5 mt-12">
                  <button
                    onClick={() =>
                      setActive((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
                    }
                    className="w-10 h-10 border border-stone/30 flex items-center justify-center text-stone-black hover:border-stone-black transition-colors duration-300 cursor-none"
                    aria-label="Previous"
                  >
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path d="M5 1L1 5L5 9M1 5H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div className="flex gap-2">
                    {TESTIMONIALS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-none ${
                          i === active ? 'bg-stone-black w-6' : 'bg-stone/25 w-1.5'
                        }`}
                        aria-label={`Testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setActive((i) => (i + 1) % TESTIMONIALS.length)}
                    className="w-10 h-10 border border-stone/30 flex items-center justify-center text-stone-black hover:border-stone-black transition-colors duration-300 cursor-none"
                    aria-label="Next"
                  >
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path d="M9 1L13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              )}
            </Reveal>
          </div>
        </section>

        <section className="bg-off-white py-28 md:py-40">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-3 gap-16 md:gap-8">
              {[
                {
                  value: 124000,
                  suffix: '',
                  label: 'Portfolio collected.',
                },
                {
                  value: 19,
                  suffix: '',
                  label: 'Live deployments.',
                },
                {
                  value: 23,
                  suffix: '%',
                  label: 'Average recovery lift.',
                },
              ].map(({ value, suffix, label }, i) => (
                <Reveal key={i} delay={i * 0.15}>
                  <div className="text-center md:text-left">
                    <div
                      className="text-stone-black mb-3"
                      style={{
                        fontSize: 'clamp(3rem, 7vw, 7rem)',
                        fontFamily: 'var(--font-space-mono)',
                        fontWeight: 700,
                        letterSpacing: '-0.04em',
                        lineHeight: 1,
                      }}
                    >
                      <CountUp target={value} suffix={suffix} />
                    </div>
                    <p className="type-body text-base text-mid">
                      {label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          className="grain relative py-28 md:py-40 overflow-hidden"
          style={{ backgroundColor: '#0d0c0a' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 80% at 50% 100%, #151310 0%, #080706 100%)',
            }}
          />
          <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
            <Reveal>
              <h2
                className="type-headline text-white mb-10"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 5.5rem)',
                  letterSpacing: '-0.03em',
                  lineHeight: '0.93',
                }}
              >
                See what Shylock does
                <br />
                with your portfolio.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <Link href="/contact" className="btn-cta btn-cta-light">
                Talk to us →
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
