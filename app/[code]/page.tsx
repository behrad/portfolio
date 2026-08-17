import type { Metadata } from "next"
import { getAllShortCodes, getShortUrl } from "@/data/short-urls"
import ShortUrlClient from "./client"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>
}): Promise<Metadata> {
  const { code } = await params
  const config = getShortUrl(code)

  if (!config) {
    return {
      title: "لینک یافت نشد | بهراد زاری",
      robots: { index: false, follow: false },
    }
  }

  return {
    title: config.title ? `${config.title} | در حال انتقال...` : "در حال انتقال...",
    description: config.description || "در حال انتقال به صفحه مقصد در وب‌سایت بهراد زاری",
    robots: {
      index: false,
      follow: false,
    },
  }
}

export function generateStaticParams() {
  return getAllShortCodes().map((code) => ({ code }))
}

export default async function ShortUrlPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params
  const config = getShortUrl(code)

  return (
    <>
      {config?.target && (
        <head>
          <meta httpEquiv="refresh" content={`0;url=${config.target}`} />
        </head>
      )}
      <ShortUrlClient config={config} code={code} />
    </>
  )
}
