import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public access to landing page, login, and static assets
  if (pathname === '/' || pathname === '/login' || pathname.startsWith('/_next') || pathname.startsWith('/assets')) {
    return NextResponse.next();
  }
  
  // Check for auth token in cookies
  const authCookie = request.cookies.get('greenproof_auth');
  
  // If accessing dashboard without auth, redirect to login
  if (pathname === '/dashboard' && !authCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard', '/login'],
};
