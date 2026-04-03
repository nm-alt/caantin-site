import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Docs — Shylock',
  description:
    'Sauti API documentation. Programmatic access to calls, messages, agents, and campaigns.',
  alternates: { canonical: 'https://shylock.ai/docs' },
}

const ENDPOINTS = [
  {
    method: 'POST',
    path: '/v1/calls',
    description: 'Initiate an outbound call',
    body: `{
  "assistantId": "asst_jane_collections",
  "phoneNumberId": "pn_jakarta_01",
  "customer": {
    "number": "+62812345678",
    "name": "Rina Wijaya"
  }
}`,
    response: `{
  "id": "call_8f3k2j",
  "status": "ringing",
  "assistant": "asst_jane_collections",
  "from": "+62215551234",
  "to": "+62812345678",
  "created_at": "2026-04-02T10:30:00Z"
}`,
  },
  {
    method: 'POST',
    path: '/v1/messages',
    description: 'Send a message via WhatsApp, SMS, or email',
    body: `{
  "channel": "whatsapp",
  "to": "+62812345678",
  "content": {
    "text": "Hi Rina, this is a reminder about your upcoming payment on the 5th."
  },
  "assistantId": "asst_jane_collections"
}`,
    response: `{
  "id": "msg_a9x2kp",
  "channel": "whatsapp",
  "status": "sent",
  "to": "+62812345678",
  "created_at": "2026-04-02T10:31:00Z"
}`,
  },
  {
    method: 'POST',
    path: '/v1/assistants',
    description: 'Create a new AI assistant',
    body: `{
  "name": "Jane",
  "language": "id",
  "personality": {
    "system_prompt": "You are Jane, a collections agent for Juniper Bank. You speak Indonesian. You are professional, empathetic, and solution-oriented."
  },
  "voice": {
    "provider": "elevenlabs",
    "voice_id": "sari_indonesian"
  },
  "model": {
    "provider": "openai",
    "model": "gpt-4o"
  }
}`,
    response: `{
  "id": "asst_jane_collections",
  "name": "Jane",
  "status": "active",
  "language": "id",
  "created_at": "2026-04-02T10:00:00Z"
}`,
  },
  {
    method: 'GET',
    path: '/v1/calls/:id',
    description: 'Get call details including transcript and recording',
    body: null,
    response: `{
  "id": "call_8f3k2j",
  "status": "completed",
  "duration": 142,
  "outcome": "promise_to_pay",
  "transcript": [
    { "role": "agent", "text": "Hi Rina, this is Jane from Juniper Bank..." },
    { "role": "customer", "text": "Yes, I can pay on the 5th." }
  ],
  "recording_url": "https://sauti.shylock.ai/recordings/call_8f3k2j.mp3",
  "created_at": "2026-04-02T10:30:00Z",
  "ended_at": "2026-04-02T10:32:22Z"
}`,
  },
]

const WEBHOOKS = [
  { event: 'call.completed', description: 'Fired when a call ends. Includes transcript, duration, outcome.' },
  { event: 'call.failed', description: 'Fired when a call fails to connect. Includes error reason.' },
  { event: 'message.delivered', description: 'Fired when a WhatsApp/SMS/email is delivered.' },
  { event: 'message.replied', description: 'Fired when the customer replies to a message.' },
  { event: 'payment.promised', description: 'Fired when a customer promises to pay during a call.' },
]

function MethodBadge({ method }: { method: string }) {
  const colors =
    method === 'POST'
      ? 'bg-green-100 text-green-700'
      : method === 'GET'
        ? 'bg-blue-100 text-blue-700'
        : 'bg-zinc-100 text-zinc-700'
  return (
    <span className={`inline-flex items-center rounded px-2 py-0.5 text-[11px] font-bold tracking-wider ${colors}`}>
      {method}
    </span>
  )
}

