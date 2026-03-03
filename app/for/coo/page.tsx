import type { Metadata } from 'next'
import MinimalNav from '@/components/MinimalNav'
import Link from 'next/link'

// Not in sitemap. Not in navigation. Not indexed.
// LinkedIn ad destination only.
export const metadata: Metadata = {
  title: 'Shylock · For COOs at Digital Lenders',
  robots: { index: false, follow: false },
}

export default function ForCOO() {
  return (
    <>
      <MinimalNav />
      <main
        className="grain-heavy relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#080807' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 70% at 50% 50%, #111009 0%, #080807 80%)',
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.4) 40px, rgba(255,255,255,0.4) 41px)',
          }}
        />

        <div className="relative z-10 max-w-xl mx-auto px-8 py-32 text-center flex flex-col items-center">
          <h1
            className="type-headline text-white mb-10"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
              letterSpacing: '-0.03em',
              lineHeight: '0.93',
            }}
          >
            Your recovery rate
            <br />
            is a revenue problem.
          </h1>

          <p className="type-body text-silver text-base md:text-lg mb-4 leading-relaxed max-w-md">
            Shylock gives COOs at digital lenders an autonomous collections
            infrastructure — without the headcount.
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

          <Link href="/contact" className="btn-cta btn-cta-light mb-12">
            Talk to us →
          </Link>

          <p className="type-body text-white/20 text-xs leading-relaxed max-w-xs">
            Trusted by digital lenders backed by Tiger Global and leading
            venture investors.
          </p>
        </div>
      </main>
    </>
  )
}
