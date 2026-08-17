"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  AlertCircle,
  ArrowRight,
  Check,
  Code2,
  Copy,
  Download,
  Edit2,
  ExternalLink,
  Link2,
  Plus,
  QrCode,
  RefreshCw,
  RotateCcw,
  Search,
  Sparkles,
  Trash2,
  Wand2,
  X,
} from "lucide-react"
import {
  RESERVED_SLUGS,
  shortUrlsList as defaultShortUrlsList,
  type ShortUrlConfig,
} from "@/data/short-urls"
import {
  exportToTypeScriptConfig,
  getStoredShortUrls,
  persistShortUrls,
} from "@/lib/short-urls-storage"
import { coursesData } from "@/data/courses"

export default function ShortenerDashboardClient() {
  const formRef = useRef<HTMLDivElement>(null)

  // Local state for all links
  const [links, setLinks] = useState<ShortUrlConfig[]>([])
  const [isClient, setIsClient] = useState(false)

  // Form states
  const [editingCode, setEditingCode] = useState<string | null>(null)
  const [selectedCourse, setSelectedCourse] = useState("")
  const [customPath, setCustomPath] = useState("")
  const [shortCode, setShortCode] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [utmSource, setUtmSource] = useState("")
  const [utmMedium, setUtmMedium] = useState("")
  const [utmCampaign, setUtmCampaign] = useState("")
  const [utmContent, setUtmContent] = useState("")

  // Feedback & notification states
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [copiedTsConfig, setCopiedTsConfig] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Load links from localStorage on mount
  useEffect(() => {
    setIsClient(true)
    const stored = getStoredShortUrls()
    setLinks(stored)
  }, [])

  const showNotification = (msg: string) => {
    setToastMessage(msg)
    setErrorMessage(null)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const showError = (msg: string) => {
    setErrorMessage(msg)
    setTimeout(() => setErrorMessage(null), 4000)
  }

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

  // Reset form to clean state
  const resetForm = () => {
    setEditingCode(null)
    setSelectedCourse("")
    setCustomPath("")
    setShortCode("")
    setTitle("")
    setDescription("")
    setUtmSource("")
    setUtmMedium("")
    setUtmCampaign("")
    setUtmContent("")
    setErrorMessage(null)
  }

  // Handle Create or Update
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    const code = shortCode.trim().toLowerCase()
    if (!code) {
      showError("لطفاً یک کد کوتاه (Short Code) وارد کنید.")
      return
    }

    if (RESERVED_SLUGS.has(code)) {
      showError(`کد "${code}" جزو مسیرهای رزرو شده سایت است و نمی‌تواند به عنوان لینک کوتاه استفاده شود.`)
      return
    }

    if (!basePath || basePath === "/") {
      if (!customPath.trim() && !selectedCourse) {
        showError("لطفاً دوره مقصد یا مسیر دلخواه را تعیین کنید.")
        return
      }
    }

    const newConfig: ShortUrlConfig = {
      code,
      target: destinationUrl,
      title: title.trim() || undefined,
      description: description.trim() || undefined,
      createdAt: new Date().toISOString().split("T")[0],
    }

    let updatedList: ShortUrlConfig[] = []

    if (editingCode) {
      // Update existing
      updatedList = links.map((item) =>
        item.code.toLowerCase() === editingCode.toLowerCase() ? newConfig : item
      )
      // If code was changed and new code doesn't exist, replace
      if (editingCode.toLowerCase() !== code) {
        const alreadyExists = links.some(
          (l) => l.code.toLowerCase() === code && l.code.toLowerCase() !== editingCode.toLowerCase()
        )
        if (alreadyExists) {
          showError(`کد "${code}" از قبل برای لینک دیگری ثبت شده است.`)
          return
        }
      }
      showNotification(`لینک کوتاه /${code} با موفقیت به‌روزرسانی شد!`)
    } else {
      // Create new
      const alreadyExists = links.some((l) => l.code.toLowerCase() === code)
      if (alreadyExists) {
        showError(`کد "${code}" از قبل وجود دارد. برای ویرایش آن روی دکمه ویرایش در جدول کلیک کنید.`)
        return
      }
      updatedList = [newConfig, ...links]
      showNotification(`لینک کوتاه جدید /${code} با موفقیت ثبت شد!`)
    }

    setLinks(updatedList)
    persistShortUrls(updatedList)
    resetForm()
  }

  // Load a link into form for editing
  const handleEdit = (item: ShortUrlConfig) => {
    setEditingCode(item.code)
    setShortCode(item.code)
    setTitle(item.title || "")
    setDescription(item.description || "")

    // Parse target into base path and UTM params
    try {
      const dummyBase = "https://behradz.ir"
      const url = new URL(item.target, dummyBase)
      const path = url.pathname

      // Check if path matches a known course
      const courseSlugMatch = path.match(/^\/courses\/([a-zA-Z0-9_-]+)/)
      if (courseSlugMatch && coursesData[courseSlugMatch[1]]) {
        setSelectedCourse(courseSlugMatch[1])
        setCustomPath("")
      } else {
        setSelectedCourse("")
        setCustomPath(path)
      }

      setUtmSource(url.searchParams.get("utm_source") || "")
      setUtmMedium(url.searchParams.get("utm_medium") || "")
      setUtmCampaign(url.searchParams.get("utm_campaign") || "")
      setUtmContent(url.searchParams.get("utm_content") || "")
    } catch {
      setSelectedCourse("")
      setCustomPath(item.target)
      setUtmSource("")
      setUtmMedium("")
      setUtmCampaign("")
      setUtmContent("")
    }

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Delete a link
  const handleDelete = (code: string) => {
    if (confirm(`آیا از حذف لینک کوتاه /${code} اطمینان دارید؟`)) {
      const updated = links.filter((item) => item.code.toLowerCase() !== code.toLowerCase())
      setLinks(updated)
      persistShortUrls(updated)
      if (editingCode === code) resetForm()
      showNotification(`لینک /${code} حذف شد.`)
    }
  }

  // Reset to default links
  const handleResetDefaults = () => {
    if (confirm("آیا مایلید تمام لینک‌ها به تنظیمات پیش‌فرض کدبیس بازنشانی شوند؟")) {
      setLinks(defaultShortUrlsList)
      persistShortUrls(defaultShortUrlsList)
      resetForm()
      showNotification("لینک‌ها با موفقیت به حالت پیش‌فرض بازنشانی شدند.")
    }
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  // Export full config file
  const handleCopyFullConfig = () => {
    const code = exportToTypeScriptConfig(links)
    navigator.clipboard.writeText(code)
    setCopiedTsConfig(true)
    setTimeout(() => setCopiedTsConfig(false), 2500)
    showNotification("کل کد فایل data/short-urls.ts در کلیپ‌بورد کپی شد!")
  }

  // Download config file
  const handleDownloadConfig = () => {
    const code = exportToTypeScriptConfig(links)
    const blob = new Blob([code], { type: "text/typescript;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "short-urls.ts"
    a.click()
    URL.revokeObjectURL(url)
    showNotification("فایل short-urls.ts دانلود شد.")
  }

  const filteredLinks = links.filter((item) => {
    const query = searchTerm.toLowerCase().trim()
    if (!query) return true
    return (
      item.code.toLowerCase().includes(query) ||
      (item.title && item.title.toLowerCase().includes(query)) ||
      (item.description && item.description.toLowerCase().includes(query)) ||
      item.target.toLowerCase().includes(query)
    )
  })

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-emerald-500/90 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-2xl backdrop-blur flex items-center gap-2 border border-emerald-400/40 animate-in fade-in slide-in-from-top-4">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs mb-3 font-mono">
              <Link2 className="w-3.5 h-3.5" />
              <span>URL Shortener & Management Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              پنل مدیریت و ساخت لینک‌های کوتاه (Short URLs)
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              ایجاد، ویرایش، تست و ساخت لینک‌های کوتاه برند شده همراه با UTM Tracking هوشمند
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-medium border border-slate-800 transition-colors"
            >
              <span>مشاهده سایت</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Generator & Form */}
        <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form container */}
          <form
            onSubmit={handleSave}
            className={`lg:col-span-7 bg-slate-900/70 border rounded-2xl p-6 sm:p-8 backdrop-blur shadow-xl space-y-6 transition-all ${
              editingCode
                ? "border-amber-500/60 shadow-amber-500/10 ring-1 ring-amber-500/30"
                : "border-slate-800/80"
            }`}
          >
            {/* Form Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-2">
                {editingCode ? (
                  <>
                    <Edit2 className="w-5 h-5 text-amber-400" />
                    <div>
                      <h2 className="text-lg font-bold text-amber-300">ویرایش لینک کوتاه</h2>
                      <span className="text-xs text-slate-400 font-mono">/{editingCode}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-primary-400" />
                    <h2 className="text-lg font-bold text-slate-100">ساخت لینک کوتاه جدید</h2>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                {editingCode && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    انصراف
                  </button>
                )}
                <button
                  type="button"
                  onClick={generateRandomCode}
                  className="inline-flex items-center gap-1.5 text-xs text-primary-400 hover:text-primary-300 bg-primary-500/10 hover:bg-primary-500/20 border border-primary-500/20 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  تولید کد ۵ حرفی
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-xs px-4 py-2.5 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Destination Selection */}
            <div className="space-y-4">
              <label className="block text-xs font-semibold text-slate-300">
                ۱. انتخاب دوره یا صفحه مقصد:
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
                  ۲. کد کوتاه (Short Code): <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-mono select-none">
                    behradz.ir/
                  </span>
                  <input
                    type="text"
                    required
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
                  placeholder="مثال: کارگاه AI - استوری اینستاگرام"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>

            {/* Description (Optional) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                توضیحات یا یادداشت (اختیاری):
              </label>
              <input
                type="text"
                placeholder="مثال: کمپین تابستانه ویژه بیو و استوری"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-primary-500"
              />
            </div>

            {/* UTM Presets */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                ۳. تنظیمات سریع UTM (Presets):
              </label>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
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

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
              {editingCode ? (
                <>
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm transition-colors shadow-lg shadow-amber-600/20 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    ذخیره و اعمال تغییرات
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
                  >
                    انصراف
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-sm transition-colors shadow-lg shadow-primary-600/25 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  ثبت و افزودن لینک کوتاه
                </button>
              )}
            </div>
          </form>

          {/* Live Preview Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 backdrop-blur shadow-xl space-y-5">
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
                  <span className="text-[11px] text-slate-500 block mb-1">آدرس نهایی مقصد (Target + UTM):</span>
                  <span className="font-mono text-xs text-slate-300 break-all" dir="ltr">
                    {destinationUrl}
                  </span>
                </div>
              </div>

              {/* Sync Tools */}
              <div className="pt-3 border-t border-slate-800/80 space-y-3">
                <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>همگام‌سازی با کدبیس:</span>
                  <span className="text-[11px] text-slate-500 font-mono">data/short-urls.ts</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleCopyFullConfig}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                  >
                    {copiedTsConfig ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">کپی شد!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-primary-400" />
                        <span>کپی کل کانفیگ</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadConfig}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-primary-400" />
                    <span>دانلود فایل TS</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Registered Short Links Table */}
        <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Link2 className="w-5 h-5 text-primary-400" />
                لینک‌های کوتاه ثبت شده ({links.length} لینک)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                شما می‌توانید هر کدام را ویرایش، تست یا حذف کنید.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Search filter */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 absolute right-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="جستجوی کد، عنوان، مقصد..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-primary-500"
                />
              </div>

              <button
                type="button"
                onClick={handleResetDefaults}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors shrink-0"
                title="بازنشانی تمام لینک‌ها به مقادیر پیش‌فرض"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-3 px-3 font-semibold">کد کوتاه</th>
                  <th className="py-3 px-3 font-semibold">عنوان / یادداشت</th>
                  <th className="py-3 px-3 font-semibold">صفحه مقصد</th>
                  <th className="py-3 px-3 font-semibold text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredLinks.map((item) => {
                  const itemFullUrl = `https://behradz.ir/${item.code}`
                  const isCurrentlyEditing = editingCode?.toLowerCase() === item.code.toLowerCase()

                  return (
                    <tr
                      key={item.code}
                      className={`transition-colors ${
                        isCurrentlyEditing
                          ? "bg-amber-500/10 hover:bg-amber-500/15"
                          : "hover:bg-slate-800/30"
                      }`}
                    >
                      <td className="py-3 px-3 font-mono font-bold text-primary-400 text-left" dir="ltr">
                        /{item.code}
                      </td>
                      <td className="py-3 px-3 text-slate-200">
                        <div className="font-medium">{item.title || "—"}</div>
                        {item.description && (
                          <div className="text-[11px] text-slate-500 mt-0.5">{item.description}</div>
                        )}
                      </td>
                      <td
                        className="py-3 px-3 font-mono text-slate-400 max-w-xs truncate text-left"
                        dir="ltr"
                        title={item.target}
                      >
                        {item.target}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() => handleEdit(item)}
                            className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-colors"
                            title="ویرایش این لینک"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Copy */}
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

                          {/* Test */}
                          <a
                            href={`/${item.code}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                            title="تست و باز کردن لینک"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDelete(item.code)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                            title="حذف این لینک"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
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
