"use client"

import * as React from "react"

import { ArrowUpRight, Loader2, Phone } from "lucide-react"

import { sendContactMessage } from "@/actions/contact"
import type { ContactActionState } from "@/actions/contact"
import { NAVBAR_INITIALS } from "@/constants/navigation"
import { hero_profile } from "@/lib/portfolio-data"
import { SocialIcon } from "@/components/shared/social-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toast"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"

export function ContactDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const formRef = React.useRef<HTMLFormElement>(null)
  const initialState: ContactActionState = { success: false, message: "" }
  const [state, formAction, isPending] = React.useActionState(
    sendContactMessage,
    initialState
  )

  React.useEffect(() => {
    if (!state.message) return
    if (state.success) {
      toast.add({
        title: "Pesan terkirim",
        description: state.message,
        type: "success",
      })
      formRef.current?.reset()
      onOpenChange(false)
    } else {
      toast.add({
        title: "Terjadi masalah",
        description: state.message,
        type: "error",
      })
    }
  }, [state, onOpenChange])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        data-lenis-prevent
        className="w-full! gap-0 overflow-y-auto p-6 sm:max-w-130! [&>*]:shrink-0"
      >
        <SheetHeader className="p-0 text-left">
          <SheetTitle className="text-3xl font-bold tracking-tight">
            Ada yang ingin didiskusikan?
          </SheetTitle>
          <SheetDescription>
            Isi formulir berikut untuk memulai percakapan.
          </SheetDescription>
        </SheetHeader>

        {/* WhatsApp quick-talk card */}
        <a
          href={hero_profile.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="group mt-6 block rounded-2xl border border-border bg-card p-4 shadow-md shadow-foreground/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-600/40 hover:shadow-lg hover:shadow-emerald-600/10"
        >
          <span className="flex items-center gap-3">
            <span
              aria-hidden
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white"
            >
              <SocialIcon brand="whatsapp" className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm text-muted-foreground">
                Ingin berbicara langsung?
              </span>
              <span className="block truncate text-base font-bold">
                Kirim pesan via WhatsApp
              </span>
            </span>
            <ArrowUpRight
              aria-hidden
              className="size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
          <span className="mt-3 flex items-center gap-2 border-t border-border pt-3 text-sm text-muted-foreground">
            <Phone aria-hidden className="size-4 shrink-0" />
            Ingin panggilan? Kirim pesan untuk menentukan waktu.
          </span>
        </a>

        {/* Identity row */}
        <div className="mt-6 flex-center gap-3">
          <span
            aria-hidden
            className="flex-center size-10 justify-center rounded-full bg-blue-600 text-sm font-bold text-white"
          >
            {NAVBAR_INITIALS}
          </span>
          <div>
            <p className="text-[15px] font-bold">{hero_profile.name}</p>
            <a
              href={`mailto:${hero_profile.email}`}
              className="text-sm font-semibold hover:text-blue-600 hover:underline"
            >
              {hero_profile.email}
            </a>
          </div>
        </div>

        <form
          ref={formRef}
          action={formAction}
          className="mt-6 flex flex-col gap-5"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-name">Nama</Label>
              <Input
                id="contact-name"
                name="name"
                placeholder="Nama"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                placeholder="Email"
                required
              />
            </div>
          </div>

          <div aria-hidden className="hidden">
            <Label htmlFor="contact-website">Website</Label>
            <Input
              id="contact-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="contact-message">
              Ceritakan kebutuhan atau proyek Anda
            </Label>
            <Textarea
              id="contact-message"
              name="message"
              rows={10}
              required
              className="field-sizing-fixed"
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="h-12 font-semibold"
          >
            {isPending ? (
              <>
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Mengirim...
              </>
            ) : (
              "Kirim pesan"
            )}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
