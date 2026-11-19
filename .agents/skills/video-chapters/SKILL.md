---
name: video-chapters
description: When the user wants to generate, add, or update video chapters, captions, or timestamped outlines for webinar and course videos in data/courses.ts. Use whenever the user provides minutes/timestamps and topics or asks for video breakdown, captions, or chapter navigation.
metadata:
  version: 1.0.0
---

# Video Chapters & Captioning Skill

This skill handles breaking down webinar and course videos into interactive, structured chapters (`VideoChapter[]`) displayed on the site via `VideoChaptersPlayer`.

## Target Location & Schema

Target file: `data/courses.ts`

Each chapter follows the `VideoChapter` interface:

```typescript
export interface VideoChapter {
  id: number // 1-indexed sequential integer
  title: string // Clear Persian title
  subtitle?: string // Professional English subtitle / topic
  startTime: number // Start time in seconds (e.g. 5:10 -> 5*60 + 10 = 310)
  formattedTime?: string // Formatted time string in Persian numbers, e.g. "۰۵:۱۰" or "۰۱:۰۳:۰۰"
  duration?: string // Chapter duration string in Persian numbers, e.g. "۰۵:۰۰"
  summary?: string // 1-2 sentences summarizing the discussion in this section
  keyTakeaways?: string[] // 2-3 bullet points with practical takeaways
  transcriptSnippet?: string // Optional quote or snippet
}
```

## Step-by-Step Workflow

1. **Locate Course Entry**: Find the course or webinar entry in `data/courses.ts` using its `slug`.
2. **Parse Timestamps**:
   - Convert given start times (e.g. `06:00` or `1:03:00`) into total seconds:
     - `HH:MM:SS` -> `HH * 3600 + MM * 60 + SS`
     - `MM:SS` -> `MM * 60 + SS`
   - Calculate duration between current chapter and the next chapter start time.
   - Format `formattedTime` and `duration` with Persian digits (e.g. `۰`, `۱`, `۲`, ...).
3. **Generate Rich Content**:
   - `title`: Professional, descriptive Persian title.
   - `subtitle`: Clean English topic title.
   - `summary`: Engaging, concise summary of the topics discussed.
   - `keyTakeaways`: 2-3 high-value bullet points.
4. **Update `data/courses.ts`**:
   - Insert `videoChapters: [...]` in the course object.
   - Ensure `descriptionVideoId` is present (Aparat ID).
5. **Verify**: Ensure TypeScript compiles without errors.
