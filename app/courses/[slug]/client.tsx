"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  BookOpen,
  Clock,
  Users,
  Award,
  CheckCircle2,
  Star,
  Calendar,
  FileText,
  Target,
  Shield,
  Gift,
  MessageCircle,
  Linkedin,
  Instagram,
  Send,
  Phone,
  User,
  Upload,
  X,
  ChevronLeft,
  ChevronRight,
  Presentation,
  Building2,
} from "lucide-react"
import { useState } from "react"
import { notFound } from "next/navigation"

// Define the Course type
export type Course = {
  title: string
  hasVideo: boolean
  type: string
  path: string
  subtitle: string
  shortDescription: string
  description: string
  price: string
  priceNumber: number
  discount: number
  duration: string
  sessionsCount: string
  schedule: string
  startDate: string
  format: string
  level: string
  language: string
  certificate: boolean
  image: string
  heroImage?: string
  descriptionImage?: string
  descriptionVideoId?: string
  videoUrl: string
  sampleVideo?: string
  rating?: number
  reviewCount?: number
  isFull?: boolean
  instructor: {
    name: string
    title: string
    bio: string
    image: string
    linkedin: string
  }
  skills: string[]
  outcomes: string[]
  targetAudience: string[]
  prerequisites: string[]
  modules: {
    title: string
    description: string
    duration: string
    lectures: number
    topics: string[]
  }[]
  testimonials: {
    name: string
    position: string
    company: string
    review: string
    rating: number
  }[]
  faqs: {
    question: string
    answer: string
  }[]
  relatedCourses?: {
    title: string
    description: string
    slug: string
    image: string
  }[]
}

