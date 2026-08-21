"use client"

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  COURSE_LAYERS,
  ROADMAP_NODES,
  type CourseLayer,
  type AudienceRole,
  type RoadmapNode,
} from '@/lib/roadmap-data'
import {
  Sparkles,
  Layers,
  ArrowLeft,
  Map,
} from 'lucide-react'

// Enhanced SVG coordinates for responsive 760x340 viewBox (Zero horizontal scroll)
interface MetroStationNode extends RoadmapNode {
  cx: number
  cy: number
  lineNameFa: string
  lineColor: string
}

const METRO_STATIONS: MetroStationNode[] = [
  {
    ...ROADMAP_NODES.find((n) => n.id === 'core-js-ts')!,
    cx: 90,
    cy: 55,
    lineNameFa: 'فونداسیون کدنویسی',
    lineColor: '#f59e0b',
  },
  {
    ...ROADMAP_NODES.find((n) => n.id === 'advanced-js-ts')!,
    cx: 370,
    cy: 55,
    lineNameFa: 'اسکیل کدبیس',
    lineColor: '#f59e0b',
  },
  {
    ...ROADMAP_NODES.find((n) => n.id === 'functional-ts')!,
    cx: 650,
    cy: 55,
    lineNameFa: 'برنامه‌نویسی تابعی',
    lineColor: '#f59e0b',
  },
  {
    ...ROADMAP_NODES.find((n) => n.id === 'backend-nodejs')!,
    cx: 230,
    cy: 165,
    lineNameFa: 'مهندسی بک‌اند',
    lineColor: '#38bdf8',
  },
  {
    ...ROADMAP_NODES.find((n) => n.id === 'art-of-coding')!,
    cx: 510,
    cy: 165,
    lineNameFa: 'معماری کد & DDD',
    lineColor: '#818cf8',
  },
  {
    ...ROADMAP_NODES.find((n) => n.id === 'system-design-1')!,
    cx: 90,
    cy: 275,
    lineNameFa: 'سیستم دیزاین ۱',
    lineColor: '#2dd4bf',
  },
  {
    ...ROADMAP_NODES.find((n) => n.id === 'system-design-2')!,
    cx: 280,
    cy: 275,
    lineNameFa: 'سیستم دیزاین ۲',
    lineColor: '#2dd4bf',
  },
  {
    ...ROADMAP_NODES.find((n) => n.id === 'system-design-3')!,
    cx: 470,
    cy: 275,
    lineNameFa: 'سیستم دیزاین ۳',
    lineColor: '#2dd4bf',
  },
  {
    ...ROADMAP_NODES.find((n) => n.id === 'system-design-4')!,
    cx: 660,
    cy: 275,
    lineNameFa: 'سیستم دیزاین ۴',
    lineColor: '#2dd4bf',
  },
]

