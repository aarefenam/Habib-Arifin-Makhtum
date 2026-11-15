import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/auth/constants"
import { getAccessCookieOptions } from "@/lib/auth/session"
import { createAccessToken, verifyRefreshToken } from "@/lib/auth/tokens"

function getSafeRedirectPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/admin"
  }

  return value
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value
  const session = await verifyRefreshToken(refreshToken)

  if (!session) {
    const loginUrl = new URL("/admin/login", request.url)
    loginUrl.searchParams.set(
      "next",
      getSafeRedirectPath(requestUrl.searchParams.get("next"))
    )
    return NextResponse.redirect(loginUrl)
  }

  const response = NextResponse.redirect(
    new URL(
      getSafeRedirectPath(requestUrl.searchParams.get("next")),
      request.url
    )
  )
  response.cookies.set(
    ACCESS_TOKEN_COOKIE,
    await createAccessToken(session),
    getAccessCookieOptions()
  )

  return response
}
