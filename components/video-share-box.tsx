"use client"

import React, { useState, useEffect } from "react"
import {
  Linkedin,
  Instagram,
  Copy,
  Check,
  Share2,
  Sparkles,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export interface VideoShareBoxProps {
  mode: "simple" | "chapter"
  title: string
  description?: string
  chapterTitle?: string
  chapterId?: number
  startTime?: number
  formattedTime?: string
  slug?: string
  className?: string
  showCardWrapper?: boolean
  hideChapterPill?: boolean
}

function toPersianDigits(str: string | number): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]
  return str.toString().replace(/[0-9]/g, (w) => persianDigits[+w])
}

const trackClarityEvent = (eventName: string, eventData?: Record<string, string>) => {
  if (typeof window !== "undefined" && (window as any).clarity) {
    ;(window as any).clarity("event", eventName, eventData)
  }
}

// Crisp Vector SVG for Telegram
function TelegramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  )
}

// Crisp Vector SVG for WhatsApp
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

export function VideoShareBox({
  mode,
  title,
  description,
  chapterTitle,
  chapterId,
  startTime,
  formattedTime,
  slug,
  className = "",
  showCardWrapper = true,
  hideChapterPill = false,
}: VideoShareBoxProps) {
  const [copied, setCopied] = useState(false)
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null)
  const [currentUrl, setCurrentUrl] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href)
    }
  }, [])

  const buildShareUrl = () => {
    if (typeof window === "undefined") {
      return slug ? `https://behradz.ir/courses/${slug}` : "https://behradz.ir"
    }

    const url = new URL(window.location.origin + window.location.pathname)
    if (mode === "chapter" && chapterId !== undefined) {
      url.searchParams.set("chapter", chapterId.toString())
    }
    url.hash = "video"
    return url.toString()
  }

  const buildShareText = () => {
    if (mode === "chapter" && chapterTitle) {
      const timeStr = formattedTime ? ` (دقیقه ${toPersianDigits(formattedTime)})` : ""
      return `«${chapterTitle}»${timeStr} - بخشی از ویدیوی «${title}»`
    }
    return `ویدیوی «${title}» - بهراد زاری`
  }

  const handleShare = async (platform: string) => {
    const shareUrl = buildShareUrl()
    const shareText = buildShareText()

    trackClarityEvent("video_share_clicked", {
      platform,
      mode,
      chapterId: chapterId?.toString() || "none",
    })

    switch (platform) {
      case "telegram": {
        const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
        window.open(tgUrl, "_blank", "noopener,noreferrer")
        break
      }
      case "whatsapp": {
        const waText = `${shareText}\n\n${shareUrl}`
        const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`
        window.open(waUrl, "_blank", "noopener,noreferrer")
        break
      }
      case "linkedin": {
        const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        window.open(liUrl, "_blank", "noopener,noreferrer")
        break
      }
      case "instagram": {
        // If native Web Share API is available (mobile browsers), try opening native share sheet
        if (typeof navigator !== "undefined" && navigator.share) {
          try {
            await navigator.share({
              title: shareText,
              text: shareText,
              url: shareUrl,
            })
            return
          } catch (err) {
            // User cancelled or share sheet failed, fall through to copy
          }
        }

        // Fallback: Copy link and give clear Instagram instruction
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          await navigator.clipboard.writeText(shareUrl)
          setCopied(true)
          setFeedbackToast("لینک کپی شد! می‌توانید آن را در استوری یا دایرکت اینستاگرام به اشتراک بگذارید.")
          setTimeout(() => setCopied(false), 3000)
          setTimeout(() => setFeedbackToast(null), 4500)
        }
        break
      }
      case "copy":
      default: {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          await navigator.clipboard.writeText(shareUrl)
          setCopied(true)
          setFeedbackToast(
            mode === "chapter"
              ? "لینک مستقیم این سرفصل کپی شد!"
              : "لینک مستقیم ویدیو کپی شد!"
          )
          setTimeout(() => setCopied(false), 2500)
          setTimeout(() => setFeedbackToast(null), 3500)
        }
        break
      }
    }
  }

  const promptMessage =
    mode === "chapter"
      ? "اگر این بخش از ویدیو برات مفید بوده، به اشتراک بگذار تا بقیه هم ببیننش"
      : "اگر این ویدیو برات مفید بوده، به اشتراک بگذار تا بقیه هم ببیننش"

  const shareContent = (
    <div className={`space-y-3 ${!showCardWrapper ? className : ""}`}>
      {/* Header Message */}
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5 flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
          <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-xs sm:text-sm font-medium text-foreground/95 leading-relaxed">
            {promptMessage}
          </p>

          {/* Chapter Pill (when in chapter mode and not hidden) */}
          {mode === "chapter" && chapterTitle && !hideChapterPill && (
            <div className="pt-0.5">
              <Badge
                variant="outline"
                className="inline-flex items-center gap-1.5 rounded-lg border-primary/30 bg-primary/5 px-2.5 py-0.5 text-[11px] font-medium text-primary"
              >
                <Sparkles className="h-3 w-3" />
                <span>
                  {chapterId ? `سرفصل ${toPersianDigits(chapterId)}: ` : ""}
                  {chapterTitle}
                </span>
                {formattedTime && (
                  <span className="font-mono opacity-80" dir="ltr">
                    ({toPersianDigits(formattedTime)})
                  </span>
                )}
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Share Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5 pt-0.5">
        {/* Telegram */}
        <button
          type="button"
          onClick={() => handleShare("telegram")}
          className="group flex min-h-[40px] sm:min-h-[42px] items-center justify-center gap-2 rounded-xl border border-border/80 bg-background/80 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium text-foreground transition-all duration-200 hover:border-[#229ED9]/60 hover:bg-[#229ED9]/10 hover:text-[#229ED9] hover:shadow-xs active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#229ED9]"
          title="اشتراک‌گذاری در تلگرام"
          aria-label="اشتراک‌گذاری در تلگرام"
        >
          <TelegramIcon className="h-4 w-4 text-[#229ED9] transition-transform duration-200 group-hover:scale-110" />
          <span>تلگرام</span>
        </button>

        {/* WhatsApp */}
        <button
          type="button"
          onClick={() => handleShare("whatsapp")}
          className="group flex min-h-[40px] sm:min-h-[42px] items-center justify-center gap-2 rounded-xl border border-border/80 bg-background/80 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium text-foreground transition-all duration-200 hover:border-[#25D366]/60 hover:bg-[#25D366]/10 hover:text-[#25D366] hover:shadow-xs active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
          title="اشتراک‌گذاری در واتساپ"
          aria-label="اشتراک‌گذاری در واتساپ"
        >
          <WhatsAppIcon className="h-4 w-4 text-[#25D366] transition-transform duration-200 group-hover:scale-110" />
          <span>واتساپ</span>
        </button>

        {/* LinkedIn */}
        <button
          type="button"
          onClick={() => handleShare("linkedin")}
          className="group flex min-h-[40px] sm:min-h-[42px] items-center justify-center gap-2 rounded-xl border border-border/80 bg-background/80 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium text-foreground transition-all duration-200 hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] hover:shadow-xs active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]"
          title="اشتراک‌گذاری در لینکدین"
          aria-label="اشتراک‌گذاری در لینکدین"
        >
          <Linkedin className="h-4 w-4 text-[#0A66C2] transition-transform duration-200 group-hover:scale-110" />
          <span>لینکدین</span>
        </button>

        {/* Instagram */}
        <button
          type="button"
          onClick={() => handleShare("instagram")}
          className="group flex min-h-[40px] sm:min-h-[42px] items-center justify-center gap-2 rounded-xl border border-border/80 bg-background/80 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium text-foreground transition-all duration-200 hover:border-[#E4405F]/60 hover:bg-[#E4405F]/10 hover:text-[#E4405F] hover:shadow-xs active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E4405F]"
          title="اشتراک‌گذاری در اینستاگرام"
          aria-label="اشتراک‌گذاری در اینستاگرام"
        >
          <Instagram className="h-4 w-4 text-[#E4405F] transition-transform duration-200 group-hover:scale-110" />
          <span>اینستاگرام</span>
        </button>

        {/* Copy Link (spans 2 columns on mobile for balanced visual symmetry) */}
        <button
          type="button"
          onClick={() => handleShare("copy")}
          className={`group col-span-2 sm:col-span-1 flex min-h-[40px] sm:min-h-[42px] items-center justify-center gap-2 rounded-xl border transition-all duration-200 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            copied
              ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-xs"
              : "border-border/80 bg-background/80 text-foreground hover:border-primary/60 hover:bg-primary/10 hover:text-primary hover:shadow-xs"
          }`}
          title="کپی لینک مستقیم"
          aria-label="کپی لینک مستقیم"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 animate-in zoom-in-50 duration-200" />
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">کپی شد</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              <span>کپی لینک</span>
            </>
          )}
        </button>
      </div>

      {/* Feedback Alert Toast */}
      {feedbackToast && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-700 dark:text-emerald-300 animate-in fade-in slide-in-from-top-1 duration-200">
          <Check className="h-3.5 w-3.5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span className="leading-snug">{feedbackToast}</span>
        </div>
      )}
    </div>
  )

  if (!showCardWrapper) {
    return shareContent
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border/80 bg-card/75 p-4 sm:p-5 backdrop-blur-md shadow-sm transition-all duration-300 ${className}`}
    >
      {/* Decorative subtle gradient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl"
      />
      <div className="relative">
        {shareContent}
      </div>
    </div>
  )
}
