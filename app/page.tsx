import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import HomepageFilm from '@/components/HomepageFilm'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'AirDial — A call center in your pocket.',
  description:
    'Live in 3 minutes. Priced from $0.02/min. AI agents that answer every call and message — in Lagos, Nairobi, Mexico City, Johannesburg, Kampala, Dar es Salaam, Kigali, and Accra.',
  alternates: {
    canonical: 'https://caantin.ai',
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
