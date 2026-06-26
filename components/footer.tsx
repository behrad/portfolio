import Link from "next/link"

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-[3px] bg-primary" aria-hidden="true" />
            <span className="mono ltr">© {new Date().getFullYear()}</span> بهراد زاری. تمامی حقوق محفوظ است.
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link
              href="https://t.me/mindfulsoft"
              target="_blank"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              کانال تلگرام
            </Link>
            <Link
              href="https://ble.ir/join/A6HiDuie9S"
              target="_blank"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              گروه بله
            </Link>
            <Link
              href="https://www.linkedin.com/in/behradz/"
              target="_blank"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              لینکدین من
            </Link>
            <Link
              href="mailto:behradz@gmail.com"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ایمیل من
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
