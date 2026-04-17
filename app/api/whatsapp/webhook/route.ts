import { NextResponse } from 'next/server'
import crypto from 'crypto'

const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN ?? ''
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN ?? ''
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID ?? ''
const WHATSAPP_APP_SECRET = process.env.WHATSAPP_APP_SECRET ?? ''

// Matt Lawler's personality for text conversations
const MATT_SYSTEM_PROMPT = `You are Matt Lawler, an AI sales agent for AirDial (caantin.ai). You're friendly, direct, and knowledgeable about debt collections technology.

Key facts about AirDial:
- AI voice agents that call borrowers in their language to collect overdue debt
- 8 languages including Nigerian Pidgin, Yoruba, Igbo, Swahili, French, Zulu, Afrikaans, English
- 17 presets for different collection scenarios
- 60-second setup: upload a CSV, AI calls start immediately
- Pay-for-performance: $0 if no recovery
- Full regulatory compliance: every call recorded, transcribed, auditable
- Currently serving digital lenders, BNPL platforms, microfinance, and banks across Africa, UK, US, EU, MENA, and Southeast Asia

Your job:
1. Understand what the prospect does (lending, BNPL, banking, etc.)
2. Understand their collections pain (high NPL, scaling agents, regulatory pressure, etc.)
3. Offer a free 100-account pilot: "Give us 100 delinquent accounts. We call them. You pay nothing unless we recover money."
4. Get them to sign up at app.shylock.ai or schedule a demo call

Keep messages SHORT. This is WhatsApp, not email. 1-3 sentences max per message. Be conversational, not corporate.`

/**
 * GET /api/whatsapp/webhook
 * Meta webhook verification
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === WHATSAPP_VERIFY_TOKEN) {
    return new Response(challenge ?? '', { status: 200 })
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 })
}

/**
 * POST /api/whatsapp/webhook
 * Incoming messages from Meta WhatsApp Cloud API
 */
export async function POST(req: Request) {
  try {
    const rawBody = await req.text()

    // Verify signature from Meta
    if (WHATSAPP_APP_SECRET) {
      const signature = req.headers.get('x-hub-signature-256')
      const expectedSig = 'sha256=' + crypto
        .createHmac('sha256', WHATSAPP_APP_SECRET)
        .update(rawBody)
        .digest('hex')

      if (signature !== expectedSig) {
        console.error('WhatsApp webhook signature mismatch')
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const body = JSON.parse(rawBody)

    // Process each entry
    const entries = body.entry ?? []
    for (const entry of entries) {
      const changes = entry.changes ?? []
      for (const change of changes) {
        if (change.field !== 'messages') continue

        const value = change.value
        const messages = value?.messages ?? []

        for (const message of messages) {
          const from = message.from // sender phone number
          const messageType = message.type
          const messageId = message.id

          // Mark as read
          await markAsRead(messageId)

          // Only handle text messages for now
          if (messageType !== 'text') {
            await sendWhatsAppMessage(
              from,
              "Hey! I can only read text messages for now. What can I help you with?",
            )
            continue
          }

          const incomingText = message.text?.body ?? ''

          // Generate Matt's response
          const reply = await generateMattReply(from, incomingText)
          await sendWhatsAppMessage(from, reply)
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('WhatsApp webhook error:', err)
    return NextResponse.json({ success: true }) // Always return 200 to Meta
  }
}

// Simple conversation history (in production, use a database)
const conversations = new Map<string, { role: string; content: string }[]>()
const MAX_HISTORY = 20

async function generateMattReply(from: string, text: string): Promise<string> {
  // Get or create conversation history
  const history = conversations.get(from) ?? []
  history.push({ role: 'user', content: text })

  // Keep history bounded
  if (history.length > MAX_HISTORY) {
    history.splice(0, history.length - MAX_HISTORY)
  }

  try {
    // Use OpenAI for text responses (Sauti is voice-only)
    const openaiKey = process.env.OPENAI_API_KEY
    if (!openaiKey) {
      conversations.set(from, history)
      return "Hey! Thanks for reaching out. I'm Matt from AirDial — we help lenders recover overdue loans with AI voice agents. Want me to give you a quick call to walk you through it? Just share your number and I'll ring you in 10 seconds."
    }

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: MATT_SYSTEM_PROMPT },
          ...history,
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    })

    if (!res.ok) {
      console.error('OpenAI error:', res.status, await res.text())
      return "Thanks for reaching out! I'm Matt from AirDial. We help lenders recover overdue loans with AI voice agents that speak 8 languages. Want to try a free pilot with 100 accounts?"
    }

    const data = await res.json()
    const reply = data.choices?.[0]?.message?.content ?? "I'd love to help — can you tell me more about your collections needs?"

    history.push({ role: 'assistant', content: reply })
    conversations.set(from, history)

    return reply
  } catch (err) {
    console.error('Matt reply error:', err)
    return "Thanks for reaching out! I'm Matt from AirDial. We help lenders recover overdue loans with AI voice agents. Tell me about your collections challenge and I'll show you how we can help."
  }
}

async function sendWhatsAppMessage(to: string, text: string) {
  if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
    console.error('WhatsApp not configured — missing access token or phone number ID')
    return
  }

  const url = `https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: text },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('WhatsApp send error:', res.status, err)
  }
}

async function markAsRead(messageId: string) {
  if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) return

  const url = `https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`

  await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      status: 'read',
      message_id: messageId,
    }),
  }).catch(() => {}) // non-critical
}
