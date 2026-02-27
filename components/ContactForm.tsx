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
    if (!form.name || !form.company || !form.bookSize) return
    setSubmitting(true)

    // TODO: Replace with your form endpoint
    // Options: Resend, Formspree, custom API route
    // Example with Formspree: await fetch('https://formspree.io/f/YOUR_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name: form.name, company: form.company, bookSize: form.bookSize }),
    // })

    // Simulate network delay until endpoint is wired in
    await new Promise((r) => setTimeout(r, 700))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="py-4">
        <p className="type-serif text-white text-xl md:text-2xl italic">
          We&apos;ll be in touch shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      {[
        { name: 'name', label: 'Name', placeholder: 'Your name' },
        { name: 'company', label: 'Company', placeholder: 'Your company' },
        {
          name: 'bookSize',
          label: 'Size of delinquent book',
          placeholder: 'e.g. 40,000 accounts or $2M',
        },
      ].map(({ name, label, placeholder }) => (
        <div key={name} className="flex flex-col gap-2">
          <label
            htmlFor={name}
            className="type-label text-white/40 text-xs tracking-[0.12em]"
          >
            {label}
          </label>
          <input
            id={name}
            name={name}
            type="text"
            required
            placeholder={placeholder}
            value={form[name as keyof typeof form]}
            onChange={handleChange}
            autoComplete="off"
            className="bg-transparent border-b border-white/20 text-white text-sm md:text-base py-3 focus:outline-none focus:border-white/60 transition-colors duration-300 placeholder:text-white/20 font-sans"
            style={{ fontFamily: 'var(--font-barlow)' }}
          />
        </div>
      ))}

      <div className="pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="btn-cta btn-cta-light disabled:opacity-50"
        >
          {submitting ? 'Sending...' : "Let's talk →"}
        </button>
      </div>

      <p className="type-label text-white/25 text-xs tracking-widest pt-2">
        We respond within one business day.
      </p>
    </form>
  )
}
