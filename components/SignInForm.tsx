'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.message ?? 'Sign-in is not configured yet. Contact us for access.')
        return
      }
      if (data.redirect) {
        window.location.href = data.redirect
        return
      }
      setError('Unexpected response. Please contact us for access.')
    } catch {
      setError('Something went wrong. Please try again or contact us.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="type-label text-white/40 text-xs tracking-[0.12em]"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="bg-transparent border-b border-white/20 text-white text-sm md:text-base py-3 focus:outline-none focus:border-white/60 transition-colors duration-300 placeholder:text-white/20 font-sans"
          style={{ fontFamily: 'var(--font-barlow)' }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="type-label text-white/40 text-xs tracking-[0.12em]"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className="bg-transparent border-b border-white/20 text-white text-sm md:text-base py-3 focus:outline-none focus:border-white/60 transition-colors duration-300 placeholder:text-white/20 font-sans"
          style={{ fontFamily: 'var(--font-barlow)' }}
        />
      </div>

      {error && (
        <p className="type-body text-sm text-white/80 border border-white/20 rounded px-3 py-2">
          {error}
        </p>
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="btn-cta btn-cta-light disabled:opacity-50"
        >
          {submitting ? 'Signing in...' : 'Sign in'}
        </button>
      </div>

      <p className="type-body text-white/50 text-sm">
        Don&apos;t have access?{' '}
        <Link href="/contact" className="text-white/90 hover:text-white underline underline-offset-2">
          Talk to us
        </Link>
      </p>
    </form>
  )
}
