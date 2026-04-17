'use client'

import { useState, useEffect, useRef } from 'react'

const EXAMPLES = [
  'A collections agent that calls, negotiates payment plans, and follows up on WhatsApp',
  'An outbound sales agent that qualifies leads across voice and email in Spanish',
  'A customer service agent that handles support queries on WhatsApp and SMS',
  'An appointment reminder agent that calls and texts patients in three languages',
]

interface AgentConfig {
  name: string
  company: string
  country: string
  channels: string[]
  language: string
  voice: string
  model: string
}

function parsePrompt(prompt: string): AgentConfig {
  const lower = prompt.toLowerCase()

  // Extract agent name — look for "called X" or "named X"
  const nameMatch = lower.match(/called\s+(\w+)|named\s+(\w+)/)
  const name = nameMatch
    ? (nameMatch[1] || nameMatch[2]).charAt(0).toUpperCase() + (nameMatch[1] || nameMatch[2]).slice(1)
    : 'Agent'

  // Extract company — look for "for X" or "for my company, X" patterns
  const companyMatch = prompt.match(
    /for\s+(?:my\s+(?:company\s*,?\s*)?)?([A-Z][\w\s]+?)(?:\s+in\s|\s*$|\s*,\s*in\s|\s+that\s|\s+who\s)/i
  ) || prompt.match(
    /(?:company\s*,?\s*)([A-Z][\w\s]+?)(?:\s*,|\s+in\s|\s*$)/i
  )
  const company = companyMatch ? companyMatch[1].trim() : 'Your Company'

  // Extract country
  const countries: Record<string, { language: string; voice: string }> = {
    'indonesia': { language: 'Indonesian (Bahasa)', voice: 'Sari — Female, warm' },
    'kenya': { language: 'Swahili / English', voice: 'Amara — Female, professional' },
    'nigeria': { language: 'English (Nigerian)', voice: 'Chidi — Male, confident' },
    'india': { language: 'Hindi / English', voice: 'Priya — Female, clear' },
    'mexico': { language: 'Spanish (MX)', voice: 'Sofia — Female, warm' },
    'brazil': { language: 'Portuguese (BR)', voice: 'Lucas — Male, friendly' },
    'france': { language: 'French', voice: 'Camille — Female, professional' },
    'spain': { language: 'Spanish (ES)', voice: 'Elena — Female, warm' },
    'south africa': { language: 'English (ZA)', voice: 'Thandiwe — Female, confident' },
    'egypt': { language: 'Arabic (EG)', voice: 'Nour — Female, professional' },
    'philippines': { language: 'Filipino / English', voice: 'Maria — Female, friendly' },
    'germany': { language: 'German', voice: 'Lena — Female, professional' },
    'japan': { language: 'Japanese', voice: 'Yuki — Female, polite' },
  }

  let country = 'United States'
  let language = 'English'
  let voice = 'Maya — Female, professional'

  for (const [c, info] of Object.entries(countries)) {
    if (lower.includes(c)) {
      country = c.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      language = info.language
      voice = info.voice
      break
    }
  }

  // Override language if explicitly mentioned
  if (lower.includes('swahili')) language = 'Swahili / English'
  if (lower.includes('spanish')) { language = 'Spanish'; voice = 'Sofia — Female, warm' }
  if (lower.includes('french')) { language = 'French'; voice = 'Camille — Female, professional' }
  if (lower.includes('portuguese')) { language = 'Portuguese'; voice = 'Lucas — Male, friendly' }
  if (lower.includes('arabic')) { language = 'Arabic'; voice = 'Nour — Female, professional' }
  if (lower.includes('hindi')) { language = 'Hindi / English'; voice = 'Priya — Female, clear' }
  if (lower.includes('mandarin') || lower.includes('chinese')) { language = 'Mandarin'; voice = 'Wei — Female, professional' }

  // Detect channels
  const channels: string[] = []
  if (lower.includes('call') || lower.includes('voice') || lower.includes('phone') || lower.includes('collections') || lower.includes('outbound')) {
    channels.push('Voice')
  }
  if (lower.includes('whatsapp')) channels.push('WhatsApp')
  if (lower.includes('sms') || lower.includes('text') || lower.includes('reminder')) channels.push('SMS')
  if (lower.includes('email')) channels.push('Email')
  if (channels.length === 0) channels.push('Voice', 'WhatsApp') // default

  // Detect model preference
  const model = lower.includes('eleven') ? 'ElevenLabs Turbo v2.5'
    : lower.includes('google') ? 'Google Gemini 2.0'
    : lower.includes('whisper') ? 'OpenAI Whisper Large v3'
    : 'ElevenLabs Turbo v2.5'

  return { name, company, country, channels, language, voice, model }
}

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (!started) return
    setDisplayed('')
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 20)
    return () => clearInterval(interval)
  }, [text, started])

  if (!started) return null
  return <>{displayed}</>
}

