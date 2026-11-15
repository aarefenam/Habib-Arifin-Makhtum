import "server-only"

import { createClient } from "@supabase/supabase-js"

import { getSupabaseEnv } from "@/lib/env"

export function getSupabaseAdmin() {
  const env = getSupabaseEnv()

  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  })
}
