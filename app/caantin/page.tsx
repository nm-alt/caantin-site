import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Caantin — AI Data and Deployments',
  description:
    'We work with the world\'s leading AI labs, enterprises and governments to build and deploy AI for successful commercial outcomes.',
  openGraph: {
    title: 'Caantin — AI Data and Deployments',
    description:
      'We work with the world\'s leading AI labs, enterprises and governments to build and deploy AI for successful commercial outcomes.',
    type: 'website',
  },
}

/* ── SVG icons ── */

function HexagonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="currentColor">
      <polygon points="60,5 110,30 110,90 60,115 10,90 10,30" />
    </svg>
  )
}

function DiagonalBarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="currentColor">
      <rect x="35" y="-5" width="30" height="130" rx="4" transform="rotate(35, 60, 60)" />
    </svg>
  )
}

function CaantinLogo() {
  return (
    <svg width="22" height="19" viewBox="0 0 28 24" fill="currentColor">
      <polygon points="14,0 28,24 0,24" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

export default function CaantinHome() {
  return (
    <div className="relative min-h-screen bg-white text-neutral-900 overflow-hidden">
      {/* Radial burst background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vmax] h-[140vmax]"
          style={{
            background: 'repeating-conic-gradient(from 0deg, transparent 0deg, transparent 4.5deg, rgba(0,0,0,0.025) 4.5deg, rgba(0,0,0,0.025) 5deg)',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Nav */}
        <nav className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-5 md:py-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[15px] font-semibold tracking-[-0.01em] text-neutral-900"
          >
            <CaantinLogo />
            caantin
          </Link>
          <a
            href="mailto:nm@caantin.ai"
            className="rounded-full bg-neutral-900 text-white px-5 py-2 text-[13px] font-medium tracking-wide hover:bg-black transition-colors"
          >
            Get in touch
          </a>
        </nav>

        {/* Hero */}
        <header className="flex flex-col items-center text-center px-6 pt-20 pb-6 md:pt-28 md:pb-10">
          <h1 className="text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] font-semibold leading-[1.08] tracking-[-0.025em]">
            AI data and deployments.
          </h1>
          <p className="mt-5 text-neutral-400 text-base md:text-lg max-w-[480px] leading-relaxed tracking-[-0.01em]">
            We work with the world&rsquo;s leading AI labs, enterprises and
            governments to build and deploy AI for successful commercial
            outcomes.
          </p>
        </header>

        {/* Product cards */}
        <section className="px-6 md:px-12 lg:px-16 pt-10 pb-20 md:pt-14 md:pb-28 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Deployments → shylock.ai */}
            <a
              href="https://shylock.ai"
              className="group relative rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur-sm p-7 md:p-8 hover:border-neutral-300 hover:shadow-lg transition-all duration-300"
            >
              <HexagonIcon className="w-10 h-10 text-neutral-900" />
              <h2 className="mt-5 text-lg font-semibold tracking-[-0.01em]">
                Deployments
              </h2>
              <p className="mt-2 text-neutral-500 text-[14px] leading-relaxed">
                AI agent for financial services recoveries. Autonomous debt
                collection across voice, SMS and WhatsApp.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-neutral-900 group-hover:gap-2.5 transition-all">
                Learn more <ArrowRight />
              </span>
            </a>

            {/* Data */}
            <div className="relative rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur-sm p-7 md:p-8">
              <DiagonalBarIcon className="w-10 h-10 text-neutral-900" />
              <h2 className="mt-5 text-lg font-semibold tracking-[-0.01em]">
                Data
              </h2>
              <p className="mt-2 text-neutral-500 text-[14px] leading-relaxed">
                Training data for AI labs. Evaluation, acquisition, and
                deployment&mdash;for the world&rsquo;s leading AI teams.
              </p>
              <a
                href="mailto:nm@caantin.ai"
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-neutral-900 hover:gap-2.5 transition-all"
              >
                Get in touch <ArrowRight />
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-14 md:mt-16 text-center">
            <a
              href="mailto:nm@caantin.ai"
              className="inline-block rounded-full bg-neutral-900 text-white px-7 py-3 text-[13px] font-medium tracking-wide hover:bg-black transition-colors"
            >
              Get in touch
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-neutral-100 px-6 md:px-12 lg:px-16 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-neutral-400">
            <div className="flex items-center gap-2">
              <CaantinLogo />
              <span className="font-medium text-neutral-500">caantin</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="mailto:nm@caantin.ai" className="hover:text-neutral-600 transition-colors">
                nm@caantin.ai
              </a>
              <span>&copy; {new Date().getFullYear()}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
