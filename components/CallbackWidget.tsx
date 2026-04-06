'use client'

import { useState } from 'react'
import posthog from 'posthog-js'

type Status = 'idle' | 'calling' | 'success' | 'error'
type Variant = 'light' | 'dark'

const COUNTRY_CODES = [
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+234', country: 'NG', flag: '🇳🇬' },
  { code: '+254', country: 'KE', flag: '🇰🇪' },
  { code: '+27', country: 'ZA', flag: '🇿🇦' },
  { code: '+62', country: 'ID', flag: '🇮🇩' },
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+971', country: 'AE', flag: '🇦🇪' },
  { code: '+966', country: 'SA', flag: '🇸🇦' },
  { code: '+20', country: 'EG', flag: '🇪🇬' },
  { code: '+233', country: 'GH', flag: '🇬🇭' },
  { code: '+255', country: 'TZ', flag: '🇹🇿' },
  { code: '+256', country: 'UG', flag: '🇺🇬' },
  { code: '+63', country: 'PH', flag: '🇵🇭' },
  { code: '+55', country: 'BR', flag: '🇧🇷' },
  { code: '+52', country: 'MX', flag: '🇲🇽' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+34', country: 'ES', flag: '🇪🇸' },
  { code: '+61', country: 'AU', flag: '🇦🇺' },
  { code: '+81', country: 'JP', flag: '🇯🇵' },
  { code: '+86', country: 'CN', flag: '🇨🇳' },
  { code: '+353', country: 'IE', flag: '🇮🇪' },
]

export default function CallbackWidget({ variant = 'dark' }: { variant?: Variant }) {
  const [dialCode, setDialCode] = useState('+1')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const light = variant === 'light'

  const handlePhoneChange = (value: string) => {
    setPhone(value)
    if (value.length >= 6) {
      posthog.capture('callback_number_entered')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone) return

    const fullNumber = `${dialCode}${phone.replace(/^0+/, '').replace(/\s/g, '')}`
    setStatus('calling')
    setErrorMsg('')

    posthog.capture('callback_call_triggered', { dial_code: dialCode })

    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: fullNumber }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setErrorMsg(data.error ?? 'Something went wrong.')
        return
      }

      setStatus('success')
      posthog.capture('callback_success_shown')
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
            We&apos;re calling you now
          </p>
        </div>
        <p className={`type-body text-sm mb-6 ${light ? 'text-mid' : 'text-white/75'}`}>
          Hang tight — Matt will be on the line in a moment. If he&apos;s unavailable, we&apos;ll try again shortly or you can email us at{' '}
          <a
            href="mailto:hello@shylock.ai"
            className={`underline underline-offset-4 transition-colors duration-300 ${
              light ? 'text-accent hover:text-accent-hover' : 'text-white/60 hover:text-white/90'
            }`}
          >
            hello@shylock.ai
          </a>.
        </p>
        <button
          onClick={() => { setStatus('idle'); setPhone('') }}
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
        SPEAK TO US
      </p>
      <p className={`type-body text-sm mb-6 ${light ? 'text-stone-mid' : 'text-white/75'}`}>
        Enter your number. Matt calls you in under a minute.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="callback-phone"
            className={`type-label text-xs tracking-[0.12em] ${light ? 'text-mid' : 'text-white/40'}`}
          >
            Phone number
          </label>
          <div className="flex gap-2">
            <select
              value={dialCode}
              onChange={(e) => setDialCode(e.target.value)}
              className={`bg-transparent border-b text-sm py-3 focus:outline-none transition-colors duration-300 shrink-0 cursor-pointer ${
                light
                  ? 'border-stone/20 text-stone-black focus:border-stone-black'
                  : 'border-white/20 text-white focus:border-white/60'
              }`}
              style={{ fontFamily: 'var(--font-inter)' }}
              aria-label="Country dial code"
            >
              {COUNTRY_CODES.map(({ code, country, flag }) => (
                <option key={code} value={code} className="bg-white text-stone-black">
                  {flag} {code} ({country})
                </option>
              ))}
            </select>
            <input
              id="callback-phone"
              type="tel"
              required
              placeholder="801 234 5678"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              disabled={status === 'calling'}
              autoComplete="tel-national"
              className={`flex-1 min-w-0 bg-transparent border-b text-sm md:text-base py-3 focus:outline-none transition-colors duration-300 ${
                light
                  ? 'border-stone/20 text-stone-black focus:border-stone-black placeholder:text-stone/25'
                  : 'border-white/20 text-white focus:border-white/60 placeholder:text-white/20'
              }`}
              style={{ fontFamily: 'var(--font-inter)' }}
            />
          </div>
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
                Connecting you now...
              </span>
            ) : (
              'Speak to Matt \u2192'
            )}
          </button>
        </div>

        <p className={`type-label text-xs tracking-widest pt-1 ${light ? 'text-silver' : 'text-white/25'}`}>
          Or email us at{' '}
          <a
            href="mailto:hello@shylock.ai"
            className={`underline underline-offset-4 transition-colors duration-300 ${
              light ? 'text-mid hover:text-stone-black' : 'text-white/40 hover:text-white/70'
            }`}
          >
            hello@shylock.ai
          </a>
        </p>
      </form>
    </div>
  )
}
