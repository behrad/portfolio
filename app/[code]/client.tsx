"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Loader2, Sparkles } from "lucide-react"
import { buildRedirectUrl, type ShortUrlConfig } from "@/data/short-urls"

interface ShortUrlClientProps {
  config?: ShortUrlConfig
  code: string
}

export default function ShortUrlClient({ config, code }: ShortUrlClientProps) {
  const [redirectUrl, setRedirectUrl] = useState<string>(config?.target || "/")
  const [hasError, setHasError] = useState(!config)

  useEffect(() => {
    if (!config) {
      setHasError(true)
      return
    }

    // Combine any incoming search query parameters (like ?utm_campaign=xxx) with target
    const currentSearch = typeof window !== "undefined" ? window.location.search : ""
    const targetWithParams = buildRedirectUrl(config.target, currentSearch)
    setRedirectUrl(targetWithParams)

    // Execute immediate browser redirection
    try {
      window.location.replace(targetWithParams)
    } catch {
      window.location.href = targetWithParams
    }
  }, [config])

  if (hasError || !config) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl font-bold">
            !
          </div>
          <h1 className="text-xl font-bold text-slate-100 mb-2">لینک کوتاه پیدا نشد</h1>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            کد کوتاه <code className="text-primary-400 bg-slate-800 px-2 py-0.5 rounded font-mono">/{code}</code> در سیستم ثبت نشده یا منقضی شده است.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium text-sm transition-colors shadow-lg shadow-primary-600/20"
            >
              صفحه اصلی سایت
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-colors border border-slate-700"
            >
              مشاهده دوره‌ها
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-600/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-md w-full bg-slate-900/90 border border-slate-800/80 rounded-2xl p-8 shadow-2xl backdrop-blur flex flex-col items-center">
        {/* Animated spinner badge */}
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-xs font-mono mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>behradz.ir/{code}</span>
        </div>

        <h1 className="text-lg sm:text-xl font-bold text-slate-100 mb-2">
          {config.title || "در حال انتقال به صفحه مقصد..."}
        </h1>

        <p className="text-slate-400 text-xs sm:text-sm mb-6">
          در حال بارگذاری و هدایت خودکار...
        </p>

        {/* Fallback direct link */}
        <div className="w-full pt-4 border-t border-slate-800/80">
          <a
            href={redirectUrl}
            className="inline-flex items-center justify-center gap-2 text-xs text-primary-400 hover:text-primary-300 transition-colors py-1"
          >
            <span>اگر صفحه خودکار باز نشد، اینجا کلیک کنید</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </main>
  )
}
