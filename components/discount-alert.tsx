"use client"

import { useEffect, useState } from "react"

// 50% discount runs through 15 Tir 1405; hide from 16 Tir (2026-07-07, Iran is UTC+03:30).
const DEADLINE = new Date("2026-07-07T00:00:00+03:30").getTime()

// Evaluated in the browser so a static build doesn't freeze the date.
function useDiscountActive() {
  const [active, setActive] = useState(false)
  useEffect(() => {
    setActive(Date.now() < DEADLINE)
  }, [])
  return active
}

export function DiscountRibbon() {
  const active = useDiscountActive()
  if (!active) return null

  return (
    <a
      href="#courses-grid"
      className="group inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
      style={{
        background: "color-mix(in oklch, var(--danger) 12%, transparent)",
        borderColor: "color-mix(in oklch, var(--danger) 38%, transparent)",
      }}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
          style={{ background: "var(--danger)" }}
        />
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{ background: "var(--danger)" }}
        />
      </span>
      <span className="mono text-base font-bold text-[var(--danger)]">50%</span>
      <span className="text-foreground">
        تخفیف همهٔ دوره‌ها، فقط تا <span className="font-bold">۲۶ تیر</span>
      </span>
    </a>
  )
}

export function DiscountNote() {
  const active = useDiscountActive()
  if (!active) return null

  return (
    <p className="mx-auto mt-4 text-sm font-medium text-[var(--danger)]/90">
      از ۲۶ تیر ماه تخفیف ۵۰ درصدی برداشته می‌شه. فرصت ثبت‌نام با نصف قیمت محدوده.
    </p>
  )
}
