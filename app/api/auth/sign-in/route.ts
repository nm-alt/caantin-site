import { NextResponse } from 'next/server'

/**
 * Placeholder sign-in API. Replace with your auth provider (e.g. Supabase Auth).
 * On success return { redirect: "/dashboard" } or set cookies and return 200.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = typeof body?.email === 'string' ? body.email.trim() : ''
    const password = typeof body?.password === 'string' ? body.password : ''

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required.' },
        { status: 400 }
      )
    }

    // TODO: Validate credentials with your auth provider and set session.
    // Example with Supabase: signInWithPassword({ email, password })
    return NextResponse.json(
      { message: 'Sign-in is not configured yet. Contact us for access.' },
      { status: 501 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Invalid request.' },
      { status: 400 }
    )
  }
}
