export type Artifact = 'ledger' | 'coin'

export interface Testimonial {
  quote: string
  name: string
  title: string
  company: string
  artifact: Artifact
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'So far we\'re impressed with the performance.',
    name: 'Dan',
    title: 'CEO',
    company: 'Digital Lender',
    artifact: 'ledger',
  },
]
