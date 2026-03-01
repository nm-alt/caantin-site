import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-stone-black border-t border-stone/30 px-6 md:px-12 py-16 md:py-20">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-0">
          {/* Brand */}
          <div>
            <p className="type-headline text-white text-2xl tracking-widest mb-4">
              Caantin
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <Link
              href="/how-it-works"
              className="type-body text-sm text-silver hover:text-white transition-colors duration-300"
            >
              How it works
            </Link>
            <Link
              href="/results"
              className="type-body text-sm text-silver hover:text-white transition-colors duration-300"
            >
              Results
            </Link>
            <Link
              href="/blog"
              className="type-body text-sm text-silver hover:text-white transition-colors duration-300"
            >
              Blog
            </Link>
            <a
              href="https://collect.caantin.ai/login"
              className="type-body text-sm text-silver hover:text-white transition-colors duration-300"
            >
              Log in
            </a>
          </div>

          {/* Contact */}
          <div>
            <a
              href="mailto:nm@caantin.ai"
              className="type-body text-sm text-silver hover:text-white transition-colors duration-300"
            >
              nm@caantin.ai
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 pt-8 border-t border-stone/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="type-label text-stone-mid text-xs">
            © Caantin 2026
          </p>
          <Link
            href="/privacy"
            className="type-label text-stone-mid text-xs hover:text-silver transition-colors duration-300"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
