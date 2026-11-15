import "server-only"

import type { z } from "zod"

import { getSupabaseAdmin } from "@/lib/supabase"
import type { contactMessageSchema } from "@/validations/contact"

type ContactMessageInput = z.infer<typeof contactMessageSchema>

export async function createContactMessage({
  email,
  message,
  name,
}: ContactMessageInput) {
  const { error } = await getSupabaseAdmin().from("contact_messages").insert({
    sender_email: email,
    sender_name: name,
    message,
  })

  if (error) {
    throw new Error("Unable to save contact message")
  }
}
