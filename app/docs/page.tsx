import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Docs — AirDial',
  description:
    'AirDial Sauti API. Calls. Messages. Agents. Campaigns. REST + webhooks.',
  alternates: { canonical: 'https://caantin.ai/docs' },
}

const ENDPOINTS = [
  {
    method: 'POST',
    path: '/v1/calls',
    description: 'Start an outbound call.',
    body: `{
  "assistantId": "asst_jane_collections",
  "phoneNumberId": "pn_lagos_01",
  "region": "NG-LAGOS",
  "customer": {
    "number": "+2348012345678",
    "name": "Amara Okoye"
  }
}`,
    response: `{
  "id": "call_8f3k2j",
  "status": "ringing",
  "region": "NG-LAGOS",
  "assistant": "asst_jane_collections",
  "from": "+2341234567",
  "to": "+2348012345678",
  "created_at": "2026-04-16T10:30:00Z"
}`,
  },
  {
    method: 'POST',
    path: '/v1/messages',
    description: 'Send one message. WhatsApp, SMS, or email.',
    body: `{
  "channel": "whatsapp",
  "to": "+2348012345678",
  "content": {
    "text": "Hi Amara, a reminder — payment due on the 5th."
  },
  "assistantId": "asst_jane_collections"
}`,
    response: `{
  "id": "msg_a9x2kp",
  "channel": "whatsapp",
  "status": "sent",
  "to": "+2348012345678",
  "created_at": "2026-04-16T10:31:00Z"
}`,
  },
  {
    method: 'POST',
    path: '/v1/assistants',
    description: 'Create an assistant.',
    body: `{
  "name": "Jane",
  "language": "en-NG",
  "personality": {
    "system_prompt": "You are Jane, a collections agent for Kopa Bank in Lagos. Professional. Empathetic. Direct."
  },
  "voice": {
    "provider": "elevenlabs",
    "voice_id": "ada_nigerian"
  },
  "model": {
    "provider": "anthropic",
    "model": "claude-sonnet-4-6"
  }
}`,
    response: `{
  "id": "asst_jane_collections",
  "name": "Jane",
  "status": "active",
  "language": "en-NG",
  "created_at": "2026-04-16T10:00:00Z"
}`,
  },
  {
    method: 'GET',
    path: '/v1/calls/:id',
    description: 'Get a call. Transcript. Outcome. Recording.',
    body: null,
    response: `{
  "id": "call_8f3k2j",
  "status": "completed",
  "duration": 142,
  "outcome": "promise_to_pay",
  "transcript": [
    { "role": "agent",    "text": "Hi Amara, this is Jane from Kopa..." },
    { "role": "customer", "text": "Yes, I can pay on the 5th." }
  ],
  "recording_url": "https://sauti.shylock.ai/recordings/call_8f3k2j.mp3",
  "created_at": "2026-04-16T10:30:00Z",
  "ended_at": "2026-04-16T10:32:22Z"
}`,
  },
]

const WEBHOOKS = [
  { event: 'call.completed', description: 'Call ended. Transcript, duration, outcome attached.' },
  { event: 'call.failed', description: 'Call never connected. Error reason included.' },
  { event: 'message.delivered', description: 'WhatsApp, SMS, or email landed.' },
  { event: 'message.replied', description: 'Customer replied.' },
  { event: 'payment.promised', description: 'Agent got a promise to pay on the call.' },
]

