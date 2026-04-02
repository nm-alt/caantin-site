import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import HomepageFilm from '@/components/HomepageFilm'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Shylock — Communication infrastructure for AI',
  description:
    'Build AI agents that handle conversations across voice, WhatsApp, SMS, and email. One platform, every channel.',
  alternates: {
    canonical: 'https://shylock.ai',
  },
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HomepageFilm />
      </main>
      <Footer />
    </>
  )
}
