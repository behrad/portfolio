import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'دوره‌های آموزشی | بهراد',
  description: 'دوره‌های آموزشی تخصصی برنامه‌نویسی، طراحی سیستم و DevOps',
}

const courses = [
  {
    slug: 'system-design',
    title: 'طراحی سیستم‌های مقیاس‌پذیر',
    description: 'آموزش کامل طراحی سیستم‌های بزرگ و مقیاض‌پذیر',
    level: 'پیشرفته',
    duration: '40 ساعت',
    image: '/system-design-1.jpg',
    isFull: false
  },
  {
    slug: 'system-design-1',
    title: 'سیستم دیزاین ۱',
    description: 'Foundations & Monolith Mastery',
    level: 'مقدماتی تا متوسط',
    duration: '۱۵ ساعت',
    image: '/sd1.jpeg',
    isFull: true
  },
  {
    slug: 'backend-nodejs',
    title: 'توسعه Backend با Node.js',
    description: 'آموزش کامل توسعه سرور با Node.js و Express',
    level: 'متوسط',
    duration: '30 ساعت',
    image: '/backend-nodejs.jpg',
    isFull: false
  },
  {
    slug: 'art-of-coding',
    title: 'هنر برنامه‌نویسی',
    description: 'اصول و تکنیک‌های نوشتن کد تمیز و قابل نگهداری',
    level: 'مبتدی',
    duration: '25 ساعت',
    image: '/art-of-coding.jpg',
    isFull: true
  }
]

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">دوره‌های آموزشی</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          دوره‌های تخصصی برای ارتقای مهارت‌های برنامه‌نویسی و طراحی سیستم
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link key={course.slug} href={`/courses/${course.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img
                  src={course.image}
                  alt={course.title}
                  className="object-cover w-full h-full"
                />
                {course.isFull && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-orange-500 text-white shadow-lg">
                      تکمیل ظرفیت
                    </span>
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{course.level}</Badge>
                  <span className="text-sm text-muted-foreground">{course.duration}</span>
                </div>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}