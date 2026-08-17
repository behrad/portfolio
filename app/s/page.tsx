import type { Metadata } from "next"
import ShortenerDashboardClient from "./client"

export const metadata: Metadata = {
  title: "مدیریت لینک‌های کوتاه | بهراد زاری",
  description: "مدیریت و ساخت لینک‌های کوتاه و UTM برای دوره‌ها و صفحات سایت",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ShortenerPage() {
  return <ShortenerDashboardClient />
}
