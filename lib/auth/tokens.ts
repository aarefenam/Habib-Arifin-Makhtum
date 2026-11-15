import "server-only"

import { SignJWT, jwtVerify } from "jose"

import { getAuthEnv } from "@/lib/env"
import type { AdminSession, AdminTokenKind } from "@/types/auth"

const ISSUER = "habib-arifin-portfolio"
const AUDIENCE = "portfolio-admin"

export const ACCESS_TOKEN_MAX_AGE = 60 * 15
export const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7

function getSecret() {
  return new TextEncoder().encode(getAuthEnv().JWT_SECRET)
}

async function createToken(
  session: AdminSession,
  tokenKind: AdminTokenKind,
  expiresIn: string
) {
  return new SignJWT({ role: session.role, tokenKind })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setSubject(session.username)
    .setIssuedAt()
    .setJti(crypto.randomUUID())
    .setExpirationTime(expiresIn)
    .sign(getSecret())
}

async function verifyToken(
  token: string | undefined,
  tokenKind: AdminTokenKind
) {
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      issuer: ISSUER,
      audience: AUDIENCE,
    })

    if (
      payload.role !== "admin" ||
      payload.tokenKind !== tokenKind ||
      typeof payload.sub !== "string"
    ) {
      return null
    }

    return { username: payload.sub, role: "admin" } satisfies AdminSession
  } catch {
    return null
  }
}

export function createAccessToken(session: AdminSession) {
  return createToken(session, "access", "15m")
}

export function createRefreshToken(session: AdminSession) {
  return createToken(session, "refresh", "7d")
}

export function verifyAccessToken(token: string | undefined) {
  return verifyToken(token, "access")
}

export function verifyRefreshToken(token: string | undefined) {
  return verifyToken(token, "refresh")
}
