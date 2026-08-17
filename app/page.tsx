import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { DiscountRibbon, DiscountNote } from "@/components/discount-alert"
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
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div aria-hidden="true" className="grid-backdrop pointer-events-none absolute inset-0" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-60"
            style={{
              background:
                "radial-gradient(60% 100% at 50% 0%, var(--accent-soft), transparent 70%)",
            }}
          />
          <div className="relative container mx-auto px-4 py-20 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <DiscountRibbon />

              <h1 className="mt-6 text-4xl font-bold leading-[1.15] tracking-tight text-foreground md:text-5xl">
                دوره‌ و بوت‌کمپ‌ها
              </h1>

              <DiscountNote />

              <p className="mx-auto mt-6 max-w-[68ch] text-base leading-8 text-muted-foreground md:text-lg">
                سرفصل این دوره‌ها بر اساس تجربه من در طول سال‌ها توسعه نرم‌افزار، تیم‌سازی و فیدبک از
                تدریس تدوین شده. به همین دلیل می‌تونن در مسیر حرفه‌ای شما، از یک برنامه‌نویس تازه‌کار
                تا تک‌لید یا مدیر فنی، مفید باشن تا با دید بازتری فکر کنید و تصمیمات بهتری در پروژه‌ها و
                تیم‌تون بگیرید.
              </p>

              {/* trust signal: real terminal line, always LTR */}
              <div className="mx-auto mt-10 max-w-md overflow-hidden rounded-xl border border-border bg-card text-right">
                <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--danger)] opacity-70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--warning)] opacity-70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--success)] opacity-70" />
                  <span className="mono ms-1.5 text-xs text-muted-foreground">career.sh</span>
                </div>
                <pre className="mono overflow-x-auto px-4 py-3 text-[13px] leading-7 text-foreground/90">
                  <code>
                    <span className="text-muted-foreground">$</span>{" "}
                    <span className="text-primary">git</span> commit -m{" "}
                    <span className="text-[var(--success)]">"level up"</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section id="courses-grid" className="container mx-auto px-4 py-14">
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">دوره، کارگاه و وبینار‌ها</h2>
            <span className="mono text-xs text-muted-foreground">
              {courses.length.toLocaleString("en-US")} عنوان آموزشی
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="card-hover-lift group flex flex-col gap-0 overflow-hidden rounded-xl border border-border bg-card p-0 shadow-none hover:border-[var(--border-strong)]"
              >
                {/* Course Image */}
                <div className="relative h-48 w-full overflow-hidden border-b border-border bg-card">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  {/* blend the banner's navy into the card body */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, var(--card) 2%, transparent 38%)",
                    }}
                  />
                  {course.isFull && (
                    <div className="absolute end-3 top-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-border)] bg-card/80 px-2.5 py-1 text-xs font-medium text-[var(--danger)] backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--danger)]" aria-hidden="true" />
                        تکمیل ظرفیت
                      </span>
                    </div>
                  )}
                </div>

                <CardHeader className="px-5 pb-0 pt-5">
                  <CardTitle className="text-lg font-bold tracking-tight text-foreground">
                    {course.title}
                  </CardTitle>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{course.description}</p>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col px-5 pb-5 pt-4">
                  {/* Highlights */}
                  <ul className="mb-5 flex-1 space-y-2.5">
                    {course.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"
                        />
                        <span className="text-sm leading-7 text-foreground/80">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Course Info */}
                  <div className="mb-5 flex items-center justify-between border-t border-border pt-4 text-sm">
                    <span className="text-muted-foreground">{course.duration}</span>
                    <div className="text-left">
                      {course.hasDiscount ? (
                        <div className="flex flex-col items-end gap-0.5">
                          <span className="text-xs text-muted-foreground line-through">
                            {course.price}
                          </span>
                          <span className="text-base font-bold text-primary">
                            {course.discountedPrice} تومان
                          </span>
                        </div>
                      ) : (
                        <span className="text-base font-bold text-foreground">{course.price}</span>
                      )}
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full rounded-lg py-5 font-medium shadow-none transition-colors"
                  >
                    <Link href={`/courses/${course.id}`}>
                      {course.hasVideo
                        ? "مشاهده آنلاین"
                        : course.isFree
                          ? course.isWebinar
                            ? "شرکت در وبینار"
                            : course.isWorkshop
                              ? "شرکت در کارگاه"
                              : "ثبت‌نام رایگان"
                          : course.isWorkshop
                            ? "جزییات کارگاه"
                            : course.isWebinar
                              ? "مشاهده وبینار"
                              : "جزییات دوره"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

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
