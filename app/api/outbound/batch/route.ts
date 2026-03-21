import { NextResponse } from 'next/server'

const OUTBOUND_SECRET = process.env.OUTBOUND_API_SECRET ?? ''

interface Prospect {
  phoneNumber: string
  name: string
  company: string
  cluster?: string
}

/**
 * POST /api/outbound/batch
 *
 * Matt calls multiple prospects with a delay between each.
 * Rate: 1 call every 30 seconds to avoid flooding.
 *
 * Body: {
 *   prospects: Prospect[],
 *   delayMs?: number    // delay between calls, default 30000 (30s)
 * }
 */
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!OUTBOUND_SECRET || authHeader !== `Bearer ${OUTBOUND_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { prospects, delayMs = 30000 } = await req.json()

    if (!Array.isArray(prospects) || prospects.length === 0) {
      return NextResponse.json({ error: 'prospects array required' }, { status: 400 })
    }

    if (prospects.length > 50) {
      return NextResponse.json({ error: 'Max 50 prospects per batch' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shylock.ai'

    // Fire off calls with delays — non-blocking
    const results: { company: string; status: string; error?: string }[] = []

    for (const prospect of prospects) {
      try {
        const res = await fetch(`${appUrl}/api/outbound`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OUTBOUND_SECRET}`,
          },
          body: JSON.stringify(prospect),
        })

        if (res.ok) {
          results.push({ company: prospect.company, status: 'calling' })
        } else {
          const err = await res.json().catch(() => ({ error: 'unknown' }))
          results.push({ company: prospect.company, status: 'failed', error: err.error })
        }
      } catch (e) {
        results.push({
          company: prospect.company,
          status: 'failed',
          error: e instanceof Error ? e.message : 'unknown',
        })
      }

      // Delay between calls
      if (delayMs > 0) {
        await new Promise((r) => setTimeout(r, delayMs))
      }
    }

    return NextResponse.json({
      success: true,
      total: prospects.length,
      called: results.filter((r) => r.status === 'calling').length,
      failed: results.filter((r) => r.status === 'failed').length,
      results,
    })
  } catch (err) {
    console.error('Batch outbound error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
