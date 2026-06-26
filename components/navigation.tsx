import Link from "next/link"

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto px-4 py-3.5">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors duration-200">
            بهراد تک | مسیر رشد مهندسین نرم‌افزار
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="text-sm text-foreground/80 hover:text-primary transition-colors duration-200 font-medium">
              دوره‌ها
            </Link>
            <Link href="/about" className="text-sm text-foreground/80 hover:text-primary transition-colors duration-200 font-medium">
              درباره من
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
