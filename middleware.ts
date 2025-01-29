import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher([
  '/customer(.*)',
  '/profile(.*)',
  '/onboarding'
])
const isOnboardingRoute = createRouteMatcher(['/onboarding'])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, sessionClaims } = await auth()

  if (userId && !sessionClaims?.metadata?.onboardingComplete) {
    if (isOnboardingRoute(req)) {
      return NextResponse.next()
    }

    const onboardingUrl = new URL('/onboarding', req.url)
    return NextResponse.redirect(onboardingUrl)
  }

  if (
    userId &&
    isOnboardingRoute(req) &&
    sessionClaims?.metadata?.onboardingComplete
  ) {
    const customer = new URL('/customer/interviews', req.url)
    return NextResponse.redirect(customer)
  }

  if (isProtectedRoute(req)) await auth.protect()

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
