import { NextResponse } from 'next/server'

const SAUTI_API_KEY = process.env.SAUTI_API_KEY ?? ''
const CALLBACK_ASSISTANT_ID = process.env.CALLBACK_ASSISTANT_ID ?? ''
const DEMO_PHONE_ID = process.env.DEMO_PHONE_NUMBER_ID ?? ''
const SAUTI_URL = 'https://sauti.shylock.ai/api/v1/calls'

// Simple rate limiter: max 3 calls per IP per hour
const callLog = new Map<string, number[]>()
const MAX_CALLS = 3
const WINDOW_MS = 60 * 60 * 1000

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

function isValidPhone(phone: string): boolean {
  return /^\+[1-9]\d{6,14}$/.test(phone.replace(/\s/g, ''))
}

export async function POST(req: Request) {
  try {
    const { phoneNumber } = await req.json()

    if (!phoneNumber || !isValidPhone(phoneNumber)) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number with country code.' },
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

    // Call visitor via Sauti — the assistant is configured to bridge to Matt
    const res = await fetch(SAUTI_URL, {
      method: 'POST',
      headers: {
        'X-API-Key': SAUTI_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assistantId: CALLBACK_ASSISTANT_ID,
        phoneNumberId: DEMO_PHONE_ID,
        customer: { number: phoneNumber.replace(/\s/g, '') },
        metadata: { source: 'website-callback' },
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
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Callback error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 },
    )
  }
}
