import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import HomepageFilm from '@/components/HomepageFilm'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Shylock — Communication infrastructure for AI',
  description:
    'Build and deploy AI agents that communicate with millions of your customers in minutes, not months. Voice, WhatsApp, SMS, email — one platform.',
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
