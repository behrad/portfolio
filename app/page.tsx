import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { DiscountRibbon, DiscountNote } from "@/components/discount-alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { coursesData } from "@/data/courses"
import { MetroRoadmap } from "@/components/roadmap/metro-roadmap"
import { CourseCatalogGrid } from "@/components/courses/course-catalog-grid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "بهراد زاری | آموزش برنامه نویسی و سیستم دیزاین | بهراد‌ تک",
  description: "آموزش برنامه نویسی حرفه‌ای، هنر کد نویسی، کد نویسی تمیز (Clean Code)، طراحی سیستم، سیستم دیزاین، تفکر سیستمی و معماری نرم افزار. دوره‌های عملی با پروژه‌های واقعی.",
  keywords: [
    "آموزش برنامه نویسی",
    "دوره برنامه نویسی",
    "هنر کد نویسی",
    "کد نویسی تمیز",
    "clean code",
    "طراحی سیستم",
    "سیستم دیزاین",
    "system design",
    "تفکر سیستمی",
    "معماری نرم افزار",
    "software architecture",
    "آموزش Node.js",
    "میکروسرویس",
    "microservices",
    "مقیاس پذیری",
    "scalability",
  ],
  openGraph: {
    title: "دوره‌های آموزش برنامه نویسی و طراحی سیستم",
    description: "آموزش برنامه نویسی، هنر کد نویسی، طراحی سیستم و سیستم دیزاین با بهراد زاری",
    type: "website",
  },
}

export default function HomePage() {
  // Dynamic: map all courses from coursesData
  const courses = Object.entries(coursesData).map(([id, course]) => {
    const isFree = course.priceNumber === 0
    const isWebinar = course.type === "webinar"
    const isWorkshop = course.type === "workshop"
    const discountedPrice =
      !isFree && course.discount > 0
        ? Math.round(course.priceNumber * (1 - course.discount)).toLocaleString("fa-IR")
        : null

    return {
      id,
      title: course.title,
      description: course.shortDescription,
      image: course.image,
      duration: course.duration,
      price: isFree ? "رایگان" : course.price + " تومان",
      discountedPrice,
      hasDiscount: course.discount > 0 && !isFree,
      highlights: course.skills?.slice(0, 3) ?? [],
      isFull: course.isFull ?? false,
      isWebinar,
      isWorkshop,
      isFree,
      hasVideo: !!course.descriptionVideoId,
    }
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Metro Roadmap Section */}
        <MetroRoadmap />

        {/* Filterable Courses Catalog Grid */}
        <CourseCatalogGrid initialCourses={courses} />

        {/* CTA */}
        <section className="relative overflow-hidden border-t border-border bg-card">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-48 opacity-50"
            style={{
              background:
                "radial-gradient(60% 100% at 50% 100%, var(--accent-soft), transparent 70%)",
            }}
          />
          <div className="container relative mx-auto max-w-2xl px-4 py-20 text-center">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              سوال یا نیاز به مشاوره دارید؟
            </h2>
            <p className="mx-auto mb-8 max-w-[60ch] text-base leading-8 text-muted-foreground">
              برای اطلاعات بیشتر درباره دوره‌ها می‌توانید مستقیماً از طریق تلگرام یا ایمیل با من در
              ارتباط باشید.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-lg px-8 shadow-none">
                <Link href="mailto:behradz@gmail.com">تماس از طریق ایمیل</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-lg border-[var(--border-strong)] bg-transparent px-8 text-foreground hover:border-primary hover:text-primary"
              >
                <Link href="https://t.me/bzari" target="_blank">
                  تماس از طریق تلگرام
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
