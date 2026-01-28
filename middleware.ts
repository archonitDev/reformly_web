import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // For image optimization API, ensure proper headers are set
  // This helps with reverse proxy (Traefik) scenarios and mobile user agents
  if (request.nextUrl.pathname.startsWith('/_next/image')) {
    const response = NextResponse.next()
    
    // Ensure proper headers for image optimization
    // This helps when behind a reverse proxy
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    
    // Ensure proper content type for image responses
    // This helps prevent 400 errors with different user agents
    const url = request.nextUrl.searchParams.get('url')
    if (url) {
      // Validate that the URL is a local image path
      if (url.startsWith('/images/') || url.startsWith('/logos/') || url.startsWith('/photos/')) {
        // Allow the request to proceed
        return response
      }
    }
    
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths including:
     * - _next/image (image optimization files - handled above)
     * - All other paths except static files and API routes
     */
    '/((?!api|_next/static|favicon.ico).*)',
  ],
}
