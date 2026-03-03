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
      '"[OxygenX testimonial]"',
    name: '[Name]',
    title: '[Title]',
    company: 'OxygenX',
    artifact: 'ledger',
  },
  {
    quote:
      '"Paid before the product was finished."',
    name: '[Name]',
    title: 'Digital lender, West Africa',
    company: 'Backed by Tiger Global',
    artifact: 'coin',
  },
]
