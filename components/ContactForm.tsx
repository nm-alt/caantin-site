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
      <div className="py-4">
        <p className="text-white text-lg">
          We&apos;ll be in touch shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      {[
        { name: 'name', label: 'Name', placeholder: 'Your name', required: true },
        { name: 'company', label: 'Company', placeholder: 'Your company', required: true },
        {
          name: 'bookSize',
          label: 'What are you building?',
          placeholder: 'e.g. collections, sales outreach, customer engagement',
          required: false,
        },
      ].map(({ name, label, placeholder, required }) => (
        <div key={name} className="flex flex-col gap-2">
          <label
            htmlFor={name}
            className="type-label text-white/40 text-xs"
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
            className="bg-transparent border-b border-white/20 text-white text-sm md:text-base py-3 focus:outline-none focus:border-white/60 transition-colors duration-200 placeholder:text-white/20"
          />
        </div>
      ))}

      <div className="pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="btn-cta btn-cta-light disabled:opacity-50"
        >
          {submitting ? 'Sending...' : "Let's talk \u2192"}
        </button>
      </div>

      <p className="type-label text-white/20 text-xs pt-2">
        We respond within one business day.
      </p>
    </form>
  )
}
