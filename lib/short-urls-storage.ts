import { shortUrlsList, type ShortUrlConfig } from "@/data/short-urls"

export const SHORT_URLS_STORAGE_KEY = "behrad_custom_short_urls"

/**
 * Loads short URLs from browser localStorage (falling back to built-in shortUrlsList).
 */
export function getStoredShortUrls(): ShortUrlConfig[] {
  if (typeof window === "undefined") {
    return shortUrlsList
  }

  try {
    const raw = localStorage.getItem(SHORT_URLS_STORAGE_KEY)
    if (!raw) {
      return shortUrlsList
    }
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed
    }
  } catch (err) {
    console.error("Failed to parse custom short URLs from localStorage:", err)
  }

  return shortUrlsList
}

/**
 * Saves short URLs list to localStorage.
 */
export function persistShortUrls(links: ShortUrlConfig[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(SHORT_URLS_STORAGE_KEY, JSON.stringify(links))
  } catch (err) {
    console.error("Failed to persist short URLs to localStorage:", err)
  }
}

/**
 * Resolves a short code from client-side storage or default config.
 */
export function resolveClientShortUrl(code: string): ShortUrlConfig | undefined {
  const normalized = (code || "").trim().toLowerCase()
  const allLinks = getStoredShortUrls()
  return allLinks.find((item) => item.code.trim().toLowerCase() === normalized)
}

/**
 * Generates formatted TypeScript code content for data/short-urls.ts
 */
export function exportToTypeScriptConfig(links: ShortUrlConfig[]): string {
  const formattedItems = links
    .map((item) => {
      const code = item.code.trim()
      const target = item.target.trim()
      const title = item.title ? item.title.trim() : ""
      const description = item.description ? item.description.trim() : ""
      const createdAt = item.createdAt || new Date().toISOString().split("T")[0]

      return `  {
    code: "${code}",
    target: "${target}",
    title: "${title}",
    description: "${description}",
    createdAt: "${createdAt}",
  },`
    })
    .join("\n")

  return `export interface ShortUrlConfig {
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
${formattedItems}
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
      return \`\${targetUrl.pathname}\${targetUrl.search}\${targetUrl.hash}\`
    }
  } catch {
    const delimiter = target.includes("?") ? "&" : "?"
    const cleanSearch = incomingSearch.startsWith("?") ? incomingSearch.slice(1) : incomingSearch
    return \`\${target}\${delimiter}\${cleanSearch}\`
  }
}
`
}
