import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/auth/constants"
import { verifyAccessToken, verifyRefreshToken } from "@/lib/auth/tokens"

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next()
  }

  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value
  const accessSession = await verifyAccessToken(accessToken)

  if (accessSession) {
    return NextResponse.next()
  }

  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value
  const refreshSession = await verifyRefreshToken(refreshToken)
  const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`

  if (refreshSession) {
    const refreshUrl = new URL("/api/admin/auth/refresh", request.url)
    refreshUrl.searchParams.set("next", nextPath)
    return NextResponse.redirect(refreshUrl)
  }

  const loginUrl = new URL("/admin/login", request.url)
  loginUrl.searchParams.set("next", nextPath)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ["/admin/:path*"],
}
