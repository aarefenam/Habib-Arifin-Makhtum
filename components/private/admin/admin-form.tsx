"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"

import { CheckCircle2, Loader2, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { CmsActionState } from "@/types/cms"

type AdminAction = (
  previousState: CmsActionState,
  formData: FormData
) => Promise<CmsActionState>

const initialState: CmsActionState = { message: null, status: "idle" }

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()

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
}: {
  action: AdminAction
  children: React.ReactNode
  className?: string
  submitLabel?: string
}) {
  const [state, formAction] = useActionState(action, initialState)

  return (
    <form action={formAction} className={className}>
      {children}
      <div className="mt-6 flex-center flex-wrap gap-3 border-t border-border pt-5">
        <SubmitButton label={submitLabel} />
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
    </form>
  )
}
