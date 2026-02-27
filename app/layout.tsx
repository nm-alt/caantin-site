import type { Metadata } from 'next'
import {
  Barlow,
  Barlow_Condensed,
  Playfair_Display,
  Space_Mono,
} from 'next/font/google'
import './globals.css'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-barlow',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '900'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://caantin.ai'),
  title: 'Caantin · The New Era of Collections',
  description:
    'AI agents built specifically for collections. Autonomous. Compliant. Infinite. No recovery, no fee.',
  openGraph: {
    title: 'Caantin · The New Era of Collections',
    description:
      'AI agents built specifically for collections. Autonomous. Compliant. Infinite. No recovery, no fee.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Caantin — The New Era of Collections',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caantin · The New Era of Collections',
    description:
      'AI agents built specifically for collections. Autonomous. Compliant. Infinite. No recovery, no fee.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} ${playfair.variable} ${spaceMono.variable}`}
    >
      <body className="bg-stone-black text-near-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
