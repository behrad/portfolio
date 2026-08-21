export type CourseLayer = 'coding' | 'code-architecture' | 'system-architecture'

export type AudienceRole = 'frontend' | 'backend' | 'architect' | 'everyone'

export interface LayerConfig {
  id: CourseLayer
  titleFa: string
  titleEn: string
  color: string // Tailwind color class or hex
  glowColor: string
  borderClass: string
  bgClass: string
  textClass: string
  badgeClass: string
  descriptionFa: string
}

export const COURSE_LAYERS: Record<CourseLayer, LayerConfig> = {
  coding: {
    id: 'coding',
    titleFa: 'لایه کدنویسی',
    titleEn: 'Coding Layer',
    color: '#f59e0b', // Amber-500
    glowColor: 'rgba(245, 158, 11, 0.35)',
    borderClass: 'border-amber-500/40 hover:border-amber-400',
    bgClass: 'bg-amber-500/10',
    textClass: 'text-amber-400',
    badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    descriptionFa: 'زیربنای زبان، رانتایم، پرفرمنس و تایپ‌پروگرامینگ عمیق',
  },
  'code-architecture': {
    id: 'code-architecture',
    titleFa: 'معماری کد',
    titleEn: 'Code Architecture Layer',
    color: '#818cf8', // Indigo-400
    glowColor: 'rgba(129, 140, 248, 0.35)',
    borderClass: 'border-indigo-500/40 hover:border-indigo-400',
    bgClass: 'bg-indigo-500/10',
    textClass: 'text-indigo-400',
    badgeClass: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    descriptionFa: 'طراحی نرم‌افزار، حل مسئله، تفکر معماری و Domain Driven Design',
  },
  'system-architecture': {
    id: 'system-architecture',
    titleFa: 'معماری سیستم',
    titleEn: 'System Architecture Layer',
    color: '#2dd4bf', // Teal-400
    glowColor: 'rgba(45, 212, 191, 0.35)',
    borderClass: 'border-teal-500/40 hover:border-teal-400',
    bgClass: 'bg-teal-500/10',
    textClass: 'text-teal-400',
    badgeClass: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
    descriptionFa: 'سیستم‌های کلان، آبزروبیلیتی، تاب‌آوری، دیتابیس‌های چندوجهی و میکروسرویس',
  },
}

export interface RoadmapNode {
  id: string
  titleFa: string
  subtitleEn: string
  layer: CourseLayer
  isEntryPoint: boolean
  entryPointBadgeFa?: string
  audiences: AudienceRole[]
  audienceLabelsFa: string[]
  levelFa: string
  durationFa: string
  shortDescFa: string
  tooltipDescFa: string
  targetAudienceFa: string
  pathSlug: string
  gridPos: {
    column: number
    row: number
  }
}

export interface RoadmapEdge {
  from: string
  to: string
  labelFa?: string
  trackType: 'primary' | 'secondary' | 'system'
  color: string
}

