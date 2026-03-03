import Link from 'next/link'

// Used only on /for/coo and /for/risk
// Logo + CTA only — nothing to distract from the one action
export default function MinimalNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        <Link
          href="/"
          className="type-headline text-white text-xl md:text-2xl tracking-widest hover:opacity-70 transition-opacity duration-300"
          aria-label="Shylock — home"
        >
          Shylock
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/contact" className="btn-cta btn-cta-light text-xs">
            Talk to us →
          </Link>
        </div>
      </div>
    </nav>
  )
}
