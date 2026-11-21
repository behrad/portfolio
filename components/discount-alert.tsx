"use client"

import { useIsProgrammersDayActive } from "@/lib/promotions"

export function DiscountRibbon() {
  const isProgrammersDay = useIsProgrammersDayActive()

  if (isProgrammersDay) {
    return (
      <a
        href="#courses-grid"
        className="group inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--danger)]"
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
        <span className="text-foreground">
          تخفیف ویژه روز برنامه‌نویس برای دوره‌های تخصصی فقط تا ۲۵ شهریور
        </span>
      </a>
    )
  }

  return null
}

export function DiscountNote() {
  const isProgrammersDay = useIsProgrammersDayActive()

  if (isProgrammersDay) {
    return (
      <p className="mx-auto mt-4 text-sm font-medium text-[var(--danger)]/90">
        تخفیف ویژه روز برنامه‌نویس فقط تا پایان ۲۵ شهریور معتبر است و پس از آن شهریه به مبلغ قبلی بازمی‌گردد.
      </p>
    )
  }

  return null
}
