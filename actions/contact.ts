"use server"

export type ContactActionState = {
  success: boolean
  message: string
}

export async function sendContactMessage(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()

  if (!name || !email || !message) {
    return { success: false, message: "Please fill out all fields." }
  }

  // Mock sending - simulate network latency, always succeed for now
  await new Promise((resolve) => setTimeout(resolve, 1200))

  return {
    success: true,
    message: `Thanks ${name}, your message has been sent. I'll get back to you soon.`,
  }
}
