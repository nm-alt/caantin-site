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
      if (!executeRecaptcha) {
        setStatus('error')
        setErrorMsg('reCAPTCHA not ready. Please try again.')
        return
      }
      const recaptchaToken = await executeRecaptcha('demo_call')

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
      <div className={`border rounded-lg p-6 md:p-8 ${light ? 'border-stone/15 bg-white' : 'border-white/15'}`}>
        <div className="flex items-center gap-3 mb-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
          </span>
          <p className={`type-headline-lg text-lg ${light ? 'text-stone-black' : 'text-white'}`}>
            SHYLOCK IS CALLING YOU
          </p>
        </div>
        <p className={`type-body text-sm mb-6 ${light ? 'text-mid' : 'text-white/75'}`}>
          Check your phone — you should be getting a call now. This is a live Shylock agent.
        </p>
        <button
          onClick={() => { setStatus('idle'); setPhone(''); setName('') }}
          className={`type-label text-xs transition-colors duration-300 ${
            light ? 'text-mid hover:text-stone-black' : 'text-white/40 hover:text-white/70'
          }`}
        >
          Try another number &rarr;
        </button>
      </div>
    )
  }

  return (
    <div className={`border rounded-lg p-6 md:p-8 ${light ? 'border-stone/15 bg-white' : 'border-white/15'}`}>
      <p className={`type-label text-[10px] tracking-[0.18em] mb-2 ${light ? 'text-mid' : 'text-white/40'}`}>
        TRY IT NOW
      </p>
      <p className={`type-body text-sm mb-6 ${light ? 'text-stone-mid' : 'text-white/75'}`}>
        Enter your number. Shylock calls you in 10 seconds.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="demo-phone"
            className={`type-label text-xs tracking-[0.12em] ${light ? 'text-mid' : 'text-white/40'}`}
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
            className={`bg-transparent border-b text-sm md:text-base py-3 focus:outline-none transition-colors duration-300 ${
              light
                ? 'border-stone/20 text-stone-black focus:border-stone-black placeholder:text-stone/25'
                : 'border-white/20 text-white focus:border-white/60 placeholder:text-white/20'
            }`}
            style={{ fontFamily: 'var(--font-inter)' }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="demo-name"
            className={`type-label text-xs tracking-[0.12em] ${light ? 'text-mid' : 'text-white/40'}`}
          >
            Your name{' '}
            <span className={light ? 'text-silver' : 'text-white/20'}>(optional)</span>
          </label>
          <input
            id="demo-name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === 'calling'}
            autoComplete="name"
            className={`bg-transparent border-b text-sm md:text-base py-3 focus:outline-none transition-colors duration-300 ${
              light
                ? 'border-stone/20 text-stone-black focus:border-stone-black placeholder:text-stone/25'
                : 'border-white/20 text-white focus:border-white/60 placeholder:text-white/20'
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
            className={`btn-cta disabled:opacity-50 w-full justify-center ${light ? 'btn-cta-dark' : 'btn-cta-light'}`}
          >
            {status === 'calling' ? (
              <span className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    light ? 'bg-stone-black' : 'bg-white'
                  }`} />
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    light ? 'bg-stone-black' : 'bg-white'
                  }`} />
                </span>
                Calling you now...
              </span>
            ) : (
              'Call me now \u2192'
            )}
          </button>
        </div>

        <p className={`type-label text-xs tracking-widest pt-1 ${light ? 'text-silver' : 'text-white/25'}`}>
          Or sign up at{' '}
          <a
            href="https://app.shylock.ai"
            className={`underline underline-offset-4 transition-colors duration-300 ${
              light ? 'text-mid hover:text-stone-black' : 'text-white/40 hover:text-white/70'
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
    const light = variant === 'light'
    return (
      <div className={`border rounded-lg p-6 md:p-8 ${light ? 'border-stone/15 bg-white' : 'border-white/15'}`}>
        <p className={`type-body text-sm ${light ? 'text-mid' : 'text-white/75'}`}>
          Call feature temporarily unavailable. Please email{' '}
          <a
            href="mailto:hello@shylock.ai"
            className={`underline underline-offset-4 transition-colors duration-300 ${
              light ? 'text-stone-black hover:text-mid' : 'hover:text-white'
            }`}
          >
            hello@shylock.ai
          </a>
        </p>
      </div>
    )
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      <SpeakToMattForm variant={variant} />
    </GoogleReCaptchaProvider>
  )
}
