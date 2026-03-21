'use client'

import Link from 'next/link'
import SpeakToMatt from '@/components/SpeakToMatt'

const USE_CASES = [
  {
    label: 'FINTECH',
    title: 'Recover overdue loans faster.',
    body: 'Upload your delinquent book. Shylock calls every borrower in Pidgin, Swahili, or English — negotiates a payment plan, and reports back. No headcount. No call centre.',
    metric: '2.5×',
    metricLabel: 'avg recovery improvement',
  },
  {
    label: 'MICROFINANCE',
    title: 'Scale collections without scaling cost.',
    body: 'Your field agents handle relationships. Shylock handles the calls — thousands per day, in the borrower\'s language, at the right time. Pay only when we collect.',
    metric: '10K+',
    metricLabel: 'calls per day, per client',
  },
  {
    label: 'BANKING',
    title: 'Manage NPLs compliantly.',
    body: 'Every call recorded, transcribed, and logged. Full audit trail for your regulator. Shylock adapts to your policies, your tone, your compliance rules.',
    metric: '100%',
    metricLabel: 'calls recorded & auditable',
  },
]

const CAPABILITIES = [
  {
    title: 'Multi-language voice AI',
    body: 'Pidgin, Swahili, Yoruba, French, English, Zulu. Borrowers hear their own language.',
  },
  {
    title: 'SMS, email, voice',
    body: 'Multi-channel outreach. Right message, right channel, right time.',
  },
  {
    title: 'Real-time transcripts',
    body: 'Every call transcribed instantly. Know what was said, what was promised.',
  },
  {
    title: 'Automated campaigns',
    body: 'Upload a CSV. Calls start in 60 seconds. No manual dialing.',
  },
  {
    title: 'Payment tracking',
    body: 'Promises to pay, completed payments, recovery rates — all in one dashboard.',
  },
  {
    title: 'Contingency pricing',
    body: 'No recovery, no fee. You pay only when money comes back.',
  },
]