export const ROADMAP_NODES: RoadmapNode[] = [
  {
    id: 'core-js-ts',
    titleFa: 'جاوا‌اسکریپت و تایپ‌اسکریپت عمیق (CoreJSTS)',
    subtitleEn: 'Deep JS Engine & TS Foundations',
    layer: 'coding',
    isEntryPoint: true,
    entryPointBadgeFa: 'نقطه شروع عمومی',
    audiences: ['frontend', 'backend', 'everyone'],
    audienceLabelsFa: ['فرانت‌اند', 'بک‌اند', 'عمومی'],
    levelFa: 'مقدماتی تا متوسط',
    durationFa: '۲۰ ساعت',
    shortDescFa: 'دید زیرپوستی به جاوااسکریپت، کارکرد Event Loop، Execution Context و شالوده تایپ‌اسکریپت.',
    tooltipDescFa: 'دید زیرپوستی به کارکرد موتور JavaScript، شناخت دام‌های زبان، Event Loop و نحوه استفاده صحیح از TypeScript.',
    targetAudienceFa: 'مناسب برای توسعه‌دهندگان فرانت‌اند و بک‌اند؛ چه JS/TS بلد باشند چه بخواهند عمیق یاد بگیرند.',
    pathSlug: 'core-js-ts',
    gridPos: { column: 1, row: 1 },
  },
  {
    id: 'advanced-js-ts',
    titleFa: 'جاوا‌اسکریپت و تایپ‌اسکریپت پیشرفته',
    subtitleEn: 'Scalable TS & Software Design',
    layer: 'coding',
    isEntryPoint: false,
    audiences: ['frontend', 'backend'],
    audienceLabelsFa: ['فرانت‌اند', 'بک‌اند'],
    levelFa: 'متوسط تا پیشرفته',
    durationFa: '۱۶ ساعت',
    shortDescFa: 'تایپ‌پروگرامینگ پیشرفته، نوشتن کدهای ماژولار و اسکیل کردن کدبیس‌های بزرگ.',
    tooltipDescFa: 'طراحی کدبیس‌های قابل اسکیل با اضافه شدن ویژگی‌ها در پروژه‌های واقعی و بزرگ، همراه با تایپ‌پروگرامینگ حرفه‌ای.',
    targetAudienceFa: 'مناسب برای کسانی که می‌خواهند کدهای تمیز، قابل نگهداری (Maintainable) و تایپ‌سیف در مقیاس بالا بنویسند.',
    pathSlug: 'advanced-js-ts',
    gridPos: { column: 2, row: 1 },
  },
  {
    id: 'functional-ts',
    titleFa: 'برنامه‌نویسی تابعی با تایپ‌اسکریپت',
    subtitleEn: 'Functional Programming & Effect TS',
    layer: 'coding',
    isEntryPoint: false,
    audiences: ['frontend', 'backend'],
    audienceLabelsFa: ['فرانت‌اند', 'بک‌اند', 'ارشد'],
    levelFa: 'پیشرفته (Senior)',
    durationFa: '۱۲ ساعت',
    shortDescFa: 'پارادایم برنامه‌نویسی تابعی و استفاده حرفه‌ای از Effect TS در پروژه‌های پیچیده.',
    tooltipDescFa: 'یادگیری تفکر Declarative به جای Imperative برای پیاده‌سازی منطق‌های پیچیده، برنامه‌نویسی Functional و کاهش باگ‌ها.',
    targetAudienceFa: 'مناسب برای توسعه‌دهندگان ارشد (Senior) که می‌خواهند سیستم‌های بزرگ با پایداری حداکثری خلق کنند.',
    pathSlug: 'functional-ts',
    gridPos: { column: 3, row: 1 },
  },
  {
    id: 'backend-nodejs',
    titleFa: 'نود‌اسکریپت/Node.js تخصصی',
    subtitleEn: 'Node.js Runtime & Architecture Mastery',
    layer: 'coding',
    isEntryPoint: false,
    audiences: ['backend', 'architect'],
    audienceLabelsFa: ['بک‌اند', 'معمار سیستم'],
    levelFa: 'پیشرفته',
    durationFa: '۱۸ ساعت',
    shortDescFa: 'درک عمیق پلتفرم و رانتایم Node.js، مدیریت I/O و ساخت سیستم‌های تخصصی بک‌اند.',
    tooltipDescFa: 'اعطای دید مهندسی عمیق به رانتایم و پلتفرم Node.js و نحوه استفاده اصولی در پروداکشن از استارتاپ تا سازمان.',
    targetAudienceFa: 'مناسب برای برنامه‌نویسان بک‌اند؛ تمرکز بر درک عمیق رانتایم به جای صرفاً فریم‌ورک‌ها.',
    pathSlug: 'backend-nodejs',
    gridPos: { column: 2, row: 2 },
  },
  {
    id: 'art-of-coding',
    titleFa: 'هنر کدنویسی (Clean Code & Architecture)',
    subtitleEn: 'Domain-Driven Design & Code Mastery',
    layer: 'code-architecture',
    isEntryPoint: true,
    entryPointBadgeFa: 'نقطه شروع معماری کد',
    audiences: ['frontend', 'backend', 'architect'],
    audienceLabelsFa: ['فرانت‌اند', 'بک‌اند', 'تک‌لید / Senior'],
    levelFa: 'پیشرفته (Senior)',
    durationFa: '۱۶ ساعت',
    shortDescFa: 'ارتقای تفکر مهندسی، معماری پروژه، Domain-Driven Design و حل مسئله در سطح معمار کد.',
    tooltipDescFa: 'آموزش Domain Driven Design، دگرگون کردن تفکر معماری کد، ساختار لایه‌بندی و اصول Clean Architecture.',
    targetAudienceFa: 'بسیار مفید برای توسعه‌دهندگان ارشد (Senior)، تک‌لیدها، معماران نرم‌افزار و CTOها.',
    pathSlug: 'art-of-coding',
    gridPos: { column: 3, row: 2 },
  },
  {
    id: 'system-design-1',
    titleFa: 'سیستم دیزاین ۱ (آبزروبیلیتی/پرفرمنس)',
    subtitleEn: 'Monolith & Async I/O Foundations',
    layer: 'system-architecture',
    isEntryPoint: true,
    entryPointBadgeFa: 'نقطه شروع سیستم دیزاین',
    audiences: ['backend', 'architect'],
    audienceLabelsFa: ['بک‌اند', 'مدیر فنی'],
    levelFa: 'مقدماتی تا متوسط',
    durationFa: '۱۵ ساعت',
    shortDescFa: 'مفاهیم پایه سیستم دیزاین، ماژولار مونولیت کلود‌نیتیو، آبزروبیلیتی و پرفرمنس غیرهمزمان.',
    tooltipDescFa: 'پیاده‌سازی Modular Monolith کلود‌نیتیو، رعایت Observability کامل، مفاهیم Performance و Non-blocking I/O و Caching.',
    targetAudienceFa: 'مناسب برای توسعه‌دهندگان بک‌اند و مدیران فنی که می‌خواهند زیربنای سیستم دیزاین را عمیق یاد بگیرند.',
    pathSlug: 'system-design-1',
    gridPos: { column: 2, row: 3 },
  },
  {
    id: 'system-design-2',
    titleFa: 'سیستم دیزاین ۲ (تاب‌آوری/دسترس‌پذیری)',
    subtitleEn: 'Resilience & Queue Architecture',
    layer: 'system-architecture',
    isEntryPoint: false,
    audiences: ['backend', 'architect'],
    audienceLabelsFa: ['بک‌اند', 'معمار سیستم'],
    levelFa: 'متوسط تا پیشرفته',
    durationFa: '۱۲ ساعت',
    shortDescFa: 'الگوهای Circuit Breaker، پردازش غیرهمزمان، صف‌ها (RabbitMQ/Kafka/Nats) و Event-Driven.',
    tooltipDescFa: 'آموزش ملاحظات Resiliency، Availability و High Availability هم در لایه فرآیند و هم در لایه دیتابیس.',
    targetAudienceFa: 'مناسب برای برنامه‌نویسانی که می‌خواهند سرویس‌های مقاوم در برابر طوفان بار و ترافیک بسازند.',
    pathSlug: 'system-design-2',
    gridPos: { column: 3, row: 3 },
  },
  {
    id: 'system-design-3',
    titleFa: 'سیستم دیزاین ۳ (معماری‌های داده)',
    subtitleEn: 'Polyglot DBs & Data-Intensive Apps',
    layer: 'system-architecture',
    isEntryPoint: false,
    audiences: ['backend', 'architect'],
    audienceLabelsFa: ['بک‌اند', 'معمار سیستم'],
    levelFa: 'پیشرفته',
    durationFa: '۱۲ ساعت',
    shortDescFa: 'معماری چند دیتابیسی (Polyglot)، تکنیک‌های High Availability، Replication و Sharding.',
    tooltipDescFa: 'ویژه سیستم‌های بزرگ با دیتابیس‌های چندوجهی (Polyglot)، همگام‌سازی داده (Data Sync) و الگوهای Data-Intensive.',
    targetAudienceFa: 'مناسب برای معماران داده و برنامه‌نویسان بک‌اند در پروژه‌های مقیاس بالا.',
    pathSlug: 'system-design-3',
    gridPos: { column: 4, row: 3 },
  },
  {
    id: 'system-design-4',
    titleFa: 'سیستم دیزاین ۴ (معماری میکروسرویس)',
    subtitleEn: 'Large Scale Systems & Microservices',
    layer: 'system-architecture',
    isEntryPoint: false,
    audiences: ['backend', 'architect'],
    audienceLabelsFa: ['بک‌اند', 'ارشد/معمار کلان'],
    levelFa: 'پیشرفته و فوق تخصصی',
    durationFa: '۱۲ ساعت',
    shortDescFa: 'مهاجرت به میکروسرویس، الگوی SAGA، ترنزکشن‌های توزیع شده و پروژه‌های مقیاس میلیونی.',
    tooltipDescFa: 'ویژه پروژه‌های سازمانی کلان؛ مهاجرت به Microservices، الگوی SAGA، Distributed Transactions و سیستم‌های توزیع‌شده.',
    targetAudienceFa: 'مناسب برای معماران کلان سیستم و تک‌لیدهایی که هدایت سیستم‌های میلیون‌کاربره را بر عهده دارند.',
    pathSlug: 'system-design-4',
    gridPos: { column: 4, row: 2 },
  },
]

