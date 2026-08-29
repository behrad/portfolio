#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import readline from "node:readline/promises"
import { stdin as input, stdout as output } from "node:process"

const SHORT_URLS_FILE = path.resolve(process.cwd(), "data/short-urls.ts")

const RESERVED_SLUGS = new Set([
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

function parseArgs() {
  const args = process.argv.slice(2)
  const params = {}

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === "--help" || arg === "-h") {
      printHelp()
      process.exit(0)
    }

    if (arg.startsWith("--")) {
      const key = arg.slice(2)
      const next = args[i + 1]
      if (next && !next.startsWith("--")) {
        params[key] = next
        i++
      } else {
        params[key] = true
      }
    } else if (arg.startsWith("-")) {
      const key = arg.slice(1)
      const next = args[i + 1]
      if (next && !next.startsWith("-")) {
        params[key] = next
        i++
      } else {
        params[key] = true
      }
    }
  }

  return {
    code: params.code || params.c,
    target: params.target || params.t || params["base-url"] || params.url,
    utmSource: params["utm-source"] || params.source || params.s,
    utmMedium: params["utm-medium"] || params.medium || params.m || params.channel || params["utm-channel"],
    utmCampaign: params["utm-campaign"] || params.campaign || params.cmp,
    utmContent: params["utm-content"] || params.content,
    utmTerm: params["utm-term"] || params.term,
    hash: params.hash || params.hashtag || params.anchor || params.tag,
    title: params.title,
    description: params.description || params.desc,
  }
}

function printHelp() {
  console.log(`
Usage: npm run short-link [options]

Options:
  -c, --code <slug>          Short code / slug (e.g. dtw, ag-tg)
  -t, --target <url|path>    Base destination URL or path (e.g. /courses/ai-assisted-software-engineering)
  -s, --source <name>        UTM source (e.g. telegram, linkedin, instagram)
  -m, --medium <name>        UTM medium/channel (e.g. channel, post, video_cta)
  --campaign <name>          UTM campaign (e.g. DTW, mindfulsoft)
  --content <name>           UTM content (optional)
  --term <name>              UTM term (optional)
  --hash <tag>               Anchor / hashtag to jump to (e.g. video, #video)
  --title <text>             Optional Persian or English title
  --description <text>       Optional description
  -h, --help                 Show this help message

Interactive Mode:
  Simply run without arguments:
  $ npm run short-link
`)
}

