import { NextResponse } from 'next/server'

// Receives Twilio status callbacks (e.g. call completed).
// Can be extended to log call outcomes, send follow-up emails, etc.
export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const callStatus = form.get('CallStatus')
    const callSid = form.get('CallSid')
    console.log(`Callback status: ${callSid} — ${callStatus}`)
  } catch (err) {
    console.error('Status callback error:', err)
  }

  return NextResponse.json({ received: true })
}
