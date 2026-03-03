import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How It Works · Shylock',
  description:
    'Five steps from portfolio upload to full audit trail. Simple by design. Powerful by architecture.',
  alternates: { canonical: 'https://shylock.ai/how-it-works' },
}

const STEPS = [
  {
    num: '01',
    title: 'Upload',
    body: 'Any portfolio. Any size. Instantly.',
  },
  {
    num: '02',
    title: 'Outreach',
    body: 'The agent contacts your borrowers via SMS, email, and voice.\nSequenced. Compliant. Autonomous.',
  },
  {
    num: '03',
    title: 'Negotiate',
    body: 'Real-time repayment negotiation.\nNo scripts. No agents. No hold music.',
  },
  {
    num: '04',
    title: 'Collect',
    body: 'Payment captured directly.\nNo manual reconciliation.',
  },
  {
    num: '05',
    title: 'Report',
    body: 'Full audit trail. Always on.\nBuilt for your regulator.',
  },
]

export default function HowItWorks() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="How it works"
          headline={
            <>
              Simple by design.
              <br />
              Powerful by architecture.
            </>
          }
        />

        <section className="bg-white py-28 md:py-40">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="relative max-w-2xl">
              <div className="absolute top-0 bottom-0 left-0 w-px bg-stone/15" />

              <div className="pl-10 md:pl-14 flex flex-col gap-16 md:gap-24">
                {STEPS.map(({ num, title, body }, i) => (
                  <Reveal
                    key={num}
                    delay={i * 0.1}
                    className="relative"
                  >
                    <div className="absolute -left-10 md:-left-14 top-1 w-2.5 h-2.5 rounded-full bg-stone-black border-[2px] border-white ring-1 ring-stone/20 -translate-x-[4px]" />

                    <p className="type-label text-mid text-xs mb-3 tracking-[0.15em]">
                      {num}
                    </p>
                    <h2 className="type-headline-lg text-stone-black text-2xl md:text-4xl mb-3">
                      {title}
                    </h2>
                    <p className="type-body text-mid text-sm md:text-base whitespace-pre-line leading-relaxed max-w-sm">
                      {body}
                    </p>
                  </Reveal>
                ))}

                <Reveal delay={0.5} className="relative flex items-center gap-5">
                  <div className="absolute -left-10 md:-left-14 top-1/2 -translate-y-1/2 -translate-x-[5px] w-3.5 h-3.5 rounded-full bg-stone-black flex-shrink-0" />
                  <p
                    className="type-headline text-stone-black"
                    style={{
                      fontSize: 'clamp(1.4rem, 3vw, 3rem)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    We collect. Full stop.
                  </p>
                </Reveal>
              </div>
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
            <div className="max-w-2xl">
              <Reveal>
                <h2
                  className="type-headline text-white mb-8"
                  style={{
                    fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                    letterSpacing: '-0.03em',
                    lineHeight: '0.93',
                  }}
                >
                  We succeed
                  <br />
                  when you do.
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="space-y-3 mb-12">
                  {[
                    'No recovery. No fee.',
                    'Upload your portfolio and we go to work.',
                    'You pay when money moves. Not before.',
                  ].map((line) => (
                    <p key={line} className="type-body text-silver text-base md:text-lg">
                      {line}
                    </p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <Link href="/contact" className="btn-cta btn-cta-light">
                  Talk to us →
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
