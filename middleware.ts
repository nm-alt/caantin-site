import { NextRequest, NextResponse } from 'next/server'

const CAANTIN_HOSTS = ['caantin.ai', 'www.caantin.ai', 'caantin.com', 'www.caantin.com']

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? ''
  const hostname = host.split(':')[0] // strip port for local dev

  if (CAANTIN_HOSTS.includes(hostname)) {
    // Serve the Caantin landing page for the root path
    if (request.nextUrl.pathname === '/') {
      const url = request.nextUrl.clone()
      url.pathname = '/caantin'
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|favicon|og-).*)'],
}
