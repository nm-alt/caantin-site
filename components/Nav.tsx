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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-stone-black/95 backdrop-blur-sm border-b border-stone/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className={`type-headline text-xl md:text-2xl tracking-widest hover:opacity-70 transition-all duration-500 ${
              scrolled ? 'text-white' : 'text-stone-black'
            }`}
            aria-label="Shylock — home"
          >
            Shylock
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/how-it-works"
              className={`type-body text-sm transition-colors duration-500 tracking-wide ${
                scrolled ? 'text-silver hover:text-white' : 'text-mid hover:text-stone-black'
              }`}
            >
              How it works
            </Link>
            <Link
              href="/results"
              className={`type-body text-sm transition-colors duration-500 tracking-wide ${
                scrolled ? 'text-silver hover:text-white' : 'text-mid hover:text-stone-black'
              }`}
            >
              Results
            </Link>
            <Link href="/contact" className={`btn-cta text-xs ${scrolled ? 'btn-cta-light' : 'btn-cta-dark'}`}>
              Talk to us →
            </Link>
          </div>

          <button
            className="md:hidden flex flex-col gap-[5px] p-2 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-px transition-all duration-300 origin-center ${
                menuOpen ? 'bg-white rotate-45 translate-y-[6px]' : scrolled ? 'bg-white' : 'bg-stone-black'
              }`}
            />
            <span
              className={`block w-6 h-px transition-all duration-300 ${
                menuOpen ? 'bg-white opacity-0' : scrolled ? 'bg-white' : 'bg-stone-black'
              }`}
            />
            <span
              className={`block w-6 h-px transition-all duration-300 origin-center ${
                menuOpen ? 'bg-white -rotate-45 -translate-y-[6px]' : scrolled ? 'bg-white' : 'bg-stone-black'
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-stone-black flex flex-col justify-center px-8 transition-all duration-500 md:hidden ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col gap-10">
          <Link
            href="/how-it-works"
            className="type-headline text-white text-4xl"
            onClick={() => setMenuOpen(false)}
          >
            How it works
          </Link>
          <Link
            href="/results"
            className="type-headline text-white text-4xl"
            onClick={() => setMenuOpen(false)}
          >
            Results
          </Link>
          <Link
            href="/contact"
            className="btn-cta btn-cta-light self-start mt-4"
            onClick={() => setMenuOpen(false)}
          >
            Talk to us →
          </Link>
        </div>
      </div>
    </>
  )
}
