# Project Context

Persian-language (RTL) Next.js App Router portfolio / course site for بهراد زاری.

## Courses are dynamic, data-driven

All course content lives in **`data/courses.ts`** (`coursesData`, keyed by slug).
There is no per-course component — every course page is rendered by the same
dynamic route.

- **`app/courses/[slug]/page.tsx`** — server component. Looks up
  `coursesData[slug]`, builds metadata, `generateStaticParams()` pre-renders one
  static page per course key, then renders `CoursePageClient`.
- **`app/courses/[slug]/client.tsx`** — the big client component that renders the
  whole course page UI from the `course` prop. The `Course` type/interface is
  defined inline at the top of this file (~line 55+). To add a new course field,
  add it to `data/courses.ts` **and** to the interface in `client.tsx`.

Current course keys: `system-design-1..4`, `system-design-interview` (a free
`type: "webinar"`), `art-of-coding`, `backend-nodejs`.

## Where the "cart" (registration card) lives

The sticky **registration cart / pricing card** is in
**`app/courses/[slug]/client.tsx`**, inside the `lg:col-span-1` sidebar
(`<div className="sticky top-4 ...">` → `<Card>`). It shows price/discount,
the ثبت‌نام button, and share buttons.

- The content/sidebar split is a `grid` near the top of the main layout
  (`lg:grid-cols-3`, content is `lg:col-span-2`).
- The course **registration/reserve forms** (`RegistrationForm`, `ReserveForm`,
  team-request form) are separate components defined earlier in the same
  `client.tsx` file and toggled via `showRegistrationForm` / `showReserveForm`
  state.

## `descriptionVideoId` & `videoChapters` behavior (Aparat embed)

If a course in `data/courses.ts` has **`descriptionVideoId`** set (e.g.
`system-design-interview: "iuxsk3v"`), the course page changes:

1. Under "شرح وبینار/دوره", an Aparat `<iframe>` embed is shown instead of
   `descriptionImage` (embed URL: `https://www.aparat.com/video/video/embed/videohash/<id>/vt/frame`).
2. **Interactive Chapters**: If `videoChapters` array is also defined on the course object,
   the page mounts `<VideoChaptersPlayer>` instead of the default static iframe. It provides
   an interactive table of contents, timestamp seeking (`startTime`), next/prev controls,
   and key takeaway badges for each chapter. If `videoChapters` is not provided, it falls back
   to the standard single Aparat iframe cleanly.
3. The sticky registration cart is **hidden** and the layout becomes full-width
   (`lg:grid-cols-1`).
4. The bottom CTA section ("قول می‌دم") is **hidden**.
5. The main CTA button label becomes **"مشاهده آنلاین"** (instead of "ثبت‌نام...").

The course **list** page **`app/page.tsx`** also reads this: it maps each course
to `hasVideo: !!course.descriptionVideoId`, and the card button shows
**"مشاهده آنلاین"** when true (otherwise شرکت در وبینار / مشاهده وبینار / جزییات دوره).

## Other notable files

- `app/page.tsx` — home / course list grid.
- `app/courses/page.tsx`, `app/about/page.tsx` — other routes.
- `components/` — `navigation.tsx`, `footer.tsx`, `discount-alert.tsx`,
  `theme-provider.tsx`, plus `components/ui/` (shadcn primitives).
- Static output goes to `out/` (and `.next/`); these are build artifacts — edit
  source under `app/`, `data/`, `components/`, not `out/`.

## Conventions

- UI is RTL Persian. Most user-facing strings are inline ternaries keyed off
  `isWebinar` (`course.type === "webinar"`) to switch وبینار vs دوره wording.
- Type-check with `npx tsc --noEmit -p tsconfig.json` before considering a change done.
