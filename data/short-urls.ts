export interface ShortUrlConfig {
  code: string
  target: string
  title?: string
  description?: string
  createdAt?: string
}

export const RESERVED_SLUGS = new Set([
  "",
  "about",
  "coaching",
  "courses",
  "s",
  "r",
  "api",
  "_next",
  "static",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "images",
  "fonts",
])

export const shortUrlsList: ShortUrlConfig[] = [
  {
    code: "ai-asd",
    target: "/courses/ai-assisted-software-engineering?utm_source=webinar&utm_campaign=asd",
    title: "کارگاه مهندسی نرمافزار Agent-محور (AI-Assisted SE)",
    description: "لینک کوتاه کارگاه هوش مصنوعی و مهندسی نرمافزار",
    createdAt: "2026-08-17",
  },
  {
    code: "ai-ws",
    target: "/courses/ai-assisted-software-engineering",
    title: "کارگاه AI-Assisted Software Engineering",
    description: "لینک کوتاه کارگاه مهندسی نرمافزار با هوش مصنوعی",
    createdAt: "2026-08-17",
  },
  {
    code: "aiew",
    target: "/courses/ai-assisted-software-engineering",
    title: "کارگاه مهندسی با AI (مخفف)",
    description: "کد کوتاه ۵ کاراکتری کارگاه",
    createdAt: "2026-08-17",
  },
  {
    code: "ai-se",
    target: "/courses/ai-assisted-software-engineering",
    title: "کارگاه AI-SE",
    description: "لینک کوتاه AI Software Engineering",
    createdAt: "2026-08-17",
  },
  {
    code: "asd",
    target: "/courses/ai-assisted-software-engineering",
    title: "کارگاه AI-Assisted SE (مخفف ۳ حرفی)",
    description: "لینک فوق کوتاه ۳ حرفی کارگاه",
    createdAt: "2026-08-17",
  },
  {
    code: "ai-ig",
    target: "/courses/ai-assisted-software-engineering?utm_source=instagram&utm_medium=bio&utm_campaign=ai_ws",
    title: "کارگاه AI - اینستاگرام بایو",
    description: "لینک ویژه بیو اینستاگرام با UTM",
    createdAt: "2026-08-17",
  },
  {
    code: "ai-tg",
    target: "/courses/ai-assisted-software-engineering?utm_source=telegram&utm_medium=channel&utm_campaign=ai_ws",
    title: "کارگاه AI - تلگرام",
    description: "لینک ویژه کانال تلگرام با UTM",
    createdAt: "2026-08-17",
  },
  {
    code: "ai-li",
    target: "/courses/ai-assisted-software-engineering?utm_source=linkedin&utm_medium=post&utm_campaign=ai_ws",
    title: "کارگاه AI - لینکدین",
    description: "لینک ویژه پست لینکدین با UTM",
    createdAt: "2026-08-17",
  },
  {
    code: "ag-li",
    target: "/courses/agentic-software-development?utm_source=linkedin&utm_medium=post&utm_campaign=agentic_webinar#video",
    title: "وبینار Agentic Software Development - لینکدین",
    description: "لینک مستقیم مشاهده ویدیو وبینار توسعه نرم‌افزار ایجنت‌محور با هشتگ ویدیو و UTM لینکدین",
    createdAt: "2026-08-18",
  },
  {
    code: "ag-tg",
    target: "/courses/agentic-software-development?utm_source=telegram&utm_medium=channel&utm_campaign=mindfulsoft#video",
    title: "وبینار Agentic Software Development - تلگرام Mindful Soft",
    description: "لینک مستقیم مشاهده ویدیو وبینار ایجنتیک با هشتگ ویدیو و UTM تلگرام کمپین Mindful Soft",
    createdAt: "2026-08-18",
  },
  {
    code: "ag-ms",
    target: "/courses/agentic-software-development?utm_source=telegram&utm_medium=channel&utm_campaign=mindfulsoft#video",
    title: "وبینار ایجنتیک - کمپین Mindful Soft تلگرام",
    description: "لینک کوتاه ویژه کمپین Mindful Soft برای مشاهده ویدیوی وبینار",
    createdAt: "2026-08-18",
  },
  {
    code: "ag-video",
    target: "/courses/agentic-software-development#video",
    title: "مشاهده ویدیوی کامل وبینار Agentic Software Development",
    description: "لینک مستقیم پرش به بخش ویدیو و سرفصل‌های وبینار ایجنتیک",
    createdAt: "2026-08-18",
  },
  {
    code: "agentic-video",
    target: "/courses/agentic-software-development#video",
    title: "مشاهده ویدیو وبینار ایجنتیک",
    description: "لینک مستقیم پرش به پلیر ویدیوی وبینار ایجنتیک",
    createdAt: "2026-08-18",
  },
  {
    code: "agentic",
    target: "/courses/agentic-software-development",
    title: "وبینار Agentic Software Development",
    description: "لینک کوتاه وبینار توسعه نرم‌افزار مبتنی بر ایجنت",
    createdAt: "2026-08-17",
  },
  {
    code: "ag-ws",
    target: "/courses/agentic-software-development",
    title: "وبینار ایجنتیک (مخفف)",
    description: "لینک کوتاه وبینار ایجنتیک",
    createdAt: "2026-08-17",
  },
  {
    code: "clean-code",
    target: "/courses/art-of-coding",
    title: "دوره هنر کدنویسی تمیز",
    description: "لینک کوتاه دوره Clean Code",
    createdAt: "2026-08-17",
  },
  {
    code: "art",
    target: "/courses/art-of-coding",
    title: "دوره هنر کدنویسی (مخفف)",
    description: "لینک کوتاه دوره هنر کدنویسی",
    createdAt: "2026-08-17",
  },
  {
    code: "sd1",
    target: "/courses/system-design-1",
    title: "سیستم دیزاین ۱",
    description: "لینک کوتاه دوره سیستم دیزاین ۱ (آبزروبیلیتی/پرفرمنس)",
    createdAt: "2026-08-17",
  },
  {
    code: "sd2",
    target: "/courses/system-design-2",
    title: "سیستم دیزاین ۲",
    description: "لینک کوتاه دوره سیستم دیزاین ۲ (معماری رویدادمحور و توزیعشده)",
    createdAt: "2026-08-17",
  },
  {
    code: "sd3",
    target: "/courses/system-design-3",
    title: "سیستم دیزاین ۳",
    description: "لینک کوتاه دوره سیستم دیزاین ۳ (دادههای بزرگ و مقیاس میلیونی)",
    createdAt: "2026-08-17",
  },
  {
    code: "sd4",
    target: "/courses/system-design-4",
    title: "سیستم دیزاین ۴",
    description: "لینک کوتاه دوره سیستم دیزاین ۴ (معماری کلود نیتیو)",
    createdAt: "2026-08-17",
  },
  {
    code: "sdi",
    target: "/courses/system-design-interview",
    title: "مصاحبه سیستم دیزاین",
    description: "لینک کوتاه کارگاه آمادگی مصاحبه طراحی سیستم",
    createdAt: "2026-08-17",
  },
  {
    code: "node",
    target: "/courses/backend-nodejs",
    title: "دوره جامع بکند Node.js",
    description: "لینک کوتاه دوره Node.js",
    createdAt: "2026-08-17",
  },
  {
    code: "mentor",
    target: "/coaching",
    title: "کوچینگ و منتورینگ اختصاصی",
    description: "لینک صفحه منتورینگ و مشاوره شغلی",
    createdAt: "2026-08-17",
  },
]