// Map labels use the real catalog title, dropping only a trailing
// "- ..." / "(...)" qualifier, then wrapping so it fits between stations.
function stationLabelLines(title: string): string[] {
  const clean = title.split(/\s*[-–(]\s*/)[0].trim()
  const lines: string[] = []
  let line = ''
  for (const word of clean.split(/\s+/)) {
    if (line && `${line} ${word}`.length > 28) {
      lines.push(line)
      line = word
    } else {
      line = line ? `${line} ${word}` : word
    }
  }
  if (line) lines.push(line)
  return lines.slice(0, 3)
}

// SVG Track definitions connecting stations
const METRO_TRACKS = [
  // M1 Coding & TS Track (Yellow)
  { id: 't-m1-1', from: 'core-js-ts', to: 'advanced-js-ts', color: '#f59e0b', d: 'M 90 55 L 370 55' },
  { id: 't-m1-2', from: 'advanced-js-ts', to: 'functional-ts', color: '#f59e0b', d: 'M 370 55 L 650 55' },
  { id: 't-m4-branch', from: 'core-js-ts', to: 'backend-nodejs', color: '#38bdf8', d: 'M 90 55 C 90 120, 160 165, 230 165' },

  // M4 Backend Line (Sky)

  // M2 Architecture Line (Purple)
  { id: 't-m2-1', from: 'advanced-js-ts', to: 'art-of-coding', color: '#818cf8', d: 'M 370 55 C 370 120, 430 165, 510 165' },
  { id: 't-m2-2', from: 'backend-nodejs', to: 'art-of-coding', color: '#818cf8', d: 'M 230 165 L 510 165' },

  // M3 System Design Expressway (Teal)
  { id: 't-m3-node-feed', from: 'backend-nodejs', to: 'system-design-1', color: '#2dd4bf', d: 'M 230 165 C 230 230, 160 275, 90 275' },
  { id: 't-m3-art-feed', from: 'art-of-coding', to: 'system-design-1', color: '#2dd4bf', d: 'M 510 165 C 510 240, 300 275, 90 275' },
  { id: 't-m3-chain-1', from: 'system-design-1', to: 'system-design-2', color: '#2dd4bf', d: 'M 90 275 L 280 275' },
  { id: 't-m3-chain-2', from: 'system-design-2', to: 'system-design-3', color: '#2dd4bf', d: 'M 280 275 L 470 275' },
  { id: 't-m3-chain-3', from: 'system-design-3', to: 'system-design-4', color: '#2dd4bf', d: 'M 470 275 L 660 275' },
]

const METRO_LINES = [
  {
    id: 'm1',
    label: 'کدنویسی JS/TS',
    color: '#f59e0b',
    descFa: 'شامل سه دوره، از مقدماتی تا حرفه‌ای؛ برای همه سطح‌ها و برای برنامه‌نویس‌های فرانت‌اند و بک‌اند.',
  },
  {
    id: 'm4',
    label: 'بک‌اند / Node.js',
    color: '#38bdf8',
    descFa: 'شامل سه دوره Node.js؛ از کسانی که می‌خواهند وارد Node.js شوند تا کسانی که با Node.js کار می‌کنند و می‌خواهند حرفه‌ای‌تر شوند.',
  },
  {
    id: 'm2',
    label: 'معماری کد & DDD',
    color: '#818cf8',
    descFa: 'برای دولوپرها روی هر زبان و هر استکی؛ نوشتن کد با قابلیت نگهداری بالا و مدل‌سازی و طراحی با DDD در پروژه‌های با اسکیل بالا.',
  },
  {
    id: 'm3',
    label: 'سیستم دیزاین',
    color: '#2dd4bf',
    descFa: 'چهار دوره که هرکدام بخشی از مفاهیم و تکنیک‌های موردنیاز یک معمار سیستم را پوشش می‌دهند.',
  },
] as const

export function MetroRoadmap() {
  const [activeLine, setActiveLine] = useState<'all' | 'm1' | 'm2' | 'm3' | 'm4'>('all')
  const [selectedRole, setSelectedRole] = useState<AudienceRole>('everyone')
  const [activeStationId, setActiveStationId] = useState<string | null>(null)
  const [hoveredStationId, setHoveredStationId] = useState<string | null>(null)

  const cardRef = useRef<HTMLDivElement>(null)

  // A pinned station is released by Escape, or by clicking anywhere that is
  // neither another station nor the inspector card itself.
  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Element | null
      if (!target) return
      if (target.closest?.('[data-station]')) return
      if (cardRef.current?.contains(target)) return
      setActiveStationId(null)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveStationId(null)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const focusedId = hoveredStationId || activeStationId
  const activeStation = focusedId ? METRO_STATIONS.find((s) => s.id === focusedId) : undefined

  // Helper to check if a station node is active under current filters
  const isNodeActive = (stationId: string) => {
    const station = METRO_STATIONS.find((s) => s.id === stationId)
    if (!station) return false
    return isPersonaMatch(station) && isTrackMatch(station)
  }

  // Determine SVG track line opacity
  const getTrackOpacity = (track: (typeof METRO_TRACKS)[0]) => {
    const fromActive = isNodeActive(track.from)
    const toActive = isNodeActive(track.to)

    if (!fromActive || !toActive) return 0.05

    if (activeLine === 'all') return 0.85
    if (activeLine === 'm1' && track.color === '#f59e0b') return 1
    if (activeLine === 'm2' && track.color === '#818cf8') return 1
    if (activeLine === 'm3' && track.color === '#2dd4bf') return 1
    if (activeLine === 'm4' && track.color === '#38bdf8') return 1
    return 0.05
  }

  // Check persona match
  function isPersonaMatch(station: MetroStationNode) {
    if (selectedRole === 'everyone') return true
    if (selectedRole === 'architect') {
      const architectExcluded = ['core-js-ts', 'advanced-js-ts', 'functional-ts']
      if (architectExcluded.includes(station.id)) return false
      return true
    }
    if (selectedRole === 'frontend') {
      const frontendIncluded = ['core-js-ts', 'advanced-js-ts', 'functional-ts', 'art-of-coding']
      return frontendIncluded.includes(station.id)
    }
    if (selectedRole === 'backend') {
      return station.audiences.includes('backend') || station.audiences.includes('everyone')
    }
    return station.audiences.includes(selectedRole)
  }

  // Check active line track match
  function isTrackMatch(station: MetroStationNode) {
    if (activeLine === 'all') return true
    if (activeLine === 'm1') {
      return ['core-js-ts', 'advanced-js-ts', 'functional-ts'].includes(station.id)
    }
    if (activeLine === 'm4') {
      return ['core-js-ts', 'backend-nodejs'].includes(station.id)
    }
    if (activeLine === 'm2') {
      return ['advanced-js-ts', 'backend-nodejs', 'art-of-coding'].includes(station.id)
    }
    if (activeLine === 'm3') {
      return ['backend-nodejs', 'art-of-coding', 'system-design-1', 'system-design-2', 'system-design-3', 'system-design-4'].includes(station.id)
    }
    return true
  }

  return (
    <section className="relative overflow-hidden border-b border-border bg-[#070a0f] py-8 md:py-12 text-foreground">
      {/* Background Metro Grid Lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container relative mx-auto px-4">
        {/* Header Title & Description */}
        <div className="mx-auto max-w-3xl text-center mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
            نقشه راه مهندسی نرم‌افزار
          </h1>

          <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
            سرفصل این دوره‌ها بر اساس تجربه من در طول سال‌ها توسعه نرم‌افزار، تیم‌سازی و فیدبک از تدریس تدوین شده. به همین دلیل می‌تونن در مسیر حرفه‌ای شما، از یک برنامه‌نویس تازه‌کار تا تک‌لید یا مدیر فنی، مفید باشن تا با دید بازتری فکر کنید و تصمیمات بهتری در پروژه‌ها و تیم‌تون بگیرید.
          </p>
        </div>

        {/* SINGLE-LINE LEGEND & FILTER BAR */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/50 px-4 py-2.5 backdrop-blur-md shadow-sm text-xs">
          {/* Role Selection */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-muted-foreground me-1 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>انتخاب نقش:</span>
            </span>

            <div className="flex flex-wrap items-center gap-1">
              {[
                { id: 'everyone', label: 'همه' },
                { id: 'frontend', label: 'فرانت‌اند' },
                { id: 'backend', label: 'بک‌اند' },
                { id: 'architect', label: 'معمار سیستم' },
              ].map((role) => {
                const active = selectedRole === role.id
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id as AudienceRole)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                      active
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'border border-border/60 bg-card/40 text-muted-foreground hover:border-border hover:text-foreground'
                    }`}
                  >
                    {role.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="hidden lg:block h-4 w-px bg-border/50" />

          {/* Track Line Selection */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-muted-foreground me-1 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-primary" />
              <span>مسیرها:</span>
            </span>

            <div className="flex flex-wrap items-center gap-1">
              {[{ id: 'all', label: 'همه مسیرها', color: null }, ...METRO_LINES].map((line) => {
                const active = activeLine === line.id
                return (
                  <button
                    key={line.id}
                    onClick={() => setActiveLine(line.id as any)}
                    className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-all ${
                      active
                        ? 'border-primary bg-primary/10 text-primary font-semibold'
                        : 'border-border/60 bg-card/30 text-muted-foreground hover:border-border hover:text-foreground'
                    }`}
                  >
                    {line.color && (
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: line.color }}
                      />
                    )}
                    <span>{line.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* METRO MAP DASHBOARD: RESPONSIVE SVG CANVAS (9 COLS) + HEIGHT-MATCHED INSPECTOR CARD (3 COLS) */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12 items-stretch">
          {/* SVG Canvas Column */}
          <div className="relative h-[19rem] sm:h-[23rem] lg:h-[24rem] xl:h-[25rem] overflow-hidden rounded-2xl border border-border/80 bg-[#090d16] p-3 md:p-5 backdrop-blur-xl shadow-xl lg:col-span-9 flex flex-col">
            <svg
              viewBox="0 0 760 340"
              preserveAspectRatio="xMidYMid meet"
              className="w-full min-h-0 flex-1 drop-shadow-lg"
            >
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Render Metro Track Lines */}
              {METRO_TRACKS.map((track) => {
                const opacity = getTrackOpacity(track)
                return (
                  <g key={track.id}>
                    {/* Soft Halo Path */}
                    <path
                      d={track.d}
                      fill="none"
                      stroke={track.color}
                      strokeWidth="5.5"
                      strokeLinecap="round"
                      strokeOpacity={opacity * 0.14}
                      filter="url(#glow)"
                    />
                    {/* Core Track Line */}
                    <path
                      d={track.d}
                      fill="none"
                      stroke={track.color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeOpacity={opacity * 0.9}
                      className="transition-all duration-300"
                    />
                  </g>
                )
              })}

              {/* Render Metro Station Circles & Nodes */}
              {METRO_STATIONS.map((station) => {
                const isSelected = (activeStationId === station.id) || (hoveredStationId === station.id)
                const isMatched = isPersonaMatch(station) && isTrackMatch(station)
                const labelLines = stationLabelLines(station.titleFa)

                return (
                  <g
                    key={station.id}
                    data-station={station.id}
                    onClick={() =>
                      setActiveStationId((current) => (current === station.id ? null : station.id))
                    }
                    onMouseEnter={() => setHoveredStationId(station.id)}
                    onMouseLeave={() => setHoveredStationId(null)}
                    className="cursor-pointer group transition-opacity duration-300"
                    style={{ opacity: isMatched ? 1 : 0.15 }}
                  >
                    {/* Invisible hit target to prevent hover jittering */}
                    <circle
                      cx={station.cx}
                      cy={station.cy}
                      r="30"
                      fill="transparent"
                    />

                    {/* Muted Compact Entry Point Badge */}
                    {station.isEntryPoint && isMatched && (
                      <g transform={`translate(${station.cx - 21}, ${station.cy - 38})`}>
                        <rect
                          width="42"
                          height="15"
                          rx="4"
                          fill="#0f172a"
                          stroke="#334155"
                          strokeWidth="1"
                        />
                        <text
                          x="21"
                          y="10.5"
                          textAnchor="middle"
                          fill="#e2e8f0"
                          fontSize="8.5"
                          fontWeight="600"
                        >
                          🚀 شروع
                        </text>
                      </g>
                    )}

                    {/* Clean Static Selection Ring */}
                    {isSelected && (
                      <circle
                        cx={station.cx}
                        cy={station.cy}
                        r="15"
                        fill="none"
                        stroke={station.lineColor}
                        strokeWidth="1.25"
                        strokeOpacity="0.55"
                      />
                    )}

                    {/* Main Station Circle */}
                    <circle
                      cx={station.cx}
                      cy={station.cy}
                      r={isSelected ? 9.5 : 8}
                      fill="#0f172a"
                      stroke={station.lineColor}
                      strokeWidth={isSelected ? '2.75' : '2.25'}
                      className="transition-all duration-200"
                    />

                    {/* Station Center Dot */}
                    <circle
                      cx={station.cx}
                      cy={station.cy}
                      r="2.5"
                      fill={station.lineColor}
                    />

                    {/* Station Label Text (Bilingual: Persian + English) */}
                    <text
                      x={station.cx}
                      y={station.cy + 24}
                      textAnchor="middle"
                      fill={isMatched ? (isSelected ? '#ffffff' : '#e2e8f0') : '#64748b'}
                      fontSize="11"
                      fontWeight={isSelected ? 'bold' : '500'}
                      className="pointer-events-none select-none font-vazir transition-colors duration-200"
                    >
                      {labelLines.map((line, i) => (
                        <tspan key={i} x={station.cx} dy={i === 0 ? 0 : 13}>
                          {line}
                        </tspan>
                      ))}
                    </text>

                    <text
                      x={station.cx}
                      y={station.cy + 24 + labelLines.length * 13}
                      textAnchor="middle"
                      fill={isMatched ? (isSelected ? '#38bdf8' : '#94a3b8') : '#475569'}
                      fontSize="9"
                      fontWeight="400"
                      className="pointer-events-none select-none mono transition-colors duration-200"
                    >
                      {station.subtitleEn}
                    </text>
                  </g>
                )
              })}
            </svg>

            <p className="mt-2 shrink-0 text-center text-[11px] font-medium leading-5 text-muted-foreground">
              برای مشاهده جزئیات هر دوره، روی ایستگاه آن کلیک کنید.
            </p>
          </div>

          {/* HEIGHT-MATCHED NARROW STATION INSPECTOR SIDE PANEL (3 COLS) */}
          <div
            ref={cardRef}
            className="lg:col-span-3 h-[26rem] lg:h-[24rem] xl:h-[25rem] overflow-hidden rounded-2xl border border-border bg-card/95 p-4 md:p-5 backdrop-blur-xl shadow-xl flex flex-col"
          >
            <AnimatePresence mode="wait">
              {!activeStation && (
                /* Default state: explain the map instead of pre-selecting a course */
                <motion.div
                  key="__intro__"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="h-full min-h-0 flex flex-col"
                >
                  <div className="min-h-0 flex-1 overflow-y-auto space-y-3 pe-1">
                    <div className="flex items-center gap-1.5">
                      <Map className="h-4 w-4 text-primary" />
                      <h3 className="text-base font-bold text-foreground">راهنمای نقشه راه دوره‌ها</h3>
                    </div>

                    <ul className="space-y-2">
                      {METRO_LINES.map((line) => (
                        <li key={line.id} className="flex items-start gap-2">
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                            style={{ backgroundColor: line.color }}
                          />
                          <div className="leading-5">
                            <span className="text-xs font-semibold text-foreground">{line.label}</span>
                            <p className="text-[11px] text-muted-foreground leading-5">{line.descFa}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeStation && (
                <motion.div
                  key={activeStation.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                  className="h-full min-h-0 flex flex-col"
                >
                  <div className="min-h-0 flex-1 overflow-y-auto space-y-3 pe-1">
                    {/* Station Header Badges */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {activeStation.isEntryPoint && (
                        <span className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] font-semibold text-slate-200 border border-slate-700">
                          🚀 شروع
                        </span>
                      )}

                      <span
                        className="rounded px-2 py-0.5 text-[10px] font-bold border"
                        style={{
                          backgroundColor: `${activeStation.lineColor}15`,
                          color: activeStation.lineColor,
                          borderColor: `${activeStation.lineColor}40`,
                        }}
                      >
                        {activeStation.lineNameFa}
                      </span>
                    </div>

                    {/* Course Title & English Subtitle */}
                    <div>
                      <h3 className="text-base font-bold text-foreground leading-snug">
                        {activeStation.titleFa}
                      </h3>
                      <p className="mono text-[11px] text-muted-foreground mt-0.5 dir-ltr text-right">
                        {activeStation.subtitleEn}
                      </p>
                    </div>

                    {/* Clean Purpose Description */}
                    <p className="text-xs leading-6 text-foreground/90 bg-muted/30 rounded-xl p-3 border border-border/40">
                      {activeStation.tooltipDescFa || activeStation.shortDescFa}
                    </p>

                    {/* Target Audience Note */}
                    {activeStation.targetAudienceFa && (
                      <div className="rounded-xl bg-teal-500/10 border border-teal-500/20 p-2.5 text-xs font-medium text-teal-300 leading-5">
                        <span>💡 {activeStation.targetAudienceFa}</span>
                      </div>
                    )}
                  </div>

                  {/* Direct Action Button */}
                  <Button asChild size="sm" className="w-full shrink-0 rounded-xl font-bold py-4 shadow-md mt-3">
                    <Link href={`/courses/${activeStation.pathSlug}`}>
                      <span>مشاهده دوره</span>
                      <ArrowLeft className="ms-1.5 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
