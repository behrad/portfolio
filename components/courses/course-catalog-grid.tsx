"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { COURSE_LAYERS, ROADMAP_NODES, type CourseLayer, type AudienceRole } from '@/lib/roadmap-data'
import { Filter, Layers, CheckCircle2 } from 'lucide-react'

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

export function CourseCatalogGrid({ initialCourses }: CourseCatalogGridProps) {
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<AudienceRole | 'all'>('all')
  const [selectedLayerFilter, setSelectedLayerFilter] = useState<CourseLayer | 'all'>('all')

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

    return true
  })

  return (
    <section id="courses-grid" className="container mx-auto px-4 py-14">
      {/* Header & Filter Controls Bar */}
      <div className="mb-8 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              لیست کامل دوره‌ها و وبینارها
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
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card/60 p-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground me-2">
            <Filter className="h-4 w-4 text-primary" />
            <span>فیلتر تخصص:</span>
          </div>

          {/* Role Filter Buttons */}
          <div className="flex flex-wrap gap-1.5">
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
                  className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
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

          <div className="h-4 w-px bg-border mx-2 hidden sm:block" />

          {/* Layer Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-muted-foreground me-1 flex items-center gap-1">
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
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                    active
                      ? 'border border-primary bg-primary/10 text-primary'
                      : 'border border-border bg-card/50 text-muted-foreground hover:border-[var(--border-strong)] hover:text-foreground'
                  }`}
                >
                  {layerColor && (
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: layerColor }}
                    />
                  )}
                  <span>{layer.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Grid Display */}
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
            }}
          >
            پاک کردن فیلترها
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => {
            const node = nodeMap.get(course.id)
            const layerCfg = node ? COURSE_LAYERS[node.layer] : null

            return (
              <Card
                key={course.id}
                className="card-hover-lift group flex flex-col gap-0 overflow-hidden rounded-xl border border-border bg-card p-0 shadow-none hover:border-[var(--border-strong)]"
              >
                {/* Course Image */}
                <div className="relative h-48 w-full overflow-hidden border-b border-border bg-card">
                  <Image
                    src={course.image || '/placeholder.svg'}
                    alt={course.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />

                  {/* Gradient overlay blending banner into card */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, var(--card) 4%, transparent 40%)',
                    }}
                  />

                  {course.isFull && (
                    <div className="absolute end-3 top-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-border)] bg-card/90 px-2.5 py-1 text-xs font-medium text-[var(--danger)] backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--danger)]" aria-hidden="true" />
                        تکمیل ظرفیت
                      </span>
                    </div>
                  )}
                </div>

                <CardHeader className="px-5 pb-0 pt-4">
                  {layerCfg && (
                    <div className="mb-2 flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${layerCfg.badgeClass}`}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: layerCfg.color }}
                        />
                        {layerCfg.titleFa}
                      </span>
                    </div>
                  )}

                  <CardTitle className="text-lg font-bold tracking-tight text-foreground">
                    {course.title}
                  </CardTitle>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{course.description}</p>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col px-5 pb-5 pt-4">
                  {/* Highlights */}
                  <ul className="mb-5 flex-1 space-y-2.5">
                    {course.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"
                        />
                        <span className="text-sm leading-7 text-foreground/80">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Course Info */}
                  <div className="mb-5 flex items-center justify-between border-t border-border pt-4 text-sm">
                    <span className="text-muted-foreground">{course.duration}</span>
                    <div className="text-left">
                      {course.hasDiscount ? (
                        <div className="flex flex-col items-end gap-0.5">
                          <span className="text-xs text-muted-foreground line-through">
                            {course.price}
                          </span>
                          <span className="text-base font-bold text-primary">
                            {course.discountedPrice} تومان
                          </span>
                        </div>
                      ) : (
                        <span className="text-base font-bold text-foreground">{course.price}</span>
                      )}
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full rounded-lg py-5 font-medium shadow-none transition-colors"
                  >
                    <Link href={course.hasVideo ? `/courses/${course.id}#video` : `/courses/${course.id}`}>
                      {course.hasVideo
                        ? 'مشاهده آنلاین'
                        : course.isFree
                          ? course.isWebinar
                            ? 'شرکت در وبینار'
                            : course.isWorkshop
                              ? 'شرکت در کارگاه'
                              : 'ثبت‌نام رایگان'
                          : course.isWorkshop
                            ? 'جزییات کارگاه'
                            : course.isWebinar
                              ? 'مشاهده وبینار'
                              : 'جزییات دوره'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </section>
  )
}
