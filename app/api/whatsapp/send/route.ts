import { NextResponse } from 'next/server'

const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN ?? ''
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID ?? ''
const OUTBOUND_SECRET = process.env.OUTBOUND_API_SECRET ?? ''

/**
 * POST /api/whatsapp/send
 *
 * Send a WhatsApp message from Matt. Secured with API secret.
 * Use this for proactive outreach after a call, or standalone messages.
 *
 * Body: {
 *   to: string,          // Phone number in international format (no +)
 *   message?: string,    // Custom message (overrides template)
 *   template?: string,   // Template name (for business-initiated messages)
 *   templateParams?: string[], // Template parameters
 * }
 */
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!OUTBOUND_SECRET || authHeader !== `Bearer ${OUTBOUND_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
      return NextResponse.json(
        { error: 'WhatsApp not configured. Set WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID.' },
        { status: 503 },
      )
    }

    const { to, message, template, templateParams } = await req.json()

    if (!to) {
      return NextResponse.json({ error: 'to (phone number) required' }, { status: 400 })
    }

    // Clean phone number — Meta wants it without + prefix
    const cleanPhone = to.replace(/[^0-9]/g, '')

    const url = `https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`

    let payload: Record<string, unknown>

    if (template) {
      // Template message — required for business-initiated conversations (outside 24h window)
      payload = {
        messaging_product: 'whatsapp',
        to: cleanPhone,
        type: 'template',
        template: {
          name: template,
          language: { code: 'en' },
          components: templateParams
            ? [
                {
                  type: 'body',
                  parameters: templateParams.map((p: string) => ({ type: 'text', text: p })),
                },
              ]
            : undefined,
        },
      }
    } else if (message) {
      // Free-form text — only works within 24h of customer's last message
      payload = {
        messaging_product: 'whatsapp',
        to: cleanPhone,
        type: 'text',
        text: { body: message },
      }
    } else {
      return NextResponse.json(
        { error: 'Either message or template required' },
        { status: 400 },
      )
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('WhatsApp send error:', res.status, err)
      return NextResponse.json({ error: 'Failed to send', detail: err }, { status: 502 })
    }

    const data = await res.json()

    return NextResponse.json({
      success: true,
      messageId: data.messages?.[0]?.id,
    })
  } catch (err) {
    console.error('WhatsApp send error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
