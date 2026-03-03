'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TESTIMONIALS } from '@/lib/testimonials'

// ─── Compliance data ─────────────────────────────────────────────────────────
const REGULATORS = {
  AFRICA: ['CBN', 'FCCPC', 'CBK', 'NCR', 'CBE', 'BoG'],
  EUROPE: ['FCA', 'ACPR', 'BaFin'],
  'ASIA PACIFIC': ['RBI', 'OJK', 'BSP', 'MAS', 'CBUAE'],
  AMERICAS: ['CFPB', 'BCB', 'CNBV'],
  'MIDDLE EAST': ['SAMA', 'CBUAE'],
}

// ─── HomepageFilm ────────────────────────────────────────────────────────────
export default function HomepageFilm() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroCanvasRef = useRef<HTMLCanvasElement>(null)
  const heroImageRef = useRef<HTMLImageElement | null>(null)
  const timelineLineRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const closingCanvasRef = useRef<HTMLCanvasElement>(null)

  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [heroImageLoaded, setHeroImageLoaded] = useState(false)

  // ── Load hero portrait image ─────────────────────────────────────────────
  useEffect(() => {
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      heroImageRef.current = img
      setHeroImageLoaded(true)
    }
    img.src = '/irving-shylock.jpg'
  }, [])

  // ── Hero canvas: cursor-reveal interaction ───────────────────────────────
  useEffect(() => {
    const canvas = heroCanvasRef.current
    if (!canvas || !heroImageLoaded || !heroImageRef.current) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = heroImageRef.current
    let animId: number
    let mouseX = -9999
    let mouseY = -9999
    let isMouseInside = false

    // Mask canvas for the reveal effect
    const maskCanvas = document.createElement('canvas')
    const maskCtx = maskCanvas.getContext('2d')!

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      maskCanvas.width = canvas.width
      maskCanvas.height = canvas.height
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      maskCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const drawCover = (
      target: CanvasRenderingContext2D,
      w: number,
      h: number
    ) => {
      const imgAspect = img.width / img.height
      const canvasAspect = w / h
      let dw: number, dh: number, dx: number, dy: number

      if (imgAspect > canvasAspect) {
        dh = h
        dw = h * imgAspect
        dx = (w - dw) / 2
        dy = 0
      } else {
        dw = w
        dh = w / imgAspect
        dx = 0
        dy = (h - dh) / 2
      }

      target.drawImage(img, dx, dy, dw, dh)
    }

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      ctx.clearRect(0, 0, w, h)

      // Draw portrait very dark (barely visible base layer)
      ctx.save()
      ctx.filter = 'grayscale(100%) contrast(1.3) brightness(0.08)'
      drawCover(ctx, w, h)
      ctx.restore()

      // If cursor is inside, draw a brighter version clipped to a radial mask
      if (isMouseInside) {
        // Create the mask
        maskCtx.clearRect(0, 0, w, h)
        const gradient = maskCtx.createRadialGradient(
          mouseX, mouseY, 0,
          mouseX, mouseY, 180
        )
        gradient.addColorStop(0, 'rgba(255,255,255,0.85)')
        gradient.addColorStop(0.4, 'rgba(255,255,255,0.4)')
        gradient.addColorStop(0.7, 'rgba(255,255,255,0.1)')
        gradient.addColorStop(1, 'rgba(255,255,255,0)')
        maskCtx.fillStyle = gradient
        maskCtx.fillRect(0, 0, w, h)

        // Draw brighter portrait
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        ctx.filter = 'grayscale(100%) contrast(1.4) brightness(0.45)'
        drawCover(ctx, w, h)

        // Apply the mask
        ctx.globalCompositeOperation = 'destination-in'
        ctx.drawImage(maskCanvas, 0, 0, w, h)
        ctx.restore()

        // Re-draw the dark base underneath
        ctx.save()
        ctx.globalCompositeOperation = 'destination-over'
        ctx.filter = 'grayscale(100%) contrast(1.3) brightness(0.08)'
        drawCover(ctx, w, h)
        ctx.restore()
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      isMouseInside = true
    }

    const onMouseLeave = () => {
      isMouseInside = false
    }

    const loop = () => {
      draw()
      animId = requestAnimationFrame(loop)
    }

    resize()
    animId = requestAnimationFrame(loop)

    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animId)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', resize)
    }
  }, [heroImageLoaded])

  // ── Closing canvas: same portrait, barely visible ────────────────────────
  useEffect(() => {
    const canvas = closingCanvasRef.current
    if (!canvas || !heroImageLoaded || !heroImageRef.current) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = heroImageRef.current

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      ctx.clearRect(0, 0, w, h)

      const imgAspect = img.width / img.height
      const canvasAspect = w / h
      let dw: number, dh: number, dx: number, dy: number

      if (imgAspect > canvasAspect) {
        dh = h
        dw = h * imgAspect
        dx = (w - dw) / 2
        dy = 0
      } else {
        dw = w
        dh = w / imgAspect
        dx = 0
        dy = (h - dh) / 2
      }

      ctx.save()
      ctx.filter = 'grayscale(100%) contrast(1.3) brightness(0.06)'
      ctx.drawImage(img, dx, dy, dw, dh)
      ctx.restore()
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [heroImageLoaded])

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

  // ── GSAP animations ──────────────────────────────────────────────────────
  useEffect(() => {
    let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ST)
      ScrollTrigger = ST

      const ctx = gsap.context(() => {
        // ── Hero text sequence ─────────────────────────────────────────────
        const heroText = containerRef.current?.querySelector('.hero-text')
        if (heroText) {
          gsap.fromTo(
            heroText,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1.8, ease: 'power2.out', delay: 0.8 }
          )
        }

        const heroCta = containerRef.current?.querySelector('.hero-cta')
        if (heroCta) {
          gsap.fromTo(
            heroCta,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 2.0 }
          )
        }

        const heroCompliance = containerRef.current?.querySelector('.hero-compliance')
        if (heroCompliance) {
          gsap.fromTo(
            heroCompliance,
            { opacity: 0 },
            { opacity: 1, duration: 1.0, ease: 'power2.out', delay: 2.6 }
          )
        }

        // ── Scroll-reveal for all .fade-up elements ────────────────────────
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

        // ── Timeline line drawing ──────────────────────────────────────────
        if (timelineLineRef.current) {
          gsap.set(timelineLineRef.current, { scaleY: 0, transformOrigin: 'top center' })
          ST.create({
            trigger: '.scene-timeline',
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

        // ── Closing scene parallax ─────────────────────────────────────────
        ST.create({
          trigger: '.scene-closing',
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

  // ── Testimonial carousel ─────────────────────────────────────────────────
  const nextTestimonial = useCallback(() => {
    setActiveTestimonial((i) => (i + 1) % TESTIMONIALS.length)
  }, [])

  const prevTestimonial = useCallback(() => {
    setActiveTestimonial((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }, [])

  const t = TESTIMONIALS[activeTestimonial]

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Custom cursor */}
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorRingRef} className="cursor-ring" />

      <div ref={containerRef}>
        {/* ═══════════════════════════════════════════════════════════════════
            HERO — THE PORTRAIT
            Full viewport. Near black. Irving as Shylock.
            Cursor reveals the portrait. Darkness returns when cursor leaves.
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="scene-hero grain relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-black"
          aria-label="Hero — Shylock"
        >
          {/* Portrait canvas — full viewport */}
          <canvas
            ref={heroCanvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 1 }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(8,8,7,0.6) 100%)',
              zIndex: 2,
            }}
          />

          {/* Hero text */}
          <div className="relative text-center px-6 max-w-3xl mx-auto" style={{ zIndex: 3 }}>
            <div
              className="hero-text mb-10"
              style={{ opacity: 0 }}
            >
              <p className="type-body text-white text-lg md:text-xl lg:text-2xl leading-relaxed mb-2">
                The world vilified lenders for 500 years.
              </p>
              <p className="type-body text-white text-lg md:text-xl lg:text-2xl leading-relaxed mb-6">
                Digital lenders today face the same mischaracterisation.
              </p>
              <p className="type-body text-white text-lg md:text-xl lg:text-2xl leading-relaxed">
                Introducing <span className="font-medium">Shylock</span> — the world&apos;s most compliant
              </p>
              <p className="type-body text-white text-lg md:text-xl lg:text-2xl leading-relaxed">
                and effective AI for collections.
              </p>
            </div>

            <div className="hero-cta" style={{ opacity: 0 }}>
              <Link href="/contact" className="btn-cta btn-cta-light">
                Talk to us →
              </Link>
            </div>

            {/* Compliance bar */}
            <div className="hero-compliance mt-12" style={{ opacity: 0 }}>
              <p className="type-label text-white/30 text-xs tracking-widest leading-loose">
                FCA · CBN · RBI · CFPB · OJK · NCR · CBK · SAMA · CBE · BSP · MAS · BCB
              </p>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20" style={{ zIndex: 3 }}>
            <div className="w-px h-10 bg-white/50 animate-pulse" />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2 — LET HIM LOOK TO HIS BOND
            Full bleed dark. Renaissance courtroom. One line of text.
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="scene-bond grain-heavy relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#080807' }}
          aria-label="Let him look to his bond"
        >
          {/* Courtroom image — full bleed, heavily darkened */}
          <div className="absolute inset-0">
            <Image
              src="/courtroom.jpg"
              alt=""
              fill
              className="object-cover"
              style={{
                filter: 'grayscale(100%) contrast(1.2) brightness(0.15)',
              }}
              priority={false}
            />
          </div>

          {/* Heavy vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 60% at 50% 50%, transparent 20%, rgba(8,8,7,0.85) 100%)',
            }}
          />

          <div className="relative z-10 text-center px-6">
            <p
              className="fade-up type-serif text-white text-3xl md:text-5xl lg:text-6xl"
              style={{ opacity: 0 }}
            >
              &ldquo;Let him look to his bond.&rdquo;
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 3 — SEE SHYLOCK WORK
            Dark background. Video placeholder.
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="scene-video grain relative py-24 md:py-32 overflow-hidden"
          style={{ backgroundColor: '#0e0d0b' }}
          aria-label="Product demo"
        >
          <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="mb-10 md:mb-14">
              <h2
                className="fade-up type-headline-lg text-white text-3xl md:text-5xl"
                style={{ opacity: 0 }}
              >
                See Shylock work.
              </h2>
            </div>

            {/* Video placeholder */}
            <div className="relative w-full aspect-video bg-ancient overflow-hidden">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src="/demo.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />

              {/* Corner marks */}
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
            SECTION 4 — ONE AGENT. EVERY ACCOUNT.
            White background. Vertical timeline. Scroll-animated.
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="scene-timeline relative py-28 md:py-40 bg-white overflow-hidden"
          aria-label="What Shylock does"
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            {/* Headline */}
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
              <div className="absolute top-0 bottom-0 left-0 w-px bg-stone/15" />

              <div
                ref={timelineLineRef}
                className="absolute top-0 bottom-0 left-0 w-px bg-stone-black origin-top"
              />

              <div className="pl-10 md:pl-14 flex flex-col gap-16 md:gap-24">
                {[
                  {
                    num: '01',
                    body: 'Contact. Negotiate. Collect.\nAutonomously. At any scale.',
                  },
                  {
                    num: '02',
                    body: 'Compliant in every market we operate in.\nEvery conversation logged.\nEvery interaction auditable.',
                  },
                  {
                    num: '03',
                    body: 'You pay when money moves.\nNot before. Not ever before.',
                  },
                ].map(({ num, body }, i) => (
                  <div
                    key={i}
                    className="relative fade-up"
                    data-delay={String(i * 0.2)}
                    style={{ opacity: 0 }}
                  >
                    <div className="absolute -left-10 md:-left-14 top-1 w-2.5 h-2.5 rounded-full bg-stone-black border-[2px] border-white ring-1 ring-stone/20 translate-x-[-4px]" />
                    <p className="type-label text-mid text-xs mb-3 tracking-[0.15em]">{num}</p>
                    <p className="type-body text-mid text-sm md:text-base whitespace-pre-line leading-relaxed">
                      {body}
                    </p>
                  </div>
                ))}

                {/* Terminal node */}
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
            SECTION 5 — COMPLIANCE
            Dark. "The law allows it. The court awards it."
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="scene-compliance grain relative py-28 md:py-40 overflow-hidden"
          style={{ backgroundColor: '#0d0c0a' }}
          aria-label="Compliance"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />

          <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="mb-16 md:mb-24 text-center">
              <p
                className="fade-up type-serif text-white text-2xl md:text-4xl lg:text-5xl leading-snug"
                style={{ opacity: 0 }}
              >
                &ldquo;The law allows it.
                <br />
                The court awards it.&rdquo;
              </p>
            </div>

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

            <div
              className="fade-up border-t border-white/10 pt-10"
              data-delay="0.5"
              style={{ opacity: 0 }}
            >
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
            SECTION 6 — TESTIMONIALS
            White. Lenders trust Shylock.
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="scene-testimonials relative py-28 md:py-40 bg-white overflow-hidden"
          aria-label="Client testimonials"
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <h2
              className="fade-up type-headline text-stone-black mb-16 md:mb-20"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 4rem)', letterSpacing: '-0.03em', opacity: 0 }}
            >
              Lenders trust Shylock.
            </h2>

            <div className="fade-up relative" data-delay="0.2" style={{ opacity: 0 }}>
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
                <div
                  className="relative aspect-[4/5] md:aspect-square max-w-sm overflow-hidden"
                  style={{ background: '#0f0e0d' }}
                >
                  {t.artifact === 'ledger' ? (
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <div className="space-y-2 opacity-20">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div key={i} className="flex gap-4 items-center">
                            <div className="h-px bg-white flex-1" style={{ opacity: 0.3 + (i % 3) * 0.15 }} />
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
                      <div
                        className="w-48 h-48 rounded-full border border-white/10 flex items-center justify-center"
                        style={{ background: 'rgba(255,255,255,0.03)' }}
                      >
                        <svg viewBox="0 0 120 120" className="w-36 h-36 opacity-15" fill="none" stroke="white" strokeWidth="0.5">
                          <circle cx="60" cy="60" r="55" />
                          <circle cx="60" cy="60" r="48" />
                          <text x="60" y="56" textAnchor="middle" fontSize="7" fill="white" stroke="none" fontFamily="monospace" letterSpacing="2">SHYLOCK</text>
                          <text x="60" y="68" textAnchor="middle" fontSize="6" fill="white" stroke="none" fontFamily="monospace" letterSpacing="1">MMXXVI</text>
                        </svg>
                      </div>
                    </div>
                  )}

                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E\")",
                      backgroundSize: '200px',
                    }}
                  />
                </div>

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
            CLOSING — PORTRAIT RETURNS
            Full bleed. Dark. Portrait barely visible. Waiting.
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="scene-closing grain-heavy relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#080807' }}
          aria-label="Closing — Put Shylock to work"
        >
          <canvas
            ref={closingCanvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 1 }}
          />

          <div className="closing-grain absolute inset-0 pointer-events-none" style={{ zIndex: 2 }} />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 20%, rgba(8,8,7,0.7) 100%)',
              zIndex: 2,
            }}
          />

          <div className="relative text-center px-6 max-w-3xl mx-auto" style={{ zIndex: 3 }}>
            <div className="space-y-2 mb-12">
              <p
                className="fade-up type-body text-white text-xl md:text-2xl lg:text-3xl"
                style={{ opacity: 0 }}
              >
                Shylock needed better tools.
              </p>
              <p
                className="fade-up type-body text-white text-xl md:text-2xl lg:text-3xl"
                data-delay="0.2"
                style={{ opacity: 0 }}
              >
                Now they exist.
              </p>
            </div>

            <div className="fade-up" data-delay="0.5" style={{ opacity: 0 }}>
              <Link href="/contact" className="btn-cta btn-cta-light text-sm">
                Put Shylock to work →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
