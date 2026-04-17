'use client'

import { useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import AgentPrompt from '@/components/AgentPrompt'
import SpeakToMatt from '@/components/SpeakToMatt'
import { MARKETS } from '@/lib/markets'

// V2 — pink is the primary surface. Dark is a mode, not the default.
// Copy is punk: statements, not paragraphs. No banned words.
// Pricing always visible. Specific cities. Never "emerging markets".

const CHANNELS = [
  {
    label: 'Voice',
    body: 'Local numbers. Direct carrier routes. Your agent sounds local because it is local.',
  },
  {
    label: 'WhatsApp',
    body: 'Verified sender. Rich messages. Two-way conversations, not blasts.',
  },
  {
    label: 'SMS',
    body: 'Local routes, not grey routes. Delivery receipts on every message.',
  },
  {
    label: 'Email',
    body: 'Transactional and outbound. Same agent, same context, new channel.',
  },
]

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
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
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
      <div
        className="absolute inset-0"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: 'preserve-3d',
          transition: isOver ? 'transform 0.08s ease-out' : 'transform 0.6s ease-out',
        }}
      >
        <svg viewBox="0 0 580 580" fill="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <defs>
            <clipPath id="ig-clip"><circle cx={CX} cy={CY} r={GLOBE_R} /></clipPath>
            <radialGradient id="ig-bg" cx="38%" cy="32%" r="62%">
              <stop offset="0%"   stopColor="rgba(232,38,109,0.55)" />
              <stop offset="100%" stopColor="rgba(232,38,109,0.1)"   />
            </radialGradient>
            <radialGradient id="ig-bg-hover" cx="38%" cy="32%" r="62%">
              <stop offset="0%"   stopColor="rgba(255,31,120,0.75)" />
              <stop offset="100%" stopColor="rgba(232,38,109,0.2)"   />
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

          <circle cx={CX} cy={CY} r={GLOBE_R} fill={isOver ? 'url(#ig-bg-hover)' : 'url(#ig-bg)'}
            style={{ transition: 'fill 0.4s' }} />

          <g clipPath="url(#ig-clip)" stroke="rgba(255,255,255,0.22)" strokeWidth="0.9">
            <ellipse cx={CX} cy={CY}       rx={GLOBE_R}                   ry={Math.round(GLOBE_R*0.26)} />
            <ellipse cx={CX} cy={CY - 60}  rx={Math.round(GLOBE_R*0.87)} ry={Math.round(GLOBE_R*0.22)} />
            <ellipse cx={CX} cy={CY + 60}  rx={Math.round(GLOBE_R*0.87)} ry={Math.round(GLOBE_R*0.22)} />
            <ellipse cx={CX} cy={CY - 102} rx={Math.round(GLOBE_R*0.5)}  ry={Math.round(GLOBE_R*0.13)} />
            <ellipse cx={CX} cy={CY + 102} rx={Math.round(GLOBE_R*0.5)}  ry={Math.round(GLOBE_R*0.13)} />
            <ellipse cx={CX} cy={CY} rx={Math.round(GLOBE_R*0.26)} ry={GLOBE_R} />
            <ellipse cx={CX} cy={CY} rx={Math.round(GLOBE_R*0.72)} ry={GLOBE_R} />
            <ellipse cx={CX} cy={CY} rx={GLOBE_R}                  ry={GLOBE_R} />
          </g>

          <circle cx={CX} cy={CY} r={GLOBE_R} stroke="rgba(255,255,255,0.35)" strokeWidth="1" />

          <g filter="url(#ig-glow)">
            <circle cx={CX - 20} cy={CY +  5} r="3"   fill="white" opacity="0.95" />
            <circle cx={CX -  6} cy={CY - 53} r="3"   fill="white" opacity="0.95" />
            <circle cx={CX + 29} cy={CY +  9} r="3"   fill="white" opacity="0.95" />
            <circle cx={CX + 36} cy={CY - 37} r="2.5" fill="white" opacity="0.85" />
            <circle cx={CX - 44} cy={CY + 44} r="2.5" fill="white" opacity="0.8"/>
          </g>

          <circle cx={CX - 20} cy={CY + 5} r="5" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none">
            <animate attributeName="r"       values="5;15;5"    dur="3.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="3.2s" repeatCount="indefinite" />
          </circle>
          <circle cx={CX + 29} cy={CY + 9} r="5" stroke="rgba(255,255,255,0.45)" strokeWidth="1" fill="none">
            <animate attributeName="r"       values="5;15;5"      dur="4.1s" repeatCount="indefinite" begin="1.4s" />
            <animate attributeName="opacity" values="0.45;0;0.45" dur="4.1s" repeatCount="indefinite" begin="1.4s" />
          </circle>

          <circle cx={CX} cy={CY} r={ORBIT_R} stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />

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
                stroke={active ? '#ffffff' : 'rgba(255,255,255,0.12)'}
                strokeWidth={active ? 1.5 : 1}
                strokeDasharray={active ? '4 3' : '3 4'}
                filter={active ? 'url(#ig-line-glow)' : undefined}
                style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
              />
            )
          })}
        </svg>

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
                className="px-3 py-2 text-center whitespace-nowrap cursor-default"
                style={{
                  background: active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
                  border: `2px solid ${active ? '#ffffff' : 'rgba(255,255,255,0.18)'}`,
                  borderRadius: '2px',
                  transition: 'background 0.2s, border-color 0.2s',
                  transform: active ? 'scale(1.06)' : 'scale(1)',
                }}
              >
                <p className="type-mono text-white text-[11px] font-bold leading-tight">{name}</p>
                <p className="type-body text-white/60 text-[9px] leading-tight mt-0.5">{sub}</p>
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
      {/* ─── HERO — pink surface. Loud. ─── */}
      <section className="bg-pink min-h-screen flex items-center pt-20 md:pt-28 pb-20" aria-label="Hero">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 w-full">
          <div className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-12 md:gap-16 items-center">
            <div>
              <p className="type-label text-pink-ink/70 mb-6">Live in 8 countries. Answering right now.</p>
              <h1 className="type-display-xl text-pink-ink mb-8">
                A call center<br />in your pocket.
              </h1>
              <p className="type-body-lg text-pink-ink/80 max-w-xl mb-10 font-semibold">
                AI agents that take every call, every message — voice, WhatsApp, SMS, email. Live in 3 minutes. From $0.02/min.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://app.shylock.ai" className="btn-cta btn-cta-dark">
                  Start now &rarr;
                </a>
                <Link href="/contact" className="btn-cta btn-cta-outline">
                  Hear a live agent
                </Link>
              </div>
            </div>

            <AgentPrompt />
          </div>
        </div>
      </section>

      {/* ─── SPEED PROMISE — the one message everywhere ─── */}
      <section className="bg-pink-ink py-6" aria-label="Speed">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-pink type-mono text-sm font-bold">
            <span>LIVE IN 3 MIN</span>
            <span className="text-pink/40">·</span>
            <span>FROM $0.02/MIN</span>
            <span className="text-pink/40">·</span>
            <span>8 COUNTRIES</span>
            <span className="text-pink/40">·</span>
            <span>30+ LANGUAGES</span>
            <span className="text-pink/40">·</span>
            <span>NO SIP. NO DEVOPS.</span>
          </div>
        </div>
      </section>

      {/* ─── EIGHT MARKETS — same brand, eight doors ─── */}
      <section className="bg-pink py-24 md:py-32 border-t-2 border-pink-ink" aria-label="Markets">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="mb-16 md:mb-20 max-w-3xl">
            <p className="type-label text-pink-ink/70 mb-5">Eight countries. One brand. Local everywhere.</p>
            <h2 className="type-display text-pink-ink mb-6">
              Same brand.<br />Eight doors.
            </h2>
            <p className="type-body-lg text-pink-ink/80 max-w-xl">
              Every market gets its own hero, its own language, its own examples. The type, color, voice, and agent quality stay identical.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-pink-ink border-2 border-pink-ink">
            {MARKETS.map((m) => (
              <div key={m.code} className="bg-pink p-8 md:p-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="type-mono text-pink-ink/60 text-xs font-bold tracking-widest">
                      {m.code} {m.dialCode} · {m.hub.toUpperCase()}
                    </p>
                  </div>
                  <p className="type-mono text-pink-ink font-bold text-xs">{m.perMinute}</p>
                </div>
                <h3 className="type-headline text-pink-ink text-2xl md:text-3xl mb-4">
                  {m.headline}
                </h3>
                <p className="type-body text-pink-ink/80 mb-5 font-medium">
                  {m.example}
                </p>
                <p className="type-label text-pink-ink/50">
                  {m.languages.join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CHANNELS ─── */}
      <section className="bg-pink-ink py-24 md:py-32" aria-label="Channels">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <p className="type-label text-pink mb-5">Every channel</p>
          <h2 className="type-display text-white mb-8 max-w-3xl">
            One agent.<br />Every way your customers talk.
          </h2>
          <p className="type-body-lg text-white/70 max-w-xl mb-16 md:mb-20 font-medium">
            Voice. WhatsApp. SMS. Email. Same agent. Same memory. No silos.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border-2 border-white/10">
            {CHANNELS.map(({ label, body }) => (
              <div key={label} className="bg-pink-ink p-8">
                <h3 className="type-headline text-pink text-4xl md:text-5xl mb-5">{label}</h3>
                <p className="type-body text-white/75 font-medium leading-snug">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTEGRATIONS ─── */}
      <section className="bg-pink-ink py-20 md:py-28 overflow-hidden border-t border-white/10" aria-label="Integrations">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="text-center mb-4">
            <p className="type-label text-pink mb-4">Integrations</p>
            <h2 className="type-display text-white mb-6 max-w-2xl mx-auto">
              The best models.<br />Already wired in.
            </h2>
            <p className="type-body-lg text-white/60 max-w-lg mx-auto font-medium">
              Voice AI, language models, telephony, messaging. When better ones ship, we add them.
            </p>
          </div>

          <div className="hidden md:flex justify-center mt-2">
            <IntegrationsViz />
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-10 md:hidden">
            {INTEGRATIONS.map(({ name, sub }) => (
              <div key={name} className="bg-white/[0.08] border-2 border-white/[0.15] px-3 py-2 text-center">
                <p className="type-mono text-white text-xs font-bold">{name}</p>
                <p className="type-body text-white/50 text-[10px] mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRY IT — pink surface ─── */}
      <section className="bg-pink py-24 md:py-32" aria-label="Try it">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <p className="type-label text-pink-ink/70 mb-5">Try it now</p>
              <h2 className="type-display text-pink-ink mb-8">
                Hear a live agent.<br />Right now.
              </h2>
              <p className="type-body-lg text-pink-ink/80 mb-10 font-medium">
                Enter your number. An AirDial agent calls you in 10 seconds. Real call. Not a recording.
              </p>
              <SpeakToMatt variant="light" />
            </div>

            <div className="bg-pink-ink overflow-hidden border-2 border-pink-ink">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/15">
                <div className="w-2 h-2 rounded-full bg-pink animate-pulse" />
                <span className="type-mono text-[10px] text-white/60 uppercase tracking-widest font-bold">Live call · In progress</span>
              </div>
              <div className="px-5 py-6 space-y-5 text-sm">
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 bg-pink text-pink-ink flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">AI</div>
                  <div>
                    <p className="type-label text-[9px] text-white/40 mb-1">Agent · Jane</p>
                    <p className="text-white/90 leading-relaxed font-medium">Hi Amara, this is Jane calling from Kopa. I&apos;m reaching out about your account. Is now a good time?</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start justify-end">
                  <div>
                    <p className="type-label text-[9px] text-white/40 mb-1 text-right">Customer</p>
                    <p className="text-white/70 leading-relaxed text-right font-medium">Yes, I&apos;ve been expecting your call.</p>
                  </div>
                  <div className="w-6 h-6 bg-white/15 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">A</div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 bg-pink text-pink-ink flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">AI</div>
                  <div>
                    <p className="type-label text-[9px] text-white/40 mb-1">Agent · Jane</p>
                    <p className="text-white/90 leading-relaxed font-medium">I can see a balance of ₦48,000 due. Split that into two payments — one today, one in two weeks — would that work?</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start justify-end">
                  <div>
                    <p className="type-label text-[9px] text-white/40 mb-1 text-right">Customer</p>
                    <p className="text-white/70 leading-relaxed text-right font-medium">Yes, that works. Let&apos;s do it.</p>
                  </div>
                  <div className="w-6 h-6 bg-white/15 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">A</div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 bg-pink text-pink-ink flex items-center justify-center shrink-0 font-bold text-[10px]">AI</div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink/70 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-pink/70 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-pink/70 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
              <div className="px-5 py-3 border-t border-white/15 flex items-center justify-between">
                <span className="type-mono text-[9px] text-white/50 font-bold">OUTCOME: PAYMENT PLAN AGREED</span>
                <span className="type-mono text-[9px] text-pink font-bold">✓ LOGGED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="bg-pink py-24 md:py-32 border-t-2 border-pink-ink" aria-label="How it works">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <p className="type-label text-pink-ink/70 mb-5">Three minutes</p>
          <h2 className="type-display text-pink-ink mb-16 md:mb-20 max-w-3xl">
            Three steps.<br />Zero infrastructure.
          </h2>

          <div className="grid md:grid-cols-3 gap-px bg-pink-ink border-2 border-pink-ink">
            <div className="bg-pink p-8 md:p-10">
              <div className="type-display text-pink-ink text-7xl md:text-8xl mb-6">01</div>
              <h3 className="type-headline text-pink-ink text-2xl mb-3">Describe your agent</h3>
              <p className="type-body text-pink-ink/80 font-medium">
                Name, personality, language, channels. Your agent, your script, your rules.
              </p>
            </div>
            <div className="bg-pink p-8 md:p-10">
              <div className="type-display text-pink-ink text-7xl md:text-8xl mb-6">02</div>
              <h3 className="type-headline text-pink-ink text-2xl mb-3">We wire it up</h3>
              <p className="type-body text-pink-ink/80 font-medium">
                Local number. Voice. WhatsApp. Scripts. Provisioned in seconds — not weeks.
              </p>
            </div>
            <div className="bg-pink p-8 md:p-10">
              <div className="type-display text-pink-ink text-7xl md:text-8xl mb-6">03</div>
              <h3 className="type-headline text-pink-ink text-2xl mb-3">Launch</h3>
              <p className="type-body text-pink-ink/80 font-medium">
                Upload a CSV. Connect your CRM. Your agent starts calling. Every outcome logged.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DEVELOPERS ─── */}
      <section className="bg-pink-ink py-24 md:py-32" aria-label="Developers">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <p className="type-label text-pink mb-5">Developers</p>
              <h2 className="type-display text-white mb-8">
                Sauti API.
              </h2>
              <p className="type-body-lg text-white/70 mb-12 max-w-md font-medium">
                Programmatic access to calls, messages, agents, campaigns. REST + webhooks. Full docs.
              </p>

              <ul className="space-y-5 mb-10">
                {[
                  ['Calls', 'Initiate. Transfer. Record. Real-time transcripts.'],
                  ['Messages', 'WhatsApp. SMS. Email. Send, receive, track.'],
                  ['Assistants', 'Create, version, configure. Voice, language, model.'],
                  ['Webhooks', 'Call complete. Message delivered. Payment promised. Real-time to your backend.'],
                ].map(([k, v]) => (
                  <li key={k} className="flex gap-4 items-start border-b border-white/10 pb-4">
                    <span className="type-headline text-pink text-2xl w-28 shrink-0">{k}</span>
                    <span className="type-body text-white/65 font-medium">{v}</span>
                  </li>
                ))}
              </ul>

              <a href="/docs" className="btn-cta btn-cta-pink">
                Read the docs &rarr;
              </a>
            </div>

            <div className="bg-black border-2 border-white/15 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-pink" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber" />
                <span className="w-2.5 h-2.5 rounded-full bg-live-green" />
                <span className="type-mono text-white/40 text-[10px] ml-2 font-bold">POST /v1/calls</span>
              </div>
              <pre className="p-5 text-[13px] leading-relaxed overflow-x-auto">
                <code className="type-mono text-white/90">
{`curl -X POST https://sauti.shylock.ai/v1/calls \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "assistantId": "asst_jane_collections",
    "phoneNumberId": "pn_lagos_01",
    "region": "NG-LAGOS",
    "customer": {
      "number": "+2348012345678",
      "name": "Amara Okoye"
    }
  }'`}
                </code>
              </pre>
              <div className="border-t border-white/10">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                  <span className="type-mono text-pink text-[10px] font-bold">200 OK</span>
                </div>
                <pre className="p-5 text-[13px] leading-relaxed overflow-x-auto">
                  <code className="type-mono text-white/90">
{`{
  "id": "call_8f3k2j",
  "status": "ringing",
  "region": "NG-LAGOS",
  "from": "+2341234567",
  "to": "+2348012345678",
  "created_at": "2026-04-16T10:30:00Z"
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLOSING ─── */}
      <section className="bg-pink py-28 md:py-36 border-t-2 border-pink-ink" aria-label="Get started">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 text-center">
          <h2 className="type-display-xl text-pink-ink mb-8">
            Build your<br />first agent.
          </h2>
          <p className="type-body-lg text-pink-ink/80 max-w-lg mx-auto mb-10 font-semibold">
            Three minutes. No SIP. No DevOps. No surprises.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://app.shylock.ai" className="btn-cta btn-cta-dark">
              Start building &rarr;
            </a>
            <Link href="/contact" className="btn-cta btn-cta-outline">
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
