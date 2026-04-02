'use client'

import { useState } from 'react'

const CHIPS = [
  'Create a collections agent',
  'Build an outbound sales caller',
  'Make a customer service agent',
  'Set up appointment scheduling',
]

export default function AgentPrompt() {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = encodeURIComponent(prompt || CHIPS[0])
    window.open(`https://app.shylock.ai/studio?prompt=${q}`, '_blank')
  }

  return (
    <div className="bg-white border border-stone/12 rounded-lg p-5 md:p-6 shadow-sm">
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the agent you want to build..."
          rows={4}
          className="w-full bg-transparent text-stone-black text-sm md:text-base resize-none focus:outline-none placeholder:text-stone/30 leading-relaxed"
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="w-9 h-9 rounded-lg bg-stone-black text-white flex items-center justify-center hover:bg-near-black transition-colors duration-200"
            aria-label="Build agent"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 7h12M8 2l5 5-5 5" />
            </svg>
          </button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-stone/8">
        {CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => {
              setPrompt(chip)
              const q = encodeURIComponent(chip)
              window.open(`https://app.shylock.ai/studio?prompt=${q}`, '_blank')
            }}
            className="text-xs text-stone-mid border border-stone/12 rounded-md px-3 py-1.5 hover:border-stone/30 hover:text-stone-black transition-all duration-200"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  )
}
