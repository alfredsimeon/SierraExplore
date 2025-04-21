import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Protected paths that require authentication
 */
const protectedPaths = ["/dashboard", "/bookings", "/profile", "/settings"]

/**
 * Middleware function to check authentication for protected routes
 *
 * This is a simplified version that checks for a cookie.
 * In a real application, you would validate the token on the server.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  if (isProtectedPath) {
    // Get the authentication cookie
    const hasAuthCookie = request.cookies.has("sierra-explore-auth")

    // If there's no auth cookie, redirect to login
    if (!hasAuthCookie) {
      // Redirect to login page instead of placeholder Google Form URL
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

/**
 * Configure which paths the middleware runs on
 */
export const config = {
  matcher: ["/dashboard/:path*", "/bookings/:path*", "/profile/:path*", "/settings/:path*"],
}
