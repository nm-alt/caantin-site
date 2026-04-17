import Link from 'next/link'
import { MARKETS } from '@/lib/markets'

export default function Footer() {
  return (
    <footer className="bg-pink-ink text-pink border-t-4 border-pink">
      <div className="max-w-[1280px] mx-auto px-6 py-16 md:px-10 md:py-24">
        {/* Top — giant mark */}
        <div className="mb-16 md:mb-24">
          <p className="type-display-xl text-pink leading-none">
            AirDial<span className="text-pink/40">.</span>
          </p>
          <p className="type-headline text-white/80 mt-6 max-w-xl">
            The brand for the world&apos;s conversations.
          </p>
        </div>

        {/* Eight markets strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 pb-12 border-b border-white/10">
          {MARKETS.map((m) => (
            <div key={m.code}>
              <p className="type-mono text-pink text-xs font-bold mb-1">{m.code} {m.dialCode}</p>
              <p className="type-body text-white/80 text-sm font-semibold">{m.hub}</p>
              <p className="type-mono text-white/40 text-[10px] mt-1">{m.perMinute}</p>
            </div>
          ))}
        </div>

        {/* Nav rows */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <p className="type-label text-white/50 mb-4">Product</p>
            <ul className="space-y-2">
              <li><a href="https://app.shylock.ai" className="type-body text-white/90 hover:text-pink transition-colors text-sm font-semibold">Studio</a></li>
              <li><Link href="/docs" className="type-body text-white/90 hover:text-pink transition-colors text-sm font-semibold">API</Link></li>
              <li><a href="https://app.shylock.ai" className="type-body text-white/90 hover:text-pink transition-colors text-sm font-semibold">Sign in</a></li>
            </ul>
          </div>
          <div>
            <p className="type-label text-white/50 mb-4">Company</p>
            <ul className="space-y-2">
              <li><Link href="/blog" className="type-body text-white/90 hover:text-pink transition-colors text-sm font-semibold">Blog</Link></li>
              <li><Link href="/contact" className="type-body text-white/90 hover:text-pink transition-colors text-sm font-semibold">Contact</Link></li>
              <li><Link href="/privacy" className="type-body text-white/90 hover:text-pink transition-colors text-sm font-semibold">Privacy</Link></li>
            </ul>
          </div>
          <div>
            <p className="type-label text-white/50 mb-4">Talk</p>
            <ul className="space-y-2">
              <li><a href="mailto:hello@shylock.ai" className="type-body text-white/90 hover:text-pink transition-colors text-sm font-semibold">hello@airdial.io</a></li>
            </ul>
          </div>
          <div>
            <p className="type-label text-white/50 mb-4">Ship</p>
            <a href="https://app.shylock.ai" className="btn-cta btn-cta-pink">
              Start now &rarr;
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <p className="type-mono text-white/40 text-xs font-bold">
            © AIRDIAL {new Date().getFullYear()} · LIVE IN 8 COUNTRIES
          </p>
          <p className="type-mono text-white/40 text-xs font-bold">
            A CALL CENTER IN YOUR POCKET.
          </p>
        </div>
      </div>
    </footer>
  )
}