export const ROADMAP_EDGES: RoadmapEdge[] = [
  // Coding Track
  { from: 'core-js-ts', to: 'advanced-js-ts', trackType: 'primary', color: '#f59e0b' },
  { from: 'advanced-js-ts', to: 'functional-ts', trackType: 'primary', color: '#f59e0b' },
  { from: 'core-js-ts', to: 'backend-nodejs', trackType: 'primary', color: '#f59e0b' },
  
  // Transition to Code Architecture
  { from: 'advanced-js-ts', to: 'art-of-coding', trackType: 'secondary', color: '#818cf8', labelFa: 'ورود به معماری' },
  { from: 'backend-nodejs', to: 'art-of-coding', trackType: 'secondary', color: '#818cf8', labelFa: 'دید معماری' },

  // Transition to System Design
  { from: 'backend-nodejs', to: 'system-design-1', trackType: 'system', color: '#2dd4bf', labelFa: 'تخصص بک‌اند' },
  { from: 'art-of-coding', to: 'system-design-1', trackType: 'system', color: '#2dd4bf', labelFa: 'تفکر سیستمی' },

  // System Design Chain
  { from: 'system-design-1', to: 'system-design-2', trackType: 'system', color: '#2dd4bf' },
  { from: 'system-design-2', to: 'system-design-3', trackType: 'system', color: '#2dd4bf' },
  { from: 'system-design-3', to: 'system-design-4', trackType: 'system', color: '#2dd4bf' },
]
