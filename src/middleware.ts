import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const isProtectedRoute =
    req.nextUrl.pathname.startsWith('/(admin)')

    if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/signin', req.url))
    }

    try {
      return NextResponse.next()
    } catch (e) {
      console.log(e)
      return NextResponse.redirect(new URL('/signin', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!login|customers|contract).*)'],
}
