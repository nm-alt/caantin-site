// V2 — Eight live markets. One brand system. Localized content per door.
// Same type, color, logo, voice across all. Different headlines, photos, examples, proof.

export type MarketCode = 'MX' | 'ZA' | 'NG' | 'KE' | 'UG' | 'TZ' | 'RW' | 'GH'

export type Market = {
  code: MarketCode
  country: string
  hub: string
  dialCode: string
  currency: string
  currencySymbol: string
  locale: string
  primaryLanguage: string
  languages: string[]
  // Local headline — native or local-English. Shown on country-specific hero.
  headline: string
  // English subhead that stays the same feel across markets.
  subhead: string
  // Localized price point — minutes-based, always visible (V2 rule: pricing visible, always).
  perMinute: string
  // Short proof stat shown in grid — must be specific, never generic.
  proof: string
  // A real-feeling example business line — Lagos, not "emerging markets".
  example: string
  // Timezone label
  tz: string
}

export const MARKETS: Market[] = [
  {
    code: 'MX',
    country: 'Mexico',
    hub: 'Mexico City',
    dialCode: '+52',
    currency: 'MXN',
    currencySymbol: '$',
    locale: 'es-MX',
    primaryLanguage: 'Spanish',
    languages: ['Spanish', 'English'],
    headline: 'Cada conversación, atendida.',
    subhead: 'Every conversation, handled.',
    perMinute: '$0.38 MXN/min',
    proof: 'Live in Mexico City. Answering in Spanish.',
    example: 'A clinic in Polanco, confirming 400 appointments by 9am.',
    tz: 'CST',
  },
  {
    code: 'ZA',
    country: 'South Africa',
    hub: 'Johannesburg',
    dialCode: '+27',
    currency: 'ZAR',
    currencySymbol: 'R',
    locale: 'en-ZA',
    primaryLanguage: 'English',
    languages: ['English', 'Zulu', 'Afrikaans'],
    headline: 'Every customer, answered.',
    subhead: 'Built for Joburg. Built for Cape Town.',
    perMinute: 'R0.36/min',
    proof: 'Live across Gauteng and the Western Cape.',
    example: 'A lender in Sandton, collecting on 12,000 accounts a night.',
    tz: 'SAST',
  },
  {
    code: 'NG',
    country: 'Nigeria',
    hub: 'Lagos',
    dialCode: '+234',
    currency: 'NGN',
    currencySymbol: '₦',
    locale: 'en-NG',
    primaryLanguage: 'English',
    languages: ['English', 'Pidgin', 'Yoruba', 'Igbo', 'Hausa'],
    headline: 'Your customers, always heard.',
    subhead: 'Lagos never stops. Neither does AirDial.',
    perMinute: '₦32/min',
    proof: 'Live in Lagos, Abuja, Port Harcourt.',
    example: 'A fintech in Victoria Island, verifying 60,000 KYCs a week.',
    tz: 'WAT',
  },
  {
    code: 'KE',
    country: 'Kenya',
    hub: 'Nairobi',
    dialCode: '+254',
    currency: 'KES',
    currencySymbol: 'KSh',
    locale: 'en-KE',
    primaryLanguage: 'English',
    languages: ['English', 'Swahili'],
    headline: 'Every call, every shilling, handled.',
    subhead: 'Built for Nairobi. Spoken in Swahili.',
    perMinute: 'KSh 2.60/min',
    proof: 'Live across Nairobi, Mombasa, Kisumu.',
    example: 'A SACCO in Westlands, reconciling M-Pesa payments overnight.',
    tz: 'EAT',
  },
  {
    code: 'UG',
    country: 'Uganda',
    hub: 'Kampala',
    dialCode: '+256',
    currency: 'UGX',
    currencySymbol: 'USh',
    locale: 'en-UG',
    primaryLanguage: 'English',
    languages: ['English', 'Luganda', 'Swahili'],
    headline: 'Your business never sleeps. Neither does AirDial.',
    subhead: 'Built for Kampala.',
    perMinute: 'USh 75/min',
    proof: 'Live across Kampala and Entebbe.',
    example: 'A micro-lender in Nakasero, calling 8,000 borrowers a night.',
    tz: 'EAT',
  },
  {
    code: 'TZ',
    country: 'Tanzania',
    hub: 'Dar es Salaam',
    dialCode: '+255',
    currency: 'TZS',
    currencySymbol: 'TSh',
    locale: 'sw-TZ',
    primaryLanguage: 'Swahili',
    languages: ['Swahili', 'English'],
    headline: 'Kila mazungumzo, yanashughulikiwa.',
    subhead: 'Each conversation, taken care of.',
    perMinute: 'TSh 52/min',
    proof: 'Live in Dar es Salaam and Arusha.',
    example: 'A logistics firm in Kariakoo, confirming 2,000 deliveries a day.',
    tz: 'EAT',
  },
  {
    code: 'RW',
    country: 'Rwanda',
    hub: 'Kigali',
    dialCode: '+250',
    currency: 'RWF',
    currencySymbol: 'FRw',
    locale: 'en-RW',
    primaryLanguage: 'English',
    languages: ['English', 'Kinyarwanda', 'French'],
    headline: 'Built for how Rwanda does business.',
    subhead: 'Live in Kigali. Spoken in Kinyarwanda.',
    perMinute: 'FRw 26/min',
    proof: 'Live across Kigali and Musanze.',
    example: 'A bank in Nyarugenge, reaching every customer by Kinyarwanda voice.',
    tz: 'CAT',
  },
  {
    code: 'GH',
    country: 'Ghana',
    hub: 'Accra',
    dialCode: '+233',
    currency: 'GHS',
    currencySymbol: 'GH₵',
    locale: 'en-GH',
    primaryLanguage: 'English',
    languages: ['English', 'Twi', 'Ga'],
    headline: 'Every call, every customer, no missed beats.',
    subhead: 'Built for Accra. Built for Kumasi.',
    perMinute: 'GH₵ 0.24/min',
    proof: 'Live across Greater Accra and Ashanti.',
    example: 'A retailer in Osu, recovering 3,000 abandoned carts a week.',
    tz: 'GMT',
  },
]

export const MARKET_BY_CODE: Record<MarketCode, Market> = MARKETS.reduce(
  (acc, m) => ({ ...acc, [m.code]: m }),
  {} as Record<MarketCode, Market>
)

export const DEFAULT_MARKET: Market = MARKET_BY_CODE.NG
