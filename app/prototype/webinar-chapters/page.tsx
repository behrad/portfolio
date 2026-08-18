"use client"

import React, { useState } from "react"
import Link from "next/link"
import { 
  Play, 
  Clock, 
  CheckCircle2, 
  Layers, 
  LayoutList, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  BookOpen,
  Laptop,
  Cpu,
  Boxes,
  Zap,
  Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface Chapter {
  id: number
  title: string
  subtitle: string
  startTime: number // in seconds
  formattedTime: string
  duration: string
  icon: React.ElementType
  summary: string
  keyTakeaways: string[]
  transcriptSnippet: string
}

const WEBINAR_VIDEO_ID = "gdiiu4d"

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: "مقدمه و شروع وبینار",
    subtitle: "Introduction & Overview",
    startTime: 0,
    formattedTime: "۰۰:۰۰",
    duration: "۰۸:۰۰",
    icon: Laptop,
    summary: "خوش‌آمدگویی، معرفی اهداف دورهمی و مرور ساختار کلی مباحث توسعه نرم‌افزار ایجنت‌محور.",
    keyTakeaways: [
      "مرور ساختار دورهمی و محورهای کلیدی صحبت‌ها",
      "آشنایی با اهداف و چرایی حرکت به سمت توسعه ایجنت‌محور",
    ],
    transcriptSnippet: "در این بخش ابتدایی، با خوش‌آمدگویی و معرفی دوستان و اهداف دورهمی شروع می‌کنیم...",
  },
  {
    id: 2,
    title: "چرخه حیات SDLC و مدل‌های سازگار با هوش مصنوعی",
    subtitle: "Software Development Life Cycle for AI",
    startTime: 480,
    formattedTime: "۰۸:۰۰",
    duration: "۱۰:۳۶",
    icon: Layers,
    summary: "بررسی فازها و گام‌های کلی چرخه حیات توسعه نرم‌افزار (SDLC)، مدل‌های مختلف اجرای آن و تحلیل اینکه کدام مدل‌ها برای AI پذیرش بهتری دارند و در دنیای واقعی عملی‌تر و ملموس‌تر هستند.",
    keyTakeaways: [
      "بررسی گام‌ها و فازهای کلی مهندسی نرم‌افزار در SDLC",
      "مقایسه مدل‌های مختلف توسعه نرم‌افزار در کار تیمی",
      "شناسایی AI-پذیرترین متدولوژی توسعه در پروژه‌های پروداکشن واقعی",
    ],
    transcriptSnippet: "چه گام‌ها و فازهایی به صورت جنرال در SDLC وجود دارد و کدام مدل‌ها در دنیای واقعی با ایجنت‌های هوش مصنوعی سازگارترند...",
  },
  {
    id: 3,
    title: "مفاهیم پایه: تفاوت LLM، ایجنت، Harness، Skill و Command",
    subtitle: "Core Concepts: LLM vs Agent, Harness, Skill & Command",
    startTime: 1170,
    formattedTime: "۱۹:۳۰",
    duration: "۱۸:۳۰",
    icon: FileText,
    summary: "توضیح و تشریح مفاهیم اولیه توسعه نرم‌افزار با هوش مصنوعی به زبان ساده و کاربردی؛ بررسی تفاوت مدل‌های زبانی (LLM) با Agent و نقش ابزارهایی مثل Harness، Skill و دستورات.",
    keyTakeaways: [
      "درک ساده و شفاف از تفاوت LLM و ایجنت هوشمند (Agent)",
      "مفهوم Harness و نقش آن در کنترل و اجرای فرآیندها",
      "ساختار Skillها و Commandها برای خودکارسازی تسک‌های روزمره",
    ],
    transcriptSnippet: "به زبان ساده این مفاهیم رو می‌شکافیم که اصلاً تفاوت LLM با Agent چیست و Harness و Skill چه نقشی دارند...",
  },
  {
    id: 4,
    title: "مقایسه ورکفلوها و اسکیل‌های معروف در گیت‌هاب",
    subtitle: "Popular GitHub Workflows & Skills Comparison",
    startTime: 2282,
    formattedTime: "۳۸:۰۲",
    duration: "۱۱:۲۶",
    icon: Boxes,
    summary: "بررسی و مقایسه اجمالی معروف‌ترین Workflowها و Skillهای منتشرشده در گیت‌هاب و معرفی رفرنس‌های کاربردی برای توسعه‌دهندگان.",
    keyTakeaways: [
      "بررسی الگوها و ورکفلوهای محبوب متن‌باز در گیت‌هاب",
      "مقایسه رویکردهای مختلف در طراحی و ساخت اسکیل‌ها",
      "معرفی رفرنس‌ها و مخازن معتبر برای الگوبرداری و پیاده‌سازی",
    ],
    transcriptSnippet: "نگاهی اجمالی به پروژه‌ها و رپازیتوری‌های موفق گیت‌هاب می‌اندازیم و الگوهای طراحی آن‌ها را مقایسه می‌کنیم...",
  },
  {
    id: 5,
    title: "منابع معتبر اخبار AI و تجربیات واقعی موفق/شکست‌خورده (امین نعمت‌اللهی)",
    subtitle: "Curated AI Resources & Real-World Agentic Lessons",
    startTime: 3025,
    formattedTime: "۵۰:۲۵",
    duration: "۱۱:۳۰",
    icon: Cpu,
    summary: "امین نعمت‌اللهی منابع و ریسورس‌های مهم و معتبر را برای دنبال کردن اخبار هوش مصنوعی و کسب دانش عمیق‌تر معرفی می‌کند و از تجربیات واقعی، موفقیت‌ها و شکست‌های توسعه مبتنی بر Agent می‌گوید.",
    keyTakeaways: [
      "معرفی بهترین منابع و کانال‌های موثق برای اخبار و دانش AI",
      "بررسی نمونه‌های واقعی موفقیت در توسعه ایجنت‌محور",
      "تحلیل موارد شکست و درس‌آموخته‌های مهم برای جلوگیری از خطاهای رایج",
    ],
    transcriptSnippet: "امین منابع دست‌اول و تجربیات تلخ و شیرین پروداکشن را در استفاده از ایجنت‌ها به اشتراک می‌گذارد...",
  },
  {
    id: 6,
    title: "کار با Harness PI و Oh-My-Pi (omp) در عمل",
    subtitle: "Practical Daily Workflow with Harness PI & Oh-My-Pi (omp)",
    startTime: 3716,
    formattedTime: "۰۱:۰۱:۵۶",
    duration: "۱۹:۲۴",
    icon: Zap,
    summary: "توضیحات امین درباره ابزارهای Harness PI و Oh-My-Pi (omp) و نحوه استفاده عملی از آن‌ها در جریان کار روزمره برای تسریع توسعه.",
    keyTakeaways: [
      "آشنایی با ابزار Oh-My-Pi (omp) و اکوسیستم Harness",
      "نحوه یکپارچه‌سازی ابزارها در جریان کار روزمره کدنویسی",
      "راهکارهای عملی برای افزایش سرعت و راندمان کار با ایجنت‌ها",
    ],
    transcriptSnippet: "نحوه راه‌اندازی و استفاده روزمره از Oh-My-Pi برای خودکارسازی کارهای روتین مهندسی نرم‌افزار...",
  },
  {
    id: 7,
    title: "پرسش و پاسخ: فرآیندها و چالش‌های استفاده از Skillها",
    subtitle: "Interactive Q&A: Processes & Skill Usage Trade-offs",
    startTime: 5022,
    formattedTime: "۰۱:۲۳:۴۲",
    duration: "۲۰:۰۰+",
    icon: Sparkles,
    summary: "بخش پرسش و پاسخ تعاملی با شرکت‌کنندگان درباره فرآیندها، تحلیل مزایا و معایب اسکیل‌ها و زمان مناسب برای استفاده یا عدم استفاده از آن‌ها.",
    keyTakeaways: [
      "پاسخ به سوالات و چالش‌های تیمی مخاطبان در توسعه هوش مصنوعی",
      "تحلیل مزایا، معایب و Trade-offهای استفاده از اسکیل‌ها",
      "راهنمای تصمیم‌گیری در مورد زمان مناسب به‌کارگیری یا عدم به‌کارگیری Skillها",
    ],
    transcriptSnippet: "پاسخ به سوالات شرکت‌کنندگان در خصوص چالش‌های واقعی تیمی و ارزیابی استفاده از اسکیل‌ها...",
  },
]

