"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Row = { label: string; href?: string; icon?: string }

export function ContentRepeater({
  name,
  label,
  value,
  kind,
}: {
  name: string
  label: string
  value: Row[]
  kind: "links" | "buildItems"
}) {
  const [rows, setRows] = useState(
    value.map((row, index) => ({ ...row, rowId: `initial-${index}` }))
  )
  const limit = kind === "links" ? 12 : 20
  function move(index: number, direction: number) {
    setRows((current) => {
      const next = [...current]
      ;[next[index], next[index + direction]] = [
        next[index + direction],
        next[index],
      ]
      return next
    })
  }
  return (
    <fieldset className="space-y-3 sm:col-span-2">
      <legend className="text-sm font-medium">{label}</legend>
      <p className="text-xs leading-5 text-muted-foreground">
        Urutan di bawah mengikuti tampilan website. Gunakan tombol panah untuk
        mengubah urutan.
      </p>
      <input type="hidden" name={`${name}.count`} value={rows.length} />
      {rows.map((row, index) => (
        <div
          key={row.rowId}
          className="rounded-xl border border-border bg-muted/30 p-4"
        >
          <div className="mb-3 flex-center justify-between gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              Item {index + 1}
            </span>
            <div className="flex-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={index === 0}
                onClick={() => move(index, -1)}
                aria-label={`Naikkan item ${index + 1}`}
              >
                <ArrowUp className="size-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={index === rows.length - 1}
                onClick={() => move(index, 1)}
                aria-label={`Turunkan item ${index + 1}`}
              >
                <ArrowDown className="size-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  setRows(rows.filter((item) => item.rowId !== row.rowId))
                }
                aria-label={`Hapus item ${index + 1}`}
              >
                <Trash2 className="size-4 text-destructive" />
              </Button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`${name}-${row.rowId}-label`}>Teks</Label>
              <Input
                id={`${name}-${row.rowId}-label`}
                name={`${name}.${index}.label`}
                value={row.label}
                required
                maxLength={200}
                onChange={(event) =>
                  setRows(
                    rows.map((item) =>
                      item.rowId === row.rowId
                        ? { ...item, label: event.target.value }
                        : item
                    )
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${name}-${row.rowId}-target`}>
                {kind === "links" ? "Tujuan link" : "Ikon"}
              </Label>
              {kind === "links" ? (
                <Input
                  id={`${name}-${row.rowId}-target`}
                  name={`${name}.${index}.href`}
                  value={row.href ?? ""}
                  required
                  placeholder="#about atau /about"
                  onChange={(event) =>
                    setRows(
                      rows.map((item) =>
                        item.rowId === row.rowId
                          ? { ...item, href: event.target.value }
                          : item
                      )
                    )
                  }
                />
              ) : (
                <select
                  id={`${name}-${row.rowId}-target`}
                  name={`${name}.${index}.icon`}
                  value={row.icon ?? "globe"}
                  onChange={(event) =>
                    setRows(
                      rows.map((item) =>
                        item.rowId === row.rowId
                          ? { ...item, icon: event.target.value }
                          : item
                      )
                    )
                  }
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                >
                  <option value="globe">Web</option>
                  <option value="shield">Integrasi</option>
                  <option value="briefcase">Bisnis</option>
                  <option value="store">Toko</option>
                  <option value="smartphone">Mobile</option>
                  <option value="graduation">Pendidikan</option>
                  <option value="calendar">Kalender</option>
                </select>
              )}
            </div>
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        disabled={rows.length >= limit}
        onClick={() =>
          setRows([
            ...rows,
            { rowId: crypto.randomUUID(), label: "", href: "", icon: "globe" },
          ])
        }
      >
        <Plus className="size-4" />
        Tambah item
      </Button>
    </fieldset>
  )
}
