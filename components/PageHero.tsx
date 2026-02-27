import Reveal from '@/components/Reveal'

interface PageHeroProps {
  eyebrow?: string
  headline: React.ReactNode
  subtext?: React.ReactNode
  center?: boolean
  compact?: boolean
}

export default function PageHero({
  eyebrow,
  headline,
  subtext,
  center = false,
  compact = false,
}: PageHeroProps) {
  return (
    <section
      className={`grain-heavy relative overflow-hidden flex items-end ${
        compact ? 'min-h-[45vh] pb-16 md:pb-24' : 'min-h-[60vh] pb-20 md:pb-32'
      } ${center ? 'justify-center text-center' : ''}`}
      style={{ backgroundColor: '#0d0c0a' }}
    >
      {/* Faint stele texture behind */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 90% at 50% 100%, #151310 0%, #090807 60%, #050403 100%)',
        }}
      />

      {/* Horizontal ruled lines — archival feeling */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 32px, rgba(255,255,255,0.5) 32px, rgba(255,255,255,0.5) 33px)',
        }}
      />

      <div
        className={`relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full ${
          center ? 'flex flex-col items-center' : ''
        }`}
      >
        {eyebrow && (
          <Reveal delay={0}>
            <p className="type-label text-white/25 text-xs tracking-[0.2em] mb-6">
              {eyebrow}
            </p>
          </Reveal>
        )}

        <Reveal delay={0.1}>
          <h1
            className="type-headline text-white max-w-4xl"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 7.5rem)',
              lineHeight: '0.93',
              letterSpacing: '-0.03em',
            }}
          >
            {headline}
          </h1>
        </Reveal>

        {subtext && (
          <Reveal delay={0.3}>
            <p className="type-body text-silver text-base md:text-lg mt-8 max-w-xl leading-relaxed">
              {subtext}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
