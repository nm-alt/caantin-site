'use client'

import Link from 'next/link'
import AgentPrompt from '@/components/AgentPrompt'
import SpeakToMatt from '@/components/SpeakToMatt'
import AudioPlayer from '@/components/AudioPlayer'

const CHANNELS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    title: 'Voice',
    body: 'Local phone numbers in 40+ countries. SIP direct to carriers. Your agent sounds local because it is local.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: 'WhatsApp',
    body: 'Business API, verified sender, rich messages. Two-way conversations, not just blasts.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <path d="M8 10h.01M12 10h.01M16 10h.01" />
      </svg>
    ),
    title: 'SMS',
    body: 'Global SMS delivery. Local routes, not grey routes. Delivery receipts on every message.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: 'Email',
    body: 'Transactional and outbound. Sequences, templates, tracking. Connected to the same agent.',
  },
]

const MODELS = [
  { name: 'ElevenLabs', desc: 'Voices — 30+ languages, custom cloning, accents and tonality' },
  { name: 'OpenAI Whisper', desc: 'Speech-to-text — large v3, accurate across accents' },
  { name: 'Google Gemini', desc: 'Reasoning — fast, multilingual, context-aware' },
  { name: 'OpenAI GPT-4o', desc: 'Reasoning — advanced, tool use, structured output' },
]

