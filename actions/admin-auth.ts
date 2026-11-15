"use server"

import { redirect } from "next/navigation"

import { hasValidAdminCredentials } from "@/lib/auth/credentials"
import { clearAdminSession, setAdminSession } from "@/lib/auth/session"
import { isAuthConfigured } from "@/lib/env"
import { adminLoginSchema } from "@/validations/auth"

export type AdminLoginActionState = {
  error: string | null
}

export async function signInAdmin(
  _previousState: AdminLoginActionState,
  formData: FormData
): Promise<AdminLoginActionState> {
  const parsed = adminLoginSchema.safeParse({
    password: formData.get("password"),
    username: formData.get("username"),
  })

  if (!parsed.success) {
    return { error: "Masukkan username dan password." }
  }

  if (!isAuthConfigured()) {
    return { error: "Autentikasi admin belum dikonfigurasi." }
  }

  let credentialsAreValid = false

  try {
    credentialsAreValid = hasValidAdminCredentials(
      parsed.data.username,
      parsed.data.password
    )
  } catch {
    return { error: "Autentikasi admin belum dikonfigurasi dengan benar." }
  }

  if (!credentialsAreValid) {
    return { error: "Username atau password tidak valid." }
  }

  try {
    await setAdminSession({
      role: "admin",
      username: parsed.data.username,
    })
  } catch {
    return { error: "Autentikasi admin belum dikonfigurasi dengan benar." }
  }

  redirect("/admin")
}

export async function signOutAdmin() {
  await clearAdminSession()
  redirect("/admin/login")
}
