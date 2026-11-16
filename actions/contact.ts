"use server"

import { createContactMessage } from "@/lib/contact-messages"
import { isSupabaseConfigured } from "@/lib/env"
import { contactMessageSchema } from "@/validations/contact"

export type ContactActionState = {
  success: boolean
  message: string
}

export async function sendContactMessage(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const parsed = contactMessageSchema.safeParse({
    email: formData.get("email"),
    message: formData.get("message"),
    name: formData.get("name"),
    website: formData.get("website") ?? "",
  })

  if (!parsed.success) {
    return {
      success: false,
      message: "Please enter your name, a valid email, and a message of at least 10 characters.",
    }
  }

  if (!isSupabaseConfigured()) {
    return {
      success: false,
      message:
        "The contact form is not set up yet. Please reach out via WhatsApp.",
    }
  }

  try {
    await createContactMessage(parsed.data)
  } catch {
    return {
      success: false,
      message:
        "Your message could not be sent. Please try again or reach out via WhatsApp.",
    }
  }

  return {
    success: true,
    message: `Thank you ${parsed.data.name}, your message has been received.`,
  }
}
