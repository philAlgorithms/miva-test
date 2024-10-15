import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  /**
   * Redirect from homepage to student listing page
   */
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/students', request.url));
  }
}