export default function HomepageFilm() {
  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="bg-near-white min-h-screen flex items-center pt-20 md:pt-24 pb-16" aria-label="Hero">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 w-full">
          <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-10 md:gap-14 items-center">
            <div>
              <h1 className="type-headline text-stone-black text-display-lg mb-6">
                Communication infrastructure for AI
              </h1>
              <p className="type-body text-mid text-base md:text-lg max-w-md mb-8 leading-relaxed">
                Build and deploy AI agents that communicate with millions of your customers in minutes, not months.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://app.shylock.ai" className="btn-cta btn-cta-accent">
                  Start building &rarr;
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

      {/* ─── SPEED STRIP ─── */}
      <section className="bg-accent py-5" aria-label="Speed">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-white type-mono text-sm">
            <span>40+ countries</span>
            <span className="hidden md:inline text-white/40">|</span>
            <span>30+ languages</span>
            <span className="hidden md:inline text-white/40">|</span>
            <span>Voice + WhatsApp + SMS + Email</span>
            <span className="hidden md:inline text-white/40">|</span>
            <span>ElevenLabs + OpenAI + Google</span>
          </div>
        </div>
      </section>

      {/* ─── CHANNELS ─── */}
      <section className="bg-white py-20 md:py-28" aria-label="Channels">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <p className="type-label text-accent mb-3">Every channel</p>
          <h2 className="type-headline text-stone-black text-display-lg mb-6 max-w-2xl">
            One agent. Every way to reach your customers.
          </h2>
          <p className="type-body text-mid text-base mb-14 md:mb-20 max-w-xl">
            Connect voice, WhatsApp, SMS, and email. Your agent handles conversations across all of them — same context, same personality, no silos.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CHANNELS.map(({ icon, title, body }) => (
              <div key={title} className="bg-near-white border border-stone/8 rounded-xl p-6 hover:border-accent/30 transition-colors duration-200">
                <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
                  {icon}
                </div>
                <h3 className="type-headline-lg text-stone-black text-lg mb-2">{title}</h3>
                <p className="type-body text-mid text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI MODELS ─── */}
      <section className="bg-stone-black py-20 md:py-28" aria-label="Models">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <p className="type-label text-accent mb-3">Choose your models</p>
          <h2 className="type-headline text-white text-display-lg mb-6 max-w-2xl">
            The best AI models. Pre-integrated.
          </h2>
          <p className="type-body text-white/60 text-base mb-14 md:mb-20 max-w-xl">
            Pick from ElevenLabs, OpenAI, Google — voices, speech recognition, and reasoning. Mix and match. Switch anytime. We handle the integration.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MODELS.map(({ name, desc }) => (
              <div key={name} className="border border-white/10 rounded-xl p-6 hover:border-accent/40 transition-colors duration-200">
                <h3 className="type-headline-lg text-white text-lg mb-2">{name}</h3>
                <p className="type-body text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRY IT ─── */}
      <section className="bg-warm-gray py-20 md:py-28" aria-label="Try it">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <p className="type-label text-accent mb-3">Try it now</p>
          <h2 className="type-headline text-stone-black text-display-lg mb-14 md:mb-20 max-w-2xl">
            Hear it. Or experience it yourself.
          </h2>

          <div className="grid md:grid-cols-2 gap-10 md:gap-14">
            <div>
              <p className="type-label text-mid mb-4">Get a call from Shylock</p>
              <SpeakToMatt variant="light" />
            </div>
            <div>
              <p className="type-label text-mid mb-4">Listen to a real call</p>
              <AudioPlayer />
              <div className="border border-stone/10 bg-white rounded-xl p-5 mt-4">
                <p className="type-label text-stone/40 text-[10px] mb-4">Transcript</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="type-label text-stone/40 text-[9px] mb-1">Agent</p>
                    <p className="text-stone-black/80">
                      Hi Ama, this is a call regarding your loan with Kopa. We&apos;d like to help you stay current. Can we look at a plan that works for you?
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="type-label text-stone/40 text-[9px] mb-1">Customer</p>
                    <p className="text-mid">
                      I lost my job last month. I can&apos;t pay everything now.
                    </p>
                  </div>
                  <div>
                    <p className="type-label text-stone/40 text-[9px] mb-1">Agent</p>
                    <p className="text-stone-black/80">
                      Understood. If we split the balance over three payments, your first instalment would be on the 5th. Does that work?
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="type-label text-stone/40 text-[9px] mb-1">Customer</p>
                    <p className="text-mid">
                      Yes, that works. I can do that.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="bg-white py-20 md:py-28 border-t border-stone/8" aria-label="How it works">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <p className="type-label text-accent mb-3">How it works</p>
          <h2 className="type-headline text-stone-black text-display-lg mb-14 md:mb-20 max-w-2xl">
            Three steps. Zero infrastructure work.
          </h2>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-accent text-white flex items-center justify-center type-headline text-xl mb-5">1</div>
              <h3 className="type-headline-lg text-stone-black text-xl mb-3">Describe your agent</h3>
              <p className="type-body text-mid text-sm leading-relaxed">
                Name, personality, language, channels. Your agent, your script, your rules.
              </p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-accent text-white flex items-center justify-center type-headline text-xl mb-5">2</div>
              <h3 className="type-headline-lg text-stone-black text-xl mb-3">We handle the rest</h3>
              <p className="type-body text-mid text-sm leading-relaxed">
                Local phone number, voice model, WhatsApp channel, call scripts — provisioned and configured. Not in weeks. In seconds.
              </p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-accent text-white flex items-center justify-center type-headline text-xl mb-5">3</div>
              <h3 className="type-headline-lg text-stone-black text-xl mb-3">Launch a campaign</h3>
              <p className="type-body text-mid text-sm leading-relaxed">
                Upload a CSV or connect your CRM. Pick a strategy. Your agent starts reaching customers immediately. Every outcome logged.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INFRASTRUCTURE ─── */}
      <section className="bg-stone-black py-20 md:py-28" aria-label="Infrastructure">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <p className="type-label text-accent mb-3">Infrastructure</p>
          <h2 className="type-headline text-white text-display-lg mb-6 max-w-2xl">
            We build the pipes. You build the party.
          </h2>
          <p className="type-body text-white/60 text-base mb-14 md:mb-20 max-w-xl">
            Carrier integrations, WhatsApp Business API, AI model providers, number provisioning, compliance — all pre-wired so you can focus on what your agents say, not how they connect.
          </p>

          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            <div>
              <h3 className="type-headline-lg text-white text-lg mb-3">Global carrier network</h3>
              <p className="type-body text-white/50 text-sm leading-relaxed">
                SIP routing direct to carriers in 40+ countries. Local presence, local quality. Not routed through a single US gateway.
              </p>
            </div>
            <div>
              <h3 className="type-headline-lg text-white text-lg mb-3">Every conversation logged</h3>
              <p className="type-body text-white/50 text-sm leading-relaxed">
                Full transcripts, recordings, and outcome tracking on every interaction. Built for teams that answer to regulators.
              </p>
            </div>
            <div>
              <h3 className="type-headline-lg text-white text-lg mb-3">Sauti API</h3>
              <p className="type-body text-white/50 text-sm leading-relaxed">
                For teams that want to build on top. Programmatic access to everything — calls, messages, agents, campaigns.{' '}
                <a
                  href="https://sauti.shylock.ai"
                  className="text-accent hover:text-accent-hover transition-colors duration-200 underline underline-offset-4"
                >
                  Docs &rarr;
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLOSING CTA ─── */}
      <section className="bg-near-white py-20 md:py-28" aria-label="Get started">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 text-center">
          <h2 className="type-headline text-stone-black text-display-lg mb-5">
            Build your first agent.
          </h2>
          <p className="type-body text-mid text-lg md:text-xl max-w-lg mx-auto mb-8">
            Connect a channel. Launch a campaign. Start reaching customers today.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://app.shylock.ai" className="btn-cta btn-cta-accent">
              Start building &rarr;
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
