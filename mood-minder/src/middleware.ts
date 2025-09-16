import { NextRequest, NextResponse } from 'next/server'

const PROTECTED_PREFIXES = ['/dashboard', '/games', '/quotes', '/images', '/health', '/recs', '/emergency']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const needsAuth = PROTECTED_PREFIXES.some(p => pathname.startsWith(p))
  if (!needsAuth) return NextResponse.next()

  const token = req.cookies.get('mm_token')?.value
  if (!token) {
    const url = req.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/games/:path*',
    '/quotes/:path*',
    '/images/:path*',
    '/health/:path*',
    '/recs/:path*',
    '/emergency/:path*',
  ],
}

