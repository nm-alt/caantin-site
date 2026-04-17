'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-pink/95 backdrop-blur-md border-b-2 border-pink-ink'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-18">
          <Link
            href="/"
            className="type-brand text-pink-ink text-xl md:text-2xl hover:opacity-80 transition-opacity duration-200"
            aria-label="AirDial — home"
          >
            AirDial<span className="text-pink-ink/50">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/docs"
              className="type-body text-sm font-bold text-pink-ink hover:opacity-60 transition-opacity duration-200"
            >
              Docs
            </Link>
            <Link
              href="/blog"
              className="type-body text-sm font-bold text-pink-ink hover:opacity-60 transition-opacity duration-200"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="type-body text-sm font-bold text-pink-ink hover:opacity-60 transition-opacity duration-200"
            >
              Contact
            </Link>
            <a
              href="https://app.shylock.ai"
              className="type-body text-sm font-bold text-pink-ink hover:opacity-60 transition-opacity duration-200"
            >
              Sign in
            </a>
            <a href="https://app.shylock.ai" className="btn-cta btn-cta-dark text-[13px] py-2 px-5">
              Start now &rarr;
            </a>
          </div>

          <button
            className="md:hidden flex flex-col gap-[5px] p-2 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-[2px] transition-all duration-200 origin-center ${
                menuOpen ? 'bg-pink rotate-45 translate-y-[7px]' : 'bg-pink-ink'
              }`}
            />
            <span
              className={`block w-6 h-[2px] transition-all duration-200 ${
                menuOpen ? 'bg-pink opacity-0' : 'bg-pink-ink'
              }`}
            />
            <span
              className={`block w-6 h-[2px] transition-all duration-200 origin-center ${
                menuOpen ? 'bg-pink -rotate-45 -translate-y-[7px]' : 'bg-pink-ink'
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-pink-ink flex flex-col justify-center px-8 transition-all duration-200 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col gap-6">
          <Link
            href="/docs"
            className="type-display text-pink text-5xl"
            onClick={() => setMenuOpen(false)}
          >
            Docs
          </Link>
          <Link
            href="/blog"
            className="type-display text-pink text-5xl"
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="type-display text-pink text-5xl"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          <a
            href="https://app.shylock.ai"
            className="type-display text-white text-5xl"
            onClick={() => setMenuOpen(false)}
          >
            Sign in
          </a>
          <a
            href="https://app.shylock.ai"
            className="btn-cta btn-cta-pink self-start mt-6"
            onClick={() => setMenuOpen(false)}
          >
            Start now &rarr;
          </a>
        </div>
      </div>
    </>
  )
}
