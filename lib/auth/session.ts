import "server-only"

import { cookies } from "next/headers"

import { getRuntimeEnv } from "@/lib/env"
import type { AdminSession } from "@/types/auth"

import {
  ACCESS_TOKEN_MAX_AGE,
  createAccessToken,
  createRefreshToken,
  REFRESH_TOKEN_MAX_AGE,
  verifyAccessToken,
} from "./tokens"
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "./constants"

export { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "./constants"

function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    maxAge,
    path: "/",
    sameSite: "lax" as const,
    secure: getRuntimeEnv().NODE_ENV === "production",
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  return verifyAccessToken(cookieStore.get(ACCESS_TOKEN_COOKIE)?.value)
}

export async function setAdminSession(session: AdminSession) {
  const [accessToken, refreshToken] = await Promise.all([
    createAccessToken(session),
    createRefreshToken(session),
  ])
  const cookieStore = await cookies()

  cookieStore.set(
    ACCESS_TOKEN_COOKIE,
    accessToken,
    cookieOptions(ACCESS_TOKEN_MAX_AGE)
  )
  cookieStore.set(
    REFRESH_TOKEN_COOKIE,
    refreshToken,
    cookieOptions(REFRESH_TOKEN_MAX_AGE)
  )
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(ACCESS_TOKEN_COOKIE)
  cookieStore.delete(REFRESH_TOKEN_COOKIE)
}

export function getAccessCookieOptions() {
  return cookieOptions(ACCESS_TOKEN_MAX_AGE)
}
