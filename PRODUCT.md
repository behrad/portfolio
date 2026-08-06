# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Iranian software developers, backend engineers, and system architects seeking high-yield technical depth in System Design, Node.js, and modern software engineering practices.

## Product Purpose

Provide a high-trust, dynamic RTL platform for software engineering education (System Design courses 1-4, webinars, Art of Coding, Backend Node.js) that combines course discovery, technical video previews, and seamless enrollment.

## Positioning

A technical, developer-trusted Iranian platform for backend & system design mastery led by بهراد زاری, delivering deep architectural insight rather than generic beginner tutorials.

## Operating Context

- Responsive, dark-first RTL web interface with Persian typography (`Vazirmatn`).
- Dynamic course routing (`app/courses/[slug]`) driven by structured data (`data/courses.ts`).
- Aparat video embeds (`descriptionVideoId`) for free webinars and course previews.
- Sticky registration and reservation cards for enrollment conversions.

## Capabilities and Constraints

- **Capabilities**: Dynamic course catalog, course detail views, Aparat inline video preview player, sticky pricing & registration sidebar, discount alert banners, light/dark theme toggle, team/corporate training request flows.
- **Technical Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Radix UI primitives, Lucide icons.
- **Constraints**: 
  - Strict RTL layout (`dir="rtl"`, `lang="fa"`) using logical CSS properties (`margin-inline`, `padding-inline`).
  - Code snippets, terminal commands, version tags, and URLs must remain LTR (`direction: ltr`).
  - Dark-first aesthetic (`#0a0e14` base, `#2dd4bf` Teal accent).

## Brand Commitments

- **Name**: بهراد زاری (Behrad Zari) Portfolio & Course Platform.
- **Tone & Voice**: Authoritative, concise, technical, developer-first, minimal.
- **Visual Identity**: Minimal foundation with subtle glassmorphism accents, crisp typography (`Vazirmatn`, `Inter`, `JetBrains Mono`), dark background with Teal accent highlights.

## Evidence on Hand

- `data/courses.ts` — Real course data & metadata (`system-design-1..4`, `system-design-interview`, `art-of-coding`, `backend-nodejs`).
- `design-system.md` — Detailed RTL dark-mode design system specification.
- `CONTEXT.md` — Architectural overview and routing documentation.

## Product Principles

1. **Developer Trust First**: Prioritize clean code blocks, precise technical terminology, and proof of mastery over loud marketing copy.
2. **Minimal Foundation, Glass Accents**: Space and crisp typography form the layout; glassmorphism (`backdrop-filter: blur`) is reserved for high-value surfaces (Navigation bar, pricing card).
3. **RTL Native Precision**: Persian typography with zero letter-spacing on headings, natural RTL flow, while strictly keeping code & numbers in LTR.
4. **Seamless Conversion & Flow**: Sticky registration CTAs for active courses, direct Aparat online preview embeds for free webinars.

## Accessibility & Inclusion

- Contrast ratio ≥ 4.5:1 for body text against dark backgrounds.
- Explicit keyboard focus states (`:focus-visible`).
- Accessible interactive components powered by Radix UI primitives.
