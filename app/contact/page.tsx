import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import SpeakToMatt from '@/components/SpeakToMatt'

export const metadata: Metadata = {
  title: 'Contact — Shylock',
  description:
    'Speak to a Shylock agent now. Enter your number and get a call in 10 seconds.',
  alternates: { canonical: 'https://shylock.ai/contact' },
}

export default function Contact() {
  return (
    <>
      <Nav />
      <main>
        <section className="bg-stone-black min-h-screen flex items-center justify-center py-32">
          <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
            <div className="max-w-lg mx-auto text-center">
              <h1 className="type-headline text-white text-display-lg mb-6">
                Speak to an agent now.
              </h1>
              <p className="type-body text-white/50 text-base mb-14">
                Enter your number. Shylock calls you in 10 seconds.
              </p>
              <SpeakToMatt variant="dark" />
              <div className="mt-16 pt-10 border-t border-white/10">
                <p className="type-label text-white/30 mb-6">Or leave your details</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