function MethodBadge({ method }: { method: string }) {
  const styles =
    method === 'POST'
      ? 'bg-pink text-pink-ink'
      : method === 'GET'
        ? 'bg-white text-pink-ink'
        : 'bg-white/20 text-white'
  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-[11px] font-black tracking-widest ${styles}`}>
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
        <section className="bg-pink pt-32 pb-20 md:pt-40 md:pb-28 border-b-2 border-pink-ink">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <p className="type-label text-pink-ink/70 mb-5">Developers</p>
            <h1 className="type-display-xl text-pink-ink mb-8">
              Sauti API.
            </h1>
            <p className="type-body-lg text-pink-ink/80 max-w-xl mb-10 font-semibold">
              Calls. Messages. Agents. Campaigns. REST + webhooks. Nothing else to install.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <span className="type-mono text-sm font-bold text-pink bg-pink-ink px-4 py-3">
                https://sauti.shylock.ai/api
              </span>
              <a href="https://app.shylock.ai" className="btn-cta btn-cta-dark text-sm">
                Get your API key &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* Auth */}
        <section className="bg-pink-ink py-16 md:py-20 border-b border-white/10">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <p className="type-label text-pink mb-4">Auth</p>
            <h2 className="type-headline text-white text-3xl md:text-4xl mb-6">One header. One bearer token.</h2>
            <p className="type-body text-white/70 mb-8 max-w-xl font-medium">
              Generate keys in your dashboard. Pass as a bearer token. Done.
            </p>
            <div className="bg-black border-2 border-white/15 max-w-2xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <span className="w-2 h-2 rounded-full bg-pink" />
                <span className="w-2 h-2 rounded-full bg-amber" />
                <span className="w-2 h-2 rounded-full bg-live-green" />
              </div>
              <pre className="p-5 text-[13px] leading-relaxed text-white/90 overflow-x-auto">
                <code className="type-mono">{`Authorization: Bearer sk_live_your_api_key`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Endpoints */}
        <section className="bg-pink py-20 md:py-28 border-b-2 border-pink-ink">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <p className="type-label text-pink-ink/70 mb-5">Endpoints</p>
            <h2 className="type-display text-pink-ink mb-16">
              Four calls.<br />Everything you need.
            </h2>

            <div className="space-y-6">
              {ENDPOINTS.map(({ method, path, description, body, response }) => (
                <div key={path + method} className="bg-pink-ink border-2 border-pink-ink overflow-hidden">
                  <div className="px-6 py-4 border-b border-white/15 flex items-center gap-4 bg-pink-ink">
                    <MethodBadge method={method} />
                    <code className="type-mono text-white text-sm font-bold">{path}</code>
                    <span className="type-body text-white/60 text-sm ml-auto font-medium hidden md:block">{description}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-px bg-white/10">
                    {body && (
                      <div className="bg-pink-ink p-6">
                        <p className="type-label text-pink mb-3">Request</p>
                        <pre className="text-[12px] leading-relaxed text-white/90 overflow-x-auto">
                          <code className="type-mono">{body}</code>
                        </pre>
                      </div>
                    )}
                    <div className={`bg-pink-ink p-6 ${body ? '' : 'md:col-span-2'}`}>
                      <p className="type-label text-pink mb-3">200 OK</p>
                      <pre className="text-[12px] leading-relaxed text-white/90 overflow-x-auto">
                        <code className="type-mono">{response}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Webhooks */}
        <section className="bg-pink-ink py-20 md:py-28">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <p className="type-label text-pink mb-5">Real-time events</p>
            <h2 className="type-display text-white mb-6">Webhooks.</h2>
            <p className="type-body-lg text-white/70 mb-12 max-w-xl font-medium">
              Register a URL. We POST events as they happen.
            </p>

            <div className="grid md:grid-cols-2 gap-px bg-white/10 border-2 border-white/10">
              {WEBHOOKS.map(({ event, description }) => (
                <div key={event} className="bg-pink-ink p-6">
                  <code className="type-mono text-pink text-sm font-bold block mb-2">{event}</code>
                  <p className="type-body text-white/70 text-sm font-medium">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-pink py-24 md:py-32 border-t-2 border-pink-ink">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 text-center">
            <h2 className="type-display-xl text-pink-ink mb-6">Ship it.</h2>
            <p className="type-body-lg text-pink-ink/80 mb-10 font-semibold">
              Grab your API key. Make your first call in 30 seconds.
            </p>
            <a href="https://app.shylock.ai" className="btn-cta btn-cta-dark">
              Get started &rarr;
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
