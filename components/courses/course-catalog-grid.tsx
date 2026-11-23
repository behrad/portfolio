"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { COURSE_LAYERS, ROADMAP_NODES, type CourseLayer, type AudienceRole } from '@/lib/roadmap-data'
import { Filter, Layers, Clock, GraduationCap, PlayCircle, ArrowLeft, Video, Radio, Wrench, BookOpen } from 'lucide-react'
import {
  useIsProgrammersDayActive,
  isProgrammersDayCourse,
  PROGRAMMERS_DAY_PRICE_FORMATTED,
  PROGRAMMERS_DAY_PRIMARY_CODE,
  getProgrammersDayPriceFormatted,
  AgenticCountdownTimer,
} from '@/lib/promotions'

export interface CourseGridItem {
  id: string
  title: string
  description: string
  image: string
  duration: string
  price: string
  discountedPrice: string | null
  hasDiscount: boolean
  highlights: string[]
  isFull: boolean
  isWebinar: boolean
  isWorkshop: boolean
  isFree: boolean
  hasVideo: boolean
}

interface CourseCatalogGridProps {
  initialCourses: CourseGridItem[]
}

type ContentKind = {
  label: string
  Icon: typeof Video
  /** Tailwind classes for the badge surface, tinted per content kind. */
  tone: string
}

/**
 * A webinar we already broadcast and uploaded reads as a video; one still
 * scheduled reads as a webinar. Workshops and courses name themselves.
 */
function contentKind(course: CourseGridItem): ContentKind {
  if (course.isWebinar && course.hasVideo) {
    return {
      label: 'ویدیو',
      Icon: Video,
      tone: 'border-[var(--accent-border)] text-primary',
    }
  }
  if (course.isWebinar) {
    return {
      label: 'وبینار',
      Icon: Radio,
      tone: 'border-[color-mix(in_oklab,var(--warning)_35%,transparent)] text-[var(--warning)]',
    }
  }
  if (course.isWorkshop) {
    return {
      label: 'کارگاه',
      Icon: Wrench,
      tone: 'border-[color-mix(in_oklab,var(--success)_35%,transparent)] text-[var(--success)]',
    }
  }
  return {
    label: 'دوره',
    Icon: BookOpen,
    tone: 'border-[var(--border-strong)] text-foreground',
  }
}

function ctaLabel(course: CourseGridItem) {
  if (course.hasVideo) return 'مشاهده آنلاین'
  if (course.isFree) {
    if (course.isWebinar) return 'شرکت در وبینار'
    if (course.isWorkshop) return 'شرکت در کارگاه'
    return 'ثبت‌نام رایگان'
  }
  if (course.isWorkshop) return 'جزییات کارگاه'
  if (course.isWebinar) return 'مشاهده وبینار'
  return 'جزییات دوره'
}

function courseHref(course: CourseGridItem) {
  return course.hasVideo ? `/courses/${course.id}#video` : `/courses/${course.id}`
}

