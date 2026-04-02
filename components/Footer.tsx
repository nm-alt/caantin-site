import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-stone-black border-t border-stone/20">
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:px-10 md:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-start">
          <p className="type-brand text-white text-lg tracking-tight">
            Shylock
          </p>

          <nav className="flex gap-6" aria-label="Footer navigation">
            <Link
              href="/blog"
              className="text-sm text-silver hover:text-white transition-colors duration-200"
            >
              Blog
            </Link>
            <a
              href="https://app.shylock.ai"
              className="text-sm text-silver hover:text-white transition-colors duration-200"
            >
              Sign in
            </a>
            <Link
              href="/contact"
              className="text-sm text-silver hover:text-white transition-colors duration-200"
            >
              Contact
            </Link>
          </nav>

          <a
            href="mailto:hello@shylock.ai"
            className="text-sm text-silver hover:text-white transition-colors duration-200"
          >
            hello@shylock.ai
          </a>
        </div>

        <div className="mt-12 pt-6 border-t border-stone/20 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <p className="type-label text-stone-mid text-xs">
            &copy; Shylock {new Date().getFullYear()}
          </p>
          <Link
            href="/privacy"
            className="type-label text-stone-mid text-xs hover:text-silver transition-colors duration-200"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
}
