import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-stone-black border-t border-stone/30">
      <div className="max-w-[1440px] mx-auto px-5 py-12 sm:px-6 sm:py-14 md:px-12 md:py-20">
        {/* Brand, links, contact — single row on desktop, stacked on mobile */}
        <div className="flex flex-col gap-10 sm:gap-12 md:flex-row md:justify-between md:items-start">
          <div>
            <p className="type-brand text-white text-lg sm:text-xl tracking-normal">
              Shylock
            </p>
          </div>

          <nav
            className="grid grid-cols-2 gap-x-6 gap-y-1 sm:gap-y-2"
            aria-label="Footer navigation"
          >
            <Link
              href="/how-it-works"
              className="type-body text-sm text-silver hover:text-white transition-colors duration-300 py-2 -my-1 sm:py-0 sm:my-0 min-h-[44px] flex items-center sm:min-h-0"
            >
              How it works
            </Link>
            <Link
              href="/results"
              className="type-body text-sm text-silver hover:text-white transition-colors duration-300 py-2 -my-1 sm:py-0 sm:my-0 min-h-[44px] flex items-center sm:min-h-0"
            >
              Results
            </Link>
            <a
              href="https://app.shylock.ai"
              className="type-body text-sm text-silver hover:text-white transition-colors duration-300 py-2 -my-1 sm:py-0 sm:my-0 min-h-[44px] flex items-center sm:min-h-0"
            >
              Sign in
            </a>
            <Link
              href="/blog"
              className="type-body text-sm text-silver hover:text-white transition-colors duration-300 py-2 -my-1 sm:py-0 sm:my-0 min-h-[44px] flex items-center sm:min-h-0"
            >
              Blog
            </Link>
          </nav>

          <div>
            <a
              href="mailto:hello@shylock.ai"
              className="type-body text-sm text-silver hover:text-white transition-colors duration-300 inline-block min-h-[44px] flex items-center sm:min-h-0"
            >
              hello@shylock.ai
            </a>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-10 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t border-stone/30 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
          <p className="type-label text-stone-mid text-xs order-2 sm:order-1">
            &copy; Shylock 2026
          </p>
          <Link
            href="/privacy"
            className="type-label text-stone-mid text-xs hover:text-silver transition-colors duration-300 py-2 -my-1 sm:py-0 sm:my-0 min-h-[44px] flex items-center sm:min-h-0 w-fit order-1 sm:order-2"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
