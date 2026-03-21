'use client'

import { useState } from 'react'

type Status = 'idle' | 'calling' | 'success' | 'error'

export default function SpeakToMatt() {
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone) return

    // Ensure phone has country code
    const normalized = phone.startsWith('+') ? phone : `+${phone}`

    setStatus('calling')
    setErrorMsg('')

    try {
      const res = await fetch('/api/demo-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: normalized, name: name || undefined }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setErrorMsg(data.error ?? 'Something went wrong.')
        return
      }

      setStatus('success')

      // LinkedIn conversion
      if (typeof window !== 'undefined' && typeof (window as any).lintrk === 'function') {
        ;(window as any).lintrk('track', { conversion_id: 7385908 })
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-white/15 rounded-sm p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
          </span>
          <p className="type-headline-lg text-white text-lg">MATT IS CALLING YOU</p>
        </div>
        <p className="type-body text-white/75 text-sm mb-6">
          Check your phone — Matt should be ringing you now. He&apos;ll walk you through how Shylock works.
        </p>
        <button
          onClick={() => {
            setStatus('idle')
            setPhone('')
            setName('')
          }}
          className="type-label text-white/40 text-xs hover:text-white/70 transition-colors duration-300"
        >
          Try another number →
        </button>
      </div>
    )
  }

  return (
    <div className="border border-white/15 rounded-sm p-6 md:p-8">
      <p className="type-label text-white/40 text-[10px] tracking-[0.18em] mb-3">
        SPEAK TO SOMEONE NOW
      </p>
      <p className="type-body text-white/75 text-sm mb-6">
        Matt, our AI sales agent, will call you in 10 seconds.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="demo-phone" className="type-label text-white/40 text-xs tracking-[0.12em]">
            Phone number
          </label>
          <input
            id="demo-phone"
            type="tel"
            required
            placeholder="+234 801 234 5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={status === 'calling'}
            autoComplete="tel"
            className="bg-transparent border-b border-white/20 text-white text-sm md:text-base py-3 focus:outline-none focus:border-white/60 transition-colors duration-300 placeholder:text-white/20"
            style={{ fontFamily: 'var(--font-barlow)' }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="demo-name" className="type-label text-white/40 text-xs tracking-[0.12em]">
            Your name <span className="text-white/20">(optional)</span>
          </label>
          <input
            id="demo-name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === 'calling'}
            autoComplete="name"
            className="bg-transparent border-b border-white/20 text-white text-sm md:text-base py-3 focus:outline-none focus:border-white/60 transition-colors duration-300 placeholder:text-white/20"
            style={{ fontFamily: 'var(--font-barlow)' }}
          />
        </div>

        {status === 'error' && (
          <p className="type-body text-red-400 text-sm">{errorMsg}</p>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={status === 'calling'}
            className="btn-cta btn-cta-light disabled:opacity-50 w-full justify-center"
          >
            {status === 'calling' ? (
              <span className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
                </span>
                Calling you now...
              </span>
            ) : (
              'Call me now →'
            )}
          </button>
        </div>

        <p className="type-label text-white/25 text-xs tracking-widest pt-1">
          Or sign up directly at{' '}
          <a
            href="https://app.shylock.ai"
            className="text-white/40 hover:text-white/70 transition-colors duration-300 underline underline-offset-4"
          >
            app.shylock.ai
          </a>
        </p>
      </form>
    </div>
  )
}
