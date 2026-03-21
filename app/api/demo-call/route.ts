import { NextResponse } from 'next/server'

const SAUTI_API_KEY = process.env.SAUTI_API_KEY ?? ''
const MATT_ASSISTANT_ID = process.env.MATT_LAWLER_ASSISTANT_ID ?? '70d3a7ea-5c15-4d35-a971-d69b26a7172d'
const DEMO_PHONE_ID = process.env.DEMO_PHONE_NUMBER_ID ?? '88e39b2e-f02c-499b-8729-cd23b2fe16bd'
const SAUTI_URL = 'https://sauti.shylock.ai/api/v1/calls'

// Simple rate limiter: max 3 calls per IP per hour
const callLog = new Map<string, number[]>()
const MAX_CALLS = 3
const WINDOW_MS = 60 * 60 * 1000 // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (callLog.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  callLog.set(ip, timestamps)
  return timestamps.length >= MAX_CALLS
}

function recordCall(ip: string) {
  const timestamps = callLog.get(ip) ?? []
  timestamps.push(Date.now())
  callLog.set(ip, timestamps)
}

// Basic E.164 validation
function isValidPhone(phone: string): boolean {
  return /^\+[1-9]\d{6,14}$/.test(phone.replace(/\s/g, ''))
}

export async function POST(req: Request) {
  try {
    const { phoneNumber, name } = await req.json()

    if (!phoneNumber || !isValidPhone(phoneNumber)) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number with country code (e.g. +234...)' },
        { status: 400 },
      )
    }

    // Rate limit by IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "You've reached the call limit. Try again in an hour, or email hello@shylock.ai." },
        { status: 429 },
      )
    }

    // Call Sauti
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
        assistantOverrides: name
          ? { variableValues: { visitorName: name } }
          : undefined,
        metadata: { source: 'website-demo', visitorName: name ?? 'Website visitor' },
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('Sauti error:', res.status, text)
      return NextResponse.json(
        { error: 'Something went wrong. Please try again or email hello@shylock.ai.' },
        { status: 502 },
      )
    }

    recordCall(ip)

    // Fire LinkedIn conversion if configured
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Demo call error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 },
    )
  }
}
