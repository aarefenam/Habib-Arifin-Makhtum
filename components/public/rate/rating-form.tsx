"use client"

import { startTransition, useActionState, useState } from "react"
import Link from "next/link"
import { CheckCircle2, Loader2, Star } from "lucide-react"

import { submitTestimonial } from "@/actions/testimonial"
import type { TestimonialActionState } from "@/actions/testimonial"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RATING_LABELS } from "@/constants/testimonials"
import { cn } from "@/lib/utils"

const initialState: TestimonialActionState = { success: false, message: "" }

export function RatingForm({ projects }: { projects: string[] }) {
  const [state, formAction, isPending] = useActionState(
    submitTestimonial,
    initialState
  )
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const shown = hover || rating

  // ===== Thank-you state after a successful submit =====
  if (state.success) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8 text-center sm:p-10">
        <CheckCircle2 aria-hidden className="size-12 text-green-500" />
        <h2 className="heading-4">Thank you!</h2>
        <p className="max-w-sm text-muted-foreground">{state.message}</p>
        <Link
          href="/"
          className="mt-3 flex-center h-11 rounded-full border border-border bg-background px-6 text-sm font-semibold transition-colors hover:bg-muted"
        >
          Back to home
        </Link>
      </div>
    )
  }

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        event.preventDefault()
        if (isPending) return
        // Dispatch manually so an error never clears what the client typed
        const data = new FormData(event.currentTarget)
        startTransition(() => formAction(data))
      }}
      className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-5 sm:p-8"
    >
      {/* ===== Star picker ===== */}
      <div className="flex flex-col items-center gap-2">
        <div
          role="radiogroup"
          aria-label="Your rating"
          className="flex gap-1"
          onMouseLeave={() => setHover(0)}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <label
              key={value}
              className="cursor-pointer rounded-lg p-1 has-focus-visible:ring-2 has-focus-visible:ring-blue-600"
              onMouseEnter={() => setHover(value)}
            >
              <input
                type="radio"
                name="rating"
                value={value}
                checked={rating === value}
                onChange={() => setRating(value)}
                className="sr-only"
              />
              <Star
                aria-hidden
                className={cn(
                  "size-9 transition-all sm:size-10",
                  value <= shown
                    ? "scale-105 fill-amber-400 text-amber-400"
                    : "text-muted-foreground/30"
                )}
              />
              <span className="sr-only">
                {value} - {RATING_LABELS[value]}
              </span>
            </label>
          ))}
        </div>
        <p className="h-5 text-sm font-medium text-muted-foreground">
          {RATING_LABELS[shown] || "Tap a star to rate"}
        </p>
      </div>

      {/* ===== Client details ===== */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="rate-name">Your name *</Label>
          <Input
            id="rate-name"
            name="name"
            required
            placeholder="John Doe"
            className="h-11"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="rate-role">Position & company</Label>
          <Input
            id="rate-role"
            name="role"
            placeholder="CEO, Acme Travel"
            className="h-11"
          />
        </div>
      </div>

      {projects.length ? (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="rate-project">Project</Label>
          <select
            id="rate-project"
            name="project"
            defaultValue=""
            className="h-11 rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="">Select a project (optional)</option>
            {projects.map((project) => (
              <option key={project} value={project}>
                {project}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="rate-message">Your experience *</Label>
        <Textarea
          id="rate-message"
          name="message"
          required
          rows={6}
          placeholder="What was it like working together? What result did you get?"
          className="field-sizing-fixed"
        />
      </div>

      {/* Honeypot: bots fill this, people never see it */}
      <div aria-hidden className="hidden">
        <Input name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state.message ? (
        <p role="alert" className="text-sm font-medium text-destructive">
          {state.message}
        </p>
      ) : null}

      <Button type="submit" disabled={isPending} className="h-12 font-semibold">
        {isPending ? (
          <>
            <Loader2 aria-hidden className="size-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send rating"
        )}
      </Button>
    </form>
  )
}