export const shortUrlsMap: Record<string, ShortUrlConfig> = shortUrlsList.reduce(
  (acc, item) => {
    const normalizedCode = item.code.trim().toLowerCase()
    if (!RESERVED_SLUGS.has(normalizedCode)) {
      acc[normalizedCode] = item
    }
    return acc
  },
  {} as Record<string, ShortUrlConfig>
)

export function getShortUrl(code: string): ShortUrlConfig | undefined {
  const normalized = (code || "").trim().toLowerCase()
  return shortUrlsMap[normalized]
}

export function getAllShortCodes(): string[] {
  return Object.keys(shortUrlsMap)
}

export function buildRedirectUrl(target: string, incomingSearch = ""): string {
  if (!incomingSearch || incomingSearch === "?") {
    return target
  }

  try {
    const isAbsolute = target.startsWith("http://") || target.startsWith("https://")
    const dummyBase = "https://behradz.ir"
    const targetUrl = new URL(target, dummyBase)
    const incomingParams = new URLSearchParams(incomingSearch)

    incomingParams.forEach((value, key) => {
      targetUrl.searchParams.set(key, value)
    })

    if (isAbsolute) {
      return targetUrl.toString()
    } else {
      return `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`
    }
  } catch {
    const delimiter = target.includes("?") ? "&" : "?"
    const cleanSearch = incomingSearch.startsWith("?") ? incomingSearch.slice(1) : incomingSearch
    return `${target}${delimiter}${cleanSearch}`
  }
}
