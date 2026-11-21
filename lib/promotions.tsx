"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

/**
 * Programmer's Day 1405 (September 2026) Promotion
 * Active through end of 15 September 2026 (25 Shahrivar 1405).
 * Deadline is midnight end-of-day: 2026-09-16T00:00:00+03:30 (Iran is UTC+03:30).
 */
export const PROGRAMMERS_DAY_DEADLINE = new Date("2026-09-16T00:00:00+03:30").getTime()

/**
 * Courses eligible for the 5,000,000 Tomans promotion:
 * - System Design 1 & 2
 * - Art of Coding (هنر کدنویسی)
 * - JS Courses (Core JS/TS, Advanced JS/TS, Functional TS)
 * - Node.js Courses (Node Backends, Node.js Engineer)
 */
export const PROGRAMMERS_DAY_COURSES = [
  "system-design-1",
  "system-design-2",
  "art-of-coding",
  "core-js-ts",
  "advanced-js-ts",
  "functional-ts",
  "node-backends",
  "nodejs-engineer",
] as const

export const PROGRAMMERS_DAY_PRICE = 5000000
export const PROGRAMMERS_DAY_PRICE_FORMATTED = "۵,۰۰۰,۰۰۰"
export const PROGRAMMERS_DAY_PRIMARY_CODE = "روزم مبارک"
export const PROGRAMMERS_DAY_ENGLISH_CODE = "myday"

/**
 * Course-specific prices (in Tomans) with the Programmer's Day discount applied:
 * - JSTS Foundation: 2,500,000 (from 3,500,000)
 * - Scalable TS: 3,000,000 (from 5,000,000)
 * - Functional TS: 5,000,000 (from 7,500,000)
 * - Backend with Node.js: 3,500,000 (from 5,000,000)
 * - Expert Node.js: 5,000,000 (from 7,200,000)
 * - System Design 1 & 2, Art of Coding: 5,000,000
 */
export const PROGRAMMERS_DAY_COURSE_PRICES: Record<string, number> = {
  "core-js-ts": 2500000,
  "advanced-js-ts": 3000000,
  "functional-ts": 5000000,
  "node-backends": 3500000,
  "nodejs-engineer": 5000000,
  "system-design-1": 5000000,
  "system-design-2": 5000000,
  "art-of-coding": 5000000,
}

export function isProgrammersDayCourse(slugOrId?: string): boolean {
  if (!slugOrId) return false
  return (PROGRAMMERS_DAY_COURSES as readonly string[]).includes(slugOrId)
}

export function getProgrammersDayPrice(slugOrId?: string): number | null {
  if (!slugOrId) return null
  return PROGRAMMERS_DAY_COURSE_PRICES[slugOrId] ?? null
}

export function getProgrammersDayPriceFormatted(slugOrId?: string): string | null {
  const price = getProgrammersDayPrice(slugOrId)
  if (price === null) return null
  return price.toLocaleString("fa-IR")
}

/**
 * Evaluated in browser only so static build / SSR doesn't freeze the date.
 */
export function useIsProgrammersDayActive(): boolean {
  const [active, setActive] = useState(false)
  useEffect(() => {
    setActive(Date.now() < PROGRAMMERS_DAY_DEADLINE)
  }, [])
  return active
}

/**
 * Agentic Software Development Workshop Promotion (WF Campaign)
 * Active through Wednesday night, 30 September 2026 (Tehran time, UTC+03:30).
 * Deadline: 2026-09-30T23:59:59+03:30.
 */
export const AGENTIC_WORKSHOP_DEADLINE = new Date("2026-09-30T23:59:59+03:30").getTime()
export const AGENTIC_WORKSHOP_SLUG = "ai-assisted-software-engineering"
export const AGENTIC_WORKSHOP_DISCOUNTED_PRICE = 1500000
export const AGENTIC_WORKSHOP_DISCOUNTED_PRICE_FORMATTED = "۱,۵۰۰,۰۰۰"
export const AGENTIC_WORKSHOP_ORIGINAL_PRICE = 2500000
export const AGENTIC_WORKSHOP_ORIGINAL_PRICE_FORMATTED = "۲,۵۰۰,۰۰۰"
export const AGENTIC_WORKSHOP_DISCOUNT = 0.4

export function useIsAgenticWorkshopDiscountActive(): boolean {
  const [active, setActive] = useState(false)
  useEffect(() => {
    setActive(Date.now() < AGENTIC_WORKSHOP_DEADLINE)
  }, [])
  return active
}

export function getAgenticWorkshopRemainingTime(): {
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
} {
  const diff = AGENTIC_WORKSHOP_DEADLINE - Date.now()
  if (diff <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, isExpired: true }
  }
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { hours, minutes, seconds, isExpired: false }
}

export function AgenticCountdownTimer({
  className = "",
  compact = false,
}: {
  className?: string
  compact?: boolean
}) {
  const [remaining, setRemaining] = useState<{
    hours: number
    minutes: number
    seconds: number
    isExpired: boolean
  } | null>(null)

  useEffect(() => {
    const update = () => {
      setRemaining(getAgenticWorkshopRemainingTime())
    }
    update()
    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!remaining || remaining.isExpired) {
    return null
  }

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/30 px-2 py-0.5 rounded-md ${className}`}>
        <Clock className="w-3.5 h-3.5 text-red-500 animate-pulse" />
        <span>
          {remaining.hours > 0
            ? `${remaining.hours.toLocaleString("fa-IR")} ساعت باقی‌مانده`
            : `${remaining.minutes.toLocaleString("fa-IR")} دقیقه باقی‌مانده`}
        </span>
      </div>
    )
  }

  return (
    <div
      className={`mt-2.5 pt-2 border-t border-red-500/20 flex items-center justify-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 ${className}`}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
      </span>
      <Clock className="w-3.5 h-3.5 text-red-500" />
      <span>
        {remaining.hours > 0
          ? `${remaining.hours.toLocaleString("fa-IR")} ساعت باقی‌مانده تا پایان مهلت تخفیف`
          : `${remaining.minutes.toLocaleString("fa-IR")} دقیقه باقی‌مانده تا پایان مهلت تخفیف`}
      </span>
    </div>
  )
}

