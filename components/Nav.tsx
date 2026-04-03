'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-stone/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between h-14 md:h-16">
          <Link
            href="/"
            className="type-brand text-stone-black text-lg tracking-tight hover:opacity-70 transition-opacity duration-200"
            aria-label="Shylock — home"
          >
            Shylock
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/blog"
              className="type-body text-sm text-mid hover:text-stone-black transition-colors duration-200"
            >
              Blog
            </Link>
            <a
              href="https://app.shylock.ai"
              className="type-body text-sm text-mid hover:text-stone-black transition-colors duration-200"
            >
              Sign in
            </a>
            <a href="https://app.shylock.ai" className="btn-cta btn-cta-accent text-[13px] py-2 px-5">
              Start building &rarr;
            </a>
          </div>

          <button
            className="md:hidden flex flex-col gap-[5px] p-2 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-px transition-all duration-300 origin-center ${
                menuOpen ? 'bg-white rotate-45 translate-y-[6px]' : 'bg-stone-black'
              }`}
            />
            <span
              className={`block w-5 h-px transition-all duration-300 ${
                menuOpen ? 'bg-white opacity-0' : 'bg-stone-black'
              }`}
            />
            <span
              className={`block w-5 h-px transition-all duration-300 origin-center ${
                menuOpen ? 'bg-white -rotate-45 -translate-y-[6px]' : 'bg-stone-black'
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-stone-black flex flex-col justify-center px-8 transition-all duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col gap-8">
          <Link
            href="/blog"
            className="type-headline text-white text-2xl"
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </Link>
          <a
            href="https://app.shylock.ai"
            className="type-headline text-white text-2xl"
            onClick={() => setMenuOpen(false)}
          >
            Sign in
          </a>
          <a
            href="https://app.shylock.ai"
            className="btn-cta btn-cta-light self-start mt-4"
            onClick={() => setMenuOpen(false)}
          >
            Start building &rarr;
          </a>
        </div>
      </div>
    </>
  )
}
