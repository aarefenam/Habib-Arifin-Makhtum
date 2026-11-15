"use client"

import { useState } from "react"
import Link from "next/link"

import { Label } from "@/components/ui/label"
import type { PortfolioMediaAsset } from "@/types/cms"

export function AssetField({
  id,
  name,
  label,
  value,
  assets,
}: {
  id: string
  name: string
  label: string
  value: string | null
  assets: PortfolioMediaAsset[]
}) {
  const [selected, setSelected] = useState(value ?? "")
  const asset = assets.find((item) => item.storageKey === selected)

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        name={name}
        value={selected}
        onChange={(event) => setSelected(event.target.value)}
        className="h-11 w-full min-w-0 rounded-lg border border-input bg-background px-3 text-sm"
      >
        <option value="">Tanpa gambar</option>
        {selected && !asset ? (
          <option value={selected}>{selected}</option>
        ) : null}
        {assets.map((item) => (
          <option key={item.id} value={item.storageKey}>
            {item.altText || item.storageKey}
          </option>
        ))}
      </select>
      {asset ? (
        <div className="rounded-lg border border-border bg-muted p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset.publicUrl}
            alt={asset.altText ?? "Preview aset"}
            className="h-24 w-full object-contain"
          />
        </div>
      ) : null}
      <Link
        href="/admin/media"
        className="w-fit text-xs text-muted-foreground underline underline-offset-4"
      >
        Upload atau kelola gambar di Media library
      </Link>
    </div>
  )
}
