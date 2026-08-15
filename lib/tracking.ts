export interface TrackingData {
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_term: string
  utm_content: string
  referer: string
}

const STORAGE_KEY = "marketing_attribution"

function getCookie(name: string): string {
  if (typeof document === "undefined") return ""
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? decodeURIComponent(match[2]) : ""
}

function setCookie(name: string, value: string, days = 30) {
  if (typeof document === "undefined") return
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

/**
 * Initializes and captures UTM parameters and referrer immediately on page load.
 */
export function initTracking(): TrackingData {
  if (typeof window === "undefined") {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
      referer: "",
    }
  }

  try {
    const urlParams = new URLSearchParams(window.location.search)

    // Check multiple parameter variations (case-insensitive)
    const param = (key: string): string => {
      return (
        urlParams.get(key) ||
        urlParams.get(key.toLowerCase()) ||
        urlParams.get(key.toUpperCase()) ||
        ""
      )
    }

    const currentUtmSource = param("utm_source") || param("source") || param("ref")
    const currentUtmMedium = param("utm_medium") || param("medium")
    const currentUtmCampaign = param("utm_campaign") || param("campaign")
    const currentUtmTerm = param("utm_term") || param("term")
    const currentUtmContent = param("utm_content") || param("content")
    const currentReferer = typeof document !== "undefined" ? document.referrer : ""

    // Read existing stored attribution
    let stored: Partial<TrackingData> = {}
    try {
      const rawSession = sessionStorage.getItem(STORAGE_KEY)
      const rawLocal = localStorage.getItem(STORAGE_KEY)
      const rawCookie = getCookie(STORAGE_KEY)
      const raw = rawSession || rawLocal || rawCookie
      if (raw) {
        stored = JSON.parse(raw)
      }
    } catch {
      // ignore
    }

    // Determine final values (URL param overrides stored, otherwise keep stored)
    const utm_source = currentUtmSource || stored.utm_source || ""
    const utm_medium = currentUtmMedium || stored.utm_medium || ""
    const utm_campaign = currentUtmCampaign || stored.utm_campaign || ""
    const utm_term = currentUtmTerm || stored.utm_term || ""
    const utm_content = currentUtmContent || stored.utm_content || ""
    const referer = (currentReferer && !currentReferer.includes(window.location.hostname))
      ? currentReferer
      : (stored.referer || currentReferer || "")

    const data: TrackingData = {
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      referer,
    }

    // Persist
    const serialized = JSON.stringify(data)
    try {
      sessionStorage.setItem(STORAGE_KEY, serialized)
      localStorage.setItem(STORAGE_KEY, serialized)
      setCookie(STORAGE_KEY, serialized, 30)
    } catch {
      // ignore
    }

    return data
  } catch (err) {
    console.error("Error initializing tracking data:", err)
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
      referer: typeof document !== "undefined" ? document.referrer : "",
    }
  }
}

/**
 * Returns the current or stored tracking data.
 */
export function getTrackingData(): TrackingData {
  return initTracking()
}