export default function HomepageFilm() {
  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="bg-stone-black text-white min-h-screen flex items-center pt-24 md:pt-28" aria-label="Shylock hero">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
          <div className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-12 md:gap-16 items-center">
            <div>
              <p className="type-label text-white/40 text-[10px] tracking-[0.18em] mb-6">AI-POWERED COLLECTIONS</p>
              <h1
                className="type-headline text-white text-4xl md:text-6xl lg:text-7xl mb-6 md:mb-8"
                style={{ letterSpacing: '-0.03em', lineHeight: 0.92 }}
              >
                RECOVER MORE.<br />AUTOMATICALLY.
              </h1>
              <p className="type-body text-white/65 text-lg md:text-xl max-w-lg mb-10">
                AI agents that call borrowers in their language, negotiate payment, and report back — while your team focuses on strategy.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-cta btn-cta-light">
                  Talk to us →
                </Link>
                <a href="https://collect.caantin.ai" className="btn-cta btn-cta-light" style={{ borderColor: 'rgba(255,255,255,0.25)' }}>
                  Sign in
                </a>
              </div>
            </div>

            <SpeakToMatt />
          </div>
        </div>
      </section>

      {/* ─── METRICS BAR ─── */}
      <section className="bg-white py-14 md:py-20 border-b border-stone/15" aria-label="Key metrics">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: '8', label: 'Languages supported' },
              { value: '17', label: 'Voice presets' },
              { value: '60s', label: 'CSV to first call' },
              { value: '0', label: 'Fee if no recovery' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="type-headline text-stone-black text-3xl md:text-5xl mb-2" style={{ letterSpacing: '-0.03em' }}>
                  {value}
                </p>
                <p className="type-label text-mid text-[10px] tracking-[0.15em]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── USE CASES ─── */}
      <section className="bg-white py-24 md:py-36" aria-label="Use cases">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <p className="type-label text-mid text-[10px] tracking-[0.18em] mb-4">USE CASES</p>
          <h2 className="type-headline text-stone-black text-3xl md:text-5xl mb-16 md:mb-24" style={{ letterSpacing: '-0.03em' }}>
            BUILT FOR LENDERS.
          </h2>

          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {USE_CASES.map(({ label, title, body, metric, metricLabel }) => (
              <div key={label} className="border border-stone/15 rounded-sm p-6 md:p-8 flex flex-col">
                <p className="type-label text-mid text-[10px] tracking-[0.18em] mb-4">{label}</p>
                <h3 className="type-headline-lg text-stone-black text-xl md:text-2xl mb-4">{title}</h3>
                <p className="type-body text-mid text-sm leading-relaxed mb-8 flex-1">{body}</p>
                <div className="border-t border-stone/15 pt-4">
                  <p className="type-headline text-stone-black text-3xl" style={{ letterSpacing: '-0.02em' }}>{metric}</p>
                  <p className="type-label text-mid text-[10px] tracking-[0.12em] mt-1">{metricLabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="bg-stone-black py-24 md:py-36" aria-label="How it works">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <p className="type-label text-white/40 text-[10px] tracking-[0.18em] mb-4">HOW IT WORKS</p>
          <h2 className="type-headline text-white text-3xl md:text-5xl mb-16 md:mb-24" style={{ letterSpacing: '-0.03em' }}>
            THREE STEPS. THAT&apos;S IT.
          </h2>

          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {[
              {
                num: '01',
                title: 'Upload your book',
                body: 'Drop a CSV — names, phone numbers, amounts. Any portfolio, any size. Takes 60 seconds.',
              },
              {
                num: '02',
                title: 'AI calls borrowers',
                body: 'Shylock\'s agents call in the borrower\'s language. They negotiate payment plans, handle objections, and capture commitments.',
              },
              {
                num: '03',
                title: 'Money comes back',
                body: 'Track promises to pay, completed payments, and full transcripts. Real-time dashboard. Full audit trail.',
              },
            ].map(({ num, title, body }) => (
              <div key={num}>
                <p className="type-mono text-white/30 text-xs mb-4">{num}</p>
                <h3 className="type-headline-lg text-white text-xl md:text-2xl mb-3">{title}</h3>
                <p className="type-body text-white/60 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 md:mt-24 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-cta btn-cta-light">
              Talk to us →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CAPABILITIES GRID ─── */}
      <section className="bg-white py-24 md:py-36" aria-label="Capabilities">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <p className="type-label text-mid text-[10px] tracking-[0.18em] mb-4">CAPABILITIES</p>
          <h2 className="type-headline text-stone-black text-3xl md:text-5xl mb-16 md:mb-24" style={{ letterSpacing: '-0.03em' }}>
            EVERYTHING YOU NEED.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {CAPABILITIES.map(({ title, body }) => (
              <div key={title}>
                <h3 className="type-headline-lg text-stone-black text-lg mb-2">{title}</h3>
                <p className="type-body text-mid text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONVERSATION EXAMPLE ─── */}
      <section className="bg-stone-black py-24 md:py-36" aria-label="Example conversation">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <p className="type-label text-white/40 text-[10px] tracking-[0.18em] mb-4">HEAR IT WORK</p>
              <h2 className="type-headline text-white text-3xl md:text-5xl mb-6" style={{ letterSpacing: '-0.03em' }}>
                EVERY CALL. EVERY WORD.
              </h2>
              <p className="type-body text-white/60 text-base md:text-lg max-w-md">
                Shylock doesn&apos;t threaten. It negotiates. Every conversation is designed to preserve the relationship while recovering what&apos;s owed.
              </p>
            </div>

            <div className="border border-white/15 rounded-sm p-5 md:p-6">
              <p className="type-label text-white/40 text-[10px] tracking-[0.16em] mb-4">
                LIVE TRANSCRIPT · SHYLOCK AGENT
              </p>
              <div className="space-y-3 text-sm md:text-base">
                <div className="max-w-[85%] rounded-xl rounded-bl-none border border-white/15 px-4 py-3">
                  <p className="type-body text-white/90">
                    Hi Ama, this is a call regarding your loan with Kopa. We&apos;d like to help you stay current. Can we look at a plan that works for you?
                  </p>
                </div>
                <div className="max-w-[85%] ml-auto rounded-xl rounded-br-none border border-white/15 px-4 py-3 bg-white/5">
                  <p className="type-body text-white/80">
                    I lost my job last month. I can&apos;t pay everything now.
                  </p>
                </div>
                <div className="max-w-[85%] rounded-xl rounded-bl-none border border-white/15 px-4 py-3">
                  <p className="type-body text-white/90">
                    Understood. If we split the balance over three payments, your first instalment would be $50 on 5 April. Does that work?
                  </p>
                </div>
                <div className="max-w-[85%] ml-auto rounded-xl rounded-br-none border border-white/15 px-4 py-3 bg-white/5">
                  <p className="type-body text-white/80">
                    Yes, that works. I can do that.
                  </p>
                </div>
                <div className="border-t border-white/10 pt-3 mt-4">
                  <p className="type-mono text-white/40 text-xs">OUTCOME: Promise to pay — $50 on 5 April</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLOSING CTA ─── */}
      <section className="bg-white py-24 md:py-36" aria-label="Get started">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <h2
            className="type-headline text-stone-black text-4xl md:text-6xl lg:text-7xl mb-6"
            style={{ letterSpacing: '-0.03em', lineHeight: 0.92 }}
          >
            START RECOVERING<br />TODAY.
          </h2>
          <p className="type-body text-mid text-lg md:text-xl max-w-xl mx-auto mb-10">
            Talk to Matt, our AI sales agent, or sign up and upload your first portfolio in 60 seconds.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-cta btn-cta-dark">
              Talk to us →
            </Link>
            <a href="https://collect.caantin.ai" className="btn-cta btn-cta-dark" style={{ borderColor: 'rgba(8,8,7,0.3)' }}>
              Sign up free →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
