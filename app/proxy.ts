import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


const PROTECTED_PREFIXES = ['/student', '/admin', '/parent', '/teacher', '/principal', '/dashboard', '/settings', '/profile', '/users', '/classes', '/subjects', '/exams', '/results', '/attendance', '/library', '/transport', '/hostel', '/fees', '/notifications', '/messages'];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));

  if (!isProtected) return NextResponse.next();

  const session = request.cookies.get('session')?.value;

  if (!session) {
    const signinUrl = new URL('/signin', request.url);
    signinUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: PROTECTED_PREFIXES.map((p) => `${p}/:path*`),
};