import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import SpeakToMatt from '@/components/SpeakToMatt'
import { MARKETS } from '@/lib/markets'

export const metadata: Metadata = {
  title: 'Contact — AirDial',
  description:
    'Speak to an AirDial agent now. Enter your number. Get a call in 10 seconds.',
  alternates: { canonical: 'https://caantin.ai/contact' },
}

export default function Contact() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero — pink surface, loud */}
        <section className="bg-pink pt-32 pb-20 md:pt-40 md:pb-28 border-b-2 border-pink-ink">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="max-w-3xl">
              <p className="type-label text-pink-ink/70 mb-5">10 seconds</p>
              <h1 className="type-display-xl text-pink-ink mb-8">
                Hear one.<br />Right now.
              </h1>
              <p className="type-body-lg text-pink-ink/80 max-w-xl font-semibold">
                Enter your number. An AirDial agent calls you in 10 seconds. Real call. Not a recording.
              </p>
            </div>
          </div>
        </section>

        {/* Two-column: live demo + contact form */}
        <section className="bg-pink py-20 md:py-28">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-px bg-pink-ink border-2 border-pink-ink">
              <div className="bg-pink-ink p-10 md:p-14">
                <p className="type-label text-pink mb-4">Speak to an agent</p>
                <h2 className="type-headline text-white text-3xl md:text-4xl mb-6">
                  Get a call in 10 seconds.
                </h2>
                <p className="type-body text-white/70 mb-10 font-medium">
                  Real call. Real agent. Hang up when you&apos;re done.
                </p>
                <SpeakToMatt variant="dark" />
              </div>

              <div className="bg-pink p-10 md:p-14">
                <p className="type-label text-pink-ink/70 mb-4">Or leave your details</p>
                <h2 className="type-headline text-pink-ink text-3xl md:text-4xl mb-6">
                  We&apos;ll reach out.
                </h2>
                <p className="type-body text-pink-ink/80 mb-10 font-medium">
                  Tell us about your book. We&apos;ll come back with a number.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Markets */}
        <section className="bg-pink-ink py-20 md:py-28">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <p className="type-label text-pink mb-5">Live in</p>
            <h2 className="type-display text-white mb-12 max-w-3xl">
              Eight countries.<br />One phone call away.
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border-2 border-white/10">
              {MARKETS.map((m) => (
                <div key={m.code} className="bg-pink-ink p-6">
                  <p className="type-mono text-pink text-xs font-bold mb-2">{m.code} {m.dialCode}</p>
                  <p className="type-headline text-white text-xl mb-1">{m.hub}</p>
                  <p className="type-body text-white/60 text-xs font-medium">{m.country}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
