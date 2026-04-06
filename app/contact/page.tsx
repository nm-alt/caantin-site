import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import CallbackWidget from '@/components/CallbackWidget'

export const metadata: Metadata = {
  title: 'Contact — Shylock',
  description:
    'Speak to us now. Enter your number and Matt calls you back in under a minute.',
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
                Speak to Matt now.
              </h1>
              <p className="type-body text-white/50 text-base mb-14">
                Enter your number. Matt calls you in under a minute.
              </p>
              <CallbackWidget variant="dark" />
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
