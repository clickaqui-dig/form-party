import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/signin')) {
    return NextResponse.next();
  }

  if (pathname.endsWith('/')) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|/|api).*)'],
}