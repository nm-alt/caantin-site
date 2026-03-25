import type { Metadata } from 'next'
import {
  Barlow,
  Barlow_Condensed,
  Playfair_Display,
  Space_Mono,
} from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { PostHogProvider } from './providers'
import PostHogPageView from './PostHogPageView'

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
  metadataBase: new URL('https://shylock.ai'),
  title: 'Shylock · AI-Powered Debt Collection for Africa',
  description:
    'AI voice agents that call borrowers in Pidgin, Swahili, Yoruba, French, English & Zulu — negotiate payment plans, and recover overdue loans automatically. Used by banks, fintechs, and MFIs across Africa.',
  keywords: [
    'AI debt collection',
    'automated debt recovery',
    'voice AI collections',
    'AI collections software Africa',
    'loan recovery automation',
    'multilingual debt collection',
    'AI call center collections',
    'NPL management AI',
    'fintech collections',
    'microfinance collections',
    'debt collection Nigeria',
    'debt collection Kenya',
    'Shylock AI',
  ],
  openGraph: {
    title: 'Shylock · AI-Powered Debt Collection for Africa',
    description:
      'AI voice agents that call borrowers in their language, negotiate payment plans, and recover overdue loans. No headcount. No call centre. Pay only when we collect.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shylock — AI-Powered Debt Collection',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shylock · AI-Powered Debt Collection for Africa',
    description:
      'AI voice agents that call borrowers in their language, negotiate payment plans, and recover overdue loans. Used by banks, fintechs, and MFIs across Africa.',
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
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} ${playfair.variable} ${spaceMono.variable}`}
    >
      <body className="bg-stone-black text-near-white antialiased overflow-x-hidden">
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
                      'AI-powered debt collections platform for banks, fintechs, and microfinance institutions in Africa.',
                    email: 'hello@shylock.ai',
                    areaServed: {
                      '@type': 'Place',
                      name: 'Africa',
                    },
                    knowsLanguage: ['en', 'sw', 'yo', 'fr', 'pcm', 'zu'],
                  },
                  {
                    '@type': 'SoftwareApplication',
                    '@id': 'https://shylock.ai/#product',
                    name: 'Shylock',
                    applicationCategory: 'FinanceApplication',
                    operatingSystem: 'Web',
                    url: 'https://app.shylock.ai',
                    description:
                      'AI voice agents that call borrowers in their language, negotiate payment plans, and recover overdue loans automatically. Supports Pidgin, Swahili, Yoruba, French, English, and Zulu.',
                    offers: {
                      '@type': 'Offer',
                      description: 'Contingency pricing — no recovery, no fee',
                    },
                    featureList: [
                      'Multi-language voice AI (8 languages)',
                      'Automated call campaigns',
                      'Real-time transcripts',
                      'Payment tracking',
                      'SMS, email, and voice outreach',
                      'Full audit trail for compliance',
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

        {/* Google Analytics 4 — fires on every page */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  )
}
