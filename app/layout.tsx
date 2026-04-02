import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { PostHogProvider } from './providers'
import PostHogPageView from './PostHogPageView'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://shylock.ai'),
  title: 'Shylock — AI voice and messaging platform',
  description:
    'Build AI agents that call, message, and collect across voice, WhatsApp, SMS, and email. One platform, every conversation.',
  keywords: [
    'AI voice agents',
    'voice AI platform',
    'AI calling platform',
    'AI WhatsApp agents',
    'conversational AI',
    'voice agent builder',
    'AI outbound calls',
    'AI collections',
    'AI sales calls',
    'Shylock AI',
  ],
  openGraph: {
    title: 'Shylock — AI voice and messaging platform',
    description:
      'Build AI agents that call, message, and collect across voice, WhatsApp, SMS, and email. One platform, every conversation.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shylock — AI voice and messaging platform',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shylock — AI voice and messaging platform',
    description:
      'Build AI agents that call, message, and collect across voice, WhatsApp, SMS, and email. One platform, every conversation.',
  },
  alternates: {
    canonical: 'https://shylock.ai',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-near-white text-stone-black antialiased overflow-x-hidden">
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
                    '@id': 'https://shylock.ai/#organization',
                    name: 'Shylock',
                    url: 'https://shylock.ai',
                    description:
                      'AI voice and messaging platform. Build agents that call, message, and collect across every channel.',
                    email: 'hello@shylock.ai',
                  },
                  {
                    '@type': 'SoftwareApplication',
                    '@id': 'https://shylock.ai/#product',
                    name: 'Shylock',
                    applicationCategory: 'BusinessApplication',
                    operatingSystem: 'Web',
                    url: 'https://app.shylock.ai',
                    description:
                      'AI voice and messaging platform. Build agents, launch campaigns, and manage conversations across voice, WhatsApp, SMS, and email.',
                    featureList: [
                      'AI agent studio',
                      'Multi-channel campaigns (voice, WhatsApp, SMS, email)',
                      'Real-time transcripts and recordings',
                      'Automated contact strategies',
                      'Outcome tracking and dashboards',
                    ],
                    provider: { '@id': 'https://shylock.ai/#organization' },
                  },
                  {
                    '@type': 'WebSite',
                    '@id': 'https://shylock.ai/#website',
                    url: 'https://shylock.ai',
                    name: 'Shylock',
                    publisher: { '@id': 'https://shylock.ai/#organization' },
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
