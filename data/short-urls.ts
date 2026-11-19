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
  // Mindful discount campaign (Core JS/TS and Node.js Backend)
  {
    code: "mindful-core-tg",
    target: "/courses/core-js-ts?coupon=mindful&utm_source=telegram&utm_medium=channel&utm_campaign=mindful",
    title: "دوره Core JS/TS با تخفیف ۲۵٪ Mindful - تلگرام",
    description: "لینک کوتاه دوره Core JS/TS با اعمال خودکار کد تخفیف ۲۵٪ mindful برای تلگرام",
    createdAt: "2026-11-16",
  },
  {
    code: "mindful-core-li",
    target: "/courses/core-js-ts?coupon=mindful&utm_source=linkedin&utm_medium=post&utm_campaign=mindful",
    title: "دوره Core JS/TS با تخفیف ۲۵٪ Mindful - لینکدین",
    description: "لینک کوتاه دوره Core JS/TS با اعمال خودکار کد تخفیف ۲۵٪ mindful برای لینکدین",
    createdAt: "2026-11-16",
  },
  {
    code: "mindful-core",
    target: "/courses/core-js-ts?coupon=mindful",
    title: "دوره Core JS/TS با تخفیف ۲۵٪ Mindful",
    description: "لینک مستقیم دوره Core JS/TS با اعمال خودکار کد تخفیف ۲۵٪ mindful",
    createdAt: "2026-11-16",
  },
  {
    code: "mindful-node-tg",
    target: "/courses/node-backends?coupon=mindful&utm_source=telegram&utm_medium=channel&utm_campaign=mindful",
    title: "دوره برنامه‌نویسی بک‌اند با Node.js با تخفیف ۲۵٪ Mindful - تلگرام",
    description: "لینک کوتاه دوره بک‌اند Node.js با اعمال خودکار کد تخفیف ۲۵٪ mindful برای تلگرام",
    createdAt: "2026-11-16",
  },
  {
    code: "mindful-node-li",
    target: "/courses/node-backends?coupon=mindful&utm_source=linkedin&utm_medium=post&utm_campaign=mindful",
    title: "دوره برنامه‌نویسی بک‌اند با Node.js با تخفیف ۲۵٪ Mindful - لینکدین",
    description: "لینک کوتاه دوره بک‌اند Node.js با اعمال خودکار کد تخفیف ۲۵٪ mindful برای لینکدین",
    createdAt: "2026-11-16",
  },
  {
    code: "mindful-node",
    target: "/courses/node-backends?coupon=mindful",
    title: "دوره برنامه‌نویسی بک‌اند با Node.js با تخفیف ۲۵٪ Mindful",
    description: "لینک مستقیم دوره بک‌اند Node.js با اعمال خودکار کد تخفیف ۲۵٪ mindful",
    createdAt: "2026-11-16",
  },

  // GoCasts discount campaign (Core JS/TS and Node.js Backend)
  {
    code: "gocasts-core-tg",
    target: "/courses/core-js-ts?coupon=gocasts&utm_source=telegram&utm_medium=channel&utm_campaign=gocasts",
    title: "دوره Core JS/TS با تخفیف ۲۵٪ GoCasts - تلگرام",
    description: "لینک کوتاه دوره Core JS/TS با اعمال خودکار کد تخفیف ۲۵٪ gocasts برای تلگرام",
    createdAt: "2026-11-16",
  },
  {
    code: "gocasts-core-li",
    target: "/courses/core-js-ts?coupon=gocasts&utm_source=linkedin&utm_medium=post&utm_campaign=gocasts",
    title: "دوره Core JS/TS با تخفیف ۲۵٪ GoCasts - لینکدین",
    description: "لینک کوتاه دوره Core JS/TS با اعمال خودکار کد تخفیف ۲۵٪ gocasts برای لینکدین",
    createdAt: "2026-11-16",
  },
  {
    code: "gocasts-core",
    target: "/courses/core-js-ts?coupon=gocasts",
    title: "دوره Core JS/TS با تخفیف ۲۵٪ GoCasts",
    description: "لینک مستقیم دوره Core JS/TS با اعمال خودکار کد تخفیف ۲۵٪ gocasts",
    createdAt: "2026-11-16",
  },
  {
    code: "gocasts-node-tg",
    target: "/courses/node-backends?coupon=gocasts&utm_source=telegram&utm_medium=channel&utm_campaign=gocasts",
    title: "دوره برنامه‌نویسی بک‌اند با Node.js با تخفیف ۲۵٪ GoCasts - تلگرام",
    description: "لینک کوتاه دوره بک‌اند Node.js با اعمال خودکار کد تخفیف ۲۵٪ gocasts برای تلگرام",
    createdAt: "2026-11-16",
  },
  {
    code: "gocasts-node-li",
    target: "/courses/node-backends?coupon=gocasts&utm_source=linkedin&utm_medium=post&utm_campaign=gocasts",
    title: "دوره برنامه‌نویسی بک‌اند با Node.js با تخفیف ۲۵٪ GoCasts - لینکدین",
    description: "لینک کوتاه دوره بک‌اند Node.js با اعمال خودکار کد تخفیف ۲۵٪ gocasts برای لینکدین",
    createdAt: "2026-11-16",
  },
  {
    code: "gocasts-node",
    target: "/courses/node-backends?coupon=gocasts",
    title: "دوره برنامه‌نویسی بک‌اند با Node.js با تخفیف ۲۵٪ GoCasts",
    description: "لینک مستقیم دوره بک‌اند Node.js با اعمال خودکار کد تخفیف ۲۵٪ gocasts",
    createdAt: "2026-11-16",
  },

  // Tondotiz discount campaign (Core JS/TS and Node.js Backend)
  {
    code: "tondotiz-core-tg",
    target: "/courses/core-js-ts?coupon=tondotiz&utm_source=telegram&utm_medium=channel&utm_campaign=tondotiz",
    title: "دوره Core JS/TS با تخفیف ۲۵٪ تندوتیز - تلگرام",
    description: "لینک کوتاه دوره Core JS/TS با اعمال خودکار کد تخفیف ۲۵٪ tondotiz برای تلگرام",
    createdAt: "2026-11-16",
  },
  {
    code: "tondotiz-core-li",
    target: "/courses/core-js-ts?coupon=tondotiz&utm_source=linkedin&utm_medium=post&utm_campaign=tondotiz",
    title: "دوره Core JS/TS با تخفیف ۲۵٪ تندوتیز - لینکدین",
    description: "لینک کوتاه دوره Core JS/TS با اعمال خودکار کد تخفیف ۲۵٪ tondotiz برای لینکدین",
    createdAt: "2026-11-16",
  },
  {
    code: "tondotiz-core",
    target: "/courses/core-js-ts?coupon=tondotiz",
    title: "دوره Core JS/TS با تخفیف ۲۵٪ تندوتیز",
    description: "لینک مستقیم دوره Core JS/TS با اعمال خودکار کد تخفیف ۲۵٪ tondotiz",
    createdAt: "2026-11-16",
  },
  {
    code: "tondotiz-node-tg",
    target: "/courses/node-backends?coupon=tondotiz&utm_source=telegram&utm_medium=channel&utm_campaign=tondotiz",
    title: "دوره برنامه‌نویسی بک‌اند با Node.js با تخفیف ۲۵٪ تندوتیز - تلگرام",
    description: "لینک کوتاه دوره بک‌اند Node.js با اعمال خودکار کد تخفیف ۲۵٪ tondotiz برای تلگرام",
    createdAt: "2026-11-16",
  },
  {
    code: "tondotiz-node-li",
    target: "/courses/node-backends?coupon=tondotiz&utm_source=linkedin&utm_medium=post&utm_campaign=tondotiz",
    title: "دوره برنامه‌نویسی بک‌اند با Node.js با تخفیف ۲۵٪ تندوتیز - لینکدین",
    description: "لینک کوتاه دوره بک‌اند Node.js با اعمال خودکار کد تخفیف ۲۵٪ تندوتیز برای لینکدین",
    createdAt: "2026-11-16",
  },
  {
    code: "tondotiz-node",
    target: "/courses/node-backends?coupon=tondotiz",
    title: "دوره برنامه‌نویسی بک‌اند با Node.js با تخفیف ۲۵٪ تندوتیز",
    description: "لینک مستقیم دوره بک‌اند Node.js با اعمال خودکار کد تخفیف ۲۵٪ tondotiz",
    createdAt: "2026-11-16",
  },
  {
    code: "node-tg",
    target: "/courses/node-backends?utm_source=telegram&utm_medium=channel&utm_campaign=node-backends",
    title: "دوره برنامه‌نویسی بک‌اند با Node.js - تلگرام",
    description: "لینک کوتاه دوره برنامه‌نویسی بک‌اند با Node.js برای کانال تلگرام",
    createdAt: "2026-11-16",
  },
  {
    code: "node-li",
    target: "/courses/node-backends?utm_source=linkedin&utm_medium=post&utm_campaign=node-backends",
    title: "دوره برنامه‌نویسی بک‌اند با Node.js - لینکدین",
    description: "لینک کوتاه دوره برنامه‌نویسی بک‌اند با Node.js برای لینکدین",
    createdAt: "2026-11-16",
  },
  {
    code: "node-telegram",
    target: "/courses/node-backends?utm_source=telegram&utm_medium=channel&utm_campaign=node-backends",
    title: "دوره برنامه‌نویسی بک‌اند با Node.js - تلگرام",
    description: "لینک مستقیم دوره برنامه‌نویسی بک‌اند با Node.js برای کانال تلگرام",
    createdAt: "2026-11-16",
  },
  {
    code: "node-linkedin",
    target: "/courses/node-backends?utm_source=linkedin&utm_medium=post&utm_campaign=node-backends",
    title: "دوره برنامه‌نویسی بک‌اند با Node.js - لینکدین",
    description: "لینک مستقیم دوره برنامه‌نویسی بک‌اند با Node.js برای لینکدین",
    createdAt: "2026-11-16",
  },
  {
    code: "core-tg",
    target: "/courses/core-js-ts?utm_source=telegram&utm_medium=channel&utm_campaign=core-js-ts",
    title: "دوره Core JS/TS عمیق و کاربردی - تلگرام",
    description: "لینک کوتاه دوره جاوااسکریپت و تایپ‌اسکریپت عمیق و کاربردی برای کانال تلگرام",
    createdAt: "2026-11-16",
  },
  {
    code: "core-li",
    target: "/courses/core-js-ts?utm_source=linkedin&utm_medium=post&utm_campaign=core-js-ts",
    title: "دوره Core JS/TS عمیق و کاربردی - لینکدین",
    description: "لینک کوتاه دوره جاوااسکریپت و تایپ‌اسکریپت عمیق و کاربردی برای لینکدین",
    createdAt: "2026-11-16",
  },
  {
    code: "js-tg",
    target: "/courses/core-js-ts?utm_source=telegram&utm_medium=channel&utm_campaign=core-js-ts",
    title: "دوره Core JS/TS عمیق و کاربردی - تلگرام",
    description: "لینک کوتاه دوره جاوااسکریپت و تایپ‌اسکریپت عمیق و کاربردی برای کانال تلگرام",
    createdAt: "2026-11-16",
  },
  {
    code: "js-li",
    target: "/courses/core-js-ts?utm_source=linkedin&utm_medium=post&utm_campaign=core-js-ts",
    title: "دوره Core JS/TS عمیق و کاربردی - لینکدین",
    description: "لینک کوتاه دوره جاوااسکریپت و تایپ‌اسکریپت عمیق و کاربردی برای لینکدین",
    createdAt: "2026-11-16",
  },
  {
    code: "sd4-linkedin",
    target: "/courses/system-design-4?utm_source=linkedin&utm_medium=post&utm_campaign=sd4",
    title: "دوره سیستم دیزاین ۴ - لینکدین",
    description: "لینک کوتاه دوره سیستم دیزاین ۴ برای لینکدین",
    createdAt: "2026-11-14",
  },
  {
    code: "sd4-telegram",
    target: "/courses/system-design-4?utm_source=telegram&utm_medium=channel&utm_campaign=sd4",
    title: "دوره سیستم دیزاین ۴ - تلگرام",
    description: "لینک کوتاه دوره سیستم دیزاین ۴ برای کانال تلگرام",
    createdAt: "2026-11-14",
  },
  {
    code: "sd4-li",
    target: "/courses/system-design-4?utm_source=linkedin&utm_medium=post&utm_campaign=sd4",
    title: "دوره سیستم دیزاین ۴ - لینکدین",
    description: "لینک کوتاه دوره سیستم دیزاین ۴ برای لینکدین",
    createdAt: "2026-11-14",
  },
  {
    code: "sd4-tg",
    target: "/courses/system-design-4?utm_source=telegram&utm_medium=channel&utm_campaign=sd4",
    title: "دوره سیستم دیزاین ۴ - تلگرام",
    description: "لینک کوتاه دوره سیستم دیزاین ۴ برای کانال تلگرام",
    createdAt: "2026-11-14",
  },
  {
    code: "learn-tg",
    target: "/courses/learning-how-to-learn?utm_source=telegram&utm_medium=channel&utm_campaign=learn",
    title: "وبینار یاد بگیریم چطور یاد بگیریم - تلگرام (کمپین learn)",
    description: "لینک کوتاه وبینار یادگیری با سورس Telegram و کمپین learn",
    createdAt: "2026-11-01",
  },
  {
    code: "learn-li",
    target: "/courses/learning-how-to-learn?utm_source=linkedin&utm_medium=post&utm_campaign=learn",
    title: "وبینار یاد بگیریم چطور یاد بگیریم - لینکدین (کمپین learn)",
    description: "لینک کوتاه وبینار یادگیری با سورس LinkedIn و کمپین learn",
    createdAt: "2026-11-01",
  },
  {
    code: "learn",
    target: "/courses/learning-how-to-learn?utm_campaign=learn",
    title: "وبینار یاد بگیریم چطور یاد بگیریم - کمپین learn",
    description: "لینک کوتاه وبینار یادگیری با کمپین learn",
    createdAt: "2026-11-01",
  },
  {
    code: "wf-tg",
    target: "/courses/ai-assisted-software-engineering?utm_source=telegram&utm_medium=channel&utm_campaign=WF",
    title: "کارگاه Agentic Software Development - تلگرام (کمپین WF)",
    description: "لینک کوتاه کارگاه ایجنتیک با سورس Telegram و کمپین WF",
    createdAt: "2026-09-29",
  },
  {
    code: "wf-telegram",
    target: "/courses/ai-assisted-software-engineering?utm_source=telegram&utm_medium=channel&utm_campaign=WF",
    title: "کارگاه Agentic Software Development - تلگرام (کمپین WF)",
    description: "لینک مستقیم کارگاه ایجنتیک با سورس Telegram و کمپین WF",
    createdAt: "2026-09-29",
  },
  {
    code: "wf-li",
    target: "/courses/ai-assisted-software-engineering?utm_source=linkedin&utm_medium=post&utm_campaign=WF",
    title: "کارگاه Agentic Software Development - لینکدین (کمپین WF)",
    description: "لینک کوتاه کارگاه ایجنتیک با سورس LinkedIn و کمپین WF",
    createdAt: "2026-09-29",
  },
  {
    code: "wf-linkedin",
    target: "/courses/ai-assisted-software-engineering?utm_source=linkedin&utm_medium=post&utm_campaign=WF",
    title: "کارگاه Agentic Software Development - لینکدین (کمپین WF)",
    description: "لینک مستقیم کارگاه ایجنتیک با سورس LinkedIn و کمپین WF",
    createdAt: "2026-09-29",
  },
  {
    code: "wf",
    target: "/courses/ai-assisted-software-engineering?utm_campaign=WF",
    title: "کارگاه Agentic Software Development - کمپین WF",
    description: "لینک کوتاه کارگاه ایجنتیک با کمپین WF",
    createdAt: "2026-09-29",
  },
  {
    code: "devday-li",
    target: "/?utm_source=linkedin&utm_campaign=devday",
    title: "کمپین DevDay صفحه اصلی - لینکدین",
    description: "لینک کوتاه صفحه اصلی با UTM کمپین devday و سورس LinkedIn",
    createdAt: "2026-09-14",
  },
  {
    code: "devday-linkedin",
    target: "/?utm_source=linkedin&utm_campaign=devday",
    title: "کمپین DevDay صفحه اصلی - لینکدین",
    description: "لینک مستقیم صفحه اصلی با UTM کمپین devday و سورس LinkedIn",
    createdAt: "2026-09-14",
  },
  {
    code: "dd-li",
    target: "/?utm_source=linkedin&utm_campaign=devday",
    title: "کمپین DevDay صفحه اصلی - لینکدین",
    description: "لینک فوق کوتاه کمپین devday برای لینکدین",
    createdAt: "2026-09-14",
  },
  {
    code: "devday-tg",
    target: "/?utm_source=telegram&utm_campaign=devday",
    title: "کمپین DevDay صفحه اصلی - تلگرام",
    description: "لینک کوتاه صفحه اصلی با UTM کمپین devday و سورس Telegram",
    createdAt: "2026-09-14",
  },
  {
    code: "devday-telegram",
    target: "/?utm_source=telegram&utm_campaign=devday",
    title: "کمپین DevDay صفحه اصلی - تلگرام",
    description: "لینک مستقیم صفحه اصلی با UTM کمپین devday و سورس Telegram",
    createdAt: "2026-09-14",
  },
  {
    code: "dd-tg",
    target: "/?utm_source=telegram&utm_campaign=devday",
    title: "کمپین DevDay صفحه اصلی - تلگرام",
    description: "لینک فوق کوتاه کمپین devday برای تلگرام",
    createdAt: "2026-09-14",
  },
  {
    code: "myday",
    target: "/#courses-grid?coupon=myday",
    title: "تخفیف ویژه روز برنامه‌نویس",
    description: "لینک کوتاه جشنواره روز برنامه‌نویس با اعمال خودکار کد تخفیف",
    createdAt: "2026-09-14",
  },
  {
    code: "roozammobarak",
    target: "/#courses-grid?coupon=roozammobarak",
    title: "تخفیف ویژه روز برنامه‌نویس (فارسی)",
    description: "لینک کوتاه جشنواره روز برنامه‌نویس با کد روزم مبارک",
    createdAt: "2026-09-14",
  },
  {
    code: "sd1",
    target: "/courses/system-design-1?coupon=myday",
    title: "سیستم دیزاین ۱ - تخفیف روز برنامه‌نویس",
    description: "لینک مستقیم سیستم دیزاین ۱ با کد تخفیف روز برنامه‌نویس ۵ میلیون تومان",
    createdAt: "2026-09-14",
  },
  {
    code: "sd2",
    target: "/courses/system-design-2?coupon=myday",
    title: "سیستم دیزاین ۲ - تخفیف روز برنامه‌نویس",
    description: "لینک مستقیم سیستم دیزاین ۲ با کد تخفیف روز برنامه‌نویس ۵ میلیون تومان",
    createdAt: "2026-09-14",
  },
  {
    code: "clean",
    target: "/courses/art-of-coding?coupon=myday",
    title: "هنر کدنویسی - تخفیف روز برنامه‌نویس",
    description: "لینک مستقیم دوره هنر کدنویسی با کد تخفیف روز برنامه‌نویس ۵ میلیون تومان",
    createdAt: "2026-09-14",
  },
  {
    code: "li",
    target: "/courses/ai-assisted-software-engineering?utm_source=linkedin&utm_medium=post&utm_campaign=be",
    title: "کارگاه Agentic Software Development - لینکدین",
    description: "لینک کوتاه کارگاه ایجنتیک با سورس LinkedIn و کمپین be",
    createdAt: "2026-08-31",
  },
  {
    code: "be",
    target: "/courses/ai-assisted-software-engineering?utm_source=linkedin&utm_medium=post&utm_campaign=be",
    title: "کارگاه Agentic Software Development - کمپین be لینکدین",
    description: "لینک کوتاه کارگاه ایجنتیک با سورس LinkedIn و کمپین be",
    createdAt: "2026-08-31",
  },
  {
    code: "linkedin",
    target: "/courses/ai-assisted-software-engineering?utm_source=linkedin&utm_medium=post&utm_campaign=be",
    title: "کارگاه Agentic Software Development - لینکدین",
    description: "لینک مستقیم کارگاه ایجنتیک با سورس LinkedIn",
    createdAt: "2026-08-31",
  },
  {
    code: "ag-linkedin",
    target: "/courses/ai-assisted-software-engineering?utm_source=linkedin&utm_medium=post&utm_campaign=be",
    title: "کارگاه Agentic Software Development - لینکدین",
    description: "لینک کوتاه کارگاه ایجنتیک برای پست لینکدین",
    createdAt: "2026-08-31",
  },
  {
    code: "finnova",
    target: "/courses/ai-assisted-software-engineering?utm_source=finnova&utm_campaign=finnova&coupon=finnova",
    title: "کارگاه Agentic Software Development - فینووا",
    description: "لینک مستقیم کارگاه Agentic ویژه فینووا با اعمال خودکار کد تخفیف",
    createdAt: "2026-08-31",
  },
  {
    code: "dtw",
    target: "/courses/ai-assisted-software-engineering?utm_source=telegram&utm_medium=channel&utm_campaign=DTW",
    title: "کارگاه Agentic Software Development - کمپین DTW",
    description: "لینک کوتاه کارگاه ایجنتیک با UTM تلگرام و کمپین DTW",
    createdAt: "2026-08-29",
  },
  {
    code: "ag-dtw",
    target: "/courses/ai-assisted-software-engineering?utm_source=telegram&utm_medium=channel&utm_campaign=DTW",
    title: "کارگاه Agentic Software Development - کمپین DTW",
    description: "لینک کوتاه کارگاه ایجنتیک با UTM تلگرام و کمپین DTW",
    createdAt: "2026-08-29",
  },
  {
    code: "agilix",
    target: "/courses/ai-assisted-software-engineering?utm_source=webinar&utm_medium=video_cta&utm_campaign=agilix",
    title: "کارگاه Agentic Software Development",
    description: "لینک مستقیم کارگاه Agentic با کمپین وبینار",
    createdAt: "2026-08-19",
  },
  {
    code: "agentic",
    target: "/courses/ai-assisted-software-engineering?utm_source=webinar&utm_medium=video_cta&utm_campaign=agentic",
    title: "کارگاه Agentic Software Development",
    description: "لینک مستقیم کارگاه Agentic با کمپین وبینار",
    createdAt: "2026-08-19",
  },
  {
    code: "agilix-ws",
    target: "/courses/ai-assisted-software-engineering",
    title: "کارگاه Agentic Software Development (اصلی)",
    description: "لینک کوتاه کارگاه Agentic",
    createdAt: "2026-08-19",
  },
  {
    code: "drilling",
    target: "/courses/ai-assisted-software-engineering?utm_source=drilling",
    title: "کارگاه Agentic - متد Grilling",
    description: "لینک کوتاه متد Grilling در توسعه ایجنت‌محور",
    createdAt: "2026-08-19",
  },
  {
    code: "grilling",
    target: "/courses/ai-assisted-software-engineering?utm_source=grilling",
    title: "کارگاه Agentic - متد Grilling",
    description: "لینک کوتاه متد Grilling در توسعه ایجنت‌محور",
    createdAt: "2026-08-19",
  },
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
    code: "agentic-li",
    target: "/courses/agentic-software-development?utm_source=linkedin&utm_medium=post&utm_campaign=agentic_webinar#video",
    title: "وبینار Agentic Software Development - لینکدین",
    description: "لینک مستقیم مشاهده ویدیو با UTM لینکدین",
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
    code: "agentic-tg",
    target: "/courses/agentic-software-development?utm_source=telegram&utm_medium=channel&utm_campaign=mindfulsoft#video",
    title: "وبینار Agentic Software Development - تلگرام",
    description: "لینک مستقیم مشاهده ویدیو با UTM تلگرام",
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
    code: "ag-yt",
    target: "/courses/agentic-software-development?utm_source=youtube&utm_medium=video&utm_campaign=agentic_webinar#video",
    title: "وبینار Agentic Software Development - یوتیوب",
    description: "لینک مستقیم مشاهده ویدیو با UTM یوتیوب و هشتگ ویدیو",
    createdAt: "2026-08-18",
  },
  {
    code: "agentic-yt",
    target: "/courses/agentic-software-development?utm_source=youtube&utm_medium=video&utm_campaign=agentic_webinar#video",
    title: "وبینار Agentic Software Development - یوتیوب",
    description: "لینک مستقیم ویدیو با UTM یوتیوب",
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
    target: "/courses/node-backends",
    title: "برنامه‌نویسی بک‌اند با Node.js (Node.js Backends)",
    description: "لینک کوتاه دوره برنامه‌نویسی بک‌اند با Node.js (Ship Production-Level Node.js Services)",
    createdAt: "2026-08-17",
  },
  {
    code: "node2",
    target: "/courses/nodejs-engineer",
    title: "مهندس Node.js",
    description: "لینک کوتاه دوره دوم Node.js (مهندس Node.js)",
    createdAt: "2026-08-21",
  },
  {
    code: "node3",
    target: "/courses/nodejs-engineer",
    title: "مهندس Node.js",
    description: "لینک کوتاه دوره سوم Node.js (پرکتیس‌ها و موازنه‌های پروداکشن)",
    createdAt: "2026-08-21",
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
