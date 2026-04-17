'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    company: '',
    bookSize: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.company) return
    setSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        setSubmitting(false)
        return
      }
    } catch {
      setSubmitting(false)
      return
    }

    if (typeof window !== 'undefined' && typeof window.lintrk === 'function') {
      window.lintrk('track', { conversion_id: 7385908 })
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="py-4 border-2 border-pink-ink p-6 bg-white">
        <p className="type-headline text-pink-ink text-2xl mb-2">
          Thanks.
        </p>
        <p className="type-body text-pink-ink/70 font-medium">
          We&apos;ll be in touch within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      {[
        { name: 'name', label: 'Name', placeholder: 'Your name', required: true },
        { name: 'company', label: 'Company', placeholder: 'Your company', required: true },
        {
          name: 'bookSize',
          label: 'What are you building?',
          placeholder: 'e.g. collections, outbound sales, customer support',
          required: false,
        },
      ].map(({ name, label, placeholder, required }) => (
        <div key={name} className="flex flex-col gap-2">
          <label
            htmlFor={name}
            className="type-label text-pink-ink/70"
          >
            {label}
          </label>
          <input
            id={name}
            name={name}
            type="text"
            required={required}
            placeholder={placeholder}
            value={form[name as keyof typeof form]}
            onChange={handleChange}
            autoComplete="off"
            className="bg-transparent border-b-2 border-pink-ink/30 text-pink-ink text-sm md:text-base py-3 focus:outline-none focus:border-pink-ink transition-colors duration-200 placeholder:text-pink-ink/40 font-semibold"
          />
        </div>
      ))}

      <div className="pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="btn-cta btn-cta-dark disabled:opacity-50"
        >
          {submitting ? 'Sending...' : "Let's talk \u2192"}
        </button>
      </div>

      <p className="type-label text-pink-ink/50 pt-2">
        We respond within one business day.
      </p>
    </form>
  )
}
