"use client"

import React, { useState, useEffect } from "react"
import {
  Play,
  Clock,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Sparkles,
  Layers,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VideoShareBox } from "@/components/video-share-box"

export interface VideoChapter {
  id: number
  title: string
  subtitle?: string
  startTime: number // in seconds
  formattedTime?: string // e.g. "05:10"
  duration?: string // e.g. "۰۷:۲۰"
  summary?: string
  keyTakeaways?: string[]
  transcriptSnippet?: string
}

interface VideoChaptersPlayerProps {
  videoId: string
  chapters: VideoChapter[]
  title: string
  slug?: string
}

function formatSeconds(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

function toPersianDigits(str: string): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]
  return str.replace(/[0-9]/g, (w) => persianDigits[+w])
}

export function VideoChaptersPlayer({ videoId, chapters, title, slug }: VideoChaptersPlayerProps) {
  const [selectedChapterId, setSelectedChapterId] = useState<number>(chapters[0]?.id || 1)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentStartTime, setCurrentStartTime] = useState<number>(chapters[0]?.startTime || 0)

  // Initialize chapter from URL param (?chapter=X or ?t=X) if provided
  useEffect(() => {
    if (typeof window === "undefined" || chapters.length === 0) return

    const params = new URLSearchParams(window.location.search)
    const chapterParam = params.get("chapter")
    const tParam = params.get("t") || params.get("time")

    if (chapterParam) {
      const parsedId = parseInt(chapterParam, 10)
      const found = chapters.find((c) => c.id === parsedId)
      if (found) {
        setSelectedChapterId(found.id)
        setCurrentStartTime(found.startTime)
        return
      }
    }

    if (tParam) {
      const timeInSec = parseInt(tParam, 10)
      if (!isNaN(timeInSec)) {
        const found = [...chapters].reverse().find((c) => c.startTime <= timeInSec) || chapters[0]
        if (found) {
          setSelectedChapterId(found.id)
          setCurrentStartTime(timeInSec)
        }
      }
    }
  }, [chapters])

  const selectedChapter = chapters.find((c) => c.id === selectedChapterId) || chapters[0]

  const handleSelectChapter = (chapter: VideoChapter) => {
    setSelectedChapterId(chapter.id)
    setCurrentStartTime(chapter.startTime)
    setIsPlaying(true)

    if (typeof window !== "undefined") {
      try {
        const url = new URL(window.location.href)
        url.searchParams.set("chapter", chapter.id.toString())
        url.hash = "video"
        window.history.replaceState(null, "", url.toString())
      } catch (e) {
        // Fallback silently if history API is restricted
      }
    }
  }

  const handleNextChapter = () => {
    const currentIndex = chapters.findIndex((c) => c.id === selectedChapterId)
    if (currentIndex < chapters.length - 1) {
      handleSelectChapter(chapters[currentIndex + 1])
    }
  }

  const handlePrevChapter = () => {
    const currentIndex = chapters.findIndex((c) => c.id === selectedChapterId)
    if (currentIndex > 0) {
      handleSelectChapter(chapters[currentIndex - 1])
    }
  }

  const isFirstChapter = chapters[0]?.id === selectedChapterId
  const isLastChapter = chapters[chapters.length - 1]?.id === selectedChapterId

  return (
    <div className="space-y-6 my-6">
      {/* Header Badge */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-border/40">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs py-1 px-2.5 gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            سرفصل‌های تفکیک‌شده وبینار
          </Badge>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            (با کلیک روی هر بخش، ویدیو از همان دقیقه پخش می‌شود)
          </span>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          {toPersianDigits(chapters.length.toString())} سرفصل
        </span>
      </div>

      {/* Grid Layout: Video on Left/Top + Chapters List on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Video Area */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-border/70 bg-black aspect-video group">
            <iframe
              key={`${videoId}-${currentStartTime}-${isPlaying}`}
              src={`https://www.aparat.com/video/video/embed/videohash/${videoId}/vt/frame?startTime=${currentStartTime}${isPlaying ? "&autoplay=true" : ""}`}
              title={selectedChapter ? `${title} - ${selectedChapter.title}` : title}
              allowFullScreen
              allow="autoplay; fullscreen; picture-in-picture"
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>

          {/* Single Unified Card: Current Chapter Status + Key Takeaways + Social Share */}
          {selectedChapter && (
            <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/85 p-4 sm:p-5 backdrop-blur-md shadow-sm space-y-4">
              {/* Decorative subtle ambient gradient */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl"
              />

              {/* Top Bar: Live Playing Indicator + Navigation Controls */}
              <div className="relative flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-primary">
                    پخش سرفصل {toPersianDigits(selectedChapter.id.toString())} از {toPersianDigits(chapters.length.toString())}
                  </span>
                  {selectedChapter.formattedTime && (
                    <Badge variant="secondary" className="text-[11px] font-mono py-0 px-2 font-normal">
                      {toPersianDigits(selectedChapter.formattedTime)}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handlePrevChapter}
                    disabled={isFirstChapter}
                    className="h-7 sm:h-8 text-xs gap-1 cursor-pointer px-2.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                    بخش قبلی
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleNextChapter}
                    disabled={isLastChapter}
                    className="h-7 sm:h-8 text-xs gap-1 cursor-pointer px-2.5"
                  >
                    بخش بعدی
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {/* Key Takeaways Section */}
              {selectedChapter?.keyTakeaways && selectedChapter.keyTakeaways.length > 0 && (
                <div className="relative space-y-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>نکات کلیدی این بخش:</span>
                  </div>
                  <ul className="space-y-1.5 pr-2">
                    {selectedChapter.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2 leading-relaxed">
                        <span className="text-primary font-bold mt-0.5 select-none">•</span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Chapter-Specific Social Share Box (embedded smoothly inside the single card) */}
              <div className="relative pt-3 border-t border-border/50">
                <VideoShareBox
                  mode="chapter"
                  title={title}
                  chapterTitle={selectedChapter.title}
                  chapterId={selectedChapter.id}
                  startTime={selectedChapter.startTime}
                  formattedTime={selectedChapter.formattedTime || formatSeconds(selectedChapter.startTime)}
                  slug={slug}
                  showCardWrapper={false}
                  hideChapterPill={true}
                />
              </div>
            </div>
          )}
        </div>

        {/* Chapters List (Interactive Table of Contents) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-border/40">
            <h3 className="font-bold text-sm sm:text-base text-foreground flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span>فهرست مباحث وبینار</span>
            </h3>
            <span className="text-xs text-muted-foreground">انتخاب برای پرش زمان</span>
          </div>

          <div className="space-y-2.5 max-h-[560px] overflow-y-auto pr-1">
            {chapters.map((chapter) => {
              const isCurrent = chapter.id === selectedChapterId
              const timeDisplay = chapter.formattedTime || formatSeconds(chapter.startTime)

              return (
                <div
                  key={chapter.id}
                  onClick={() => handleSelectChapter(chapter)}
                  className={`group relative p-3 rounded-xl border transition-all cursor-pointer text-right ${
                    isCurrent
                      ? "bg-primary/10 border-primary/50 shadow-md ring-1 ring-primary/30"
                      : "bg-card border-border/60 hover:bg-muted/50 hover:border-border"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors text-xs font-bold ${
                        isCurrent
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                      }`}
                    >
                      {isCurrent ? <Play className="w-3.5 h-3.5 fill-current" /> : toPersianDigits(chapter.id.toString())}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4
                          className={`text-xs sm:text-sm font-semibold truncate ${
                            isCurrent ? "text-primary" : "text-foreground group-hover:text-primary"
                          }`}
                        >
                          {chapter.title}
                        </h4>
                        <Badge
                          variant={isCurrent ? "default" : "secondary"}
                          className="text-[10px] sm:text-[11px] font-mono py-0 px-2 flex-shrink-0"
                        >
                          <Clock className="w-2.5 h-2.5 ml-1" />
                          {toPersianDigits(timeDisplay)}
                        </Badge>
                      </div>

                      {chapter.summary && (
                        <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {chapter.summary}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-1 text-[10px] text-muted-foreground">
                        {chapter.duration && (
                          <span>مدت: {toPersianDigits(chapter.duration)}</span>
                        )}
                        <span className="text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                          پخش از این دقیقه
                          <ChevronLeft className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Full Playback Button */}
          <div className="p-3 rounded-xl bg-muted/40 border border-dashed border-border flex items-center justify-between gap-3">
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-foreground">مشاهده کامل بدون وقفه</p>
              <p className="text-[11px] mt-0.5">پخش از دقیقه ۰۰:۰۰</p>
            </div>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleSelectChapter(chapters[0])}
              className="text-xs gap-1 h-7 cursor-pointer"
            >
              <Play className="w-3 h-3 fill-current" />
              پخش از ابتدا
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
