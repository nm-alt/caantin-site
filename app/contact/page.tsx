import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Contact · Caantin',
  description:
    'Tell us about your portfolio. We respond within one business day.',
  alternates: { canonical: 'https://caantin.ai/contact' },
}

export default function Contact() {
  return (
    <>
      <Nav />
      <main>
        <section
          className="grain-heavy relative min-h-screen flex items-center justify-center overflow-hidden py-32"
          style={{ backgroundColor: '#080807' }}
        >
          {/* Background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 70% at 50% 50%, #131210 0%, #080807 70%)',
            }}
          />

          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="max-w-lg">
              <Reveal>
                <p className="type-label text-white/25 text-xs tracking-[0.2em] mb-8">
                  Contact
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <h1
                  className="type-headline text-white mb-14"
                  style={{
                    fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                    letterSpacing: '-0.03em',
                    lineHeight: '0.93',
                  }}
                >
                  Tell us about
                  <br />
                  your portfolio.
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
