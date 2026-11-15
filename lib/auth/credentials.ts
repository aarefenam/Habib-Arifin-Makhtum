import "server-only"

import { timingSafeEqual } from "node:crypto"

import { getAuthEnv } from "@/lib/env"

function safeCompare(left: string, right: string) {
  const leftValue = Buffer.from(left)
  const rightValue = Buffer.from(right)
  const size = Math.max(leftValue.length, rightValue.length)
  const leftBuffer = Buffer.alloc(size)
  const rightBuffer = Buffer.alloc(size)

  leftValue.copy(leftBuffer)
  rightValue.copy(rightBuffer)

  return (
    timingSafeEqual(leftBuffer, rightBuffer) &&
    leftValue.length === rightValue.length
  )
}

export function hasValidAdminCredentials(username: string, password: string) {
  const env = getAuthEnv()
  const usernameMatches = safeCompare(username, env.ADMIN_USERNAME)
  const passwordMatches = safeCompare(password, env.ADMIN_PASSWORD)

  return usernameMatches && passwordMatches
}