// Mock course data (replace with actual data fetching if needed)
// This should ideally be fetched from a data source or passed as a prop
// const coursesData: { [key: string]: Course } = {
//   "system-design": {
//     title: "دوره سیستم دیزاین",
//     subtitle: "طراحی سیستم‌های مقیاس‌پذیر و پایدار",
//     shortDescription:
//       "یاد بگیرید چطور سیستم‌های نرم‌افزاری مقیاس‌پذیر، پایدار و کارآمد طراحی کنید که بتوانند میلیون‌ها کاربر را پشتیبانی کنند",
//     description:
//       "در این دوره جامع با جنبه‌های مختلف طراحی در سیستم‌های بزرگ نرم افزاری آشنا می‌شویم. تکنیک‌های مختلفی را برای مقیاس‌پذیر کردن سرویس‌ها و ارتباط بین آن‌ها پیاده‌سازی می‌کنیم. از معماری مبتنی بر رویداد و الگوهای افزایش پایداری برای پیاده‌سازی یک سیستم واقعی استفاده می‌کنیم. دیتابیس‌های مختلف را بررسی می‌کنیم و یاد می‌گیریم چطور منابع لازم را برای اندازه داده‌هایمان و تعداد کاربرانمان تخمین بزنیم. تمرین‌های این دوره را می‌توانید با هر زبانی که کد می‌زنید پیاده‌سازی کنید.",
//     price: "۶,۵۰۰,۰۰۰",
//     priceNumber: 6500000,
//     duration: "30 ساعت",
//     sessionsCount: "10 جلسه",
//     schedule: "یکشنبه و سه‌شنبه از ساعت 17 تا 20",
//     startDate: "18 خرداد 1404",
//     format: "حضوری در دانشگاه شریف و آنلاین",
//     level: "متوسط تا پیشرفته",
//     language: "فارسی",
//     certificate: true,
//     image: "/system-design-architecture-diagram.jpg",
//     videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//     instructor: {
//       name: "بهراد زاری",
//       title: "مهندس نرم‌افزار ارشد و مشاور فنی",
//       bio: "با بیش از 22 سال تجربه در توسعه نرم‌افزار، طراحی سیستم‌های مقیاس‌پذیر و مدیریت تیم‌های فنی، به عنوان مشاور CTO و معلم به کمک شرکت‌ها و افراد می‌آیم تا سیستم‌های بهتری بسازند.",
//       image: "/images/behrad.jpg",
//       linkedin: "https://www.linkedin.com/in/behradz/",
//     },
//     skills: [
//       "طراحی معماری سیستم‌های مقیاس‌پذیر",
//       "انتخاب و اسکیل کردن دیتابیس‌ها",
//       "پیاده‌سازی الگوهای پایداری (Resiliency Patterns)",
//       "معماری مبتنی بر رویداد (Event-Driven Architecture)",
//       "تخمین ظرفیت و منابع سیستم",
//       "حل مسائل System Design در مصاحبه‌های شغلی",
//     ],
//     outcomes: [
//       "با زبان و استک خودتان سیستم‌های مقیاس‌پذیر بسازید",
//       "قابلیت تحمل خطا و پایداری سرویس‌هایتان را بالا ببرید",
//       "دیتابیس مناسب را برای شرایط مختلف انتخاب و اسکیل کنید",
//       "تسلط کافی برای حل مسائل طراحی سیستم در مصاحبه‌های شغلی داشته باشید",
//     ],
//     targetAudience: [
//       "برنامه‌نویسانی که می‌خواهند معمار یا مدیر فنی بشوند",
//       "تک و تیم لیدهایی که مسئولیت ساخت یک نرم‌افزار توسعه‌پذیر و مقیاس‌پذیر دارند",
//       "مدیران فنی که می‌خواهند تصمیمات معماری نرم‌افزار در تیم‌شان را به‌درستی هدایت کنند",
//       "مدیران پروژه‌های نرم‌افزاری که می‌خواهند معماری درست سیستم مورد نظرشان را بدانند",
//       "مدیران محصول‌های تک که می‌خواهند دید تکنیکال به معماری نرم‌افزار داشته باشند",
//     ],
//     prerequisites: [
//       "آشنایی با یک زبان برنامه‌نویسی (Java, Python, JavaScript, Go و غیره)",
//       "تجربه کار با دیتابیس و API",
//       "دانش پایه از شبکه و پروتکل‌های HTTP/REST",
//       "آشنایی با مفاهیم پایه سیستم‌عامل",
//     ],
//     modules: [
//       {
//         title: "ماژول اول: مفاهیم پایه و الزامات غیرکارکردی",
//         description: "آشنایی با مفاهیم اصلی طراحی سیستم و الزامات غیرکارکردی در عمل",
//         duration: "6 ساعت",
//         lectures: 3,
//         topics: [
//           "Non-functional Requirements در پروژه‌های واقعی",
//           "مفاهیم کلیدی System Design",
//           "معیارهای ارزیابی معماری نرم‌افزار",
//           "تریدآف‌های معماری و تصمیم‌گیری",
//           "تمرین عملی: تحلیل الزامات یک سیستم واقعی",
//         ],
//       },
//       {
//         title: "ماژول دوم: پایداری و پردازش ناهمزمان",
//         description: "الگوها و تکنیک‌های افزایش پایداری و مقیاس‌پذیری سیستم‌ها",
//         duration: "8 ساعت",
//         lectures: 4,
//         topics: [
//           "الگوهای Resiliency (Circuit Breaker, Retry, Timeout)",
//           "Event-Driven Architecture",
//           "Message Queues و Async Processing",
//           "پیاده‌سازی سیستم‌های مقیاس‌پذیر",
//           "تمرین عملی: پیاده‌سازی Circuit Breaker",
//         ],
//       },
//       {
//         title: "ماژول سوم: مقیاس‌پذیری دیتابیس",
//         description: "تکنیک‌های اسکیل کردن دیتابیس و انتخاب دیتابیس مناسب",
//         duration: "8 ساعت",
//         lectures: 4,
//         topics: [
//           "قضیه CAP و تریدآف‌های آن",
//           "Sharding و Partitioning",
//           "Replication Strategies",
//           "NoSQL vs SQL: انتخاب درست",
//           "تمرین عملی: طراحی استراتژی Sharding",
//         ],
//       },
//       {
//         title: "ماژول چهارم: تخمین ظرفیت و پروژه نهایی",
//         description: "محاسبه منابع مورد نیاز برای سیستم‌های مقیاس‌پذیر و پروژه جامع",
//         duration: "8 ساعت",
//         lectures: 3,
//         topics: [
//           "Back of the Envelope Calculations",
//           "تخمین Storage و Bandwidth",
//           "محاسبه QPS و Throughput",
//           "برنامه‌ریزی برای رشد",
//           "پروژه نهایی: طراحی یک سیستم کامل",
//         ],
//       },
//     ],
//     testimonials: [
//       {
//         name: "علی محمدی",
//         position: "تیم لید",
//         company: "دیجی‌کالا",
//         review:
//           "یکی از بهترین دوره‌هایی بود که تا حالا شرکت کردم. مفاهیم پیچیده را خیلی ساده و کاربردی توضیح می‌دهد و تمرین‌های عملی خیلی کمک کرد.",
//         rating: 5,
//       },
//       {
//         name: "سارا احمدی",
//         position: "Senior Backend Developer",
//         company: "اسنپ",
//         review:
//           "بعد از این دوره توانستم در مصاحبه‌های شغلی خیلی بهتر عمل کنم. همچنین در پروژه‌های کاری‌ام تصمیمات بهتری می‌گیرم.",
//         rating: 5,
//       },
//       {
//         name: "رضا کریمی",
//         position: "CTO",
//         company: "استارتاپ فین‌تک",
//         review:
//           "به عنوان یک CTO، این دوره دید خیلی خوبی به من داد برای تصمیم‌گیری‌های معماری. پیشنهاد می‌کنم حتماً شرکت کنید.",
//         rating: 5,
//       },
//       {
//         name: "مریم رضایی",
//         position: "Software Architect",
//         company: "تپسی",
//         review: "محتوای دوره عالی بود و استاد با تجربه‌های واقعی‌اش مثال‌های کاربردی زیادی زد. خیلی چیزها یاد گرفتم.",
//         rating: 5,
//       },
//     ],
//     faqs: [
//       {
//         question: "آیا نیاز به دانش قبلی خاصی دارم؟",
//         answer:
//           "بله، شما باید با یک زبان برنامه‌نویسی آشنا باشید و تجربه کار با دیتابیس و API داشته باشید. دانش پایه از شبکه و سیستم‌عامل هم مفید است.",
//       },
//       {
//         question: "آیا ضبط جلسات در دسترس خواهد بود؟",
//         answer:
//           "بله، تمام جلسات ضبط می‌شود و برای شرکت‌کنندگان در دسترس خواهد بود. می‌توانید تا ۶ ماه بعد از پایان دوره به ضبط‌ها دسترسی داشته باشید.",
//       },
//       {
//         question: "آیا گواهینامه دریافت می‌کنم؟",
//         answer: "بله، پس از اتمام دوره و انجام تمرین‌های عملی، گواهینامه معتبر دریافت خواهید کرد.",
//       },
//       {
//         question: "آیا امکان پرداخت اقساطی وجود دارد؟",
//         answer: "بله، امکان پرداخت در ۲ یا ۳ قسط وجود دارد. برای جزئیات بیشتر با من تماس بگیرید.",
//       },
//       {
//         question: "تخفیف دانشجویی چگونه اعمال می‌شود؟",
//         answer:
//           "دانشجویان با ارائه کارت دانشجویی معتبر می‌توانند از ۳۰٪ تخفیف استفاده کنند. کافیست هنگام ثبت‌نام عکس کارت دانشجویی خود را آپلود کنید.",
//       },
//       {
//         question: "جلسه اول رایگان چگونه کار می‌کند؟",
//         answer:
//           "اگر من را نمی‌شناسید یا معرف ندارید، می‌توانید در جلسه اول به صورت رایگان شرکت کنید و بعد تصمیم بگیرید که می‌خواهید ادامه دهید یا خیر.",
//       },
//       {
//         question: "آیا گارانتی بازگشت وجه دارید؟",
//         answer:
//           "بله، اگر تا پایان جلسه دوم احساس کردید که دوره برای شما مناسب نیست، می‌توانید درخواست بازگشت کامل وجه بدهید.",
//       },
//     ],
//     relatedCourses: [
//       {
//         title: "دوره میکروسرویس",
//         description: "معماری و پیاده‌سازی میکروسرویس‌ها با Spring Boot و Node.js",
//         slug: "microservices",
//         image: "/microservices-architecture.png",
//       },
//       {
//         title: "دوره DevOps پیشرفته",
//         description: "CI/CD، کانتینرها، Kubernetes و اتوماسیون",
//         slug: "devops",
//         image: "/devops-kubernetes.jpg",
//       },
//     ],
//   },
// }

