"use client"

import { useEffect } from "react"
import { useSearchParams, usePathname } from "next/navigation"
import { initTracking } from "@/lib/tracking"

export function UtmTracker() {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  useEffect(() => {
    initTracking()
  }, [searchParams, pathname])

  return null
}
