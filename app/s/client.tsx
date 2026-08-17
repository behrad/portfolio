"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Link2,
  Plus,
  QrCode,
  Search,
  Sparkles,
  Wand2,
} from "lucide-react"
import { shortUrlsList, type ShortUrlConfig } from "@/data/short-urls"
import { coursesData } from "@/data/courses"

export default function ShortenerDashboardClient() {
  const [selectedCourse, setSelectedCourse] = useState("")
  const [customPath, setCustomPath] = useState("")
  const [shortCode, setShortCode] = useState("")
  const [title, setTitle] = useState("")
  const [utmSource, setUtmSource] = useState("")
  const [utmMedium, setUtmMedium] = useState("")
  const [utmCampaign, setUtmCampaign] = useState("")
  const [utmContent, setUtmContent] = useState("")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [copiedSnippet, setCopiedSnippet] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Generate random 5-character short code
  const generateRandomCode = () => {
    const chars = "abcdefghjkmnpqrstuvwxyz23456789"
    let result = ""
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setShortCode(result)
  }

  // Pre-fill quick UTM presets
  const applyPreset = (source: string, medium: string, campaign?: string) => {
    setUtmSource(source)
    setUtmMedium(medium)
    if (campaign) setUtmCampaign(campaign)
  }

  // Calculate destination URL
  const basePath = selectedCourse ? `/courses/${selectedCourse}` : customPath.trim() || "/"
  const queryParams = new URLSearchParams()
  if (utmSource.trim()) queryParams.set("utm_source", utmSource.trim())
  if (utmMedium.trim()) queryParams.set("utm_medium", utmMedium.trim())
  if (utmCampaign.trim()) queryParams.set("utm_campaign", utmCampaign.trim())
  if (utmContent.trim()) queryParams.set("utm_content", utmContent.trim())

  const queryString = queryParams.toString()
  const destinationUrl = queryString ? `${basePath}?${queryString}` : basePath
  const fullShortUrl = shortCode.trim() ? `https://behradz.ir/${shortCode.trim()}` : "https://behradz.ir/..."

  // Generated code snippet to easily add to data/short-urls.ts
  const codeSnippet = `  {
    code: "${shortCode.trim() || "my-code"}",
    target: "${destinationUrl}",
    title: "${title.trim() || "عنوان لینک"}",
    createdAt: "${new Date().toISOString().split("T")[0]}",
  },`

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const filteredLinks = shortUrlsList.filter((item) => {
    const query = searchTerm.toLowerCase().trim()
    if (!query) return true
    return (
      item.code.toLowerCase().includes(query) ||
      (item.title && item.title.toLowerCase().includes(query)) ||
      item.target.toLowerCase().includes(query)
    )
  })

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs mb-3 font-mono">
              <Link2 className="w-3.5 h-3.5" />
              <span>URL Shortener & UTM Generator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              مدیریت و ساخت لینک‌های کوتاه (Short URLs)
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              تبدیل آدرس دوره‌ها و صفحات طولانی به لینک‌های کوتاه برند شده همراه با UTM Tracking
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-medium border border-slate-800 transition-colors"
          >
            <span>بازگشت به سایت</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Generator & Config Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary-400" />
                ساخت لینک کوتاه جدید
              </h2>
              <button
                type="button"
                onClick={generateRandomCode}
                className="inline-flex items-center gap-1.5 text-xs text-primary-400 hover:text-primary-300 bg-primary-500/10 hover:bg-primary-500/20 border border-primary-500/20 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Wand2 className="w-3.5 h-3.5" />
                تولید کد ۵ حرفی
              </button>
            </div>

            {/* Destination Selection */}
            <div className="space-y-4">
              <label className="block text-xs font-semibold text-slate-300">
                ۱. انتخاب دوره مقصد یا آدرس دلخواه:
              </label>

              <select
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value)
                  if (e.target.value) setCustomPath("")
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-primary-500"
              >
                <option value="">-- انتخاب از میان دوره‌ها و کارگاه‌ها --</option>
                {Object.entries(coursesData).map(([slug, course]) => (
                  <option key={slug} value={slug}>
                    {course.title} (/courses/{slug})
                  </option>
                ))}
              </select>

              {!selectedCourse && (
                <input
                  type="text"
                  placeholder="یا وارد کردن مسیر دلخواه (مثلاً: /coaching یا /about)"
                  value={customPath}
                  onChange={(e) => setCustomPath(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-primary-500 font-mono"
                  dir="ltr"
                />
              )}
            </div>

            {/* Short Code & Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  ۲. کد کوتاه (Short Code):
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-mono select-none">
                    behradz.ir/
                  </span>
                  <input
                    type="text"
                    placeholder="ai-ws"
                    value={shortCode}
                    onChange={(e) =>
                      setShortCode(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ""))
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-24 pr-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-primary-500 font-mono text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  عنوان / برچسب لینک (اختیاری):
                </label>
                <input
                  type="text"
                  placeholder="مثال: کارگاه هوش مصنوعی - بایو اینستاگرام"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>

            {/* UTM Presets */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-300">
                  ۳. تنظیمات سریع UTM (Presets):
                </label>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => applyPreset("instagram", "bio", selectedCourse || "workshop")}
                  className="text-xs px-2.5 py-1 rounded-lg bg-pink-500/10 text-pink-300 border border-pink-500/20 hover:bg-pink-500/20 transition-colors"
                >
                  اینستاگرام بایو (Bio)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset("instagram", "story", selectedCourse || "workshop")}
                  className="text-xs px-2.5 py-1 rounded-lg bg-pink-500/10 text-pink-300 border border-pink-500/20 hover:bg-pink-500/20 transition-colors"
                >
                  اینستاگرام استوری
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset("telegram", "channel", selectedCourse || "workshop")}
                  className="text-xs px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-300 border border-sky-500/20 hover:bg-sky-500/20 transition-colors"
                >
                  کانال تلگرام
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset("linkedin", "post", selectedCourse || "workshop")}
                  className="text-xs px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                >
                  پست لینکدین
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset("", "", "")}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 transition-colors"
                >
                  پاک کردن UTM
                </button>
              </div>
            </div>

            {/* UTM Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1 font-mono">
                  utm_source (منبع):
                </label>
                <input
                  type="text"
                  placeholder="instagram / telegram / linkedin"
                  value={utmSource}
                  onChange={(e) => setUtmSource(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono text-left"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1 font-mono">
                  utm_medium (رسانه):
                </label>
                <input
                  type="text"
                  placeholder="bio / story / post / cpc"
                  value={utmMedium}
                  onChange={(e) => setUtmMedium(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono text-left"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1 font-mono">
                  utm_campaign (کمپین):
                </label>
                <input
                  type="text"
                  placeholder="ai_ws / summer_2026"
                  value={utmCampaign}
                  onChange={(e) => setUtmCampaign(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono text-left"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1 font-mono">
                  utm_content (محتوا/اختیاری):
                </label>
                <input
                  type="text"
                  placeholder="header_cta / banner1"
                  value={utmContent}
                  onChange={(e) => setUtmContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono text-left"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {/* Preview & Code Snippet */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Preview Card */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <QrCode className="w-4 h-4 text-primary-400" />
                پیش‌نمایش زنده لینک
              </h3>

              <div className="space-y-3 bg-slate-950/80 rounded-xl p-4 border border-slate-800/80">
                <div>
                  <span className="text-[11px] text-slate-500 block mb-1">لینک کوتاه خروجی:</span>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-sm text-primary-400 font-medium truncate" dir="ltr">
                      {fullShortUrl}
                    </span>
                    {shortCode && (
                      <button
                        type="button"
                        onClick={() => handleCopy(fullShortUrl, "preview_short")}
                        className="text-xs p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0"
                        title="کپی لینک کوتاه"
                      >
                        {copiedCode === "preview_short" ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/60">
                  <span className="text-[11px] text-slate-500 block mb-1">آدرس مقصد با UTM:</span>
                  <span className="font-mono text-xs text-slate-400 break-all" dir="ltr">
                    {destinationUrl}
                  </span>
                </div>
              </div>

              {/* Code Snippet for data/short-urls.ts */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-300">
                    قطعه کد برای فایل <code className="text-primary-400 font-mono text-[11px]">data/short-urls.ts</code>:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(codeSnippet)
                      setCopiedSnippet(true)
                      setTimeout(() => setCopiedSnippet(false), 2000)
                    }}
                    className="inline-flex items-center gap-1 text-[11px] text-primary-400 hover:text-primary-300 bg-primary-500/10 px-2 py-1 rounded-md transition-colors"
                  >
                    {copiedSnippet ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        کپی شد!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        کپی آبجکت
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-[11px] font-mono text-emerald-400/90 overflow-x-auto" dir="ltr">
                  {codeSnippet}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Registered Short Links Table */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Link2 className="w-5 h-5 text-primary-400" />
                لینک‌های کوتاه فعال ({shortUrlsList.length} لینک)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                تمام لینک‌های زیر هم‌اکنون به صورت فعال در دامنه سایت در دسترس هستند.
              </p>
            </div>

            {/* Search filter */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute right-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="جستجوی کد، عنوان، مقصد..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-3 px-3 font-semibold">کد کوتاه</th>
                  <th className="py-3 px-3 font-semibold">عنوان / کاربرد</th>
                  <th className="py-3 px-3 font-semibold">صفحه مقصد</th>
                  <th className="py-3 px-3 font-semibold text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredLinks.map((item) => {
                  const itemFullUrl = `https://behradz.ir/${item.code}`
                  return (
                    <tr key={item.code} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-primary-400 text-left" dir="ltr">
                        /{item.code}
                      </td>
                      <td className="py-3 px-3 text-slate-200">
                        <div>{item.title || "—"}</div>
                        {item.description && (
                          <div className="text-[11px] text-slate-500 mt-0.5">{item.description}</div>
                        )}
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-400 max-w-xs truncate text-left" dir="ltr" title={item.target}>
                        {item.target}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleCopy(itemFullUrl, item.code)}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                            title="کپی آدرس کوتاه"
                          >
                            {copiedCode === item.code ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-[10px] text-emerald-400">کپی شد</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span className="text-[10px]">کپی</span>
                              </>
                            )}
                          </button>
                          <a
                            href={`/${item.code}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                            title="تست و باز کردن لینک"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