function AgentConfigDisplay({ config, onHearAgent }: { config: AgentConfig; onHearAgent: () => void }) {
  const [showRows, setShowRows] = useState(0)

  const rows = [
    { label: 'Agent', value: config.name },
    { label: 'Company', value: config.company },
    { label: 'Country', value: config.country },
    { label: 'Channels', value: config.channels.join(', ') },
    { label: 'Language', value: config.language },
    { label: 'Voice', value: config.voice },
    { label: 'Model', value: config.model },
  ]

  useEffect(() => {
    setShowRows(0)
    let i = 0
    const interval = setInterval(() => {
      i++
      if (i <= rows.length) {
        setShowRows(i)
      } else {
        clearInterval(interval)
      }
    }, 150)
    return () => clearInterval(interval)
  }, [config.name, config.company, config.country])

  return (
    <div className="mt-4">
      <div className="bg-pink-ink border-2 border-pink-ink overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/15">
          <span className="w-2.5 h-2.5 rounded-full bg-pink" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber" />
          <span className="w-2.5 h-2.5 rounded-full bg-live-green" />
          <span className="type-mono text-white/50 text-[10px] ml-2 font-bold">AGENT.CONFIG</span>
        </div>
        <div className="p-4 space-y-1.5 type-mono text-[13px]">
          {rows.slice(0, showRows).map(({ label, value }) => (
            <div key={label} className="flex">
              <span className="text-white/45 w-24 shrink-0 font-bold">{label}</span>
              <span className="text-pink font-bold">
                <TypewriterText text={value} delay={0} />
              </span>
            </div>
          ))}
          {showRows > rows.length - 1 && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-white/45 w-24 shrink-0 font-bold">Status</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-live-green" />
              </span>
              <span className="text-live-green font-bold">READY TO DEPLOY</span>
            </div>
          )}
        </div>
      </div>

      {showRows > rows.length - 1 && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={onHearAgent}
            className="btn-cta btn-cta-dark flex-1 justify-center"
          >
            Hear {config.name} call you &rarr;
          </button>
          <a
            href={`https://app.shylock.ai/studio?agent=${encodeURIComponent(config.name)}&country=${encodeURIComponent(config.country)}`}
            className="btn-cta btn-cta-outline flex-1 justify-center"
          >
            Deploy {config.name} &rarr;
          </a>
        </div>
      )}
    </div>
  )
}

export default function AgentPrompt() {
  const [prompt, setPrompt] = useState('')
  const [config, setConfig] = useState<AgentConfig | null>(null)
  const [showCallForm, setShowCallForm] = useState(false)
  const [phone, setPhone] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [placeholderIdx, setPlaceholderIdx] = useState(0)

  // Rotate placeholder examples
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % EXAMPLES.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return
    setConfig(parsePrompt(prompt))
    setShowCallForm(false)
  }

  const handleChip = (example: string) => {
    setPrompt(example)
    setConfig(parsePrompt(example))
    setShowCallForm(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="bg-white border-2 border-pink-ink overflow-hidden">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={EXAMPLES[placeholderIdx]}
            rows={3}
            className="w-full bg-transparent text-pink-ink text-sm md:text-base font-medium resize-none focus:outline-none placeholder:text-pink-ink/40 leading-relaxed p-5 pb-2"
          />
          <div className="flex items-center justify-between px-5 pb-4 gap-3">
            <div className="flex flex-wrap gap-1.5">
              {['Collections', 'Sales', 'Support', 'Reminders'].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleChip(
                    chip === 'Collections' ? EXAMPLES[0]
                    : chip === 'Sales' ? EXAMPLES[1]
                    : chip === 'Support' ? EXAMPLES[2]
                    : EXAMPLES[3]
                  )}
                  className="text-[11px] type-mono font-bold text-pink-ink border-2 border-pink-ink px-2 py-0.5 hover:bg-pink-ink hover:text-pink transition-colors duration-150"
                >
                  {chip.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              type="submit"
              className="w-10 h-10 bg-pink-ink text-pink flex items-center justify-center hover:bg-black transition-colors duration-150 shrink-0"
              aria-label="Build agent"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 7h12M8 2l5 5-5 5" />
              </svg>
            </button>
          </div>
        </div>
      </form>

      {config && !showCallForm && (
        <AgentConfigDisplay
          config={config}
          onHearAgent={() => setShowCallForm(true)}
        />
      )}

      {showCallForm && config && (
        <div className="mt-4 bg-pink-ink border-2 border-pink-ink p-5">
          <p className="type-mono text-pink text-sm mb-4 font-bold">
            Enter your number. {config.name} calls you in 10 seconds.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const q = encodeURIComponent(phone)
              window.location.hash = `demo-call:${q}`
            }}
            className="flex gap-3"
          >
            <input
              type="tel"
              required
              placeholder="+234 801 234 5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 bg-transparent border-b-2 border-white/25 text-white text-sm py-2 focus:outline-none focus:border-pink placeholder:text-white/30 type-mono font-bold"
            />
            <button
              type="button"
              onClick={() => {
                const trySection = document.querySelector('[aria-label="Try it"]')
                if (trySection) trySection.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-cta btn-cta-pink text-sm py-2 px-5"
            >
              Call me &rarr;
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
