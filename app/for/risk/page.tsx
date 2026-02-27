import type { Metadata } from 'next'
import MinimalNav from '@/components/MinimalNav'
import Link from 'next/link'

// Not in sitemap. Not in navigation. Not indexed.
// LinkedIn ad destination only.
export const metadata: Metadata = {
  title: 'Caantin · For Heads of Risk at Digital Lenders',
  robots: { index: false, follow: false },
}

export default function ForRisk() {
  return (
    <>
      <MinimalNav />
      <main
        className="grain-heavy relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#080807' }}
      >
        {/* Ancient texture, barely visible */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 70% at 50% 50%, #111009 0%, #080807 80%)',
          }}
        />

        {/* Faint diagonal lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.4) 40px, rgba(255,255,255,0.4) 41px)',
          }}
        />

        <div className="relative z-10 max-w-xl mx-auto px-8 py-32 text-center flex flex-col items-center">
          <p className="type-label text-white/25 text-xs tracking-[0.2em] mb-10">
            Head of Risk · Digital Lender
          </p>

          <h1
            className="type-headline text-white mb-10"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
              letterSpacing: '-0.03em',
              lineHeight: '0.93',
            }}
          >
            Your NPL ratio doesn&apos;t have
            <br />
            to look like this
            <br />
            next quarter.
          </h1>

          <p className="type-body text-silver text-base md:text-lg mb-4 leading-relaxed max-w-md">
            Caantin deploys AI agents that recover delinquent debt —
            compliantly, autonomously, at the scale your team cannot reach
            alone.
          </p>

          <div className="space-y-1 mb-12">
            <p className="type-serif text-white/80 text-lg italic">
              We succeed when you do.
            </p>
            <p className="type-serif text-white/80 text-lg italic">
              No recovery. No fee.
            </p>
          </div>

          <p className="type-label text-white/30 text-xs tracking-widest mb-10">
            FCA · CBN · RBI · CFPB · OJK and more.
          </p>

          <Link href="/contact" className="btn-cta btn-cta-light mb-8">
            Talk to us →
          </Link>

          <div className="space-y-2 mb-8">
            <p className="type-mono text-white/20 text-xs tracking-wide">
              Full audit trail. Built for your regulator.
            </p>
          </div>

          <p className="type-body text-white/20 text-xs leading-relaxed max-w-xs">
            Trusted by digital lenders backed by Tiger Global and leading
            venture investors.
          </p>
        </div>
      </main>
    </>
  )
}
