# Webinar Video Chapters Rule

When the user asks to add or update chapters/timestamps for a webinar or course video in `data/courses.ts`:

1. Locate the course entry by `slug` in `data/courses.ts`.
2. Add or update the `videoChapters` array using the `VideoChapter` interface:
   ```typescript
   videoChapters: [
     {
       id: 1, // 1-indexed sequential number
       title: "عنوان سرفصل به فارسی",
       subtitle: "English subtitle / Topic",
       startTime: 310, // Start time in seconds (e.g. 5:10 -> 5*60 + 10 = 310)
       formattedTime: "۰۵:۱۰", // Persian or English MM:SS format
       duration: "۰۷:۲۰", // Optional approximate duration
       summary: "خلاصه مباحث مطرح شده در این بازه زمانی...",
       keyTakeaways: [
         "نکته کلیدی اول",
         "نکته کلیدی دوم",
       ],
     },
     // ...
   ]
   ```
3. If the user provides minutes and seconds (e.g. `05:10` or `دقیقه ۵ و ثانیه ۱۰`), automatically calculate `startTime` in seconds: `minutes * 60 + seconds`.
4. Ensure `descriptionVideoId` is set to the corresponding Aparat video ID.
5. If `videoChapters` is absent or empty, the course page automatically defaults to the standard static video player without chapters.
