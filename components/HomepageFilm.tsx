'use client'

import Link from 'next/link'
import { TESTIMONIALS } from '@/lib/testimonials'

const REGULATORS = {
  AFRICA: ['CBN', 'FCCPC', 'CBK', 'NCR', 'CBE', 'BoG'],
  EUROPE: ['FCA', 'ACPR', 'BaFin'],
  'ASIA PACIFIC': ['RBI', 'OJK', 'BSP', 'MAS', 'CBUAE'],
  AMERICAS: ['CFPB', 'BCB', 'CNBV'],
  'MIDDLE EAST': ['SAMA', 'CBUAE'],
}

const VALUE_PROPS = [
  {
    title: 'Agents that do the work.',
    body: 'Shylock runs in the background: SMS, email, voice. The agent contacts borrowers, negotiates payment plans, and captures payment. You review at key stages. Finished output is delivered ready for review.',
    icon: 'agent',
  },
  {
    title: 'Works the way you do.',
    body: 'Your policies, your regulator, your tone. Shylock conforms to your rules and adapts to how your team works. Multi-language, multi-market. Every conversation logged and auditable.',
    icon: 'scale',
  },
  {
    title: 'Doers become reviewers.',
    body: 'When Shylock handles execution, your team shifts to reviewing: dashboard, conversation replay, override when needed. Full audit trail for your compliance team and regulator.',
    icon: 'payment',
  },
  {
    title: 'Expand your capacity.',
    body: 'Contingency-only: you pay when we collect. No recovery, no fee. Scale across your book without adding headcount. More collections, more compliantly, without burning customer trust.',
    icon: 'book',
  },
]

function ValueIcon({ icon }: { icon: string }) {
  const c = 'currentColor'
  if (icon === 'agent') {
    return (
      <svg viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="1.2" className="w-8 h-8">
        <circle cx="16" cy="10" r="4" />
        <path d="M8 28c0-4 4-8 8-8s8 4 8 8M4 16h4M24 16h4M16 4v4" strokeLinecap="round" />
      </svg>
    )
  }
  if (icon === 'scale') {
    return (
      <svg viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="1.2" className="w-8 h-8">
        <path d="M4 20h24M16 4v16M10 20l6-8 6 8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="20" r="2" />
      </svg>
    )
  }
  if (icon === 'payment') {
    return (
      <svg viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="1.2" className="w-8 h-8">
        <rect x="2" y="6" width="28" height="20" rx="2" />
        <path d="M2 14h28M8 22h4" strokeLinecap="round" />
      </svg>
    )
  }
  if (icon === 'book') {
    return (
      <svg viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="1.2" className="w-8 h-8">
        <path d="M4 6h10v20H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM18 6h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H18V6z" />
        <path d="M12 10h4M12 14h4M12 18h2" strokeLinecap="round" />
      </svg>
    )
  }
  return null
}

