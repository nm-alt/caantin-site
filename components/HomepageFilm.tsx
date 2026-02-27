'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'

// ─── Hammurabi Stele SVG ─────────────────────────────────────────────────────
// Placeholder: CSS/SVG rendering of the stele — arch shape, stone gradient,
// cuneiform column texture, single-source side lighting, grain filter.
// Drop in the real 3D render by replacing this component.
function SteleSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 680"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        {/* Stone grain filter */}
        <filter id="stone-grain" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
          <feBlend in="SourceGraphic" in2="gray" mode="multiply" result="blend" />
          <feComposite in="blend" in2="SourceGraphic" operator="in" />
        </filter>

        {/* Stone base gradient — slight variation top to bottom */}
        <linearGradient id="stone-base" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1c1a17" />
          <stop offset="40%" stopColor="#111009" />
          <stop offset="100%" stopColor="#0d0c0a" />
        </linearGradient>

        {/* Side lighting — brighter from left, deeper on right */}
        <linearGradient id="stone-light" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#2e2b26" stopOpacity="0.55" />
          <stop offset="25%" stopColor="#1a1816" stopOpacity="0.1" />
          <stop offset="75%" stopColor="#0a0908" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#060504" stopOpacity="0.7" />
        </linearGradient>

        {/* Cuneiform-like row pattern */}
        <pattern
          id="cunei"
          x="0"
          y="0"
          width="32"
          height="11"
          patternUnits="userSpaceOnUse"
        >
          {/* Horizontal base stroke */}
          <line x1="2" y1="5.5" x2="30" y2="5.5" stroke="#2d2a25" strokeWidth="0.55" opacity="0.8" />
          {/* Wedge marks — vertical strokes at character positions */}
          <line x1="3"  y1="3.5" x2="3"  y2="7.5" stroke="#2d2a25" strokeWidth="0.45" opacity="0.65" />
          <line x1="8"  y1="3.5" x2="8"  y2="7.5" stroke="#2d2a25" strokeWidth="0.45" opacity="0.6"  />
          <line x1="13" y1="3.5" x2="13" y2="7.5" stroke="#2d2a25" strokeWidth="0.45" opacity="0.7"  />
          <line x1="19" y1="3.5" x2="19" y2="7.5" stroke="#2d2a25" strokeWidth="0.45" opacity="0.55" />
          <line x1="24" y1="3.5" x2="24" y2="7.5" stroke="#2d2a25" strokeWidth="0.45" opacity="0.65" />
          <line x1="29" y1="3.5" x2="29" y2="7.5" stroke="#2d2a25" strokeWidth="0.45" opacity="0.6"  />
        </pattern>

        {/* Clip path for stele shape */}
        <clipPath id="stele-clip">
          <path d="M4,170 C4,4 196,4 196,170 L196,664 Q196,676 184,676 L16,676 Q4,676 4,664 Z" />
        </clipPath>
      </defs>

      {/* Main stone body */}
      <path
        d="M4,170 C4,4 196,4 196,170 L196,664 Q196,676 184,676 L16,676 Q4,676 4,664 Z"
        fill="url(#stone-base)"
      />

      {/* Grain texture */}
      <path
        d="M4,170 C4,4 196,4 196,170 L196,664 Q196,676 184,676 L16,676 Q4,676 4,664 Z"
        fill="url(#stone-grain)"
        opacity="0.12"
      />

      {/* Side lighting overlay */}
      <path
        d="M4,170 C4,4 196,4 196,170 L196,664 Q196,676 184,676 L16,676 Q4,676 4,664 Z"
        fill="url(#stone-light)"
      />

      {/* Relief carving zone — top arch area, slightly different dark tone */}
      <path
        d="M4,170 C4,4 196,4 196,170 L196,240 L4,240 Z"
        fill="#0c0b09"
        opacity="0.6"
        clipPath="url(#stele-clip)"
      />

      {/* Cuneiform text columns — 4 columns separated by gutters */}
      {/* Column 1 */}
      <rect
        x="14" y="252" width="38" height="412"
        fill="url(#cunei)"
        clipPath="url(#stele-clip)"
        opacity="0.9"
      />
      {/* Column 2 */}
      <rect
        x="58" y="252" width="38" height="412"
        fill="url(#cunei)"
        clipPath="url(#stele-clip)"
        opacity="0.85"
      />
      {/* Column 3 */}
      <rect
        x="104" y="252" width="38" height="412"
        fill="url(#cunei)"
        clipPath="url(#stele-clip)"
        opacity="0.9"
      />
      {/* Column 4 */}
      <rect
        x="150" y="252" width="38" height="412"
        fill="url(#cunei)"
        clipPath="url(#stele-clip)"
        opacity="0.8"
      />

      {/* Simplified relief silhouettes — top arch area */}
      {/* Hammurabi (left figure, standing) */}
      <g opacity="0.22" fill="#2a2620" clipPath="url(#stele-clip)">
        <ellipse cx="62" cy="102" rx="11" ry="13" />
        <path d="M51 115 Q48 150 50 200 Q60 208 72 205 Q84 200 85 155 Q84 118 73 115 Z" />
        <rect x="56" y="89" width="14" height="14" rx="1" />
        <path d="M85 140 Q115 132 140 138" stroke="#2a2620" strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>
      {/* Shamash seated (right figure) */}
      <g opacity="0.2" fill="#2a2620" clipPath="url(#stele-clip)">
        <ellipse cx="152" cy="100" rx="10" ry="12" />
        <path d="M142 112 Q140 148 142 195 Q152 202 163 198 Q172 192 172 148 Q170 115 162 112 Z" />
        <rect x="148" y="87" width="12" height="14" rx="1" />
        {/* Throne suggestion */}
        <rect x="136" y="160" width="40" height="35" rx="2" opacity="0.6" />
      </g>

      {/* Top highlight edge — slight lighter rim */}
      <path
        d="M4,170 C4,4 196,4 196,170"
        fill="none"
        stroke="#3a3630"
        strokeWidth="1.2"
        opacity="0.4"
      />
    </svg>
  )
}

