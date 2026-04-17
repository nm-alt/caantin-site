'use client'

import { useState } from 'react'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'

type Status = 'idle' | 'calling' | 'success' | 'error'
type Variant = 'light' | 'dark'

function SpeakToMattForm({ variant = 'dark' }: { variant?: Variant }) {
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const { executeRecaptcha } = useGoogleReCaptcha()
  const light = variant === 'light'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone) return

    const normalized = phone.startsWith('+') ? phone : `+${phone}`
    setStatus('calling')
    setErrorMsg('')

    try {
      let recaptchaToken: string | undefined
      if (executeRecaptcha) {
        recaptchaToken = await executeRecaptcha('demo_call')
      }

      const res = await fetch('/api/demo-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: normalized, name: name || undefined, recaptchaToken }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setErrorMsg(data.error ?? 'Something went wrong.')
        return
      }

      setStatus('success')

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
      <div className={`border-2 p-6 md:p-8 ${light ? 'border-pink-ink bg-white' : 'border-white/20 bg-pink-ink'}`}>
        <div className="flex items-center gap-3 mb-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live-green opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-live-green" />
          </span>
          <p className={`type-headline text-xl ${light ? 'text-pink-ink' : 'text-pink'}`}>
            AIRDIAL IS CALLING YOU
          </p>
        </div>
        <p className={`type-body text-sm mb-6 font-medium ${light ? 'text-pink-ink/70' : 'text-white/75'}`}>
          Check your phone. A live AirDial agent is ringing you right now.
        </p>
        <button
          onClick={() => { setStatus('idle'); setPhone(''); setName('') }}
          className={`type-label text-xs transition-colors duration-200 ${
            light ? 'text-pink-ink/60 hover:text-pink-ink' : 'text-white/50 hover:text-pink'
          }`}
        >
          Try another number &rarr;
        </button>
      </div>
    )
  }

  return (
    <div className={`border-2 p-6 md:p-8 ${light ? 'border-pink-ink bg-white' : 'border-white/20 bg-pink-ink'}`}>
      <p className={`type-label mb-2 ${light ? 'text-pink-ink/60' : 'text-pink'}`}>
        TRY IT NOW
      </p>
      <p className={`type-body text-sm mb-6 font-medium ${light ? 'text-pink-ink/80' : 'text-white/80'}`}>
        Enter your number. An AirDial agent calls you in 10 seconds.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="demo-phone"
            className={`type-label ${light ? 'text-pink-ink/60' : 'text-white/50'}`}
          >
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
            className={`bg-transparent border-b-2 text-sm md:text-base py-3 focus:outline-none transition-colors duration-200 font-semibold ${
              light
                ? 'border-pink-ink/25 text-pink-ink focus:border-pink-ink placeholder:text-pink-ink/30'
                : 'border-white/25 text-white focus:border-pink placeholder:text-white/25'
            }`}
            style={{ fontFamily: 'var(--font-inter)' }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="demo-name"
            className={`type-label ${light ? 'text-pink-ink/60' : 'text-white/50'}`}
          >
            Your name{' '}
            <span className={light ? 'text-pink-ink/40' : 'text-white/30'}>(optional)</span>
          </label>
          <input
            id="demo-name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === 'calling'}
            autoComplete="name"
            className={`bg-transparent border-b-2 text-sm md:text-base py-3 focus:outline-none transition-colors duration-200 font-semibold ${
              light
                ? 'border-pink-ink/25 text-pink-ink focus:border-pink-ink placeholder:text-pink-ink/30'
                : 'border-white/25 text-white focus:border-pink placeholder:text-white/25'
            }`}
            style={{ fontFamily: 'var(--font-inter)' }}
          />
        </div>

        {status === 'error' && (
          <p className="type-body text-red-500 text-sm">{errorMsg}</p>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={status === 'calling'}
            className={`btn-cta disabled:opacity-50 w-full justify-center ${light ? 'btn-cta-dark' : 'btn-cta-pink'}`}
          >
            {status === 'calling' ? (
              <span className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    light ? 'bg-white' : 'bg-white'
                  }`} />
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    light ? 'bg-white' : 'bg-white'
                  }`} />
                </span>
                Calling you now...
              </span>
            ) : (
              'Call me now \u2192'
            )}
          </button>
        </div>

        <p className={`type-label pt-1 ${light ? 'text-pink-ink/50' : 'text-white/40'}`}>
          Or sign up at{' '}
          <a
            href="https://app.shylock.ai"
            className={`underline underline-offset-4 transition-colors duration-200 ${
              light ? 'text-pink-ink hover:opacity-70' : 'text-pink hover:opacity-70'
            }`}
          >
            app.shylock.ai
          </a>
        </p>
      </form>
    </div>
  )
}

export default function SpeakToMatt({ variant = 'dark' }: { variant?: Variant }) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  if (!siteKey) {
    // Render form without reCAPTCHA — server will skip verification
    return <SpeakToMattForm variant={variant} />
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      <SpeakToMattForm variant={variant} />
    </GoogleReCaptchaProvider>
  )
}
