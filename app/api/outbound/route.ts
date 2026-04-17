import { NextResponse } from 'next/server'

const SAUTI_API_KEY = process.env.SAUTI_API_KEY ?? ''
const MATT_ASSISTANT_ID = process.env.MATT_LAWLER_ASSISTANT_ID ?? '70d3a7ea-5c15-4d35-a971-d69b26a7172d'
const DEMO_PHONE_ID = process.env.DEMO_PHONE_NUMBER_ID ?? '88e39b2e-f02c-499b-8729-cd23b2fe16bd'
const SAUTI_URL = 'https://sauti.shylock.ai/api/v1/calls'
const OUTBOUND_SECRET = process.env.OUTBOUND_API_SECRET ?? ''

// Cluster-specific pitch overrides for Matt
const CLUSTER_PITCHES: Record<string, { firstMessage: string; systemPromptAppend: string }> = {
  'post-acquisition': {
    firstMessage: "Hi {{visitorName}}, this is Matt from AirDial. I noticed your company recently went through an acquisition — new owners usually want the loan book cleaned up fast. I'd love to show you how we can help. Do you have two minutes?",
    systemPromptAppend: "The prospect's company was recently acquired. New ownership means NPL scrutiny and pressure to clean the book quickly. Emphasize speed: 60-second CSV upload, AI calls start immediately, no hiring needed. Offer a free 100-account pilot.",
  },
  'public-npl': {
    firstMessage: "Hi {{visitorName}}, this is Matt from AirDial. I've been looking at the collections challenge facing publicly listed lenders — NPL ratios showing up in quarterly earnings is brutal. We've built something that can help. Got a quick minute?",
    systemPromptAppend: "The prospect is a publicly listed company with NPL pressure visible in earnings reports. Emphasize: AI collections reduce NPL ratios without headcount increases, recoveries start within 72 hours, fully auditable for compliance reporting. Offer a free 100-account pilot to prove ROI before the next earnings cycle.",
  },
  'massive-scale': {
    firstMessage: "Hi {{visitorName}}, this is Matt from AirDial. When you're processing millions of accounts, hiring enough collection agents is basically impossible. We built AI voice agents that handle that at scale — 8 languages, thousands of concurrent calls. Worth a quick chat?",
    systemPromptAppend: "The prospect has tens of millions of users and can't scale human collection agents fast enough. Emphasize: unlimited concurrent AI calls, 8 languages including local accents, no per-agent hiring costs, handles volume that would require thousands of human agents. Offer a free 100-account pilot.",
  },
  'regulator-pressure': {
    firstMessage: "Hi {{visitorName}}, this is Matt from AirDial. I know regulatory scrutiny on collections practices is intensifying in your market. We've built AI agents that are compliant by design — every call recorded, every script approved, full audit trail. Two minutes to show you?",
    systemPromptAppend: "The prospect faces regulatory pressure on collections practices. Emphasize: 100% call recording and transcription, approved scripts only, full audit trail for regulators, no rogue agent behavior, compliant with local regulations. Offer a free 100-account pilot.",
  },
  'bnpl': {
    firstMessage: "Hi {{visitorName}}, this is Matt from AirDial. BNPL delinquency rates are climbing industry-wide — high volume, low ticket, impossible to collect manually at scale. We solve that with AI voice agents. Got a minute?",
    systemPromptAppend: "The prospect is a BNPL company with growing delinquency at scale. Emphasize: AI handles high-volume low-ticket collections profitably (human agents cost more than the debt), automated escalation paths, pay-for-performance model. Offer a free 100-account pilot.",
  },
  'default': {
    firstMessage: "Hi {{visitorName}}, this is Matt from AirDial. We help lenders recover overdue loans using AI voice agents — 8 languages, calls start in 60 seconds from a CSV upload, and you pay nothing unless we recover money. Got a quick minute?",
    systemPromptAppend: "This is a general sales call. Emphasize the core value prop: AI voice agents that call borrowers in their language, negotiate payment, and report back. 60-second setup, 8 languages, pay-for-performance. Offer a free 100-account pilot.",
  },
}

/**
 * POST /api/outbound
 *
 * Matt Lawler calls a prospect. Secured with API secret.
 *
 * Body: {
 *   phoneNumber: string,    // E.164
 *   name: string,           // Contact name
 *   company: string,        // Company name
 *   cluster?: string,       // post-acquisition | public-npl | massive-scale | regulator-pressure | bnpl | default
 * }
 */
export async function POST(req: Request) {
  try {
    // Auth check — this endpoint is not public
    const authHeader = req.headers.get('authorization')
    if (!OUTBOUND_SECRET || authHeader !== `Bearer ${OUTBOUND_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { phoneNumber, name, company, cluster = 'default' } = await req.json()

    if (!phoneNumber || !/^\+[1-9]\d{6,14}$/.test(phoneNumber.replace(/\s/g, ''))) {
      return NextResponse.json(
        { error: 'Valid E.164 phone number required' },
        { status: 400 },
      )
    }

    const pitch = CLUSTER_PITCHES[cluster] ?? CLUSTER_PITCHES['default']

    const res = await fetch(SAUTI_URL, {
      method: 'POST',
      headers: {
        'X-API-Key': SAUTI_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assistantId: MATT_ASSISTANT_ID,
        phoneNumberId: DEMO_PHONE_ID,
        customer: { number: phoneNumber.replace(/\s/g, '') },
        assistantOverrides: {
          firstMessage: pitch.firstMessage,
          model: {
            messages: [
              {
                role: 'system',
                content: pitch.systemPromptAppend,
              },
            ],
          },
          variableValues: {
            visitorName: name ?? 'there',
            companyName: company ?? '',
          },
        },
        metadata: {
          source: 'outbound-sales',
          contactName: name,
          company,
          cluster,
        },
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('Sauti outbound error:', res.status, text)
      return NextResponse.json(
        { error: 'Failed to initiate call', detail: text },
        { status: 502 },
      )
    }

    const data = await res.json()

    return NextResponse.json({
      success: true,
      callId: data.id,
      company,
      name,
      cluster,
    })
  } catch (err) {
    console.error('Outbound call error:', err)
    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 },
    )
  }
}
