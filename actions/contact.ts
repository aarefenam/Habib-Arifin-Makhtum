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
      message: "Lengkapi nama, email valid, dan pesan minimal 10 karakter.",
    }
  }

  if (!isSupabaseConfigured()) {
    return {
      success: false,
      message:
        "Formulir kontak belum dikonfigurasi. Silakan hubungi melalui WhatsApp.",
    }
  }

  try {
    await createContactMessage(parsed.data)
  } catch {
    return {
      success: false,
      message:
        "Pesan belum dapat dikirim. Silakan coba lagi atau hubungi melalui WhatsApp.",
    }
  }

  return {
    success: true,
    message: `Terima kasih ${parsed.data.name}, pesan Anda sudah diterima.`,
  }
}
