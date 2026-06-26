import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { DiscountBanner } from "@/components/discount-banner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { coursesData } from "@/data/courses"
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
      isFree,
    }
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Header */}
        <section className="relative bg-gradient-to-br from-primary via-primary to-blue-900 text-primary-foreground py-12 md:py-16 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/classroom-training-session.jpg"
              alt="جلسه آموزشی"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">دوره‌ و بوت کمپ‌ها</h1>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              سرفصل این دوره‌ها بر اساس تجربه من در طول سال‌ها توسعه نرم افزار، تیم‌سازی و فیدبک از تدریس تدوین شدن
            </p>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              به همین دلیل میتونن خیلی در مسیر حرفه‌ای شما از یک برنامه‌نویس تازه‌کار تا تک لید یا مدیر فنی مفید باشن
            </p>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              تا با دید باز‌تری فکر کنید و بتونید تصمیمات بهتری در پروژه‌ها یا تیم‌تون بگیرید
            </p>
          </div>
        </section>

        <section id="courses-grid" className="container mx-auto px-4 py-8">
          <DiscountBanner />
        </section>

        {/* Courses Grid */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="flex flex-col overflow-hidden bg-card/65 border border-border/60 hover:border-primary/40 hover:shadow-lg transition-all duration-300 rounded-2xl shadow-none">
                {/* Course Image */}
                <div className="relative h-48 w-full bg-background/50 dark:bg-background/20 p-4 border-b border-border/30">
                  <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-contain p-4 transition-transform duration-500 hover:scale-105" />
                  {course.isFull && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-500/90 text-white backdrop-blur-sm shadow-md">
                        تکمیل ظرفیت
                      </span>
                    </div>
                  )}
                </div>

                <CardHeader className="pb-3 px-6 pt-6">
                  <CardTitle className="text-xl font-bold tracking-tight text-foreground">{course.title}</CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">{course.description}</p>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col pt-0 px-6 pb-6">
                  {/* Highlights with styled bullets */}
                  <ul className="space-y-2.5 mb-6 flex-1 pt-2">
                    {course.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1.5 text-[10px]">●</span>
                        <span className="text-sm text-foreground/80 leading-relaxed font-normal">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Course Info */}
                  <div className="flex items-center justify-between text-sm mb-6 pt-4 border-t border-border/40">
                    <span className="text-muted-foreground font-medium">{course.duration}</span>
                    <div className="text-left">
                      {course.hasDiscount ? (
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs text-muted-foreground/60 line-through">
                            {course.price}
                          </span>
                          <span className="font-bold text-red-500 text-base">
                            {course.discountedPrice} تومان
                          </span>
                        </div>
                      ) : (
                        <span className="font-bold text-foreground text-base">{course.price}</span>
                      )}
                    </div>
                  </div>

                  <Button asChild className="w-full rounded-full py-5 font-semibold shadow-none transition-colors duration-200">
                    <Link href={`/courses/${course.id}`}>
                      {course.isFree ? "شرکت در وبینار" : course.isWebinar ? "مشاهده وبینار" : "جزییات دوره"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-card border-t border-border/50 py-20 text-center">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground mb-4">سوال یا نیاز به مشاوره دارید؟</h2>
            <p className="text-base text-muted-foreground mb-8">
              برای اطلاعات بیشتر درباره دوره‌ها می‌توانید مستقیماً از طریق تلگرام یا ایمیل با من در ارتباط باشید.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full px-8 shadow-none">
                <Link href="mailto:behradz@gmail.com">تماس از طریق ایمیل</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary">
                <Link href="https://t.me/bzari" target="_blank">تماس از طریق تلگرام</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
