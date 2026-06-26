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
        {/* Header Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-border/40">
          {/* Subtle Grid Background Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] dark:opacity-[0.04]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background pointer-events-none" />

          <div className="relative container mx-auto px-4">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Right Column: Copy & Actions */}
              <div className="lg:col-span-7 flex flex-col items-start text-right space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                  ✨ مسیر رشد مهندسی نرم‌افزار و سیستم دیزاین
                </span>
                
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
                  هنر کدنویسی و <br/>
                  <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">طراحی سیستم‌های مقیاس‌پذیر</span>
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl font-normal">
                  دوره‌های تخصصی طراحی سیستم (System Design)، کدنویسی تمیز و تفکر معماری نرم‌افزار بر اساس سال‌ها تجربه عملی در راهبری تیم‌های فنی بزرگ.
                </p>

                {/* Quick Metrics Row */}
                <div className="grid grid-cols-3 gap-6 py-4 w-full max-w-lg border-t border-b border-border/40">
                  <div>
                    <p className="text-2xl md:text-3xl font-extrabold text-foreground">+۱,۰۰۰</p>
                    <p className="text-xs text-muted-foreground mt-1">دانشجو و متخصص</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-extrabold text-foreground">+۱۰ سال</p>
                    <p className="text-xs text-muted-foreground mt-1">تجربه راهبری فنی</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-extrabold text-foreground">۵ دوره</p>
                    <p className="text-xs text-muted-foreground mt-1">تخصصی و جامع</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Button asChild size="lg" className="rounded-full px-8 shadow-none font-semibold text-base">
                    <a href="#courses-grid">مشاهده دوره‌ها</a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full px-8 font-semibold text-base border-border hover:bg-muted/50 transition-colors">
                    <Link href="/about">درباره من</Link>
                  </Button>
                </div>
              </div>

              {/* Left Column: Visual Showcase */}
              <div className="lg:col-span-5 relative w-full flex justify-center">
                <div className="relative w-full max-w-[450px] aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-card shadow-2xl">
                  <Image 
                    src="/classroom-whiteboard-system-design-training.jpg" 
                    alt="جلسه آموزش سیستم دیزاین بهراد زاری" 
                    fill 
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  {/* Frosted overlay details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white text-right">
                    <p className="text-xs font-semibold opacity-90">جلسات حضوری و بوت‌کمپ‌های تخصصی</p>
                    <p className="text-[10px] opacity-70 mt-1">انتقال تجربه دست اول طراحی و مقیاس‌پذیری سیستم</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Ribbon */}
        <section className="py-8 bg-muted/20 border-b border-border/40 overflow-hidden">
          <div className="container mx-auto px-4">
            <p className="text-xs text-center text-muted-foreground font-medium mb-6">
              متخصصین و مهندسانی از این شرکت‌ها در دوره‌های ما حضور داشته‌اند
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40 dark:opacity-30">
              <Image src="/digikala-mono.svg" alt="Digikala" width={110} height={25} className="h-6 object-contain dark:invert" />
              <Image src="/arvan-cloud-mono.svg" alt="Arvan Cloud" width={110} height={25} className="h-6 object-contain dark:invert" />
              <Image src="/fanap-mono.svg" alt="Fanap" width={110} height={25} className="h-6 object-contain dark:invert" />
              <Image src="/zarinpal-mono.svg" alt="Zarinpal" width={110} height={25} className="h-6 object-contain dark:invert" />
              <Image src="/sazito-mono.svg" alt="Sazito" width={110} height={25} className="h-6 object-contain dark:invert" />
              <Image src="/philia-mono.svg" alt="Philia" width={110} height={25} className="h-6 object-contain dark:invert" />
            </div>
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
