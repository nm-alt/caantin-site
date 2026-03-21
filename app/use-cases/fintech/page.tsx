import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Debt Collection for Fintechs · Shylock',
  description:
    'Recover overdue loans 2.5× faster with AI voice agents that call borrowers in Pidgin, Swahili, and English. No headcount. No call centre. Built for digital lenders in Africa.',
  alternates: { canonical: 'https://shylock.ai/use-cases/fintech' },
}

const PAIN_POINTS = [
  {
    problem: 'Call centres cost more than the debt',
    solution:
      'Shylock calls thousands of borrowers per day at a fraction of the cost. No agents to hire, train, or manage.',
  },
  {
    problem: 'Recovery rates plateau at scale',
    solution:
      'AI agents call at the optimal time, in the borrower\'s language, with personalised negotiation. Recovery improves as volume increases.',
  },
  {
    problem: 'No visibility into what agents say',
    solution:
      'Every call is recorded and transcribed in real time. Full audit trail for compliance and quality assurance.',
  },
  {
    problem: 'Manual processes break above 10K accounts',
    solution:
      'Upload a CSV. Calls start in 60 seconds. No manual dialling, no queue management, no scheduling.',
  },
]

const METRICS = [
  { value: '2.5×', label: 'Average recovery improvement' },
  { value: '60s', label: 'CSV to first call' },
  { value: '$0', label: 'Fee if no recovery' },
]

export default function FintechPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Fintech Collections"
          headline={
            <>
              Recover overdue loans
              <br />
              faster. Automatically.
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
                  THE PROBLEM WITH SCALING COLLECTIONS
                </h2>
                <p className="type-body text-mid text-base md:text-lg leading-relaxed">
                  Digital lenders grow fast. Collections doesn&apos;t keep up. Hiring call centre agents is expensive, slow, and unscalable. Most fintechs hit a ceiling where the cost of collecting exceeds the value of the debt.
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
                  HOW IT WORKS FOR FINTECHS
                </h2>
                <div className="space-y-6 mb-12">
                  {[
                    'Upload your delinquent book — any portfolio, any size.',
                    'Shylock calls every borrower in Pidgin, Swahili, or English.',
                    'AI negotiates payment plans and captures promises to pay.',
                    'Track recovery in real time. Full transcripts. Full audit trail.',
                    'Pay only when money comes back. No recovery, no fee.',
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
                      name: 'How does AI debt collection work for fintechs?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'You upload a CSV of borrowers with names, phone numbers, and amounts owed. Shylock\'s AI agents call each borrower in their preferred language (Pidgin, Swahili, English, etc.), negotiate a payment plan, and report results in real time. Every call is recorded and transcribed.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'How much does AI debt collection cost?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Shylock offers contingency pricing: you pay only when money is recovered. No recovery, no fee. No upfront costs, no monthly minimums.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'What languages does Shylock support?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Shylock supports 8 languages including Nigerian Pidgin, Swahili, Yoruba, French, English, and Zulu. Borrowers hear their own language, which increases engagement and recovery rates.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Is AI debt collection compliant with regulations?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Yes. Every call is recorded, transcribed, and logged with a full audit trail. Shylock adapts to your compliance rules, tone, and policies. The AI never threatens or harasses — it negotiates.',
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
                  q: 'How does AI debt collection work for fintechs?',
                  a: 'You upload a CSV of borrowers with names, phone numbers, and amounts owed. Shylock\'s AI agents call each borrower in their preferred language, negotiate a payment plan, and report results in real time. Every call is recorded and transcribed.',
                },
                {
                  q: 'How much does AI debt collection cost?',
                  a: 'Shylock offers contingency pricing: you pay only when money is recovered. No recovery, no fee. No upfront costs, no monthly minimums.',
                },
                {
                  q: 'What languages does Shylock support?',
                  a: 'Shylock supports 8 languages including Nigerian Pidgin, Swahili, Yoruba, French, English, and Zulu. Borrowers hear their own language, which increases engagement and recovery rates.',
                },
                {
                  q: 'Is AI debt collection compliant with regulations?',
                  a: 'Yes. Every call is recorded, transcribed, and logged with a full audit trail. Shylock adapts to your compliance rules, tone, and policies. The AI never threatens or harasses — it negotiates.',
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