const trackClarityEvent = (eventName: string, eventData?: Record<string, string>) => {
  if (typeof window !== "undefined" && (window as any).clarity) {
    ;(window as any).clarity("event", eventName, eventData)
  }
}

// Registration Form Component
function RegistrationForm({ onClose, course }: { onClose: () => void; course?: Course }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isWebinar = course?.type === "webinar"
  const isFree = course?.priceNumber === 0

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    
    // Get the file
    const paymentReceipt = formData.get("paymentReceipt") as File
    
    // Convert file to base64 if exists
    let paymentReceiptBase64 = ""
    if (paymentReceipt && paymentReceipt.size > 0) {
      const reader = new FileReader()
      paymentReceiptBase64 = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(paymentReceipt)
      })
    }
    
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      mobile: formData.get("mobile"),
      email: formData.get("email"),
      company: formData.get("company"),
      attendance: formData.get("attendance"),
      paymentReceipt: paymentReceiptBase64,
      paymentReceiptName: paymentReceipt?.name || "",
      courseName: course?.title || "",
      courseSlug: typeof window !== "undefined" ? window.location.pathname.split("/").pop() : "",
      formType: "registration",
    }

    try {
      const response = await fetch("https://n8n.behradz.ir/webhook/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        trackClarityEvent("registration_form_submitted")
        alert("فرم ثبت‌نام با موفقیت ارسال شد!")
        onClose()
      } else {
        alert("خطا در ارسال فرم. لطفا دوباره تلاش کنید.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("خطا در ارسال فرم. لطفا دوباره تلاش کنید.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-border bg-card text-card-foreground shadow-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{isWebinar ? "فرم ثبت‌نام در وبینار" : "فرم ثبت‌نام در دوره"}{course?.title ? ` ${course?.title}` : ""}</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground cursor-pointer">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isWebinar && (
              <p className="mb-4 rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)] p-3 text-sm text-muted-foreground">
                لینک وبینار از طریق گروه بله <a href="https://ble.ir/join/A6HiDuie9S">@system-design </a>
                یا با پر کردن این فرم و از طریق پیامک برای شما ارسال خواهد شد
              </p>
            )}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">نام</label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="نام خود را وارد کنید"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">نام خانوادگی</label>
                <input
                  type="text"
                  name="lastName"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="نام خانوادگی خود را وارد کنید"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">شماره موبایل</label>
              <input
                type="tel"
                name="mobile"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="09123456789"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                ایمیل <span className="text-muted-foreground text-xs font-normal">(اطلاعات و لایسنس دوره برای شما از طریق همین ایمیل ارسال خواهد شد)</span>
              </label>
              <input
                type="email"
                name="email"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="email@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">شرکت / سازمان (اختیاری)</label>
              <input
                type="text"
                name="company"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="نام شرکت یا سازمان"
              />
            </div>

            {!isWebinar && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  {course?.hasVideo ? "نحوه ثبت نام" : "نحوه شرکت در دوره"}
                </label>
                {course?.hasVideo ? (
                    <>
                      <div className="flex gap-3">
                        <label
                            className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 flex-1">
                          <input type="radio" name="attendance" value="video_purchase"
                                 className="w-4 h-4 cursor-pointer" defaultChecked/>
                          <span className="text-sm">خرید ویدیو</span>
                        </label>
                        <label
                            className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 flex-1">
                          <input type="radio" name="attendance" value="online_class"
                                 className="w-4 h-4 cursor-pointer"/>
                          <span className="text-sm">کلاس آنلاین</span>
                        </label>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        با ثبت نام به هر روشی شما هم به ویدیو‌ها دسترسی خواهید داشت هم در صورت به حد نصاب رسیدن متقاضیان برگزاری انلاین، می‌توانید در کلاس انلاین شرکت کنید.
                         در هر دو حالت شما می توانید در جلسات آنلاین تیم‌سازی و حل تمرین شرکت کنید
                      </p>
                    </>
                ) : (
                    <div className="flex gap-3">
                      <label
                          className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 flex-1">
                      <input type="radio" name="attendance" value="online" className="w-4 h-4 cursor-pointer" defaultChecked />
                      <span className="text-sm">آنلاین</span>
                    </label>
                    {/* <label className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 flex-1">
                      <input type="radio" name="attendance" value="in-person" className="w-4 h-4 cursor-pointer" />
                      <span className="text-sm">فقط حضوری</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 flex-1">
                      <input
                        type="radio"
                        name="attendance"
                        value="both"
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span className="text-sm">فرقی نمی‌کند</span>
                    </label> */}
                  </div>
                )}
              </div>
            )}

            {!isFree && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  مبلغ <span className="font-bold text-primary">{course?.discount && course.priceNumber ? Math.round(course.priceNumber * (1 - course.discount)).toLocaleString("fa-IR") : course?.price} تومان</span> را به شماره کارت <span className="font-bold text-primary">۶۲۲۱۰۶۱۰۵۲۸۸۴۱۹۶</span> بنام بهراد زاری بانک پارسیان واریز نموده و عکس فیش بانکی رو ارسال کنید
                </label>
                <label className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer block">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">کلیک کنید یا فایل را بکشید</p>
                  <input type="file" name="paymentReceipt" className="hidden" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const label = e.target.parentElement?.querySelector('p');
                      if (label) label.textContent = file.name;
                    }
                  }} />
                </label>
              </div>
            )}

            {/* <div>
              <label className="block text-sm font-medium mb-2">
                عکس کارت دانشجویی (برای دریافت تخفیف ۳۰٪ دانشجویی)
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">کلیک کنید یا فایل را بکشید</p>
                <input type="file" className="hidden" accept="image/*" />
              </div>
            </div> */}

            <Button type="submit" className="w-full cursor-pointer" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "در حال ارسال..." : "ثبت‌نام"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