export default function HomepageFilm() {
  const t = TESTIMONIALS[0]

  return (
    <div>
      {/* ─── HERO (Basis-style: one headline, one sub, one CTA) ─── */}
      <section className="bg-white text-stone-black min-h-screen flex items-center pt-24 md:pt-28" aria-label="Shylock hero">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
          <div className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-12 md:gap-16 items-center">
            <div>
              <h1
                className="type-serif text-stone-black text-3xl md:text-5xl lg:text-6xl mb-6 md:mb-8"
                style={{ letterSpacing: '-0.02em', lineHeight: 1.12 }}
              >
                The next era of collections.
              </h1>
              <p className="type-body text-mid text-lg md:text-xl max-w-lg mb-10">
                Agents built specifically for the world&apos;s most compliant collections teams.
              </p>
              <Link href="/contact" className="btn-cta btn-cta-dark">
                Get in touch
              </Link>
            </div>

            {/* Timeline of tools — from ledgers to agents (Basis-inspired) */}
            <div className="relative">
              <div className="absolute -inset-6 border border-stone/20 rounded -z-10" />
              <div className="space-y-4">
                <div className="bg-white border border-stone/25 rounded-sm p-4 flex items-center gap-4">
                  <div className="w-16 h-16 border border-stone/30 rounded-sm flex items-center justify-center">
                    <div className="w-12 h-10 border border-stone/40 rounded-sm grid grid-rows-3 gap-1 px-1 py-1">
                      <div className="h-px bg-stone/40" />
                      <div className="h-px bg-stone/40" />
                      <div className="h-px bg-stone/40" />
                    </div>
                  </div>
                  <div>
                    <p className="type-label text-mid text-[10px] tracking-[0.18em] mb-1">ERA I</p>
                    <p className="type-body text-stone-black text-sm">Hand‑kept ledgers & paper notices.</p>
                  </div>
                </div>

                <div className="bg-white border border-stone/25 rounded-sm p-4 flex items-center gap-4">
                  <div className="w-16 h-16 border border-stone/30 rounded-sm flex items-center justify-center">
                    <div className="w-10 h-10 border border-stone/40 rounded-full grid grid-cols-3 grid-rows-3 gap-0.5 p-1">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-stone/60" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="type-label text-mid text-[10px] tracking-[0.18em] mb-1">ERA II</p>
                    <p className="type-body text-stone-black text-sm">Dialers, call‑centres, scripts, threats.</p>
                  </div>
                </div>

                <div className="bg-white border border-stone/25 rounded-sm p-4 flex items-center gap-4">
                  <div className="w-16 h-16 border border-stone/30 rounded-sm flex items-center justify-center">
                    <div className="w-12 h-8 border border-stone/40 rounded-sm relative">
                      <div className="absolute inset-x-1 top-1 h-px bg-stone/40" />
                      <div className="absolute inset-x-1 top-3 h-px bg-stone/30" />
                      <div className="absolute inset-x-1 bottom-1 h-2 border-t border-stone/30" />
                    </div>
                  </div>
                  <div>
                    <p className="type-label text-mid text-[10px] tracking-[0.18em] mb-1">ERA III</p>
                    <p className="type-body text-stone-black text-sm">Spreadsheets, SMS campaigns, fragmented tooling.</p>
                  </div>
                </div>

                <div className="bg-stone-black text-white border border-stone/60 rounded-sm p-4 flex items-center gap-4">
                  <div className="w-16 h-16 border border-white/25 rounded-sm flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center">
                      <span className="type-mono text-[10px] tracking-[0.18em]">AI</span>
                    </div>
                  </div>
                  <div>
                    <p className="type-label text-white/70 text-[10px] tracking-[0.18em] mb-1">ERA IV · SHYLOCK</p>
                    <p className="type-body text-white/90 text-sm">
                      AI agents that collect for you — within policy, within regulation, and without torching customer trust.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST (Basis: “Trusted by leading firms.”) ─── */}
      <section className="bg-white py-14 md:py-20 border-t border-b border-stone/15" aria-label="Trust">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <h2 className="type-headline text-stone-black text-xl md:text-2xl mb-8">
            Trusted by leading lenders.
          </h2>
          <div className="type-mono text-stone-black/70 text-xs md:text-sm flex flex-wrap gap-x-6 gap-y-2">
            {Object.values(REGULATORS)
              .flat()
              .filter((v, i, a) => a.indexOf(v) === i)
              .slice(0, 14)
              .map((reg) => (
                <span key={reg}>{reg}</span>
              ))}
          </div>
        </div>
      </section>

      {/* ─── SEE SHYLOCK IN ACTION (Basis: one headline, one line, one asset) ─── */}
      <section className="bg-stone-black py-24 md:py-32" aria-label="See Shylock work">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <h2 className="type-headline text-white text-2xl md:text-4xl lg:text-5xl mb-4">
            See Shylock in action.
          </h2>
          <p className="type-body text-white/75 text-sm md:text-base max-w-xl mb-10">
            One example of a collections workflow possible on Shylock.
          </p>
          <div className="relative w-full aspect-video bg-black overflow-hidden rounded-sm">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="/demo.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{ filter: 'grayscale(100%) contrast(1.05)' }}
            />
            <div className="absolute inset-0 border border-white/15 pointer-events-none rounded-sm" />
          </div>
        </div>
      </section>

      {/* ─── ONE PLATFORM (Basis: “One platform across your firm.” + modules) ─── */}
      <section className="bg-white py-24 md:py-36" aria-label="Built for compliant collections">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <h2 className="type-headline text-stone-black text-3xl md:text-5xl lg:text-6xl mb-4">
            One platform across your book.
          </h2>
          <p className="type-body text-mid text-base md:text-lg max-w-xl mb-20 md:mb-24">
            Core modules built for the needs of compliant collections teams.
          </p>

          <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-start">
            <div className="grid gap-10">
              {VALUE_PROPS.map(({ title, body, icon }) => (
                <div key={icon} className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-stone-black border border-stone-black/20 rounded">
                    <ValueIcon icon={icon} />
                  </div>
                  <div>
                    <h3 className="type-headline-lg text-stone-black text-lg md:text-xl mb-2">{title}</h3>
                    <p className="type-body text-mid text-sm md:text-base leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Simple conversation mock — relationship-friendly tone */}
            <div className="border border-stone/20 rounded-sm p-5 md:p-6 bg-white">
              <p className="type-label text-mid text-[10px] tracking-[0.16em] mb-4">
                EXAMPLE CONVERSATION · SHYLOCK AGENT
              </p>
              <div className="space-y-3 text-sm md:text-base">
                <div className="max-w-[80%] rounded-xl rounded-bl-none border border-stone/20 px-4 py-3 bg-white">
                  <p className="type-body text-stone-black">
                    Hi Ama, your loan with Kopa is two weeks overdue. We’d like to keep you as a customer. Can we look at a plan
                    that works for you?
                  </p>
                </div>
                <div className="max-w-[80%] ml-auto rounded-xl rounded-br-none border border-stone/20 px-4 py-3 bg-stone-black text-white">
                  <p className="type-body text-white">
                    I lost my job last month. I can’t pay everything now but I can start again next month.
                  </p>
                </div>
                <div className="max-w-[80%] rounded-xl rounded-bl-none border border-stone/20 px-4 py-3 bg-white">
                  <p className="type-body text-stone-black">
                    Understood. If we move your due date and split the balance over three payments, your first instalment would
                    be $50 on 5 April. Does that work?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS: 3 steps, timeline ─── */}
      <section className="bg-white py-24 md:py-36 border-t border-stone/15" aria-label="How it works without burning relationships">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <h2 className="type-headline text-stone-black text-2xl md:text-4xl mb-16 md:mb-24">How it works</h2>

          <div className="relative max-w-2xl">
            <div className="absolute top-0 bottom-0 left-0 w-px bg-stone/20" />
            <div className="pl-10 md:pl-14 flex flex-col gap-14 md:gap-20">
              {[
                {
                  num: '01',
                  title: 'Upload',
                  body: 'Any portfolio. Any size. Takes minutes. We handle everything from there.',
                },
                {
                  num: '02',
                  title: 'Outreach',
                  body: 'The agent contacts borrowers via SMS, email, voice — in the right language, at the right time. Compliant. Autonomous.',
                },
                {
                  num: '03',
                  title: 'Collect & report',
                  body: 'Money comes back. You see real-time recovery data. We invoice only on what is collected. Full audit trail, always on.',
                },
              ].map(({ num, title, body }) => (
                <div key={num} className="relative">
                  <div className="absolute -left-10 md:-left-14 top-1 w-2.5 h-2.5 rounded-full bg-stone-black border-2 border-white ring-1 ring-stone/20 -translate-x-0.5" />
                  <p className="type-label text-mid text-xs mb-2 tracking-[0.15em]">{num}</p>
                  <h3 className="type-headline-lg text-stone-black text-xl md:text-2xl mb-2">{title}</h3>
                  <p className="type-body text-mid text-sm md:text-base">{body}</p>
                </div>
              ))}

              <div className="relative flex items-center gap-4">
                <div className="absolute -left-10 md:-left-14 top-1/2 -translate-y-1/2 -translate-x-0.5 w-3.5 h-3.5 rounded-full bg-stone-black flex-shrink-0" />
                <p
                  className="type-headline text-stone-black"
                  style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2.25rem)', letterSpacing: '-0.02em' }}
                >
                  We collect. Full stop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMPLIANCE: Quote + regulator grid ─── */}
      <section className="grain relative py-24 md:py-36 overflow-hidden bg-stone-black" aria-label="Compliance">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              opacity: 0.6,
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
          <p className="type-serif text-white text-2xl md:text-4xl lg:text-5xl text-center max-w-3xl mx-auto mb-20 md:mb-28">
            &ldquo;The law allows it. The court awards it.&rdquo;
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">
            {Object.entries(REGULATORS).map(([region, regs]) => (
              <div key={region}>
                <p className="type-label text-white/45 text-xs mb-3 tracking-[0.15em]">{region}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {regs.map((r) => (
                    <span key={r} className="type-mono text-white/65 text-xs">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 space-y-1">
            {['Every conversation logged.', 'Every interaction auditable.', 'Full audit trail. Always on.'].map(
              (line) => (
                <p key={line} className="type-mono text-white/45 text-xs">
                  {line}
                </p>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS: Quote only (no photo) ─── */}
      {t && (
        <section className="bg-white py-24 md:py-36" aria-label="Lenders trust Shylock">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <h2 className="type-headline text-stone-black text-2xl md:text-4xl mb-10">Lenders trust Shylock.</h2>
            <div className="max-w-3xl">
              <blockquote className="type-serif text-stone-black text-xl md:text-2xl lg:text-3xl leading-snug mb-6">
                {t.quote}
              </blockquote>
              <p className="type-body text-stone-black font-medium">{t.name}</p>
              <p className="type-label text-mid text-xs tracking-widest mt-1">
                {t.title} · {t.company}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ─── CLOSING (Basis: “Put Basis to work.” + one CTA) ─── */}
      <section className="bg-stone-black text-white py-24 md:py-32" aria-label="Put Shylock to work">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <h2
            className="type-headline text-3xl md:text-5xl lg:text-6xl mb-10"
            style={{ letterSpacing: '-0.03em', lineHeight: 0.92 }}
          >
            Put Shylock to <em className="font-normal not-italic">work.</em>
          </h2>
          <Link href="/contact" className="btn-cta btn-cta-light">
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  )
}
