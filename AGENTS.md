# Always Reply in English

## Objective
Ensure the agent always communicates in English, even when prompted in Persian (or any other language).

## Rule Instructions
- You MUST always respond in English, regardless of the language used by the user in their prompt.
- Even if the user writes in Persian, do not translate your thoughts or reply in Persian.
- The ONLY exception is if the user explicitly (with words like "Explicitly", "مشخصاً", "به فارسی جواب بده", etc.) requests you to reply in Persian for a specific turn. In all other cases, default to English.

# Skills

## Lock-managed skills
`skills-lock.json` records source repo, path, and hash for the marketing skills. Content is
vendored once under `.agents/skills/<name>/`; `.claude/skills/<name>` is a symlink to it. Both
the content and the symlinks are tracked.

## The `impeccable` pack (not lock-managed)
Installed out-of-band, currently version 4.1.1. The installer writes three runtime-specific
variants of the same pack:

| directory | runtime | notes |
| --- | --- | --- |
| `.agents/skills/impeccable/` | agents runtime | `$impeccable` syntax, extra `agents/` subdir |
| `.claude/skills/impeccable/` | Claude Code | `/impeccable` syntax, declares `allowed-tools` |
| `.github/skills/impeccable/` | GitHub Copilot | `/impeccable` syntax |

Each variant hard-codes its own directory in every script path inside its `SKILL.md` and
references, so the three are **not** interchangeable - do not symlink or merge them.

All three are gitignored: they are generated, ~3.4 MB each, and rewritten wholesale on every
pack update. Re-run the impeccable installer to restore them after a fresh clone.

# Course & Webinar Cover Standards

All course and webinar cover images in `public/` MUST adhere to the following rules:
- **Aspect Ratio**: Standard **3:2** aspect ratio (e.g., `2388 x 1592` or `1536 x 1024`).
- **Safe Margins**: Content, logos, and typography must have safe margins (at least 8-10% padding from borders) to ensure nothing is clipped when rendered via `object-cover` across responsive catalog grid cards or covered by overlaid badges/scrims.
- **Originals**: Save original raw/wide assets in `.cover-originals/` and place standardized 3:2 versions in `public/`.
- **Hero Backgrounds**: For webinars and workshops (`isWebinar || isWorkshop`), do not render blurred background images behind the hero section; use the clean solid blue gradient to ensure high text contrast and legibility.

# Behrad Profile & Communication Standards (Mandatory)

Always strictly adhere to these identity and copywriting rules across all emails, workflows, and communications:
1. **Full Name**: Always **بهراد زاری** (Behrad Zari) — NEVER «بهراد زارع».
2. **Telegram Handle**: Always **@bzari** (`https://t.me/bzari`) — NEVER @behradz.
3. **Persian Email Headings & Titles**:
   - NEVER add English subtitles or Latin taglines beneath Persian headings (e.g., do not add things like `Learn How to Learn • Live Interactive Meetup`). Keep subheadings in natural Persian.
   - Use phrasing: «لینک حضور در دورهمی «[نام دوره/رویداد]»» for event invitations.
   - For preparation prompts, always use: «چند دقیقه با خودتون فکر کنید» (never «یک دقیقه»).
   - Focus phrasing: «در بهبود یادگیری» (not «در یادگیری عمیق»).
   - Strictly avoid generic AI filler, robotic phrasing, and preserve standard Persian typography with half-spaces (ZWNJ).