// ─── Testimonial data ────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote:
      '"FairMoney paid before the product was finished. That is how certain they were."',
    name: 'Njavwa Mutambo',
    title: 'Founder & CEO',
    company: 'Caantin',
    // Visual artifact: a ledger / contract placeholder
    artifact: 'ledger',
  },
  {
    quote:
      '"[OxygenX testimonial — full quote to be confirmed before launch.]"',
    name: '[Name]',
    title: '[Title]',
    company: 'OxygenX',
    artifact: 'coin',
  },
]

// ─── Compliance data ─────────────────────────────────────────────────────────
const REGULATORS = {
  AFRICA: ['CBN', 'FCCPC', 'CBK', 'NCR', 'CBE', 'BoG'],
  EUROPE: ['FCA', 'ACPR', 'BaFin', 'Finansinspektionen'],
  'ASIA PACIFIC': ['RBI', 'OJK', 'BSP', 'MAS', 'SBV'],
  AMERICAS: ['CFPB', 'BCB', 'CNBV'],
  'MIDDLE EAST': ['SAMA', 'CBUAE'],
}

// ─── HomepageFilm ────────────────────────────────────────────────────────────
export default function HomepageFilm() {
  const containerRef = useRef<HTMLDivElement>(null)
  const crack1Ref = useRef<SVGPathElement>(null)
  const crack2Ref = useRef<SVGPathElement>(null)
  const crack3Ref = useRef<SVGPathElement>(null)
  const crack4Ref = useRef<SVGPathElement>(null)
  const lightBleedRef = useRef<HTMLDivElement>(null)
  const timelineLineRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)

  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [videoHover, setVideoHover] = useState(false)

  // ── Custom cursor ──────────────────────────────────────────────────────────
  useEffect(() => {
    const dot = cursorDotRef.current
    const ring = cursorRingRef.current
    if (!dot || !ring) return

    let dotX = 0, dotY = 0
    let ringX = 0, ringY = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX
      dotY = e.clientY
    }

    const loop = () => {
      ringX += (dotX - ringX) * 0.12
      ringY += (dotY - ringY) * 0.12
      dot.style.left = dotX + 'px'
      dot.style.top = dotY + 'px'
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      rafId = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // ── GSAP film animations ───────────────────────────────────────────────────
  useEffect(() => {
    let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ST)
      ScrollTrigger = ST

      const ctx = gsap.context(() => {
        // ── Stele breathing ──────────────────────────────────────────────────
        const steleEl = containerRef.current?.querySelector('.stele-svg')
        if (steleEl) {
          gsap.to(steleEl, {
            scaleY: 1.014,
            scaleX: 1.006,
            duration: 5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            transformOrigin: 'bottom center',
          })
        }

        // ── Hero text sequence ───────────────────────────────────────────────
        const heroLines = containerRef.current?.querySelectorAll('.hero-whisper-line')
        if (heroLines?.length) {
          gsap.fromTo(
            heroLines,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 1.1, stagger: 0.55, ease: 'power2.out', delay: 1.0 }
          )
        }

        const heroTag = containerRef.current?.querySelector('.hero-tagline')
        if (heroTag) {
          gsap.fromTo(
            heroTag,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1.3, ease: 'power2.out', delay: 3.2 }
          )
        }

        // ── Crack animation — scroll through scene 1 ────────────────────────
        const crackEls = [
          crack1Ref.current,
          crack2Ref.current,
          crack3Ref.current,
          crack4Ref.current,
        ].filter(Boolean) as SVGPathElement[]

        if (crackEls.length > 0) {
          crackEls.forEach((el) => {
            const len = el.getTotalLength()
            el.dataset.pathLen = String(len)
            gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
          })

          ST.create({
            trigger: '.scene-one',
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
            onUpdate: ({ progress }) => {
              crackEls.forEach((el) => {
                const len = parseFloat(el.dataset.pathLen ?? '0')
                const offset = len * Math.max(0, 1 - progress * 1.6)
                gsap.set(el, { strokeDashoffset: offset })
              })
              if (lightBleedRef.current) {
                gsap.set(lightBleedRef.current, {
                  opacity: Math.min(progress * 2, 0.75),
                })
              }
            },
          })
        }

        // ── Scroll-reveal for all .fade-up elements ──────────────────────────
        const fadeEls = containerRef.current?.querySelectorAll('.fade-up')
        if (fadeEls?.length) {
          fadeEls.forEach((el) => {
            const delay = parseFloat((el as HTMLElement).dataset.delay ?? '0')
            ST.create({
              trigger: el,
              start: 'top 82%',
              once: true,
              onEnter: () => {
                gsap.fromTo(
                  el,
                  { opacity: 0, y: 24 },
                  { opacity: 1, y: 0, duration: 0.9, delay, ease: 'power2.out' }
                )
              },
            })
          })
        }

        // ── Scene 4 white reveal ─────────────────────────────────────────────
        ST.create({
          trigger: '.scene-four',
          start: 'top 60%',
          once: true,
          onEnter: () => {
            const els = containerRef.current?.querySelectorAll('.scene-four .fade-in')
            if (els?.length) {
              gsap.fromTo(
                els,
                { opacity: 0 },
                { opacity: 1, duration: 1.4, stagger: 0.45, ease: 'power2.out' }
              )
            }
          },
        })

        // ── Timeline line drawing — scale a div from top ─────────────────────
        if (timelineLineRef.current) {
          gsap.set(timelineLineRef.current, { scaleY: 0, transformOrigin: 'top center' })
          ST.create({
            trigger: '.scene-six',
            start: 'top 65%',
            end: 'bottom 55%',
            scrub: 1.8,
            onUpdate: ({ progress }) => {
              if (timelineLineRef.current) {
                gsap.set(timelineLineRef.current, { scaleY: progress })
              }
            },
          })
        }

        // ── Count-up numbers ─────────────────────────────────────────────────
        const countEls = containerRef.current?.querySelectorAll('[data-count-to]')
        countEls?.forEach((el) => {
          const target = parseInt(el.getAttribute('data-count-to') ?? '0', 10)
          const obj = { val: 0 }
          ST.create({
            trigger: el,
            start: 'top 80%',
            once: true,
            onEnter: () => {
              gsap.to(obj, {
                val: target,
                duration: 1.5,
                ease: 'power2.out',
                onUpdate: () => {
                  el.textContent = Math.round(obj.val).toLocaleString()
                },
              })
            },
          })
        })

        // ── Closing scene subtle parallax ────────────────────────────────────
        ST.create({
          trigger: '.scene-nine',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: ({ progress }) => {
            const bg = containerRef.current?.querySelector('.closing-grain') as HTMLElement
            if (bg) {
              gsap.set(bg, { y: progress * 30 })
            }
          },
        })
      }, containerRef)

      return () => {
        ctx.revert()
        ST.getAll().forEach((t) => t.kill())
      }
    }

    const cleanup = init()
    return () => {
      cleanup.then((fn) => fn?.())
    }
  }, [])

  // ── Testimonial carousel ───────────────────────────────────────────────────
  const nextTestimonial = useCallback(() => {
    setActiveTestimonial((i) => (i + 1) % TESTIMONIALS.length)
  }, [])

  const prevTestimonial = useCallback(() => {
    setActiveTestimonial((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }, [])

  const t = TESTIMONIALS[activeTestimonial]

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Custom cursor */}
      <div ref={cursorDotRef} className="cursor-dot" />
      <div
        ref={cursorRingRef}
        className={`cursor-ring ${videoHover ? 'is-playing' : ''}`}
      />

      <div ref={containerRef}>
        {/* ═══════════════════════════════════════════════════════════════════
            SCENE ONE — ACT ONE — THE ANCIENT WORLD
            1750 BC. Babylon. The world's first collections law. Carved in stone.
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="scene-one grain relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-black"
          aria-label="Act One — The Ancient World"
        >
          {/* Stele container */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <div className="relative" style={{ width: 'min(42vw, 340px)', maxHeight: '85vh' }}>
              <SteleSVG className="stele-svg w-full h-full object-contain" />

              {/* Crack overlay SVG — positioned over the stele */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 200 680"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Crack 1 — main, downward right */}
                <path
                  ref={crack1Ref}
                  d="M100 230 C108 262 104 298 115 332 C122 358 118 385 128 414 C133 430 144 445 142 468"
                  stroke="rgba(255,255,255,0.42)"
                  strokeWidth="0.7"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Crack 2 — downward left */}
                <path
                  ref={crack2Ref}
                  d="M100 230 C90 258 86 292 78 322 C72 346 78 372 68 398 C63 414 55 426 58 448"
                  stroke="rgba(255,255,255,0.32)"
                  strokeWidth="0.55"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Crack 3 — upward, toward arch top */}
                <path
                  ref={crack3Ref}
                  d="M100 230 C97 208 110 192 105 174 C100 158 114 148 109 132"
                  stroke="rgba(255,255,255,0.28)"
                  strokeWidth="0.5"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Crack 4 — small branch right */}
                <path
                  ref={crack4Ref}
                  d="M115 332 C128 322 144 318 158 324"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="0.4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>

              {/* Light bleed — radiates from crack origin */}
              <div
                ref={lightBleedRef}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 35% 40% at 50% 34%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.12) 40%, transparent 70%)',
                  opacity: 0,
                  mixBlendMode: 'screen',
                }}
              />
            </div>
          </div>

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(8,8,7,0.7) 100%)',
            }}
          />

          {/* Hero text */}
          <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
            {/* Whisper lines */}
            <div className="mb-8 space-y-2">
              {['1750 BC. Babylon.', "The world's first collections law.", 'Carved in stone.'].map(
                (line, i) => (
                  <p
                    key={i}
                    className="hero-whisper-line type-mono text-white/70 text-xs md:text-sm tracking-widest"
                    style={{ opacity: 0 }}
                  >
                    {line}
                  </p>
                )
              )}
            </div>

            {/* Main tagline */}
            <p
              className="hero-tagline type-serif text-white text-2xl md:text-3xl lg:text-4xl"
              style={{ opacity: 0 }}
            >
              The problem is older than you think.
            </p>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
            <div className="w-px h-10 bg-white/50 animate-pulse" />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SCENE TWO — ACT TWO — SHYLOCK'S WORLD
            Venice. 1596. He was right. The world made him the villain.
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="scene-two grain-heavy relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#0e0d0b' }}
          aria-label="Act Two — Shylock's World"
        >
          {/* Archival background texture — suggests a Renaissance painting */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 45%, #1a1714 0%, #0a0908 60%, #070605 100%)',
            }}
          />

          {/* Horizontal ruled lines — parchment / ledger feeling */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(255,255,255,0.6) 28px, rgba(255,255,255,0.6) 29px)',
            }}
          />

          {/* Vignette — heavy corners */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 65% 65% at 50% 50%, transparent 30%, rgba(5,4,3,0.82) 100%)',
            }}
          />

          <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
            {/* Scene timestamp */}
            <p className="fade-up type-label text-white/25 mb-14 tracking-[0.2em]" data-delay="0">
              Venice · 1596
            </p>

            {/* Italic serif — the weight of literature */}
            <div className="space-y-6 mb-12">
              {[
                'He was right.',
                'The debt was real.',
                'The contract was legal.',
              ].map((line, i) => (
                <p
                  key={i}
                  className="fade-up type-serif text-white text-2xl md:text-3xl lg:text-4xl"
                  data-delay={String(i * 0.25)}
                  style={{ opacity: 0 }}
                >
                  {line}
                </p>
              ))}
            </div>

            <p
              className="fade-up type-serif text-white/55 text-xl md:text-2xl lg:text-3xl mb-16"
              data-delay="0.9"
              style={{ opacity: 0 }}
            >
              And still — the world made him the villain.
            </p>

            <p
              className="fade-up type-body text-white/40 text-sm md:text-base max-w-md mx-auto leading-relaxed"
              data-delay="1.2"
              style={{ opacity: 0 }}
            >
              Every lender since has inherited that story.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SCENE THREE — ACT THREE — THE MODERN PROBLEM
            A COO. 80,000 accounts. 3,000 touched this month.
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="scene-three grain relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#0c0c0a' }}
          aria-label="Act Three — The Modern Problem"
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 1px, transparent 1px, transparent 80px)',
            }}
          />

          <div className="relative z-10 w-full max-w-2xl mx-auto px-6 md:px-10">
            {/* Dashboard-like monospace presentation */}
            <div className="space-y-1 mb-16">
              {[
                { text: '> Your book grew.', delay: 0 },
                { text: '> Your collections infrastructure didn\'t.', delay: 0.2 },
              ].map(({ text, delay }, i) => (
                <p
                  key={i}
                  className="fade-up type-mono text-white/50 text-sm md:text-base"
                  data-delay={String(delay)}
                  style={{ opacity: 0 }}
                >
                  {text}
                </p>
              ))}
            </div>

            {/* The numbers — the brief's exact spec */}
            <div className="space-y-8 mb-16">
              <div className="fade-up" data-delay="0.5" style={{ opacity: 0 }}>
                <p className="type-headline text-white text-6xl md:text-8xl lg:text-9xl tracking-tight">
                  80,000
                </p>
                <p className="type-mono text-white/35 text-xs mt-2 tracking-widest">
                  delinquent accounts
                </p>
              </div>

              <div className="fade-up" data-delay="0.8" style={{ opacity: 0 }}>
                <p className="type-headline text-white/45 text-4xl md:text-5xl tracking-tight">
                  A team that can touch 3,000 this month.
                </p>
              </div>
            </div>

            <div
              className="fade-up type-mono text-white/35 text-sm leading-loose border-l border-white/10 pl-4"
              data-delay="1.1"
              style={{ opacity: 0 }}
            >
              <p>The board presentation is in three weeks.</p>
            </div>

            {/* Connecting to history */}
            <div className="mt-20 space-y-2 fade-up" data-delay="1.4" style={{ opacity: 0 }}>
              <p className="type-serif text-white/30 text-lg md:text-xl">
                Hammurabi tried to solve this in 1750 BC.
              </p>
              <p className="type-serif text-white/30 text-lg md:text-xl">
                Shylock tried in 1596.
              </p>
              <p className="type-serif text-white/55 text-xl md:text-2xl mt-4">
                The problem is still here.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SCENE FOUR — ACT FOUR — THE RESOLUTION
            Pure white emerges. The new era of collections.
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="scene-four relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white"
          aria-label="Act Four — The Resolution"
        >
          {/* Subtle top gradient — light emerging from above */}
          <div
            className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(244,242,240,0.4), transparent)',
            }}
          />

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            {/* The most important sentence on the site */}
            <h1
              className="fade-in type-headline text-stone-black leading-none mb-8"
              style={{
                fontSize: 'clamp(3.5rem, 9vw, 9.5rem)',
                letterSpacing: '-0.03em',
                opacity: 0,
              }}
            >
              The new era<br />of collections.
            </h1>

            <p
              className="fade-in type-body text-mid text-lg md:text-xl mb-14 max-w-lg mx-auto"
              style={{ opacity: 0 }}
            >
              AI agents built specifically for collections.
            </p>

            <div className="fade-in" style={{ opacity: 0 }}>
              <Link href="/contact" className="btn-cta btn-cta-dark">
                Talk to us →
              </Link>
            </div>

            {/* Compliance bar */}
            <div className="fade-in mt-16" style={{ opacity: 0 }}>
              <p className="type-label text-mid/60 text-xs tracking-widest leading-loose">
                FCA · CBN · RBI · CFPB · OJK · NCR · CBK · SAMA · CBE · BSP · MAS · BCB
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SCENE FIVE — PRODUCT IN ACTION
            Dark returns briefly. See Caantin in action.
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="scene-five grain relative py-24 md:py-32 overflow-hidden"
          style={{ backgroundColor: '#0e0d0b' }}
          aria-label="Product in action"
        >
          {/* Faint ancient texture returning */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: '200px',
            }}
          />

          <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="mb-10 md:mb-14">
              <h2 className="fade-up type-headline-lg text-white text-3xl md:text-5xl mb-3" style={{ opacity: 0 }}>
                See Caantin in action.
              </h2>
              <p className="fade-up type-body text-silver text-sm md:text-base" data-delay="0.2" style={{ opacity: 0 }}>
                One example of a collections workflow on Caantin.
              </p>
            </div>

            {/* Video placeholder */}
            <div
              className="relative w-full aspect-video bg-ancient overflow-hidden"
              onMouseEnter={() => setVideoHover(true)}
              onMouseLeave={() => setVideoHover(false)}
              style={{ cursor: 'none' }}
              role="button"
              tabIndex={0}
              aria-label="Play product demo video"
            >
              {/* Placeholder: black and white archival treatment */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 70% at 50% 50%, #1e1c1a 0%, #0a0908 100%)',
                }}
              />

              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.3) 3px, rgba(255,255,255,0.3) 4px)',
                }}
              />

              {/* Centre label — no UI play button, cursor becomes the action */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="type-label text-white/20 text-xs tracking-widest">
                  — Video placeholder —
                </p>
                <p className="type-mono text-white/10 text-xs mt-2">
                  1920 × 1080 · black and white · 60–90 seconds
                </p>
              </div>

              {/* Hover reveal hint */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{ opacity: videoHover ? 0.06 : 0 }}
              >
                <div className="absolute inset-0 bg-white" />
              </div>

              {/* Corner marks — film frame aesthetic */}
              {(['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'] as const).map((pos, i) => (
                <div
                  key={i}
                  className={`absolute ${pos} w-4 h-4 border-white/15 ${
                    i < 2 ? 'border-t' : 'border-b'
                  } ${i % 2 === 0 ? 'border-l' : 'border-r'}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SCENE SIX — WHAT IT DOES
            White. One agent. Every account. Timeline draws itself on scroll.
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="scene-six relative py-28 md:py-40 bg-white overflow-hidden"
          aria-label="What Caantin does"
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            {/* Section headline */}
            <h2
              className="fade-up type-headline text-stone-black mb-20 md:mb-28"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 6.5rem)',
                letterSpacing: '-0.03em',
                opacity: 0,
              }}
            >
              One agent.<br />Every account.
            </h2>

            {/* Timeline */}
            <div className="relative max-w-2xl">
              {/* Track line (static, faint) */}
              <div className="absolute top-0 bottom-0 left-0 w-px bg-stone/15" />

              {/* Animated fill — scaleY from 0 → 1 on scroll */}
              <div
                ref={timelineLineRef}
                className="absolute top-0 bottom-0 left-0 w-px bg-stone-black origin-top"
              />

              {/* Steps — padded left to clear the line */}
              <div className="pl-10 md:pl-14 flex flex-col gap-16 md:gap-24">
                {[
                  {
                    num: '01',
                    title: 'Agents that do the work.',
                    body: 'Contact. Negotiate. Collect.\nAutonomously. At any scale.',
                  },
                  {
                    num: '02',
                    title: 'Works within your regulatory environment.',
                    body: 'Every conversation logged.\nEvery interaction auditable.\nCompliant in every market we operate in.',
                  },
                  {
                    num: '03',
                    title: 'You only pay when money moves.',
                    body: 'No recovery. No fee.',
                  },
                ].map(({ num, title, body }, i) => (
                  <div
                    key={i}
                    className="relative fade-up"
                    data-delay={String(i * 0.2)}
                    style={{ opacity: 0 }}
                  >
                    {/* Node — sits on the line */}
                    <div className="absolute -left-10 md:-left-14 top-1 w-2.5 h-2.5 rounded-full bg-stone-black border-[2px] border-white ring-1 ring-stone/20 translate-x-[-4px]" />
                    <p className="type-label text-mid text-xs mb-3 tracking-[0.15em]">{num}</p>
                    <h3 className="type-headline-lg text-stone-black text-xl md:text-3xl mb-3 leading-snug">
                      {title}
                    </h3>
                    <p className="type-body text-mid text-sm md:text-base whitespace-pre-line leading-relaxed">
                      {body}
                    </p>
                  </div>
                ))}

                {/* Terminal node + closing statement */}
                <div
                  className="relative fade-up flex items-center gap-5"
                  data-delay="0.6"
                  style={{ opacity: 0 }}
                >
                  <div className="absolute -left-10 md:-left-14 top-1/2 -translate-y-1/2 translate-x-[-5px] w-3.5 h-3.5 rounded-full bg-stone-black flex-shrink-0" />
                  <p className="type-headline text-stone-black" style={{ fontSize: 'clamp(1.5rem, 3vw, 3rem)', letterSpacing: '-0.02em' }}>
                    We collect. Full stop.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SCENE SEVEN — COMPLIANCE
            Dark. Ordered. Governed. Compliant everywhere we operate.
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="scene-seven grain relative py-28 md:py-40 overflow-hidden"
          style={{ backgroundColor: '#0d0c0a' }}
          aria-label="Compliance"
        >
          {/* Faint grid lines — structured, governed */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />

          <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
            {/* Header */}
            <div className="mb-16 md:mb-24 max-w-2xl">
              <h2
                className="fade-up type-headline text-white mb-6"
                style={{ fontSize: 'clamp(2rem, 5vw, 5.5rem)', letterSpacing: '-0.03em', opacity: 0 }}
              >
                Compliant everywhere<br />we operate.
              </h2>
              <p className="fade-up type-body text-silver text-sm md:text-base leading-relaxed" data-delay="0.2" style={{ opacity: 0 }}>
                We don&apos;t work around your regulator.
                <br />
                We work within them. Always.
              </p>
            </div>

            {/* Regulator grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-10 gap-y-10 mb-20">
              {Object.entries(REGULATORS).map(([region, regs], i) => (
                <div
                  key={region}
                  className="fade-up"
                  data-delay={String(i * 0.1)}
                  style={{ opacity: 0 }}
                >
                  <p className="type-label text-white/25 text-xs mb-4 tracking-[0.15em]">
                    {region}
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-2">
                    {regs.map((reg) => (
                      <span key={reg} className="type-mono text-white/60 text-xs">
                        {reg}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer note */}
            <div
              className="fade-up border-t border-white/10 pt-10 grid md:grid-cols-2 gap-6"
              data-delay="0.5"
              style={{ opacity: 0 }}
            >
              <p className="type-body text-silver text-sm leading-relaxed">
                New market. Same standards.
              </p>
              <div className="space-y-1">
                {[
                  'Every conversation logged.',
                  'Every interaction auditable.',
                  'Full audit trail. Always on.',
                ].map((line) => (
                  <p key={line} className="type-mono text-white/35 text-xs">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SCENE EIGHT — TESTIMONIALS
            White. Lenders trust Caantin.
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="scene-eight relative py-28 md:py-40 bg-white overflow-hidden"
          aria-label="Client testimonials"
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <h2
              className="fade-up type-headline text-stone-black mb-16 md:mb-20"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 4rem)', letterSpacing: '-0.03em', opacity: 0 }}
            >
              Lenders trust Caantin.
            </h2>

            {/* Carousel */}
            <div className="fade-up relative" data-delay="0.2" style={{ opacity: 0 }}>
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
                {/* Left — visual artifact */}
                <div
                  className="relative aspect-[4/5] md:aspect-square max-w-sm overflow-hidden"
                  style={{ background: '#0f0e0d' }}
                >
                  {/* Archival artifact placeholder */}
                  {t.artifact === 'ledger' ? (
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      {/* Ledger lines */}
                      <div className="space-y-2 opacity-20">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div key={i} className="flex gap-4 items-center">
                            <div
                              className="h-px bg-white flex-1"
                              style={{ opacity: 0.3 + (i % 3) * 0.15 }}
                            />
                            <div className="type-mono text-white text-xs opacity-60">
                              {String(1000 + i * 47).padStart(6, '0')}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 opacity-10 type-mono text-white text-xs">
                        LEDGER · RECOVERED ACCOUNTS
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Ancient coin / seal */}
                      <div
                        className="w-48 h-48 rounded-full border border-white/10 flex items-center justify-center"
                        style={{ background: 'rgba(255,255,255,0.03)' }}
                      >
                        <svg
                          viewBox="0 0 120 120"
                          className="w-36 h-36 opacity-15"
                          fill="none"
                          stroke="white"
                          strokeWidth="0.5"
                        >
                          <circle cx="60" cy="60" r="55" />
                          <circle cx="60" cy="60" r="48" />
                          <text
                            x="60"
                            y="56"
                            textAnchor="middle"
                            fontSize="7"
                            fill="white"
                            stroke="none"
                            fontFamily="monospace"
                            letterSpacing="2"
                          >
                            CAANTIN
                          </text>
                          <text
                            x="60"
                            y="68"
                            textAnchor="middle"
                            fontSize="6"
                            fill="white"
                            stroke="none"
                            fontFamily="monospace"
                            letterSpacing="1"
                          >
                            MMXXVI
                          </text>
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Grain over artifact */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E\")",
                      backgroundSize: '200px',
                    }}
                  />
                </div>

                {/* Right — quote */}
                <div className="flex flex-col justify-between py-4 md:py-8">
                  <blockquote
                    className="type-serif text-stone-black text-xl md:text-2xl lg:text-3xl leading-snug mb-10"
                    style={{ transition: 'opacity 0.6s ease' }}
                  >
                    {t.quote}
                  </blockquote>

                  <div>
                    <p className="type-serif text-stone-black text-base font-normal not-italic mb-1">
                      {t.name}
                    </p>
                    <p className="type-label text-mid text-xs tracking-[0.12em]">
                      {t.title} · {t.company}
                    </p>
                  </div>
                </div>
              </div>

              {/* Carousel controls */}
              {TESTIMONIALS.length > 1 && (
                <div className="flex items-center gap-5 mt-12">
                  <button
                    onClick={prevTestimonial}
                    className="w-10 h-10 border border-stone/30 flex items-center justify-center text-stone-black hover:border-stone-black transition-colors duration-300 cursor-none"
                    aria-label="Previous testimonial"
                  >
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path d="M5 1L1 5L5 9M1 5H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </button>

                  {/* Dots */}
                  <div className="flex gap-2">
                    {TESTIMONIALS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTestimonial(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-none ${
                          i === activeTestimonial ? 'bg-stone-black w-6' : 'bg-stone/30'
                        }`}
                        aria-label={`Testimonial ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextTestimonial}
                    className="w-10 h-10 border border-stone/30 flex items-center justify-center text-stone-black hover:border-stone-black transition-colors duration-300 cursor-none"
                    aria-label="Next testimonial"
                  >
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path d="M9 1L13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SCENE NINE — CLOSING
            Dark. Full bleed. One last time. Put Caantin to work.
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="scene-nine grain-heavy relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#080807' }}
          aria-label="Closing — Put Caantin to work"
        >
          {/* Ancient texture — final time, quiet and still */}
          <div
            className="closing-grain absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 80% at 50% 50%, #111009 0%, #080807 70%, #040403 100%)',
            }}
          />

          {/* Barely-stirring texture on hover handled by CSS */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.2) 40px, rgba(255,255,255,0.2) 41px)',
            }}
          />

          <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
            <p
              className="fade-up type-label text-white/20 text-xs tracking-[0.2em] mb-10"
              style={{ opacity: 0 }}
            >
              Collections · Compliance · Scale
            </p>

            <h2
              className="fade-up type-headline text-white mb-12"
              style={{
                fontSize: 'clamp(3rem, 8vw, 8rem)',
                letterSpacing: '-0.03em',
                lineHeight: '0.92',
                opacity: 0,
              }}
              data-delay="0.2"
            >
              Put Caantin<br />to work.
            </h2>

            <div className="fade-up" data-delay="0.5" style={{ opacity: 0 }}>
              <Link href="/contact" className="btn-cta btn-cta-light text-sm">
                Talk to us →
              </Link>
            </div>

            {/* Compliance bar — closing echo */}
            <div className="fade-up mt-16" data-delay="0.7" style={{ opacity: 0 }}>
              <p className="type-label text-white/15 text-xs tracking-widest leading-loose">
                We succeed when you do. No recovery. No fee.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
