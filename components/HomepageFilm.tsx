'use client'

import { useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import AgentPrompt from '@/components/AgentPrompt'
import SpeakToMatt from '@/components/SpeakToMatt'

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

// Update this list as integrations expand — the globe layout adapts automatically
const INTEGRATIONS = [
  { name: 'ElevenLabs', sub: 'Voice AI',       deg: -90  },
  { name: 'OpenAI',     sub: 'Models + STT',   deg: -45  },
  { name: 'Google',     sub: 'AI + STT',       deg: 0    },
  { name: 'Deepgram',   sub: 'Speech-to-Text', deg: 45   },
  { name: 'Twilio',     sub: 'Telephony',      deg: 90   },
  { name: 'WhatsApp',   sub: 'Messaging',      deg: 135  },
  { name: 'Vonage',     sub: 'Telephony',      deg: 180  },
  { name: 'Anthropic',  sub: 'AI Models',      deg: -135 },
]

const CX = 290, CY = 290, GLOBE_R = 118, ORBIT_R = 222

function IntegrationsViz() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [hovered, setHovered] = useState<string | null>(null)
  const [isOver, setIsOver] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)   // -1 → 1
    const dy = (e.clientY - cy) / (rect.height / 2)  // -1 → 1
    setTilt({ rx: -dy * 12, ry: dx * 12 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 })
    setIsOver(false)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative mx-auto select-none"
      style={{ width: 580, height: 580, perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsOver(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D tilt wrapper */}
      <div
        className="absolute inset-0"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: 'preserve-3d',
          transition: isOver ? 'transform 0.08s ease-out' : 'transform 0.6s ease-out',
        }}
      >
        {/* SVG layer: globe + orbit ring + dashed lines */}
        <svg viewBox="0 0 580 580" fill="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <defs>
            <clipPath id="ig-clip"><circle cx={CX} cy={CY} r={GLOBE_R} /></clipPath>
            <radialGradient id="ig-bg" cx="38%" cy="32%" r="62%">
              <stop offset="0%"   stopColor="rgba(255,130,70,0.18)" />
              <stop offset="100%" stopColor="rgba(140,35,0,0.04)"   />
            </radialGradient>
            <radialGradient id="ig-bg-hover" cx="38%" cy="32%" r="62%">
              <stop offset="0%"   stopColor="rgba(255,150,90,0.28)" />
              <stop offset="100%" stopColor="rgba(180,50,0,0.08)"   />
            </radialGradient>
            <filter id="ig-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="ig-line-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Globe fill — brightens on hover */}
          <circle cx={CX} cy={CY} r={GLOBE_R} fill={isOver ? 'url(#ig-bg-hover)' : 'url(#ig-bg)'}
            style={{ transition: 'fill 0.4s' }} />

          {/* Latitude + meridian grid */}
          <g clipPath="url(#ig-clip)" stroke="rgba(255,255,255,0.16)" strokeWidth="0.9">
            <ellipse cx={CX} cy={CY}       rx={GLOBE_R}                   ry={Math.round(GLOBE_R*0.26)} />
            <ellipse cx={CX} cy={CY - 60}  rx={Math.round(GLOBE_R*0.87)} ry={Math.round(GLOBE_R*0.22)} />
            <ellipse cx={CX} cy={CY + 60}  rx={Math.round(GLOBE_R*0.87)} ry={Math.round(GLOBE_R*0.22)} />
            <ellipse cx={CX} cy={CY - 102} rx={Math.round(GLOBE_R*0.5)}  ry={Math.round(GLOBE_R*0.13)} />
            <ellipse cx={CX} cy={CY + 102} rx={Math.round(GLOBE_R*0.5)}  ry={Math.round(GLOBE_R*0.13)} />
            <ellipse cx={CX} cy={CY} rx={Math.round(GLOBE_R*0.26)} ry={GLOBE_R} />
            <ellipse cx={CX} cy={CY} rx={Math.round(GLOBE_R*0.72)} ry={GLOBE_R} />
            <ellipse cx={CX} cy={CY} rx={GLOBE_R}                  ry={GLOBE_R} />
          </g>

          {/* Globe outline */}
          <circle cx={CX} cy={CY} r={GLOBE_R} stroke="rgba(255,255,255,0.22)" strokeWidth="1" />

          {/* City dots */}
          <g filter="url(#ig-glow)">
            <circle cx={CX - 20} cy={CY +  5} r="3"   fill="white" opacity="0.9" />
            <circle cx={CX -  6} cy={CY - 53} r="3"   fill="white" opacity="0.9" />
            <circle cx={CX + 29} cy={CY +  9} r="3"   fill="white" opacity="0.9" />
            <circle cx={CX + 36} cy={CY - 37} r="2.5" fill="white" opacity="0.8" />
            <circle cx={CX - 44} cy={CY + 44} r="2.5" fill="white" opacity="0.75"/>
          </g>

          {/* Pulsing rings */}
          <circle cx={CX - 20} cy={CY + 5} r="5" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none">
            <animate attributeName="r"       values="5;15;5"    dur="3.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="3.2s" repeatCount="indefinite" />
          </circle>
          <circle cx={CX + 29} cy={CY + 9} r="5" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none">
            <animate attributeName="r"       values="5;15;5"      dur="4.1s" repeatCount="indefinite" begin="1.4s" />
            <animate attributeName="opacity" values="0.35;0;0.35" dur="4.1s" repeatCount="indefinite" begin="1.4s" />
          </circle>

          {/* Orbit ring */}
          <circle cx={CX} cy={CY} r={ORBIT_R} stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />

          {/* Dashed connecting lines — orange + glow when badge is hovered */}
          {INTEGRATIONS.map(({ name, deg }) => {
            const rad = (deg * Math.PI) / 180
            const active = hovered === name
            return (
              <line
                key={name}
                x1={CX + GLOBE_R * Math.cos(rad)}
                y1={CY + GLOBE_R * Math.sin(rad)}
                x2={CX + (ORBIT_R - 56) * Math.cos(rad)}
                y2={CY + (ORBIT_R - 56) * Math.sin(rad)}
                stroke={active ? '#EC4E02' : 'rgba(255,255,255,0.08)'}
                strokeWidth={active ? 1.5 : 1}
                strokeDasharray={active ? '4 3' : '3 4'}
                filter={active ? 'url(#ig-line-glow)' : undefined}
                style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
              />
            )
          })}
        </svg>

        {/* HTML badge layer */}
        {INTEGRATIONS.map(({ name, sub, deg }) => {
          const rad = (deg * Math.PI) / 180
          const active = hovered === name
          return (
            <div
              key={name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: CX + ORBIT_R * Math.cos(rad), top: CY + ORBIT_R * Math.sin(rad) }}
              onMouseEnter={() => setHovered(name)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="rounded-lg px-3 py-2 text-center whitespace-nowrap cursor-default"
                style={{
                  background: active ? 'rgba(236,78,2,0.15)' : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${active ? 'rgba(236,78,2,0.6)' : 'rgba(255,255,255,0.12)'}`,
                  boxShadow: active ? '0 0 16px rgba(236,78,2,0.25)' : 'none',
                  transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
                  transform: active ? 'scale(1.06)' : 'scale(1)',
                }}
              >
                <p className="type-mono text-white text-[11px] font-semibold leading-tight">{name}</p>
                <p className="type-body text-white/35 text-[9px] leading-tight mt-0.5">{sub}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

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

      {/* ─── INTEGRATIONS ─── */}
      <section className="bg-stone-black py-20 md:py-28 overflow-hidden" aria-label="Integrations">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="text-center mb-4">
            <p className="type-label text-accent mb-3">Integrations</p>
            <h2 className="type-headline text-white text-display-lg mb-5 max-w-2xl mx-auto">
              Works with the world&apos;s best.
            </h2>
            <p className="type-body text-white/50 text-base max-w-lg mx-auto">
              Pre-integrated with leading voice AI, language models, telephony providers, and messaging platforms. As better models emerge, we add them.
            </p>
          </div>

          {/* Globe orbit — desktop */}
          <div className="hidden md:flex justify-center mt-2">
            <IntegrationsViz />
          </div>

          {/* Badge grid — mobile fallback */}
          <div className="flex flex-wrap justify-center gap-3 mt-10 md:hidden">
            {INTEGRATIONS.map(({ name, sub }) => (
              <div key={name} className="bg-white/[0.06] border border-white/[0.12] rounded-lg px-3 py-2 text-center">
                <p className="type-mono text-white text-xs font-semibold">{name}</p>
                <p className="type-body text-white/35 text-[10px] mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRY IT ─── */}
      <section className="bg-warm-gray py-20 md:py-28" aria-label="Try it">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <p className="type-label text-accent mb-3">Try it now</p>
          <h2 className="type-headline text-stone-black text-display-lg mb-6 max-w-2xl">
            Hear a live agent. Right now.
          </h2>
          <p className="type-body text-mid text-base mb-12 max-w-md">
            Enter your number and a Shylock agent calls you in seconds. This is a real call — not a recording.
          </p>
          <div className="max-w-sm">
            <SpeakToMatt variant="light" />
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

      {/* ─── DEVELOPERS ─── */}
      <section className="bg-stone-black py-20 md:py-28" aria-label="Developers">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <p className="type-label text-accent mb-3">Developers</p>
              <h2 className="type-headline text-white text-display-lg mb-6">
                Sauti API
              </h2>
              <p className="type-body text-white/60 text-base mb-10 max-w-md">
                Programmatic access to calls, messages, agents, and campaigns. RESTful endpoints, webhook events, full documentation.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="type-headline-lg text-white text-sm mb-1">Calls</h3>
                    <p className="type-body text-white/40 text-sm">Initiate, transfer, record. Real-time transcription via WebSocket.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="type-headline-lg text-white text-sm mb-1">Messages</h3>
                    <p className="type-body text-white/40 text-sm">WhatsApp, SMS, email. Send, receive, track delivery.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="type-headline-lg text-white text-sm mb-1">Assistants</h3>
                    <p className="type-body text-white/40 text-sm">Create, configure, version. Personality, voice, language, model.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
                      <polyline points="13 2 13 9 20 9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="type-headline-lg text-white text-sm mb-1">Webhooks</h3>
                    <p className="type-body text-white/40 text-sm">Call completed, message delivered, payment promised. Real-time events to your backend.</p>
                  </div>
                </div>
              </div>

              <a
                href="/docs"
                className="btn-cta btn-cta-accent mt-10 inline-flex"
              >
                Read the docs &rarr;
              </a>
            </div>

            <div className="bg-near-black rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="type-mono text-white/30 text-[10px] ml-2">POST /v1/calls</span>
              </div>
              <pre className="p-5 text-[13px] leading-relaxed overflow-x-auto">
                <code className="type-mono">
{`curl -X POST https://sauti.shylock.ai/v1/calls \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "assistantId": "asst_jane_collections",
    "phoneNumberId": "pn_jakarta_01",
    "customer": {
      "number": "+62812345678",
      "name": "Rina Wijaya"
    }
  }'`}
                </code>
              </pre>
              <div className="border-t border-white/10">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
                  <span className="type-mono text-white/30 text-[10px]">Response 200</span>
                </div>
                <pre className="p-5 text-[13px] leading-relaxed overflow-x-auto">
                  <code className="type-mono">
{`{
  "id": "call_8f3k2j",
  "status": "ringing",
  "assistant": "asst_jane_collections",
  "from": "+62215551234",
  "to": "+62812345678",
  "created_at": "2026-04-02T10:30:00Z"
}`}
                  </code>
                </pre>
              </div>
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