export default function WebinarChaptersPrototype() {
  const [activeScenario, setActiveScenario] = useState<"interactive" | "multi">("interactive")
  
  // State for Scenario 1 (Interactive Chapter Player)
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentStartTime, setCurrentStartTime] = useState<number>(0)

  const selectedChapter = CHAPTERS.find((c) => c.id === selectedChapterId) || CHAPTERS[0]

  const handleSelectChapter = (chapter: Chapter) => {
    setSelectedChapterId(chapter.id)
    setCurrentStartTime(chapter.startTime)
    setIsPlaying(true)
  }

  const handleNextChapter = () => {
    const next = CHAPTERS.find((c) => c.id === selectedChapterId + 1)
    if (next) handleSelectChapter(next)
  }

  const handlePrevChapter = () => {
    const prev = CHAPTERS.find((c) => c.id === selectedChapterId - 1)
    if (prev) handleSelectChapter(prev)
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">خانه</Link>
            <ChevronLeft className="w-4 h-4" />
            <Link href="/courses/agentic-software-development" className="hover:text-primary transition-colors">وبینار Agentic Software Development</Link>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-foreground font-medium">پروتوتایپ پیش‌نمایش ویدیو و سرفصل‌ها</span>
          </div>
          <Badge variant="outline" className="gap-1.5 py-1 px-3 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-3.5 h-3.5" />
            نسخه آزمایشی تعاملی (Interactive Prototype)
          </Badge>
        </div>

        {/* Header Title */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <span>دموی دو سناریوی دسته‌بندی و پخش وبینار</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-4xl">
            برای ویدیوهای طولانی وبینار (مثل وبینار ۲ ساعته <strong>Agentic Software Development</strong>)، می‌توانید به جای کات کردن ویدیو به فایل‌های مجزا، از یکی از دو رویکرد زیر استفاده کنید. بین دو تب زیر سوئیچ کنید و عملکرد هر سناریو را مستقیماً تست نمایید:
          </p>
        </div>

        {/* Tab Switcher for Prototypes */}
        <Tabs value={activeScenario} onValueChange={(val) => setActiveScenario(val as "interactive" | "multi")} className="w-full">
          <TabsList className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-2xl mx-auto h-auto p-1.5 bg-muted/60 rounded-xl border border-border/60">
            <TabsTrigger 
              value="interactive" 
              className="py-3 px-4 flex items-center justify-center gap-2.5 rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md font-medium text-sm transition-all"
            >
              <LayoutList className="w-4 h-4 text-primary" />
              <span>سناریو ۱: پلیر هوشمند + سرفصل‌های تعاملی</span>
              <Badge variant="secondary" className="text-[10px] py-0 px-1.5 bg-primary/15 text-primary">پیشنهادی</Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="multi" 
              className="py-3 px-4 flex items-center justify-center gap-2.5 rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md font-medium text-sm transition-all"
            >
              <Layers className="w-4 h-4 text-primary" />
              <span>سناریو ۲: بخش‌های مجزا با چند پلیر</span>
            </TabsTrigger>
          </TabsList>

          {/* ========================================================================= */}
          {/* SCENARIO 1: INTERACTIVE SINGLE PLAYER WITH CHAPTERS (RECOMMENDED) */}
          {/* ========================================================================= */}
          <TabsContent value="interactive" className="mt-8 space-y-6 focus-visible:outline-none">
            {/* Scenario Description Banner */}
            <div className="bg-card/70 border border-primary/20 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm backdrop-blur-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs">
                    عملکرد فوق‌العاده سبک (فقط ۱ آی‌فریم)
                  </Badge>
                  <span className="text-xs text-muted-foreground">• تجربه کاربری استاندارد پادکست‌ها و دوره‌ها</span>
                </div>
                <p className="text-xs sm:text-sm text-foreground">
                  در این سناریو، یک پلیر اصلی در بالای صفحه قرار دارد. کاربر با کلیک روی هر سرفصل در لیست زیر، ویدیو بدون نیاز به رفرش صفحه از همان دقیقه شروع به پخش می‌کند.
                </p>
              </div>
            </div>

            {/* Main Interactive Player Area (Two Columns on Desktop) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column (Desktop) / Top (Mobile): Video Player & Current Chapter Info */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-border/70 bg-black aspect-video group">
                  <iframe
                    key={`${WEBINAR_VIDEO_ID}-${currentStartTime}-${isPlaying}`}
                    src={`https://www.aparat.com/video/video/embed/videohash/${WEBINAR_VIDEO_ID}/vt/frame?startTime=${currentStartTime}${isPlaying ? "&autoplay=true" : ""}`}
                    title={selectedChapter.title}
                    allowFullScreen
                    allow="autoplay; fullscreen; picture-in-picture"
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>

                {/* Player Navigation & Current Chapter Status */}
                <div className="bg-card border border-border/60 rounded-xl p-4 shadow-sm space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                      </span>
                      <span className="text-xs font-semibold text-primary">در حال پخش بخش {selectedChapter.id} از ۵</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={handlePrevChapter} 
                        disabled={selectedChapterId === 1}
                        className="h-8 text-xs gap-1"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                        بخش قبلی
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={handleNextChapter} 
                        disabled={selectedChapterId === CHAPTERS.length}
                        className="h-8 text-xs gap-1"
                      >
                        بخش بعدی
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="border-t border-border/40 pt-3">
                    <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                      <span>{selectedChapter.title}</span>
                      <Badge variant="secondary" className="text-xs font-mono font-normal">
                        از {selectedChapter.formattedTime}
                      </Badge>
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                      {selectedChapter.summary}
                    </p>
                  </div>
                </div>

                {/* Key Takeaways Card for Currently Selected Chapter */}
                <Card className="border-border/60">
                  <CardHeader className="py-3 px-4 pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      نکات کلیدی این بخش:
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4 pb-4">
                    <ul className="space-y-2">
                      {selectedChapter.keyTakeaways.map((takeaway, idx) => (
                        <li key={idx} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary font-bold mt-0.5">•</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Chapter List / Table of Contents */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-border/40">
                  <h3 className="font-bold text-sm sm:text-base text-foreground flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span>فهرست سرفصل‌های وبینار</span>
                  </h3>
                  <span className="text-xs text-muted-foreground">۵ سرفصل کلیدی</span>
                </div>

                <div className="space-y-2.5">
                  {CHAPTERS.map((chapter) => {
                    const isCurrent = chapter.id === selectedChapterId
                    const ChapterIcon = chapter.icon

                    return (
                      <div
                        key={chapter.id}
                        onClick={() => handleSelectChapter(chapter)}
                        className={`group relative p-3.5 rounded-xl border transition-all cursor-pointer text-right ${
                          isCurrent
                            ? "bg-primary/10 border-primary/50 shadow-md ring-1 ring-primary/30"
                            : "bg-card border-border/60 hover:bg-muted/50 hover:border-border"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                            isCurrent ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                          }`}>
                            {isCurrent ? <Play className="w-4 h-4 fill-current" /> : <ChapterIcon className="w-4 h-4" />}
                          </div>

                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className={`text-sm font-semibold truncate ${
                                isCurrent ? "text-primary" : "text-foreground group-hover:text-primary"
                              }`}>
                                {chapter.id}. {chapter.title}
                              </h4>
                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                <Badge variant={isCurrent ? "default" : "secondary"} className="text-[11px] font-mono py-0 px-2">
                                  <Clock className="w-3 h-3 ml-1" />
                                  {chapter.formattedTime}
                                </Badge>
                              </div>
                            </div>

                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                              {chapter.summary}
                            </p>

                            <div className="flex items-center justify-between pt-1 text-[11px] text-muted-foreground">
                              <span>مدت بخش: {chapter.duration} دقیقه</span>
                              <span className="text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
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

                {/* Watch Full Webinar Option */}
                <div className="mt-4 p-4 rounded-xl bg-muted/40 border border-dashed border-border flex items-center justify-between gap-3">
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium text-foreground">می‌خواهید کل وبینار را بدون وقفه ببینید؟</p>
                    <p className="mt-0.5">پخش کامل وبینار (مدت: ۱ ساعت و ۳۰ دقیقه)</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={() => handleSelectChapter(CHAPTERS[0])}
                    className="text-xs gap-1 whitespace-nowrap"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    پخش از ابتدا
                  </Button>
                </div>
              </div>

            </div>
          </TabsContent>


          {/* ========================================================================= */}
          {/* SCENARIO 2: MULTI-EMBED SECTIONS WITH DEDICATED PLAYERS */}
          {/* ========================================================================= */}
          <TabsContent value="multi" className="mt-8 space-y-8 focus-visible:outline-none">
            {/* Scenario Description Banner */}
            <div className="bg-card/70 border border-primary/20 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm backdrop-blur-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20 text-xs">
                    چندین پلیر در صفحه (Multi-Player)
                  </Badge>
                  <span className="text-xs text-muted-foreground">• مناسب مقالات یا ترنسکریپت‌های طولانی بلاگ‌پست</span>
                </div>
                <p className="text-xs sm:text-sm text-foreground">
                  در این سناریو، صفحه مثل یک راهنمای گام‌به‌گام یا مقاله سئو چیده می‌شود؛ هر بخش توضیحات کامل خود را دارد و پلیر همان بخش مستقیماً داخل کارت خودش با <code>startTime</code> مشخص قرار گرفته است.
                </p>
              </div>
            </div>

            {/* List of Section Cards with Embedded Mini Players */}
            <div className="space-y-8">
              {CHAPTERS.map((chapter) => {
                const ChapterIcon = chapter.icon

                return (
                  <Card key={chapter.id} className="border-border/70 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="bg-muted/30 border-b border-border/40 py-4 px-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                            <ChapterIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <CardTitle className="text-base sm:text-lg font-bold text-foreground">
                              بخش {chapter.id}: {chapter.title}
                            </CardTitle>
                            <CardDescription className="text-xs font-mono mt-0.5">
                              {chapter.subtitle}
                            </CardDescription>
                          </div>
                        </div>

                        <Badge variant="outline" className="font-mono text-xs gap-1.5 py-1 px-2.5 bg-background">
                          <Clock className="w-3.5 h-3.5 text-primary" />
                          شروع از دقیقه {chapter.formattedTime} (مدت: {chapter.duration})
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="p-5 sm:p-6 space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        
                        {/* Text & Transcript Column */}
                        <div className="lg:col-span-7 space-y-4">
                          <div className="space-y-2">
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                              توضیحات و خلاصه مبحث:
                            </h4>
                            <p className="text-sm text-foreground leading-relaxed">
                              {chapter.summary}
                            </p>
                          </div>

                          <div className="bg-muted/40 rounded-xl p-3.5 border border-border/50 space-y-2">
                            <h4 className="text-xs font-semibold text-primary flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              نکات کلیدی این بخش:
                            </h4>
                            <ul className="space-y-1.5">
                              {chapter.keyTakeaways.map((takeaway, idx) => (
                                <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                                  <span className="text-primary font-bold">•</span>
                                  <span>{takeaway}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="text-xs text-muted-foreground italic border-r-2 border-primary/50 pr-3 py-1">
                            &ldquo;{chapter.transcriptSnippet}&rdquo;
                          </div>
                        </div>

                        {/* Video Player Column for this specific section */}
                        <div className="lg:col-span-5 space-y-2">
                          <div className="relative w-full rounded-xl overflow-hidden shadow-md border border-border/70 bg-black aspect-video">
                            <iframe
                              src={`https://www.aparat.com/video/video/embed/videohash/${WEBINAR_VIDEO_ID}/vt/frame?startTime=${chapter.startTime}`}
                              title={chapter.title}
                              allowFullScreen
                              allow="autoplay; fullscreen; picture-in-picture"
                              className="absolute inset-0 w-full h-full border-0"
                            />
                          </div>
                          <p className="text-[11px] text-center text-muted-foreground">
                            این پلیر مستقیماً از ثانیه {chapter.startTime} (دقیقه {chapter.formattedTime}) آغاز می‌شود.
                          </p>
                        </div>

                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Full Webinar Player at Bottom */}
            <Card className="border-2 border-primary/40 bg-gradient-to-br from-card via-card to-primary/5 shadow-lg">
              <CardHeader className="py-5 px-6 border-b border-border/50">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-1">
                    <CardTitle className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
                      <Play className="w-5 h-5 text-primary fill-current" />
                      مشاهده نسخه کامل وبینار (بدون کات)
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      اگر می‌خواهید تمام مباحث را پیوسته و از دقیقه صفر تا پایان مشاهده کنید:
                    </CardDescription>
                  </div>
                  <Badge className="bg-primary text-primary-foreground text-xs py-1 px-3">
                    مدت کل: ۹۰ دقیقه
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="max-w-4xl mx-auto space-y-4">
                  <div className="relative w-full rounded-xl overflow-hidden shadow-xl border border-border/80 bg-black aspect-video">
                    <iframe
                      src={`https://www.aparat.com/video/video/embed/videohash/${WEBINAR_VIDEO_ID}/vt/frame`}
                      title="نسخه کامل وبینار Agentic Software Development"
                      allowFullScreen
                      allow="autoplay; fullscreen; picture-in-picture"
                      className="absolute inset-0 w-full h-full border-0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

          </TabsContent>
        </Tabs>


        {/* ========================================================================= */}
        {/* COMPARISON & VERIFICATION SUMMARY TABLE */}
        {/* ========================================================================= */}
        <div className="pt-6 border-t border-border/50 space-y-4">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">مقایسه فنی و تجربه کاربری دو سناریو</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Scenario 1 Summary */}
            <Card className="border-border/60 bg-card/50">
              <CardHeader className="py-4 px-5 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                    <LayoutList className="w-4 h-4 text-primary" />
                    سناریو ۱: پلیر یکپارچه با سرفصل‌ها
                  </CardTitle>
                  <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px]">
                    پیشنهاد اصلی
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-2 text-xs sm:text-sm space-y-2.5 text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>سرعت صفحه (LCP / Performance):</strong> فوق‌العاده بالا چون فقط ۱ ویدیو لود می‌شود.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>تجربه کاربری:</strong> بسیار تمیز و شیک؛ کاربر حس تسلط دارد و با یک کلیک بین بخش‌ها پرش می‌کند.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>ریسپانسیو موبایل:</strong> پلیر در بالا و سرفصل‌ها به صورت لیست در پایین، بدون شلوغی.</span>
                </div>
              </CardContent>
            </Card>

            {/* Scenario 2 Summary */}
            <Card className="border-border/60 bg-card/50">
              <CardHeader className="py-4 px-5 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" />
                    سناریو ۲: بخش‌های مجزا با چند پلیر
                  </CardTitle>
                  <Badge variant="outline" className="text-[10px]">
                    مناسب مقالات بلند
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-2 text-xs sm:text-sm space-y-2.5 text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">▲</span>
                  <span><strong>سرعت صفحه:</strong> به دلیل وجود ۵ الی ۶ آی‌فریم در یک صفحه، رم مرورگر و حجم اینترنت بیشتری مصرف می‌کند.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>خوانایی متنی:</strong> برای کاربرانی که می‌خواهند متن‌های طولانی را مثل یک مقاله وبلاگی بخوانند و ویدیو را همانجا تست کنند خوب است.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">▲</span>
                  <span><strong>طول صفحه:</strong> اسکرول صفحه بسیار طولانی می‌شود.</span>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

      </div>
    </div>
  )
}
