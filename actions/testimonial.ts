"use server"

import { revalidatePath } from "next/cache"

import { isSupabaseConfigured } from "@/lib/env"
import { createTestimonial } from "@/lib/testimonials"
import { testimonialSchema } from "@/validations/testimonial"

export type TestimonialActionState = {
  success: boolean
  message: string
}

// Public action used by the /rate page. Rows are saved hidden.
export async function submitTestimonial(
  _prevState: TestimonialActionState,
  formData: FormData
): Promise<TestimonialActionState> {
  const parsed = testimonialSchema.safeParse({
    message: formData.get("message"),
    name: formData.get("name"),
    project: formData.get("project") ?? "",
    rating: formData.get("rating"),
    role: formData.get("role") ?? "",
    website: formData.get("website") ?? "",
  })

  if (!parsed.success) {
    return {
      success: false,
      message:
        "Please pick a star rating, enter your name, and write at least 10 characters.",
    }
  }

  if (!isSupabaseConfigured()) {
    return {
      success: false,
      message: "Ratings are not set up yet. Please try again later.",
    }
  }

  try {
    await createTestimonial(parsed.data)
  } catch {
    return {
      success: false,
      message: "Your rating could not be sent. Please try again.",
    }
  }

  revalidatePath("/admin/testimonials")
  return {
    success: true,
    message: `Thank you ${parsed.data.name}, your rating has been received.`,
  }
}
