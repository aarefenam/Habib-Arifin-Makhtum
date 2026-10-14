"use client"

import { useEffect, useState } from "react"

function formatDhaka(now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dhaka",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(now)

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ""
  return `${get("weekday")} ${get("day")} ${get("month")}, ${get("hour")}:${get("minute")}:${get("second")}`
}

export function LocationClock() {
  const [time, setTime] = useState("")

  useEffect(() => {
    setTime(formatDhaka(new Date()))
    const id = setInterval(() => setTime(formatDhaka(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <p className="text-code font-semibold text-blue-600 tabular-nums" suppressHydrationWarning>
      {time || "Loading local time"}
    </p>
  )
}
