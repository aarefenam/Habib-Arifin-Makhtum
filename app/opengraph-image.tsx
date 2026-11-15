import { ImageResponse } from "next/og"

import { SITE } from "@/constants/site"

export const alt = `${SITE.name} - ${SITE.role}`

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#0b1220",
        color: "white",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          background: "#2196f3",
          borderRadius: "999px",
          height: "520px",
          opacity: 0.18,
          position: "absolute",
          right: "-120px",
          top: "-100px",
          width: "420px",
        }}
      />
      <div
        style={{
          alignItems: "center",
          border: "1px solid rgba(255,255,255,0.16)",
          borderRadius: "32px",
          display: "flex",
          gap: "56px",
          margin: "48px",
          padding: "64px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            background: "#2196f3",
            borderRadius: "32px",
            display: "flex",
            fontSize: "88px",
            fontWeight: 700,
            height: "180px",
            justifyContent: "center",
            letterSpacing: "-6px",
            width: "180px",
          }}
        >
          HA
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ color: "#8dcaff", fontSize: "28px", fontWeight: 600 }}>
            {SITE.role}
          </div>
          <div
            style={{ fontSize: "56px", fontWeight: 700, letterSpacing: "-2px" }}
          >
            {SITE.name}
          </div>
          <div style={{ color: "#cbd5e1", fontSize: "28px" }}>
            Web apps · ERP · API integration · IoT
          </div>
        </div>
      </div>
    </div>,
    size
  )
}