export function CourseCatalogGrid({ initialCourses }: CourseCatalogGridProps) {
  const isProgrammersDayActive = useIsProgrammersDayActive()
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<AudienceRole | 'all'>('all')
  const [selectedLayerFilter, setSelectedLayerFilter] = useState<CourseLayer | 'all'>('all')
  const [onlyFreeFilter, setOnlyFreeFilter] = useState(false)

  // Helper map from course id to node metadata
  const nodeMap = new Map(ROADMAP_NODES.map((n) => [n.id, n]))

  // Filter logic
  const filteredCourses = initialCourses.filter((course) => {
    const node = nodeMap.get(course.id)

    // Role filter check
    if (selectedRoleFilter !== 'all') {
      if (!node) return false
      const matchesRole =
        node.audiences.includes(selectedRoleFilter) || node.audiences.includes('everyone')
      if (!matchesRole) return false
    }

    // Layer filter check
    if (selectedLayerFilter !== 'all') {
      if (!node) return false
      if (node.layer !== selectedLayerFilter) return false
    }

    // Free content filter check
    if (onlyFreeFilter && !course.isFree) {
      return false
    }

    return true
  })

  return (
    <section id="courses-grid" className="container mx-auto px-4 py-14">
      <div className="mx-auto max-w-5xl">
        {/* Header & Filter Controls Bar */}
        <div className="mb-8 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                همه دوره‌ها، وبینارها و کارگاه‌های من
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                با استفاده از فیلترهای زیر دوره‌های مرتبط با سطح و حوزه تخصصی خود را انتخاب کنید.
              </p>
            </div>

            <span className="mono text-xs text-muted-foreground self-start sm:self-auto">
              {filteredCourses.length.toLocaleString('fa-IR')} از {initialCourses.length.toLocaleString('fa-IR')} دوره
            </span>
          </div>

          {/* Filter Controls UI */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-border bg-card/60 p-3 backdrop-blur-md">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground me-1">
                <Filter className="h-3.5 w-3.5 text-primary" />
                <span>تخصص:</span>
              </div>

              {/* Role Filter Buttons */}
              <div className="flex flex-wrap gap-1">
                {[
                  { id: 'all', label: 'همه دوره‌ها' },
                  { id: 'frontend', label: 'فرانت‌اند' },
                  { id: 'backend', label: 'بک‌اند' },
                  { id: 'architect', label: 'معماری و لید' },
                ].map((role) => {
                  const active = selectedRoleFilter === role.id
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRoleFilter(role.id as any)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                        active
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'border border-border bg-card/50 text-muted-foreground hover:border-[var(--border-strong)] hover:text-foreground'
                      }`}
                    >
                      {role.label}
                    </button>
                  )
                })}
              </div>

              <div className="h-4 w-px bg-border mx-1 hidden sm:block" />

              {/* Layer Filter Pills */}
              <div className="flex flex-wrap items-center gap-1">
                <span className="text-xs font-semibold text-muted-foreground me-1 hidden lg:inline-flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5" />
                  <span>لایه:</span>
                </span>

                {[
                  { id: 'all', label: 'همه لایه‌ها' },
                  { id: 'coding', label: 'کدنویسی' },
                  { id: 'code-architecture', label: 'معماری کد' },
                  { id: 'system-architecture', label: 'معماری سیستم' },
                ].map((layer) => {
                  const active = selectedLayerFilter === layer.id
                  const layerColor = layer.id !== 'all' ? COURSE_LAYERS[layer.id as CourseLayer]?.color : undefined

                  return (
                    <button
                      key={layer.id}
                      onClick={() => setSelectedLayerFilter(layer.id as any)}
                      className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                        active
                          ? 'border border-primary bg-primary/10 text-primary'
                          : 'border border-border bg-card/50 text-muted-foreground hover:border-[var(--border-strong)] hover:text-foreground'
                      }`}
                    >
                      {layerColor && (
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: layerColor }}
                        />
                      )}
                      <span>{layer.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Free Videos Sleek Checkbox Toggle */}
            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border/80 bg-card/40 px-2.5 py-1 text-xs font-medium transition-all hover:border-[var(--border-strong)] hover:bg-card/70 select-none shrink-0">
              <input
                type="checkbox"
                checked={onlyFreeFilter}
                onChange={(e) => setOnlyFreeFilter(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-border accent-primary cursor-pointer"
              />
              <span className={onlyFreeFilter ? "text-primary font-semibold" : "text-muted-foreground"}>
                ویدیوهای رایگان
              </span>
            </label>
          </div>
        </div>

        {/* Course rows */}
        {filteredCourses.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border py-16 text-center">
            <p className="text-sm text-muted-foreground">
              هیچ دوره‌ای با فیلترهای انتخاب شده یافت نشد.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setSelectedRoleFilter('all')
                setSelectedLayerFilter('all')
                setOnlyFreeFilter(false)
              }}
            >
              پاک کردن فیلترها
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredCourses.map((course) => {
              const node = nodeMap.get(course.id)
              const layerCfg = node ? COURSE_LAYERS[node.layer] : null
              const kind = contentKind(course)
              const isEligiblePromo = isProgrammersDayActive && isProgrammersDayCourse(course.id)

              return (
                <article
                  key={course.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-[var(--border-strong)] sm:flex-row sm:items-stretch"
                >
                  {/* Media */}
                  <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden border-b border-border bg-[color-mix(in_oklab,var(--card)_84%,black)] sm:aspect-auto sm:min-h-[180px] sm:w-[270px] sm:border-b-0 sm:border-e lg:w-[330px]">
                    <Image
                      src={course.image || '/placeholder.svg'}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 330px, (min-width: 640px) 268px, 100vw"
                      className="object-cover object-center transition-opacity duration-300 group-hover:opacity-90"
                    />
                    {/* Scrim keeps the overlaid badges legible over any cover */}
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
                      aria-hidden="true"
                    />
                    <span
                      className={`absolute bottom-3 start-3 inline-flex items-center gap-1.5 rounded-full border bg-card/85 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md ${kind.tone}`}
                    >
                      <kind.Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {kind.label}
                    </span>
                    {course.isFull && (
                      <span className="absolute end-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-border)] bg-card/90 px-2.5 py-1 text-[11px] font-medium text-[var(--danger)] backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--danger)]" aria-hidden="true" />
                        تکمیل ظرفیت
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex min-w-0 flex-1 flex-col gap-3 p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      {layerCfg && (
                        <span
                          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${layerCfg.badgeClass}`}
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: layerCfg.color }}
                          />
                          {layerCfg.titleFa}
                        </span>
                      )}
                      {course.isFree && (
                        <span className="inline-flex shrink-0 items-center rounded-full border border-[var(--success)]/35 px-2.5 py-0.5 text-[11px] font-semibold text-[var(--success)]">
                          رایگان
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-balance text-lg font-bold leading-8 tracking-tight text-foreground lg:text-xl">
                        <Link
                          href={courseHref(course)}
                          className="outline-none transition-colors hover:text-primary focus-visible:text-primary"
                        >
                          {course.title}
                        </Link>
                      </h3>
                      <p className="line-clamp-3 max-w-[62ch] text-sm leading-7 text-muted-foreground sm:line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {course.duration}
                      </span>
                      {node?.levelFa && (
                        <span className="inline-flex items-center gap-1.5">
                          <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                          {node.levelFa}
                        </span>
                      )}
                      {course.hasVideo && !course.isWebinar && (
                        <span className="inline-flex items-center gap-1.5 text-primary">
                          <PlayCircle className="h-3.5 w-3.5" aria-hidden="true" />
                          پیش‌نمایش ویدیویی
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex shrink-0 items-center justify-between gap-4 border-t border-border px-5 py-4 sm:w-[200px] sm:flex-col sm:items-stretch sm:justify-center sm:gap-4 sm:border-s sm:border-t-0 sm:px-5 sm:py-6 lg:w-[220px]">
                    <div className="sm:text-center">
                      {isEligiblePromo ? (
                        <div className="flex items-baseline gap-2 sm:flex-col sm:items-center sm:gap-0.5">
                          <span className="text-lg font-bold text-red-500 lg:text-xl tabular-nums">
                            {getProgrammersDayPriceFormatted(course.id) || PROGRAMMERS_DAY_PRICE_FORMATTED} تومان
                          </span>
                          <span className="text-xs text-muted-foreground line-through tabular-nums">
                            {course.price}
                          </span>
                          <span className="text-[10px] text-red-500/80 font-medium">
                            تخفیف روز برنامه‌نویس
                          </span>
                        </div>
                      ) : course.hasDiscount ? (
                        <div className="flex items-baseline gap-2 sm:flex-col sm:items-center sm:gap-0.5">
                          <span className="text-lg font-bold text-primary lg:text-xl tabular-nums">
                            {course.discountedPrice} تومان
                          </span>
                          <span className="text-xs text-muted-foreground line-through tabular-nums">
                            {course.price}
                          </span>
                          {course.id === "ai-assisted-software-engineering" && (
                            <AgenticCountdownTimer compact className="mt-1" />
                          )}
                        </div>
                      ) : (
                        <span
                          className={`text-lg font-bold lg:text-xl ${
                            course.isFree ? 'text-[var(--success)]' : 'text-foreground'
                          }`}
                        >
                          {course.price}
                        </span>
                      )}
                    </div>

                    <Button
                      asChild
                      className="h-11 shrink-0 rounded-lg px-5 font-medium shadow-none sm:w-full"
                    >
                      <Link href={courseHref(course)}>
                        {ctaLabel(course)}
                        <ArrowLeft className="ms-1 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
