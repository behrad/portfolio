import Link from "next/link"

export function Navigation() {
  return (
    <nav className="glass sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-bold text-foreground transition-colors"
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-[3px] bg-primary transition-transform duration-200 group-hover:scale-125"
            />
            <span className="text-base">بهراد تک</span>
            <span className="hidden text-sm font-normal text-muted-foreground sm:inline">
              مسیر رشد مهندسین نرم‌افزار
            </span>
          </Link>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
            <Link
              href="/#roadmap"
              className="font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              نقشه راه
            </Link>
            <Link
              href="/#courses-grid"
              className="font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              ویدیوها
            </Link>
            <Link
              href="https://t.me/mindfulsoft"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              کانال تلگرام
            </Link>
            <Link
              href="/coaching"
              className="inline-flex items-center gap-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <span>منتورینگ فنی</span>
              <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono leading-none text-muted-foreground border border-border/70">
                EN
              </span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <span>درباره من</span>
              <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono leading-none text-muted-foreground border border-border/70">
                EN
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
