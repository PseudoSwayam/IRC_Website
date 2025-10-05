import { NextResponse } from 'next/server';

export async function middleware(request) {

  // --- THIS IS THE FIX ---
  // We correctly get the 'pathname' from 'request.nextUrl'.
  const { pathname } = request.nextUrl;

  // 1. If the user is already on the login page, do nothing.
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // 2. Check if the user is trying to access any page under /admin.
  // This line will now work correctly.
  if (pathname.startsWith('/admin')) {

    // 2a. Check for the "hall pass" query parameter.
    const isAuthenticated = request.nextUrl.searchParams.get('authed');

    if (isAuthenticated === 'true') {
      // If the hall pass exists, let them see the dashboard page.
      return NextResponse.next();
    }
    
    // 2b. If there's no hall pass, they are not allowed. Redirect to login.
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // For all other pages outside of /admin, the middleware does nothing.
  return NextResponse.next();
}

// The config remains the same.
export const config = {
  matcher: ['/admin/:path*'],
};