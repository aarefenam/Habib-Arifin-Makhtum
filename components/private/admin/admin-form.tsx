"use client"

import { startTransition, useActionState, useState } from "react"

import { CheckCircle2, Loader2, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { CmsActionState } from "@/types/cms"

type AdminAction = (
  previousState: CmsActionState,
  formData: FormData
) => Promise<CmsActionState>

const initialState: CmsActionState = { message: null, status: "idle" }

function SubmitButton({ label, pending }: { label: string; pending: boolean }) {
  return (
    <Button type="submit" className="h-11" disabled={pending}>
      {pending ? (
        <>
          <Loader2 aria-hidden className="size-4 animate-spin" />
          Menyimpan...
        </>
      ) : (
        <>
          <Save aria-hidden className="size-4" />
          {label}
        </>
      )}
    </Button>
  )
}

export function AdminForm({
  action,
  children,
  className,
  submitLabel = "Simpan perubahan",
  disabled = false,
  resetOnSuccess = false,
}: {
  action: AdminAction
  children: React.ReactNode
  className?: string
  submitLabel?: string
  disabled?: boolean
  resetOnSuccess?: boolean
}) {
  const [revision, setRevision] = useState(0)
  const [state, formAction, pending] = useActionState(
    async (previous: CmsActionState, data: FormData) => {
      const result = await action(previous, data)
      if (result.status === "success" && resetOnSuccess)
        setRevision((value) => value + 1)
      return result
    },
    initialState
  )

  return (
    <form
      action={formAction}
      className={className}
      onSubmit={(event) => {
        event.preventDefault()
        if (pending || disabled) return
        // Dispatch manually so a validation error never resets unsaved input.
        const submitter = (event.nativeEvent as SubmitEvent).submitter
        const data = new FormData(event.currentTarget, submitter)
        startTransition(() => formAction(data))
      }}
    >
      <fieldset
        key={revision}
        disabled={disabled || pending}
        className="min-w-0 space-y-0 disabled:opacity-60"
      >
        <legend className="sr-only">{submitLabel}</legend>
        {children}
        <div className="mt-6 flex-center flex-wrap gap-3 border-t border-border pt-5">
          <SubmitButton label={submitLabel} pending={pending} />
          {state.message ? (
            <p
              role={state.status === "error" ? "alert" : "status"}
              className={
                state.status === "error"
                  ? "text-sm text-destructive"
                  : "flex-center gap-1.5 text-sm text-muted-foreground"
              }
            >
              {state.status === "success" ? (
                <CheckCircle2 aria-hidden className="size-4 text-blue-600" />
              ) : null}
              {state.message}
            </p>
          ) : null}
        </div>
      </fieldset>
    </form>
  )
}
