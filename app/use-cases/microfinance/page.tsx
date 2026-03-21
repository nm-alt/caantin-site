import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Collections for Microfinance · Shylock',
  description:
    'Scale loan recovery without scaling cost. AI voice agents make 10,000+ calls per day in the borrower\'s language. Built for MFIs and micro-lenders across Africa.',
  alternates: { canonical: 'https://shylock.ai/use-cases/microfinance' },
}

const PAIN_POINTS = [
  {
    problem: 'Field agents can\'t call everyone',
    solution:
      'Shylock handles the calls — thousands per day, in the borrower\'s language, at the right time. Your field agents focus on relationships and in-person follow-ups.',
  },
  {
    problem: 'Small loans aren\'t worth collecting manually',
    solution:
      'AI agents cost a fraction of human agents. Recover loans that were previously written off because the collection cost exceeded the debt value.',
  },
  {
    problem: 'Borrowers don\'t answer calls from unknown numbers',
    solution:
      'Multi-channel outreach: voice, SMS, and email. Right message, right channel, right time. Follow up automatically until the borrower engages.',
  },
  {
    problem: 'No way to track what was promised',
    solution:
      'Every call is transcribed. Every promise to pay is logged. Track recovery rates, payment commitments, and agent performance in one dashboard.',
  },
]

const METRICS = [
  { value: '10K+', label: 'Calls per day, per client' },
  { value: '8', label: 'Languages supported' },
  { value: '$0', label: 'Fee if no recovery' },
]

export default function MicrofinancePage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Microfinance Collections"
          headline={
            <>
              Scale collections
              <br />
              without scaling cost.
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
                  MICROFINANCE HAS A COLLECTIONS PROBLEM
                </h2>
                <p className="type-body text-mid text-base md:text-lg leading-relaxed">
                  MFIs serve borrowers that banks won&apos;t touch — small loans, rural areas, informal economies. Collections is manual, expensive, and doesn&apos;t scale. When you serve 100,000 borrowers with a team of 10, calls don&apos;t get made.
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
                  HOW MFIS USE SHYLOCK
                </h2>
                <div className="space-y-6 mb-12">
                  {[
                    'Upload your delinquent portfolio — group loans, individual loans, any size.',
                    'AI agents call borrowers in their language — Pidgin, Swahili, Yoruba, or English.',
                    'Agents negotiate flexible repayment plans that work for micro-borrowers.',
                    'Track promises to pay and completed payments in real time.',
                    'Field agents follow up in person only when needed. AI handles the rest.',
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
                      name: 'Can AI collections work for microfinance?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Yes. AI voice agents can make 10,000+ calls per day at a fraction of the cost of human agents, making it economically viable to collect on small loans that would otherwise be written off.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Does Shylock work in rural areas?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Shylock calls borrowers on their mobile phones, which works anywhere with cellular coverage. The AI speaks in local languages including Pidgin, Swahili, and Yoruba to maximise engagement.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'How does AI handle group loans?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Upload your group loan portfolio as a CSV. Shylock contacts each group member individually to discuss their portion. All interactions are logged for group leaders and loan officers to review.',
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
                  q: 'Can AI collections work for microfinance?',
                  a: 'Yes. AI voice agents can make 10,000+ calls per day at a fraction of the cost of human agents, making it economically viable to collect on small loans that would otherwise be written off.',
                },
                {
                  q: 'Does Shylock work in rural areas?',
                  a: 'Shylock calls borrowers on their mobile phones, which works anywhere with cellular coverage. The AI speaks in local languages including Pidgin, Swahili, and Yoruba to maximise engagement.',
                },
                {
                  q: 'How does AI handle group loans?',
                  a: 'Upload your group loan portfolio as a CSV. Shylock contacts each group member individually to discuss their portion. All interactions are logged for group leaders and loan officers to review.',
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