// Reserve Form Component
function ReserveForm({ onClose, course }: { onClose: () => void; course?: Course }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isWebinar = course?.type === "webinar"
  const isFree = course?.priceNumber === 0

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      mobile: formData.get("mobile"),
      email: formData.get("email"),
      company: formData.get("company"),
      courseName: course?.title || "",
      courseSlug: typeof window !== "undefined" ? window.location.pathname.split("/").pop() : "",
      formType: "reserve",
    }

    try {
      const response = await fetch("https://n8n.behradz.ir/webhook/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        trackClarityEvent("reserve_form_submitted")
        alert("پیش ثبت‌نام شما با موفقیت ثبت شد!")
        onClose()
      } else {
        alert("خطا در ارسال فرم. لطفا دوباره تلاش کنید.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("خطا در ارسال فرم. لطفا دوباره تلاش کنید.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-border bg-card text-card-foreground shadow-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{isWebinar ? "پیش ثبت‌نام در وبینار" : "پیش ثبت‌نام در دوره"}{course?.title ? ` ${course?.title}` : ""}</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground cursor-pointer">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6 rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)] p-4">
            <p className="text-sm leading-relaxed">
              با پر کردن این فرم، شما به لیست رزرو {isWebinar ? "وبینار" : "دوره"} اضافه می‌شوید. {isWebinar ? "وبینار" : "این دوره"} در زمستان ۱۴۰۴ برگزار خواهد شد و زمان دقیق برگزاری به شما اطلاع داده می‌شود.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">نام</label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="نام خود را وارد کنید"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">نام خانوادگی</label>
                <input
                  type="text"
                  name="lastName"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="نام خانوادگی خود را وارد کنید"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">شماره موبایل</label>
              <input
                type="tel"
                name="mobile"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="09123456789"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ایمیل</label>
              <input
                type="email"
                name="email"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="email@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">شرکت / سازمان (اختیاری)</label>
              <input
                type="text"
                name="company"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="نام شرکت یا سازمان"
              />
            </div>

            <Button type="submit" className="w-full cursor-pointer" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "در حال ارسال..." : "ثبت پیش ثبت‌نام"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

// Consultation Form Component
function ConsultationForm({ onClose, course }: { onClose: () => void; course?: Course }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      mobile: formData.get("mobile"),
      courseName: course?.title || "",
      courseSlug: typeof window !== "undefined" ? window.location.pathname.split("/").pop() : "",
      formType: "consultation",
    }

    try {
      const response = await fetch("https://n8n.behradz.ir/webhook/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        trackClarityEvent("consultation_form_submitted")
        alert("درخواست مشاوره با موفقیت ارسال شد!")
        onClose()
      } else {
        alert("خطا در ارسال فرم. لطفا دوباره تلاش کنید.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("خطا در ارسال فرم. لطفا دوباره تلاش کنید.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-border bg-card text-card-foreground shadow-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">درخواست مشاوره</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground cursor-pointer">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Telegram Option */}
          <div className="mb-6 rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)] p-4">
            <p className="text-sm text-center mb-3">
              می‌تونید مستقیماً از طریق بله یا تلگرام با من در ارتباط باشید یا فرم زیر رو پر کنید
            </p>
            <div className="flex flex-col gap-3">
              <Button asChild className="w-full bg-transparent hover:bg-primary hover:text-primary-foreground" variant="outline">
                <Link href="https://t.me/bzari" target="_blank" className="flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  ارسال پیام در تلگرام
                </Link>
              </Button>
              <Button asChild className="w-full bg-transparent hover:bg-primary hover:text-primary-foreground" variant="outline">
                <Link href="https://ble.ir/behradz62" target="_blank" className="flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  ارسال پیام در بله
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">یا</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">نام</label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">نام خانوادگی</label>
                <input
                  type="text"
                  name="lastName"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ایمیل</label>
              <input
                type="email"
                name="email"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">شماره تماس</label>
              <input
                type="tel"
                name="mobile"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                required
              />
            </div>

            <Button type="submit" className="w-full cursor-pointer" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "در حال ارسال..." : "ارسال درخواست"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

// Corporate Training Form Component
function CorporateTrainingForm({ onClose, course }: { onClose: () => void; course?: Course }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isWebinar = course?.type === "webinar"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      mobile: formData.get("mobile"),
      company: formData.get("company"),
      courseName: course?.title || "",
      courseSlug: typeof window !== "undefined" ? window.location.pathname.split("/").pop() : "",
      formType: "corporate",
    }

    try {
      const response = await fetch("https://n8n.behradz.ir/webhook/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        trackClarityEvent("corporate_training_form_submitted")
        alert(`درخواست برگزاری ${isWebinar ? "وبینار" : "دوره"} با موفقیت ارسال شد!`)
        onClose()
      } else {
        alert("خطا در ارسال فرم. لطفا دوباره تلاش کنید.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("خطا در ارسال فرم. لطفا دوباره تلاش کنید.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-border bg-card text-card-foreground shadow-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{isWebinar ? "برگزاری وبینار" : "برگزاری دوره"} برای تیم/شرکت شما</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground cursor-pointer">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">نام</label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">نام خانوادگی</label>
                <input
                  type="text"
                  name="lastName"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ایمیل</label>
              <input
                type="email"
                name="email"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">شماره تماس</label>
              <input
                type="tel"
                name="mobile"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">نام شرکت/سازمان</label>
              <input
                type="text"
                name="company"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                required
              />
            </div>

            <Button type="submit" className="w-full cursor-pointer" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "در حال ارسال..." : "ارسال درخواست"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function CoursePageClient({ course, slug }: { course: Course | undefined; slug?: string }) {
  const isWebinar = course?.type === "webinar"
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [showReserveForm, setShowReserveForm] = useState(false)
  const [showConsultationForm, setShowConsultationForm] = useState(false)
  const [showCorporateTrainingForm, setShowCorporateTrainingForm] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  if (!course) {
    notFound()
  }

  // Added structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.shortDescription,
    provider: {
      "@type": "Person",
      name: course.instructor.name,
      jobTitle: course.instructor.title,
    },
    instructor: {
      "@type": "Person",
      name: course.instructor.name,
      description: course.instructor.bio,
    },
    offers: {
      "@type": "Offer",
      price: course.priceNumber,
      priceCurrency: "IRR",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: course.testimonials.length,
    },
    coursePrerequisites: course.prerequisites.join(", "),
    educationalLevel: course.level,
    inLanguage: "fa",
    timeRequired: course.duration,
  }

  const handleShare = (platform: string) => {
    trackClarityEvent("share_button_clicked", { platform })
    const url = typeof window !== "undefined" ? window.location.href : ""
    const text = `${course.title} - ${course.shortDescription}`

    switch (platform) {
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
        break
      case "telegram":
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, "_blank")
        break
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank")
        break
      default:
        navigator.clipboard.writeText(url)
        alert("لینک کپی شد!")
    }
  }

  const nextTestimonial = () => {
    if (course.testimonials.length > 0) {
      setCurrentTestimonial((prev) => (prev + 1) % course.testimonials.length)
    }
  }

  const prevTestimonial = () => {
    if (course.testimonials.length > 0) {
      setCurrentTestimonial((prev) => (prev - 1 + course.testimonials.length) % course.testimonials.length)
    }
  }

  const companies = [
    { name: "آروان کلود", logo: "https://www.arvancloud.ir/images/v6/svg/logo-header-desktop-v6.svg" },
    {
      name: "دیجی کالا",
      logo: "https://www.digikala.com/brand/full-horizontal.svg",
    },
    {
      name: "زرین پال",
      logo: "https://www.zarinpal.com/header/zarinpal-logo.svg",
    },
    { name: "فیلیا", logo: "https://web-cdn.snapp.ir/snapp-website/icons/snappTextLogo.svg" },
    {
      name: "سازیتو",
      logo: "<svg width=\"52\" height=\"32\" viewBox=\"0 0 52 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M27.4266 2.90918H30.0105V29.4027C30.0105 30.8372 28.8536 32.0001 27.4266 32.0001H24.8427V5.50658C24.8427 4.07208 25.9996 2.90918 27.4266 2.90918ZM39.3123 13.4025V23.2726C39.3123 25.4543 40.9211 27.1168 43.0331 27.1168C45.124 27.1168 46.7539 25.4541 46.7533 23.3362L46.7537 13.4025C46.7539 11.968 47.9107 10.8052 49.3377 10.8051H51.9216V23.0649C51.9216 27.9996 47.9421 31.9999 43.0331 31.9999C38.1241 31.9999 34.1446 27.9996 34.1446 23.0649V10.8051H36.7285C38.1555 10.8051 39.3123 11.968 39.3123 13.4025ZM5.20532 12.7729L5.20544 2.9098H2.62158C1.20794 2.9098 0.0377197 4.06383 0.0377197 5.5072V21.6111L0.0420235 21.6112C0.201377 27.3772 4.76578 32.0007 10.3732 32.0007C16.0813 32.0007 20.7078 27.3772 20.7086 21.2994C20.7086 21.2575 20.7084 21.2157 20.7078 21.1741C20.7083 21.1293 20.7086 21.0845 20.7086 21.0397C20.7086 15.1582 16.4514 10.3903 11.2 10.3903C8.92741 10.3903 6.84105 11.2832 5.20532 12.7729ZM4.89537 21.1436C4.89537 17.8442 7.30158 15.1695 10.2698 15.1695C13.238 15.1695 15.6442 17.8442 15.6442 21.1436C15.6442 24.4429 13.238 27.1176 10.2698 27.1176C7.30158 27.1176 4.89537 24.4429 4.89537 21.1436Z\" fill=\"#4E91E6\"></path><path d=\"M12.4403 4.15584C13.5819 4.15584 14.5073 3.22553 14.5073 2.07792C14.5073 0.930317 13.5819 0 12.4403 0C11.2986 0 10.3732 0.930317 10.3732 2.07792C10.3732 3.22553 11.2986 4.15584 12.4403 4.15584Z\" fill=\"#0C1011\"></path></svg>",
    },
    { name: "فناپ", logo: "https://fanap-infra.com/wp-content/uploads/2023/09/Fanap-infra-logo-2.svg" },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {showRegistrationForm && <RegistrationForm onClose={() => setShowRegistrationForm(false)} course={course} />}
      {showReserveForm && <ReserveForm onClose={() => setShowReserveForm(false)} course={course} />}
      {showConsultationForm && <ConsultationForm onClose={() => setShowConsultationForm(false)} course={course} />}
      {showCorporateTrainingForm && <CorporateTrainingForm onClose={() => setShowCorporateTrainingForm(false)} course={course} />}

      <div className="min-h-screen flex flex-col">
        <Navigation />

        <main className="flex-1">
          <section className="relative bg-gradient-to-br from-[#0f2942] via-[#1b4173] to-[#0f2942] text-white">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url('${course.heroImage || '/classroom-training-session.jpg'}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(2px)",
              }}
            />
            <div className="relative container mx-auto px-4 py-12">
              <div className="flex items-center gap-2 mb-6 text-sm">
                <Link href="/" className="hover:underline opacity-80 cursor-pointer">
                  خانه
                </Link>
                <span className="opacity-60">/</span>
                <Link href="/" className="hover:underline opacity-80 cursor-pointer">
                  دوره‌ها
                </Link>
                <span className="opacity-60">/</span>
                <span>{course.title}</span>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-balance leading-tight">{course.title}</h1>
                    {course.isFull && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-orange-500 text-white whitespace-nowrap">
                        تکمیل ظرفیت
                      </span>
                    )}
                  </div>
                  <p className="text-xl mb-6 opacity-90 leading-relaxed">{course.subtitle}</p>
                  <p className="text-xl font-semibold mb-6 opacity-95 leading-relaxed">{course.shortDescription}</p>

                  {course.rating && course.reviewCount && course.rating > 0 && course.reviewCount > 0 && (
                    <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">{course.rating}</span>
                        <span className="opacity-80">({course.reviewCount} نظر)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* <Users className="w-5 h-5" /> */}
                        {/* <span>150+ دانشجو</span> */}
                      </div>
                      <div className="flex items-center gap-2">
                        {/* <Award className="w-5 h-5" /> */}
                        {/* <span>گواهینامه معتبر</span> */}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Image
                      src={course.instructor.image || "/placeholder.svg"}
                      alt={course.instructor.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">مدرس: {course.instructor.name}</p>
                      <p className="text-sm opacity-80">{course.instructor.title}</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl border-4 border-white/20">
                    {course.sampleVideo ? (
                      <video
                        controls
                        className="w-full h-full object-cover"
                        poster={course.image}
                        onPlay={() => trackClarityEvent("course_video_played")}
                      >
                        <source src={course.sampleVideo} type="video/mp4" />
                        مرورگر شما از ویدیو پشتیبانی نمی‌کند.
                      </video>
                    ) : (
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="mt-4 text-center text-sm opacity-75"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Only show companies section for specific courses */}
          {slug && !isWebinar && !["backend-nodejs", "art-of-coding"].includes(slug) && (
            <section className="bg-muted/30 py-12 border-y">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-3">
                  <Building2 className="w-5 h-5 text-primary" />
                  شرکت‌هایی که کارکنانشان در این {isWebinar ? "وبینار" : "دوره"} شرکت کرده‌اند
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                  {companies.map((company, index) => (
                    <div
                      key={index}
                      title={company.name}
                      className="flex items-center justify-center opacity-70 transition-[filter,opacity] duration-300 [filter:brightness(0)_invert(1)] hover:opacity-100 hover:[filter:none]"
                    >
                      {company.logo.includes("<svg") ? (
                        <div
                          className="flex h-[60px] w-[120px] items-center justify-center"
                          dangerouslySetInnerHTML={{ __html: company.logo }}
                        />
                      ) : (
                        <Image
                          src={company.logo || "/placeholder.svg"}
                          alt={company.name}
                          width={120}
                          height={60}
                          className="object-contain"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          <div className="container mx-auto px-4 py-12">
            <div className={`grid gap-8 ${course.descriptionVideoId ? "lg:grid-cols-1" : "lg:grid-cols-3"}`}>
              {/* Main content area */}
              <div className={`space-y-12 ${course.descriptionVideoId ? "" : "lg:col-span-2"}`}>
                <section>
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Target className="w-6 h-6 text-primary" />
                    مهارت‌هایی که کسب می‌کنید
                  </h2>
                  <Card className="border-2 shadow-md">
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        {course.skills.map((skill, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-foreground">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {course.modules.length > 0 && (
                  <section>
                    <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                      <BookOpen className="w-6 h-6 text-primary" />
                      سرفصل‌های {isWebinar ? "وبینار" : "دوره"}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {course.modules.length} ماژول • {course.sessionsCount} • {course.duration} 
                    </p>

                    <Accordion type="single" collapsible className="space-y-3">
                      {course.modules.map((module, index) => (
                        <AccordionItem
                          key={index}
                          value={`module-${index}`}
                          className="overflow-hidden rounded-xl border border-border bg-card shadow-none transition-colors hover:border-[var(--border-strong)]"
                        >
                          <AccordionTrigger className="group px-6 py-5 text-right transition-colors hover:bg-muted/40 [&[data-state=open]]:bg-muted/40">
                            <div className="flex items-start justify-between w-full gap-4">
                              <div className="text-right flex-1">
                                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                                  {module.title}
                                </h3>
                                <p className="text-sm text-muted-foreground font-normal leading-relaxed">
                                  {module.description}
                                </p>
                              </div>
                              <div className="text-sm text-muted-foreground whitespace-nowrap">
                                {module.lectures} جلسه • {module.duration}
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 py-4 bg-muted/20 border-t border-border">
                            <ul className="space-y-3">
                              {module.topics.map((topic, topicIndex) => (
                                <li key={topicIndex} className="flex items-start gap-3 py-2">
                                  <Presentation className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                  <span className="text-foreground">{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </section>
                )}

                <section>
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-primary" />
                    شرح {isWebinar ? "وبینار" : "دوره"}
                  </h2>

                  {course.descriptionVideoId ? (
                    <div className="mb-8">
                      <div className="relative w-full overflow-hidden rounded-lg shadow-md" style={{ aspectRatio: "16 / 9" }}>
                        <iframe
                          src={`https://www.aparat.com/video/video/embed/videohash/${course.descriptionVideoId}/vt/frame`}
                          title={`ویدیو ${course.title}`}
                          allowFullScreen
                          allow="autoplay; fullscreen; picture-in-picture"
                          className="absolute inset-0 w-full h-full border-0"
                        />
                      </div>
                    </div>
                  ) : course.descriptionImage && (
                    <div className="mb-8">
                      <Image
                        src={course.descriptionImage}
                        alt={`کلاس آموزشی ${course.title}`}
                        width={1200}
                        height={400}
                        className="w-full rounded-lg shadow-md"
                      />

                    </div>
                  )}

                  <div className="prose prose-lg max-w-none">
                    <p className="text-foreground leading-relaxed text-pretty text-lg">{course.description}</p>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                      پیش‌نیازها
                    </h3>
                    <ul className="space-y-3">
                      {course.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-foreground">{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section>
                  <Card className="border-2 shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-2xl">
                        <Users className="w-7 h-7 text-primary" />
                        این {isWebinar ? "وبینار" : "دوره"} برای چه کسانی است؟
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {course.targetAudience.map((audience, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-foreground leading-relaxed">{audience}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </section>

                {course.testimonials.length > 0 && (
                  <section>
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <MessageCircle className="w-6 h-6 text-primary" />
                      نظرات شرکت‌کنندگان
                    </h2>
                    <div className="relative">
                      <button
                        onClick={prevTestimonial}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-md"
                        aria-label="نظر قبلی"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      <button
                        onClick={nextTestimonial}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-md"
                        aria-label="نظر بعدی"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <div className="max-w-3xl mx-auto px-16">
                        <Card className="border shadow-sm">
                          <CardContent className="pt-6">
                            <p className="text-foreground leading-relaxed mb-6 italic text-lg">
                              "{course.testimonials[currentTestimonial].review}"
                            </p>
                            <div className="border-t pt-4">
                              <p className="font-bold text-lg">{course.testimonials[currentTestimonial].name}</p>
                              <p className="text-muted-foreground">
                                {course.testimonials[currentTestimonial].position} •{" "}
                                {course.testimonials[currentTestimonial].company}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="flex justify-center gap-2 mt-6">
                        {course.testimonials.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentTestimonial(index)}
                            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                              index === currentTestimonial ? "bg-primary w-8" : "bg-border"
                            }`}
                            aria-label={`نظر ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                <section>
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <User className="w-6 h-6 text-primary" />
                    درباره مدرس
                  </h2>
                  <Card className="border-2 shadow-md">
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row items-start gap-6">
                        <Image
                          src={course.instructor.image || "/placeholder.svg"}
                          alt={course.instructor.name}
                          width={120}
                          height={120}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2">{course.instructor.name}</h3>
                          <p className="text-primary font-medium mb-4">{course.instructor.title}</p>
                          <p className="text-foreground leading-relaxed mb-4">{course.instructor.bio}</p>
                          <Button
                            asChild
                            variant="outline"
                            className="cursor-pointer bg-transparent hover:bg-primary hover:text-white"
                            onClick={() => trackClarityEvent("instructor_linkedin_clicked")}
                          >
                            <Link href={course.instructor.linkedin} target="_blank" className="flex items-center gap-2">
                              <Linkedin className="w-4 h-4" />
                              مشاهده پروفایل لینکدین
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

              {course.type !== 'webinar' && (
                <section>
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Shield className="w-6 h-6 text-primary" />
                    تضمین و امتیازات ویژه
                  </h2>
                  <div className="flex flex-col gap-6">
                    <Card className="border-2 border-[#dfbc92]/30 bg-[#dfbc92]/10 shadow-sm">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-[#dfbc92]/20 flex items-center justify-center flex-shrink-0">
                            <Shield className="w-6 h-6 text-[#dfbc92]" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-2">گارانتی بازگشت وجه</h3>
                            <p className="text-sm text-foreground leading-relaxed">
                              اگر تا پایان جلسه سوم به هر دلیلی از شرکت در ادامه {isWebinar ? "وبینار" : "دوره"} منصرف شدید، کل مبلغ را پس میگیرید. 
                              <br></br>
                              فقط لازمه به من بازخورد شفاف بدید تا بتونم در صورت نیاز کیفیت {isWebinar ? "وبینار" : "دوره"} رو بالاتر ببرم.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/*<Card className="border-2 border-[#dfbc92]/30 bg-[#dfbc92]/10 shadow-sm">*/}
                    {/*  <CardContent className="pt-6">*/}
                    {/*    <div className="flex items-start gap-4">*/}
                    {/*      <div className="w-12 h-12 rounded-full bg-[#dfbc92]/20 flex items-center justify-center flex-shrink-0">*/}
                    {/*        <Gift className="w-6 h-6 text-[#dfbc92]" />*/}
                    {/*      </div>*/}
                    {/*      <div>*/}
                    {/*        <h3 className="font-bold text-lg mb-2">جلسه اول رایگان</h3>*/}
                    {/*        <p className="text-sm text-foreground leading-relaxed">*/}
                    {/*          اگر معرف ندارید یا من رو نمیشناسید یا به هر دلیلی دودل هستید که این {isWebinar ? "وبینار" : "دوره"} بدردتون می‌خوره یا نه، می‌تونید جلسه اول رو رایگان ولی با پر کردن فرم ثبت نام شرکت کنید. */}
                    {/*        </p>*/}
                    {/*      </div>*/}
                    {/*    </div>*/}
                    {/*  </CardContent>*/}
                    {/*</Card>*/}
                  </div>
                </section>
              )}

                {course.faqs.length > 0 && (
                  <section>
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <MessageCircle className="w-6 h-6 text-primary" />
                      سوالات متداول
                    </h2>
                    <Accordion type="single" collapsible className="space-y-3">
                      {course.faqs.map((faq, index) => (
                        <AccordionItem
                          key={index}
                          value={`faq-${index}`}
                          className="rounded-xl border border-border bg-card px-6 shadow-none transition-colors hover:border-[var(--border-strong)]"
                        >
                          <AccordionTrigger className="cursor-pointer py-4 text-right text-lg font-semibold hover:text-primary [&[data-state=open]]:text-primary">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="border-t border-border pb-4 pt-4 leading-relaxed text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </section>
                )}

                {course.relatedCourses && course.relatedCourses.length > 0 && (
                  <section>
                    <h2 className="text-3xl font-bold mb-6">{isWebinar ? "وبینارهای مرتبط" : "دوره‌های مرتبط"}</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {course.relatedCourses.map((relatedCourse, index) => (
                        <Card
                          key={index}
                          className="card-hover-lift group gap-0 overflow-hidden rounded-xl border border-border bg-card p-0 shadow-none hover:border-[var(--border-strong)]"
                        >
                          <div className="relative h-48 overflow-hidden border-b border-border bg-card">
                            <Image
                              src={relatedCourse.image || "/placeholder.svg"}
                              alt={relatedCourse.title}
                              fill
                              sizes="(min-width: 768px) 50vw, 100vw"
                              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                            />
                            <div
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-0"
                              style={{
                                background:
                                  "linear-gradient(to top, var(--card) 2%, transparent 38%)",
                              }}
                            />
                          </div>
                          <CardHeader className="px-5 pt-5">
                            <CardTitle className="text-lg font-bold tracking-tight">{relatedCourse.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="px-5 pb-5 pt-4">
                            <p className="mb-5 leading-7 text-muted-foreground">{relatedCourse.description}</p>
                            <Button
                              asChild
                              variant="outline"
                              className="w-full cursor-pointer rounded-lg border-[var(--border-strong)] bg-transparent hover:border-primary hover:text-primary"
                            >
                              <Link href={`/courses/${relatedCourse.slug}`}>{isWebinar ? "مشاهده وبینار" : "مشاهده دوره"}</Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {!course.descriptionVideoId && (
              <div className="lg:col-span-1">
                <div className="sticky top-4 space-y-4">
                  <Card className="border-2 shadow-lg">
                    <CardContent className="p-6">
                      <div className="mb-6 text-center">
                        <div className="flex flex-col items-center gap-2 mb-2">
                          {course.discount > 0 && course.priceNumber > 0 ? (
                            <>
                              <span className="text-sm text-muted-foreground line-through">
                                {course.price} تومان
                              </span>
                              <span className="text-4xl md:text-4xl font-bold text-red-600">
                                {Math.round(course.priceNumber * (1 - course.discount)).toLocaleString("fa-IR")} تومان
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-5xl font-bold text-primary">{course.price}</span>
                              <span className="text-xl text-muted-foreground">{course.priceNumber === 0 ? "" : "تومان"}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="mb-6">
                        <Button
                          size="lg"
                          className="w-full text-lg cursor-pointer hover:bg-primary/90"
                          onClick={() => {
                            if (course.isFull) {
                              trackClarityEvent("reserve_button_clicked")
                              setShowReserveForm(true)
                            } else {
                              trackClarityEvent("registration_button_clicked")
                              setShowRegistrationForm(true)
                            }
                          }}
                        >
                          {course.isFull ? "پیش ثبت‌نام" : "ثبت‌نام"}
                        </Button>
                      </div>

                      <div className="space-y-3 mb-6 text-sm">
                        {course.hasVideo ? (
                          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 space-y-2 mb-4 text-primary">
                            <div className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <span className="font-semibold text-sm">این دوره به صورت ویدیویی موجود می‌باشد.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <span className="text-xs leading-relaxed">
                                تنها در صورت به حد نصاب رسیدن درخواست برای برگزاری، به صورت آنلاین برگزار می‌شود.
                              </span>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                              <span>{course.schedule}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                              <span>شروع: {course.startDate}</span>
                            </div>
                          </>
                        )}
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-primary flex-shrink-0" />
                          <span>{course.format} {course?.hasVideo ? " یا ویدیو (اسپات پلیر)" : ""}</span>
                          
                        </div>
                        <div className="flex items-center gap-3">
                          <Presentation className="w-5 h-5 text-primary flex-shrink-0" />
                          <span>تیم‌سازی و جلسات حل تمرین و مرور کد ماهانه</span>
                        </div>
                        <div className="flex items-center gap-3">
                
                          <Award className="w-5 h-5 text-primary flex-shrink-0" />
                          <span>تضمین بازگشت وجه</span>
                        </div>

                      </div>

                      <div className="mb-4">
                        <Button
                          size="lg"
                          variant="outline"
                          className="w-full text-lg bg-transparent cursor-pointer hover:bg-primary hover:text-white"
                          onClick={() => {
                            trackClarityEvent("corporate_training_button_clicked")
                            setShowCorporateTrainingForm(true)
                          }}
                        >
                          شخصی‌سازی {isWebinar ? "وبینار" : "دوره"} برای تیم/شرکت شما
                        </Button>
                      </div>

                      <div className="mb-6">
                        <Button
                          size="lg"
                          variant="outline"
                          className="w-full text-lg bg-transparent cursor-pointer hover:bg-primary hover:text-white"
                          onClick={() => {
                            trackClarityEvent("consultation_button_clicked")
                            setShowConsultationForm(true)
                          }}
                        >
                          درخواست مشاوره
                        </Button>
                      </div>

                      <div className="border-t pt-4">
                        <p className="text-sm font-medium mb-3">{isWebinar ? "وبینار" : "دوره"} رو به اشتراک بگذارید تا دیگران هم ببینن</p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-transparent cursor-pointer hover:bg-primary hover:text-white"
                            onClick={() => handleShare("linkedin")}
                          >
                            <Linkedin className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-transparent cursor-pointer hover:bg-primary hover:text-white"
                            onClick={() => handleShare("instagram")}
                          >
                            <Instagram className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-transparent cursor-pointer hover:bg-primary hover:text-white"
                            onClick={() => handleShare("telegram")}
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-transparent cursor-pointer hover:bg-primary hover:text-white"
                            onClick={() => handleShare("whatsapp")}
                          >
                            <Phone className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              )}
            </div>
          </div>

          <section className="relative overflow-hidden border-t border-border bg-card">
            <div aria-hidden="true" className="grid-backdrop pointer-events-none absolute inset-0" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-70"
              style={{
                background:
                  "radial-gradient(55% 100% at 50% 0%, var(--accent-soft), transparent 70%)",
              }}
            />
            <div className="container relative mx-auto px-4 py-20 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3.5 py-1.5 text-xs font-medium text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                قول می‌دم
              </span>
              <p className="mx-auto mb-8 mt-5 max-w-[60ch] text-lg leading-8 text-muted-foreground">
                بعد از این {isWebinar ? "وبینار" : "دوره"} نگاه و طرز فکرتون نسبت به کارهایی که تا الان
                میکردید تغییر می‌کنه
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="cursor-pointer rounded-lg px-8 text-lg shadow-none"
                  onClick={() => {
                    if (course.isFull) {
                      trackClarityEvent("reserve_button_clicked")
                      setShowReserveForm(true)
                    } else {
                      trackClarityEvent("final_cta_registration_clicked")
                      setShowRegistrationForm(true)
                    }
                  }}
                >
                  {course.descriptionVideoId ? "مشاهده آنلاین" : course.isFull ? "پیش ثبت‌نام" : `ثبت‌نام در ${isWebinar ? "وبینار" : "این دوره"}`}
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="cursor-pointer rounded-lg border-[var(--border-strong)] bg-transparent px-8 text-lg text-foreground hover:border-primary hover:text-primary"
                >
                  <Link href="/" onClick={() => trackClarityEvent("view_other_courses_clicked")}>
                    {isWebinar ? "مشاهده سایر وبینارها" : "مشاهده سایر دوره‌ها"}
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