function buildTargetUrl({ target, utmSource, utmMedium, utmCampaign, utmContent, utmTerm, hash }) {
  let cleanTarget = (target || "").trim()
  if (!cleanTarget) {
    throw new Error("Target URL / path is required.")
  }

  // Handle hash from target or explicit hash argument
  let extractedHash = ""
  if (cleanTarget.includes("#")) {
    const hashIndex = cleanTarget.indexOf("#")
    extractedHash = cleanTarget.slice(hashIndex + 1)
    cleanTarget = cleanTarget.slice(0, hashIndex)
  }

  if (hash) {
    extractedHash = hash.replace(/^#/, "").trim()
  }

  // Parse path and existing query params
  const isAbsolute = cleanTarget.startsWith("http://") || cleanTarget.startsWith("https://")
  const dummyBase = "https://behradz.ir"
  const urlObj = new URL(cleanTarget, dummyBase)

  if (utmSource) urlObj.searchParams.set("utm_source", utmSource.trim())
  if (utmMedium) urlObj.searchParams.set("utm_medium", utmMedium.trim())
  if (utmCampaign) urlObj.searchParams.set("utm_campaign", utmCampaign.trim())
  if (utmContent) urlObj.searchParams.set("utm_content", utmContent.trim())
  if (utmTerm) urlObj.searchParams.set("utm_term", utmTerm.trim())

  let finalTarget = ""
  if (isAbsolute) {
    finalTarget = urlObj.origin + urlObj.pathname + (urlObj.search ? urlObj.search : "")
  } else {
    finalTarget = urlObj.pathname + (urlObj.search ? urlObj.search : "")
  }

  if (extractedHash) {
    finalTarget += `#${extractedHash}`
  }

  return finalTarget
}

async function promptMissingInputs(parsed) {
  const isInteractive = !parsed.code || !parsed.target
  if (!isInteractive && parsed.code && parsed.target) {
    return parsed
  }

  const rl = readline.createInterface({ input, output })

  console.log("\n🔗 Create a New Short Link\n")

  try {
    let code = parsed.code
    while (!code) {
      const ans = await rl.question("1. Short code / slug (e.g. dtw): ")
      code = ans.trim().toLowerCase()
      if (!code) {
        console.log("   ❌ Short code cannot be empty.")
      } else if (RESERVED_SLUGS.has(code)) {
        console.log(`   ❌ '${code}' is a reserved route in the app. Please choose another code.`)
        code = ""
      }
    }

    let target = parsed.target
    while (!target) {
      const ans = await rl.question(
        "2. Base destination URL/path (e.g. /courses/ai-assisted-software-engineering): "
      )
      target = ans.trim()
      if (!target) {
        console.log("   ❌ Target URL cannot be empty.")
      }
    }

    const utmSource =
      parsed.utmSource ||
      (await rl.question("3. UTM Source (e.g. telegram, linkedin) [optional]: "))

    const utmMedium =
      parsed.utmMedium ||
      (await rl.question("4. UTM Medium / Channel (e.g. channel, post) [optional]: "))

    const utmCampaign =
      parsed.utmCampaign ||
      (await rl.question("5. UTM Campaign (e.g. DTW) [optional]: "))

    const hash =
      parsed.hash ||
      (await rl.question("6. Hash / Anchor (e.g. video or #video) [optional]: "))

    const title =
      parsed.title ||
      (await rl.question("7. Link Title (in Persian or English) [optional]: "))

    const description =
      parsed.description ||
      (await rl.question("8. Description [optional]: "))

    return {
      code,
      target,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent: parsed.utmContent,
      utmTerm: parsed.utmTerm,
      hash,
      title,
      description,
    }
  } finally {
    rl.close()
  }
}

function updateShortUrlsFile(config) {
  if (!fs.existsSync(SHORT_URLS_FILE)) {
    throw new Error(`Cannot find file at ${SHORT_URLS_FILE}`)
  }

  const content = fs.readFileSync(SHORT_URLS_FILE, "utf-8")
  const targetHeader = "export const shortUrlsList: ShortUrlConfig[] = ["

  if (!content.includes(targetHeader)) {
    throw new Error(`Could not find 'export const shortUrlsList' in ${SHORT_URLS_FILE}`)
  }

  // Format entry
  const today = new Date().toISOString().split("T")[0]
  const entryObj = {
    code: config.code.trim().toLowerCase(),
    target: config.finalTarget,
    title: config.title?.trim() || `لینک کوتاه ${config.code}`,
    description: config.description?.trim() || `لینک کوتاه برای ${config.finalTarget}`,
    createdAt: today,
  }

  const entryString = `  {
    code: ${JSON.stringify(entryObj.code)},
    target: ${JSON.stringify(entryObj.target)},
    title: ${JSON.stringify(entryObj.title)},
    description: ${JSON.stringify(entryObj.description)},
    createdAt: ${JSON.stringify(entryObj.createdAt)},
  },`

  // Check if code already exists in file
  const codeRegex = new RegExp(`code:\\s*["']${entryObj.code}["']`, "i")
  let updatedContent = ""

  if (codeRegex.test(content)) {
    console.log(`⚠️  Code '${entryObj.code}' already exists in shortUrlsList. Prepending new definition at top.`)
  }

  updatedContent = content.replace(
    targetHeader,
    `${targetHeader}\n${entryString}`
  )

  fs.writeFileSync(SHORT_URLS_FILE, updatedContent, "utf-8")
  return entryObj
}

async function main() {
  try {
    const rawArgs = parseArgs()
    const inputs = await promptMissingInputs(rawArgs)

    if (RESERVED_SLUGS.has(inputs.code.trim().toLowerCase())) {
      console.error(`❌ Error: '${inputs.code}' is a reserved route.`)
      process.exit(1)
    }

    const finalTarget = buildTargetUrl(inputs)
    inputs.finalTarget = finalTarget

    const entry = updateShortUrlsFile(inputs)

    console.log("\n✅ Short URL successfully created and saved to data/short-urls.ts!")
    console.log("--------------------------------------------------")
    console.log(`🔹 Code:            ${entry.code}`)
    console.log(`🔹 Short Link:      https://behradz.ir/${entry.code}`)
    console.log(`🔹 Alt Short Link:  https://behradz.ir/s/${entry.code}`)
    console.log(`🔹 Target URL:      https://behradz.ir${entry.target.startsWith("/") ? "" : "/"}${entry.target}`)
    console.log(`🔹 Title:           ${entry.title}`)
    console.log(`🔹 Description:     ${entry.description}`)
    console.log("--------------------------------------------------")
    console.log("👉 You can now run 'npm run build' and 'npm run deploy' to deploy your new link.\n")
  } catch (err) {
    console.error(`\n❌ Error: ${err.message}\n`)
    process.exit(1)
  }
}

main()
