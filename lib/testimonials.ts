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
      '"FairMoney paid before the product was finished. That is how certain they were."',
    name: 'Njavwa Mutambo',
    title: 'Founder & CEO',
    company: 'Caantin',
    artifact: 'ledger',
  },
  {
    quote:
      '"[OxygenX testimonial — full quote to be confirmed before launch.]"',
    name: '[Name]',
    title: '[Title]',
    company: 'OxygenX',
    artifact: 'coin',
  },
]
