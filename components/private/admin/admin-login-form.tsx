"use client"

import { useActionState, useState } from "react"
import { useFormStatus } from "react-dom"

import {
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  ShieldCheck,
  UserRound,
} from "lucide-react"

import { signInAdmin, type AdminLoginActionState } from "@/actions/admin-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const initialState: AdminLoginActionState = { error: null }

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="h-11 w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 aria-hidden className="size-4 animate-spin" />
          Memverifikasi...
        </>
      ) : (
        <>
          <KeyRound aria-hidden className="size-4" />
          Masuk ke dashboard
        </>
      )}
    </Button>
  )
}

export function AdminLoginForm() {
  const [state, formAction] = useActionState(signInAdmin, initialState)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <form action={formAction} className="mt-9 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="admin-username">Username</Label>
        <div className="relative">
          <UserRound
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="admin-username"
            name="username"
            autoComplete="username"
            autoFocus
            required
            spellCheck={false}
            className="h-12 pl-10"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="admin-password">Password</Label>
        <div className="relative">
          <KeyRound
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="admin-password"
            name="password"
            type={isPasswordVisible ? "text" : "password"}
            autoComplete="current-password"
            required
            className="h-12 px-10"
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible((visible) => !visible)}
            aria-label={
              isPasswordVisible ? "Sembunyikan password" : "Tampilkan password"
            }
            aria-pressed={isPasswordVisible}
            className="absolute top-1/2 right-1 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            {isPasswordVisible ? (
              <EyeOff aria-hidden className="size-4" />
            ) : (
              <Eye aria-hidden className="size-4" />
            )}
          </button>
        </div>
      </div>

      {state.error ? (
        <p
          id="admin-login-error"
          role="alert"
          className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2.5 text-sm leading-6 text-destructive"
        >
          {state.error}
        </p>
      ) : null}

      <div className="pt-1">
        <SubmitButton />
      </div>

      <p className="flex items-start gap-2 text-xs leading-5 text-muted-foreground">
        <ShieldCheck
          aria-hidden
          className="mt-0.5 size-3.5 shrink-0 text-blue-600"
        />
        Kredensial Anda diproses hanya untuk membuat sesi admin yang aman.
      </p>
    </form>
  )
}
