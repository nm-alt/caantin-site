import { NextResponse } from 'next/server'

// Called by Twilio when the <Dial> to the visitor completes (e.g. Matt picked up
// but the visitor didn't answer, or the call timed out). This provides a friendly
// message so Matt isn't left on a silent line.
export async function POST() {
  const twiml = `<Response><Say voice="alice">The visitor didn't pick up. We'll follow up with them by email. Goodbye.</Say><Hangup/></Response>`

  return new NextResponse(twiml, {
    headers: { 'Content-Type': 'text/xml' },
  })
}
