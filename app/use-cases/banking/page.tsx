import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI NPL Management for Banks · Shylock',
  description:
    'Manage non-performing loans compliantly with AI. Every call recorded, transcribed, and auditable. Shylock adapts to your policies, tone, and compliance rules. Built for banks in Africa.',
  alternates: { canonical: 'https://shylock.ai/use-cases/banking' },
}

const PAIN_POINTS = [
  {
    problem: 'Regulators demand full audit trails',
    solution:
      'Every call is recorded, transcribed, and logged automatically. Full compliance documentation generated for each borrower interaction. No manual reporting.',
  },
  {
    problem: 'Outsourced collectors damage your brand',
    solution:
      'Shylock adapts to your tone, policies, and compliance rules. The AI never threatens, harasses, or deviates from your guidelines. Consistent, professional interactions every time.',
  },
  {
    problem: 'NPL books are too large for manual collections',
    solution:
      'AI agents call thousands of borrowers per day. Prioritise by balance, days past due, or any custom criteria. Scale collections without scaling headcount.',
  },
  {
    problem: 'Cross-border portfolios need multilingual agents',
    solution:
      'Shylock supports 8 languages across Africa — Pidgin, Swahili, Yoruba, French, English, and Zulu. One platform for your entire African portfolio.',
  },
]

const METRICS = [
  { value: '100%', label: 'Calls recorded & auditable' },
  { value: '8', label: 'Languages across Africa' },
  { value: '$0', label: 'Fee if no recovery' },
]

export default function BankingPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Banking Collections"
          headline={
            <>
              Manage NPLs
              <br />
              compliantly. At scale.
            </>
          }
        />

        <section className="bg-white py-24 md:py-36">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <Reveal>
              <div className="max-w-2xl mb-16 md:mb-24">
                <h2
                  className="type-headline text-stone-black text-3xl md:text-5xl mb-6"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  BANK COLLECTIONS NEEDS A NEW APPROACH
                </h2>
                <p className="type-body text-mid text-base md:text-lg leading-relaxed">
                  Banks face growing NPL books, tightening regulations, and rising compliance costs. Outsourced collectors are expensive and hard to control. Internal teams can&apos;t scale. AI changes the economics entirely.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              {PAIN_POINTS.map(({ problem, solution }, i) => (
                <Reveal key={problem} delay={i * 0.1}>
                  <div className="border border-stone/15 rounded-sm p-6 md:p-8">
                    <p className="type-label text-mid text-[10px] tracking-[0.18em] mb-3">CHALLENGE</p>
                    <h3 className="type-headline-lg text-stone-black text-lg md:text-xl mb-4">{problem}</h3>
                    <p className="type-label text-mid text-[10px] tracking-[0.18em] mb-3">SHYLOCK</p>
                    <p className="type-body text-mid text-sm leading-relaxed">{solution}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-stone-black py-24 md:py-36">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <Reveal>
              <div className="grid md:grid-cols-3 gap-12 md:gap-16 mb-16">
                {METRICS.map(({ value, label }) => (
                  <div key={label}>
                    <p
                      className="type-headline text-white text-4xl md:text-6xl mb-2"
                      style={{ letterSpacing: '-0.03em' }}
                    >
                      {value}
                    </p>
                    <p className="type-label text-white/40 text-[10px] tracking-[0.15em]">{label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="max-w-2xl">
                <h2
                  className="type-headline text-white text-3xl md:text-5xl mb-6"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  HOW BANKS USE SHYLOCK
                </h2>
                <div className="space-y-6 mb-12">
                  {[
                    'Upload your NPL portfolio — segment by days past due, balance, or region.',
                    'Configure compliance rules, tone, and escalation policies.',
                    'AI agents call borrowers in their language with compliant, professional scripts.',
                    'Every interaction recorded, transcribed, and tagged for regulatory reporting.',
                    'Real-time dashboard for recovery teams. Export reports for regulators.',
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <p className="type-mono text-white/30 text-xs mt-1">{String(i + 1).padStart(2, '0')}</p>
                      <p className="type-body text-white/70 text-sm md:text-base">{step}</p>
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="btn-cta btn-cta-light">
                  Talk to us →
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-white py-24 md:py-36">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  mainEntity: [
                    {
                      '@type': 'Question',
                      name: 'Is AI debt collection compliant for regulated banks?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Yes. Every Shylock call is recorded, transcribed, and stored with a full audit trail. Banks can configure compliance rules, approved language, and escalation policies. The AI adapts to your regulatory requirements.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Can Shylock handle large NPL portfolios?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Yes. Shylock can process portfolios of any size. AI agents make thousands of calls per day and can be segmented by days past due, balance, region, or any custom criteria.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'How does Shylock compare to outsourced debt collectors?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Shylock is more consistent (every call follows your rules), more transparent (every call is recorded), more scalable (thousands of calls per day), and lower cost (contingency pricing — no recovery, no fee).',
                      },
                    },
                  ],
                }),
              }}
            />
            <Reveal>
              <p className="type-label text-mid text-[10px] tracking-[0.18em] mb-4">FAQ</p>
              <h2
                className="type-headline text-stone-black text-3xl md:text-5xl mb-16"
                style={{ letterSpacing: '-0.03em' }}
              >
                COMMON QUESTIONS
              </h2>
            </Reveal>

            <div className="max-w-2xl space-y-10">
              {[
                {
                  q: 'Is AI debt collection compliant for regulated banks?',
                  a: 'Yes. Every Shylock call is recorded, transcribed, and stored with a full audit trail. Banks can configure compliance rules, approved language, and escalation policies. The AI adapts to your regulatory requirements.',
                },
                {
                  q: 'Can Shylock handle large NPL portfolios?',
                  a: 'Yes. Shylock can process portfolios of any size. AI agents make thousands of calls per day and can be segmented by days past due, balance, region, or any custom criteria.',
                },
                {
                  q: 'How does Shylock compare to outsourced debt collectors?',
                  a: 'Shylock is more consistent (every call follows your rules), more transparent (every call is recorded), more scalable (thousands of calls per day), and lower cost (contingency pricing — no recovery, no fee).',
                },
              ].map(({ q, a }, i) => (
                <Reveal key={q} delay={i * 0.1}>
                  <div>
                    <h3 className="type-headline-lg text-stone-black text-lg mb-3">{q}</h3>
                    <p className="type-body text-mid text-sm leading-relaxed">{a}</p>
                  </div>
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
