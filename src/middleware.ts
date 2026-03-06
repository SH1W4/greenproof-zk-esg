import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check for auth token in cookies
  const authCookie = request.cookies.get('greenproof_auth');
  
  // Protection logic
  const isProtectedPath = pathname.startsWith('/dashboard') || pathname.startsWith('/v2');
  
  if (isProtectedPath && !authCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/v2/:path*'],
};
