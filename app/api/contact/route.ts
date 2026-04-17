import { NextResponse } from 'next/server'

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? ''
const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL ?? 'hello@shylock.ai'

export async function POST(req: Request) {
  try {
    const { name, company, bookSize } = await req.json()

    if (!name || !company || !bookSize) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AirDial Website <hello@shylock.ai>',
        to: [NOTIFY_EMAIL],
        subject: `New inquiry from ${name} at ${company}`,
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 500px;">
            <h2 style="margin-bottom: 24px;">New contact form submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Delinquent book size:</strong> ${bookSize}</p>
            <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e5e5;" />
            <p style="color: #666; font-size: 13px;">Submitted from caantin.ai/contact</p>
          </div>
        `,
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('Resend error:', res.status, text)
      return NextResponse.json({ error: 'Failed to send. Please email hello@shylock.ai directly.' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
