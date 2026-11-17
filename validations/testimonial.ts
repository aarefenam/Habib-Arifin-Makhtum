import { z } from "zod"

export const testimonialSchema = z.object({
  name: z.string().trim().min(2).max(120),
  role: z.string().trim().max(160),
  project: z.string().trim().max(160),
  rating: z.coerce.number().int().min(1).max(5),
  message: z.string().trim().min(10).max(2_000),
  website: z.string().max(0),
})