export default function DocsPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="bg-near-white pt-32 pb-16 md:pt-36 md:pb-20">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10">
            <p className="type-label text-accent mb-3">Developers</p>
            <h1 className="type-headline text-stone-black text-display-lg mb-4">
              Sauti API
            </h1>
            <p className="type-body text-mid text-lg max-w-xl mb-8">
              Programmatic access to calls, messages, agents, and campaigns. RESTful endpoints, webhook events, full control.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <span className="type-mono text-sm text-stone-mid bg-white border border-stone/10 rounded-lg px-4 py-2">
                Base URL: https://sauti.shylock.ai/api
              </span>
              <a href="https://app.shylock.ai" className="btn-cta btn-cta-accent text-sm">
                Get your API key &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* Auth */}
        <section className="bg-white py-14 border-y border-stone/8">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10">
            <h2 className="type-headline-lg text-stone-black text-xl mb-4">Authentication</h2>
            <p className="type-body text-mid text-sm mb-6 max-w-xl">
              All requests require an API key passed in the Authorization header. Generate keys in your Shylock dashboard under Settings.
            </p>
            <div className="bg-stone-black rounded-xl overflow-hidden max-w-xl">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
                <span className="w-2 h-2 rounded-full bg-red-500/70" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                <span className="w-2 h-2 rounded-full bg-green-500/70" />
              </div>
              <pre className="p-4 text-[13px] leading-relaxed text-white/80 overflow-x-auto">
                <code className="type-mono">{`Authorization: Bearer sk_live_your_api_key`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Endpoints */}
        <section className="bg-near-white py-16 md:py-20">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10">
            <h2 className="type-headline text-stone-black text-display-md mb-12">Endpoints</h2>

            <div className="space-y-12">
              {ENDPOINTS.map(({ method, path, description, body, response }) => (
                <div key={path + method} className="bg-white border border-stone/8 rounded-xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-stone/8 flex items-center gap-3">
                    <MethodBadge method={method} />
                    <code className="type-mono text-stone-black text-sm font-semibold">{path}</code>
                  </div>
                  <div className="px-6 py-4">
                    <p className="type-body text-mid text-sm mb-4">{description}</p>

                    <div className="grid md:grid-cols-2 gap-4">
                      {body && (
                        <div>
                          <p className="type-label text-stone/50 text-[10px] mb-2">Request body</p>
                          <div className="bg-stone-black rounded-lg overflow-hidden">
                            <pre className="p-4 text-[12px] leading-relaxed text-green-400 overflow-x-auto">
                              <code className="type-mono">{body}</code>
                            </pre>
                          </div>
                        </div>
                      )}
                      <div>
                        <p className="type-label text-stone/50 text-[10px] mb-2">Response</p>
                        <div className="bg-stone-black rounded-lg overflow-hidden">
                          <pre className="p-4 text-[12px] leading-relaxed text-white/80 overflow-x-auto">
                            <code className="type-mono">{response}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Webhooks */}
        <section className="bg-stone-black py-16 md:py-20">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10">
            <p className="type-label text-accent mb-3">Real-time events</p>
            <h2 className="type-headline text-white text-display-md mb-6">Webhooks</h2>
            <p className="type-body text-white/60 text-sm mb-10 max-w-xl">
              Register a webhook URL in your dashboard. We&apos;ll POST events to your endpoint as they happen.
            </p>

            <div className="space-y-3">
              {WEBHOOKS.map(({ event, description }) => (
                <div key={event} className="flex items-start gap-4 border border-white/10 rounded-xl px-5 py-4">
                  <code className="type-mono text-accent text-sm shrink-0 mt-0.5">{event}</code>
                  <p className="type-body text-white/50 text-sm">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-near-white py-16 md:py-20">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 text-center">
            <h2 className="type-headline text-stone-black text-display-md mb-4">Ready to integrate?</h2>
            <p className="type-body text-mid text-base mb-8">
              Sign up, grab your API key, and start building.
            </p>
            <a href="https://app.shylock.ai" className="btn-cta btn-cta-accent">
              Get started &rarr;
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
