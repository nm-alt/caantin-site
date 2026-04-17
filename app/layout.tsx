import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { PostHogProvider } from './providers'
import PostHogPageView from './PostHogPageView'

// V2 — Inter replaces DM Sans. Heavy weights (700–900) carry the brand.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

// V2 — JetBrains Mono replaces Space Mono. Sharper utility.
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://caantin.ai'),
  title: 'AirDial — A call center in your pocket.',
  description:
    'Live in 3 minutes. Priced from $0.02/min. AI agents that take every call and message — in Lagos, Nairobi, Mexico City, Johannesburg, Kampala, Dar es Salaam, Kigali, and Accra.',
  keywords: [
    'AI voice agents',
    'AI call center',
    'AI calling platform',
    'WhatsApp AI agents',
    'conversational AI',
    'AI agents Nigeria',
    'AI agents Kenya',
    'AI agents Mexico',
    'AI agents South Africa',
    'AirDial',
  ],
  openGraph: {
    title: 'AirDial — A call center in your pocket.',
    description:
      'Every call, every customer, handled. Live in 3 minutes. Live in 8 countries.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AirDial — A call center in your pocket.',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AirDial — A call center in your pocket.',
    description:
      'Live in 3 minutes. Priced from $0.02/min. AI agents across voice, WhatsApp, SMS, and email.',
  },
  alternates: {
    canonical: 'https://caantin.ai',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-pink text-pink-ink antialiased overflow-x-hidden">
        <PostHogProvider>
          <PostHogPageView />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@graph': [
                  {
                    '@type': 'Organization',
                    '@id': 'https://caantin.ai/#organization',
                    name: 'AirDial',
                    url: 'https://caantin.ai',
                    description:
                      'Communication infrastructure for every business on earth. A call center in your pocket.',
                    email: 'hello@shylock.ai',
                    areaServed: [
                      'Mexico',
                      'South Africa',
                      'Nigeria',
                      'Kenya',
                      'Uganda',
                      'Tanzania',
                      'Rwanda',
                      'Ghana',
                    ],
                  },
                  {
                    '@type': 'SoftwareApplication',
                    '@id': 'https://caantin.ai/#product',
                    name: 'AirDial',
                    applicationCategory: 'BusinessApplication',
                    operatingSystem: 'Web',
                    url: 'https://app.shylock.ai',
                    description:
                      'A call center in your pocket. AI agents that call, message, and respond across voice, WhatsApp, SMS, and email. Live in 8 countries.',
                    featureList: [
                      'AI agent studio',
                      'Multi-channel campaigns (voice, WhatsApp, SMS, email)',
                      'Real-time transcripts and recordings',
                      'Automated contact strategies',
                      'Outcome tracking and dashboards',
                    ],
                    provider: { '@id': 'https://caantin.ai/#organization' },
                  },
                  {
                    '@type': 'WebSite',
                    '@id': 'https://caantin.ai/#website',
                    url: 'https://caantin.ai',
                    name: 'AirDial',
                    publisher: { '@id': 'https://caantin.ai/#organization' },
                  },
                ],
              }),
            }}
          />
          {children}
        </PostHogProvider>

        {/* LinkedIn Insight Tag */}
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
