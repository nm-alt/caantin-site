import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import HomepageFilm from '@/components/HomepageFilm'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Caantin · The New Era of Collections',
  description:
    'AI agents built specifically for collections. Autonomous. Compliant. Infinite. We succeed when you do — no recovery, no fee.',
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
