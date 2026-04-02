'use client'

import Link from 'next/link'
import AgentPrompt from '@/components/AgentPrompt'
import SpeakToMatt from '@/components/SpeakToMatt'
import AudioPlayer from '@/components/AudioPlayer'

const PLATFORM_FEATURES = [
  {
    title: 'Studio',
    body: 'Build AI agents. Define their personality, voice, language, and script. Test before you launch.',
  },
  {
    title: 'Campaigns',
    body: 'Upload a CSV. Pick a strategy. Calls start in 60 seconds. Every outcome logged.',
  },
  {
    title: 'Channels',
    body: 'Voice, WhatsApp, SMS, email — all from one dashboard. Connect a channel, use it in your next campaign.',
  },
]

const USE_CASES = [
  {
    title: 'Collections',
    body: 'AI agents call borrowers, negotiate payment plans, log outcomes. Every call recorded and auditable.',
  },
  {
    title: 'Sales outreach',
    body: 'Prospect at scale. Email, WhatsApp, voice — multi-step sequences, your pitch, your timing.',
  },
  {
    title: 'Customer engagement',
    body: 'Payment reminders, onboarding calls, renewal notices. The volume handled by AI, the relationships by humans.',
  },
]

export default function HomepageFilm() {
  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="bg-near-white min-h-screen flex items-center pt-20 md:pt-24 pb-16" aria-label="Hero">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 w-full">
          <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-12 md:gap-16 items-center">
            <div>
              <h1 className="type-headline text-stone-black text-display-lg mb-6">
                Communication infrastructure for AI
              </h1>
              <p className="type-body text-mid text-lg md:text-xl max-w-md mb-8 leading-relaxed">
                Build AI agents that handle conversations across voice, WhatsApp, SMS, and email. One platform, every channel.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://app.shylock.ai" className="btn-cta btn-cta-primary">
                  Get started &rarr;
                </a>
                <Link href="/contact" className="btn-cta btn-cta-dark">
                  Talk to us
                </Link>
              </div>
            </div>

            <AgentPrompt />
          </div>
        </div>
      </section>

      {/* ─── PLATFORM ─── */}
      <section className="bg-white py-20 md:py-28 border-y border-stone/8" aria-label="Platform">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <p className="type-label text-mid mb-3">The platform</p>
          <h2 className="type-headline text-stone-black text-display-lg mb-14 md:mb-20 max-w-2xl">
            Build agents. Define strategies. Launch campaigns.
          </h2>

          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            {PLATFORM_FEATURES.map(({ title, body }) => (
              <div key={title}>
                <h3 className="type-headline-lg text-stone-black text-xl mb-3">{title}</h3>
                <p className="type-body text-mid text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <p className="type-body text-silver text-sm mt-12">
            Developers: Sauti API for programmatic access.{' '}
            <a
              href="https://sauti.shylock.ai"
              className="text-mid hover:text-stone-black transition-colors duration-200 underline underline-offset-4"
            >
              Read the docs &rarr;
            </a>
          </p>
        </div>
      </section>

      {/* ─── TRY IT ─── */}
      <section className="bg-stone-black py-20 md:py-28" aria-label="Try it">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <p className="type-label text-white/35 mb-3">Try it</p>
          <h2 className="type-headline text-white text-display-lg mb-14 md:mb-20 max-w-2xl">
            Hear it. Or experience it yourself.
          </h2>

          <div className="grid md:grid-cols-2 gap-10 md:gap-14">
            <div>
              <p className="type-label text-white/30 mb-4">Get a call</p>
              <SpeakToMatt variant="dark" />
            </div>
            <div>
              <p className="type-label text-white/30 mb-4">Listen to a real call</p>
              <AudioPlayer />
              <div className="border border-white/10 rounded-lg p-5 mt-4">
                <p className="type-label text-white/25 text-[10px] mb-4">Transcript</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="type-label text-white/25 text-[9px] mb-1">Agent</p>
                    <p className="text-white/75">
                      Hi Ama, this is a call regarding your loan with Kopa. We&apos;d like to help you stay current. Can we look at a plan that works for you?
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="type-label text-white/25 text-[9px] mb-1">Customer</p>
                    <p className="text-white/50">
                      I lost my job last month. I can&apos;t pay everything now.
                    </p>
                  </div>
                  <div>
                    <p className="type-label text-white/25 text-[9px] mb-1">Agent</p>
                    <p className="text-white/75">
                      Understood. If we split the balance over three payments, your first instalment would be on the 5th. Does that work?
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="type-label text-white/25 text-[9px] mb-1">Customer</p>
                    <p className="text-white/50">
                      Yes, that works. I can do that.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT PEOPLE BUILD ─── */}
      <section className="bg-near-white py-20 md:py-28" aria-label="Use cases">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <p className="type-label text-mid mb-3">Use cases</p>
          <h2 className="type-headline text-stone-black text-display-lg mb-14 md:mb-20 max-w-2xl">
            What people build
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {USE_CASES.map(({ title, body }) => (
              <div key={title} className="bg-white border border-stone/8 rounded-lg p-6 md:p-8">
                <h3 className="type-headline-lg text-stone-black text-lg mb-3">{title}</h3>
                <p className="type-body text-mid text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INFRASTRUCTURE ─── */}
      <section className="bg-stone-black py-20 md:py-28" aria-label="Infrastructure">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <p className="type-label text-white/35 mb-3">Infrastructure</p>
          <h2 className="type-headline text-white text-display-lg mb-14 md:mb-20 max-w-2xl">
            We build the pipes. Everyone else builds the party.
          </h2>

          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            <div>
              <h3 className="type-headline-lg text-white text-lg mb-3">Sauti</h3>
              <p className="type-body text-white/50 text-sm leading-relaxed">
                Our voice engine. SIP routing direct to carriers globally. Speech-to-text, language model, text-to-speech — one pipeline, end to end.
              </p>
            </div>
            <div>
              <h3 className="type-headline-lg text-white text-lg mb-3">Global from day one</h3>
              <p className="type-body text-white/50 text-sm leading-relaxed">
                Calls connect to carrier networks wherever your customers are. Not limited to one region, one provider, or one set of regulations.
              </p>
            </div>
            <div>
              <h3 className="type-headline-lg text-white text-lg mb-3">Every conversation logged</h3>
              <p className="type-body text-white/50 text-sm leading-relaxed">
                Full transcripts, recordings, and outcome tracking on every interaction. Built for teams that answer to regulators.
              </p>
            </div>
          </div>

          <p className="type-body text-white/30 text-sm mt-14">
            API access via Sauti for teams that want to build on top.{' '}
            <a
              href="https://sauti.shylock.ai"
              className="text-white/50 hover:text-white transition-colors duration-200 underline underline-offset-4"
            >
              Developer docs &rarr;
            </a>
          </p>
        </div>
      </section>

      {/* ─── CLOSING CTA ─── */}
      <section className="bg-near-white py-20 md:py-28" aria-label="Get started">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 text-center">
          <h2 className="type-headline text-stone-black text-display-xl mb-5">
            Build your first agent.
          </h2>
          <p className="type-body text-mid text-lg md:text-xl max-w-md mx-auto mb-8">
            Sign up, connect a channel, launch your first campaign.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://app.shylock.ai" className="btn-cta btn-cta-primary">
              Get started &rarr;
            </a>
            <Link href="/contact" className="btn-cta btn-cta-dark">
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
