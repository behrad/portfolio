"use client"

import React from "react"
import Link from "next/link"
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Layers,
  Code2,
  Shield,
  Users,
  Calendar,
  Zap,
  Brain,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AgilixWorkshopCtaProps {
  source?: string
  className?: string
}

const trackClarityEvent = (eventName: string, eventData?: Record<string, string>) => {
  if (typeof window !== "undefined" && (window as any).clarity) {
    ;(window as any).clarity("event", eventName, eventData)
  }
}

export function AgilixWorkshopCta({ source = "webinar_video", className = "" }: AgilixWorkshopCtaProps) {
  const targetHref = `/courses/ai-assisted-software-engineering?utm_source=${source}&utm_medium=video_cta&utm_campaign=agilix`

  const handleCtaClick = () => {
    trackClarityEvent("agilix_cta_clicked", { source })
  }

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-card via-card/95 to-primary/5 p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-primary/50 ${className}`}
    >
      {/* Decorative ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative space-y-6">
        {/* Top Badge & Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-1 text-xs gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              گام بعدی: اجرای کاملاً عملی در پروژه واقعی
            </Badge>
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 text-xs py-1 px-2.5">
              کارگاه تعاملی و پروژه-محور
            </Badge>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
              کارگاه عملی <span className="text-primary">Agentic Software Development</span>
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground font-medium">
              پیاده‌سازی زنده و واقعی با Agentها و تکنیک پیشرفته Grilling (از صفر تا پروداکشن)
            </p>
          </div>
        </div>

        {/* Core Value Statement */}
        <div className="rounded-2xl border border-primary/20 bg-background/80 p-4 sm:p-5 backdrop-blur-sm shadow-sm">
          <p className="text-sm sm:text-base text-foreground/95 leading-relaxed sm:leading-loose">
            ما در این کارگاه قرار است به صورت کاملاً عملی و قدم‌به‌قدم، یک پروژه واقعی را به صورت{" "}
            <strong className="text-primary font-bold">Agent-محور با تکنیک Grilling</strong> طراحی و پیاده‌سازی کنیم.
            یاد می‌گیریم چطور با شکستن مسائل پیچیده به برش‌های عمودی (Vertical Slices)، تدوین دقیق کانتکست (Context Engineering)، مهار خطاهای مدل‌ها و هدایت ساب‌ایجنت‌ها، کدی تمیز (Clean Code)، تست‌پذیر و با قابلیت نگهداری بالا در محیط پروداکشن تولید کنی.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-xl border border-border/80 bg-card/60 p-3.5 space-y-1.5">
            <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm">
              <Layers className="w-4 h-4 flex-shrink-0" />
              <span>تکنیک Grilling و Vertical Slices</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              شکستن ساختاریافته نیازمندی‌های بزرگ به تسک‌های خرد و بدون خطا برای ایجنت‌ها
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-3.5 space-y-1.5">
            <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm">
              <Brain className="w-4 h-4 flex-shrink-0" />
              <span>چطوری با Agent و Model به درک مشترکی از نیازمندی‌ها و Spec برسیم؟</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              و از طریق ساخت یک Context مشترک و <strong className="font-semibold text-foreground">ubiquitous language</strong>.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-3.5 space-y-1.5">
            <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm">
              <Code2 className="w-4 h-4 flex-shrink-0" />
              <span>توسعه با رویکرد Spec & TDD</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              تعریف دقیق کانتکست و زبان مشترک پروژه پیش از نگارش کد با آزمون‌های خودکار
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-3.5 space-y-1.5">
            <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm">
              <Cpu className="w-4 h-4 flex-shrink-0" />
              <span>Clean Code و حذف ریسک پروداکشن</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              مهار توهم (Hallucination) مدل‌ها و حفظ تمیزی و یکپارچگی دائمی Codebase
            </p>
          </div>
        </div>

        {/* Action & Conversion Bottom Row */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60">
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>گارانتی ۱۰۰٪ بازگشت وجه</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-primary flex-shrink-0" />
              <span>ظرفیت محدود جلسات آنلاین</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
              <span>۲ جلسه تعاملی (۴ ساعت)</span>
            </div>
          </div>

          <Button
            asChild
            size="lg"
            onClick={handleCtaClick}
            className="w-full sm:w-auto text-sm sm:text-base font-bold px-7 py-6 rounded-2xl shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all gap-2.5 group cursor-pointer bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98]"
          >
            <Link href={targetHref}>
              <span>مشاهده سرفصل‌ها و ثبت‌نام در کارگاه Agentic</span>
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:-translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
