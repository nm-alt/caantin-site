import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import HomepageFilm from '@/components/HomepageFilm'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Shylock · The Most Compliant AI for Collections',
  description:
    'The world vilified lenders for 500 years. Introducing Shylock — the world\'s most compliant and effective AI for collections.',
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
