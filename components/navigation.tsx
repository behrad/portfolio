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
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              دوره‌ها
            </Link>
            <Link
              href="/about"
              className="font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              درباره من
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
