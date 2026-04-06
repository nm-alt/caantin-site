import { NextResponse } from 'next/server'

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID ?? ''
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN ?? ''
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER ?? ''
const MATT_PHONE_NUMBER = process.env.MATT_PHONE_NUMBER ?? ''

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

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER || !MATT_PHONE_NUMBER) {
      console.error('Missing Twilio environment variables')
      return NextResponse.json(
        { error: 'Callback is temporarily unavailable. Please email hello@shylock.ai.' },
        { status: 503 },
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

    const visitorNumber = phoneNumber.replace(/\s/g, '')

    // TwiML: when Matt picks up, announce the visitor and bridge the call
    const twiml = `<Response><Say voice="alice">Incoming callback from the Shylock website. Connecting you now.</Say><Dial callerId="${TWILIO_PHONE_NUMBER}" timeout="30" action="/api/callback/fallback"><Number>${visitorNumber}</Number></Dial></Response>`

    // Call Matt first. When he picks up, TwiML bridges to the visitor.
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls.json`

    const body = new URLSearchParams({
      To: MATT_PHONE_NUMBER,
      From: TWILIO_PHONE_NUMBER,
      Twiml: twiml,
      Timeout: '25',
      StatusCallback: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shylock.ai'}/api/callback/status`,
      StatusCallbackEvent: 'completed',
    })

    const res = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('Twilio error:', res.status, text)
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
