import type { Metadata } from 'next'
import {
  Barlow,
  Barlow_Condensed,
  Playfair_Display,
  Space_Mono,
} from 'next/font/google'
import Script from 'next/script'
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

        {/* LinkedIn Insight Tag — fires on every page */}
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "7385908";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript"; b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=7385908&fmt=gif"
          />
        </noscript>
      </body>
    </html>
  )
}
