# سیستم طراحی — هیبرید مینیمال + شیشه‌ای + دِو-تراست (راست‌به‌چپ)

> این سند یک مرجع کامل برای ایجنت است تا استایل سایت را پیاده‌سازی کند.
> زبان رابط: **فارسی**، جهت: **راست‌به‌چپ (RTL)**.
> سبک: مینیمال به‌عنوان پایه، شیشه (Glassmorphism) فقط به‌عنوان لهجه، با حس فنی و قابل‌اعتماد برای توسعه‌دهنده.
> حالت پیش‌فرض: **تیره (Dark-first)**، با پشتیبانی از حالت روشن.

---

## ۱. فلسفه‌ی طراحی

- **مینیمال پایه است:** فضای خالی زیاد، یک رنگ تأکید، تایپوگرافی تمیز، بدون شلوغی.
- **شیشه فقط لهجه است:** اثر شیشه‌ای (بلور) فقط روی **یک یا دو** المان کلیدی (نوار ناوبری، یک کارت). هرگز شیشه روی شیشه.
- **حس فنی و قابل‌اعتماد:** فونت مونواسپیس برای برچسب‌ها و کد، نشانه‌های اعتماد (نسخه، بلوک کد واقعی)، شبکه‌ی منظم، خطوط مویی.
- **بدون افکت اضافه:** بدون گرادیان پررنگ، نئون، یا سایه‌های نمایشی. عمق فقط با بلور ظریف و خطوط.

---

## ۲. بارگذاری فونت‌ها

در `<head>` قرار بگیرد:

```html
<!-- فارسی: Vazirmatn -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- انگلیسی (پیش‌فرض): Inter — جایگزین اختیاری برای تیتر: Poppins -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600&display=swap" rel="stylesheet">

<!-- کد: JetBrains Mono -->
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

نکته‌ی فونت انگلیسی:
- **Inter** = پیش‌فرض همه‌ی متن‌های لاتین و UI (خنثی، فنی، هم‌خانواده‌ی لاتین وزیرمتن).
- **Poppins** = اختیاری، فقط برای تیترهای بزرگ اگر حس گرم‌تر خواستید (گرد و دوستانه؛ برای حس فنی توصیه نمی‌شود).
- **JetBrains Mono** = فقط کد و برچسب‌های مونو.

---

## ۳. توکن‌های رنگ (CSS Variables)

پیش‌فرض تیره؛ حالت روشن با `[data-theme="light"]`.

```css
:root {
  /* سطوح — تیره */
  --bg-base:        #0a0e14;  /* پس‌زمینه‌ی صفحه */
  --bg-elevated:    #11161f;  /* کارت/سطح بالاتر */
  --bg-glass:       rgba(255, 255, 255, 0.05); /* پنل شیشه‌ای */

  /* متن */
  --text-primary:   #f8fafc;  /* عنوان‌ها و متن اصلی */
  --text-secondary: #94a3b8;  /* متن کمکی */
  --text-muted:     #64748b;  /* راهنما/کم‌رنگ */

  /* رنگ تأکید (Accent) — تیل */
  --accent:         #2dd4bf;
  --accent-hover:   #14b8a6;
  --accent-soft:    rgba(45, 212, 191, 0.08);  /* پس‌زمینه‌ی بَج */
  --accent-border:  rgba(45, 212, 191, 0.2);

  /* خطوط */
  --border:         rgba(255, 255, 255, 0.08); /* خط مویی پیش‌فرض */
  --border-strong:  rgba(255, 255, 255, 0.14); /* تأکید/هاور */

  /* وضعیت‌ها */
  --success:        #22c55e;
  --warning:        #eab308;
  --danger:         #ef4444;
}

[data-theme="light"] {
  --bg-base:        #f8fafc;
  --bg-elevated:    #ffffff;
  --bg-glass:       rgba(255, 255, 255, 0.55);

  --text-primary:   #0f172a;
  --text-secondary: #475569;
  --text-muted:     #94a3b8;

  --accent:         #0d9488;
  --accent-hover:   #0f766e;
  --accent-soft:    rgba(13, 148, 136, 0.08);
  --accent-border:  rgba(13, 148, 136, 0.25);

  --border:         rgba(15, 23, 42, 0.08);
  --border-strong:  rgba(15, 23, 42, 0.14);
}
```

قانون متن روی رنگ تأکید: متن روی پسِ‌تیل تیره باید `--bg-base` باشد، نه سفید خالص.

---

## ۴. تایپوگرافی

```css
:root {
  --font-fa:   'Vazirmatn', sans-serif;          /* فارسی */
  --font-en:   'Inter', 'Vazirmatn', sans-serif;  /* لاتین/UI */
  --font-mono: 'JetBrains Mono', monospace;       /* کد و برچسب فنی */

  /* مقیاس اندازه */
  --fs-display: 38px;  /* تیتر اصلی هیرو */
  --fs-h1:      28px;
  --fs-h2:      22px;
  --fs-h3:      18px;
  --fs-body:    16px;  /* متن اصلی */
  --fs-sm:      14px;
  --fs-xs:      12px;  /* برچسب/کپشن */

  /* وزن — فقط سه وزن استفاده شود */
  --fw-regular: 400;
  --fw-medium:  500;
  --fw-bold:    600;

  /* ارتفاع خط */
  --lh-tight: 1.1;   /* تیترها */
  --lh-body:  1.7;   /* متن فارسی — کمی بازتر برای خوانایی */
}

body {
  font-family: var(--font-fa);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  color: var(--text-primary);
  background: var(--bg-base);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 { font-weight: var(--fw-bold); line-height: var(--lh-tight); letter-spacing: -0.3px; }

/* فاصله‌ی حروف فارسی نباید منفی شود (به هم می‌چسبد) */
:lang(fa), [dir="rtl"] { letter-spacing: 0 !important; }
```

قواعد:
- متن فارسی: `letter-spacing: 0` (هرگز منفی).
- ارتفاع خط فارسی کمی بازتر (`1.7`) برای خوانایی بهتر.
- تیترها فقط با وزن ۶۰۰؛ از ۷۰۰ به بالا برای فارسی سنگین به‌نظر می‌رسد.

---

## ۵. فاصله‌گذاری و گردی گوشه

```css
:root {
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  40px;
  --space-2xl: 64px;

  --radius-sm:  8px;   /* دکمه، اینپوت */
  --radius-md:  12px;  /* کارت، پنل شیشه‌ای */
  --radius-lg:  16px;  /* بخش‌های بزرگ */
  --radius-pill: 20px; /* بَج */
}
```

---

## ۶. اثر شیشه‌ای (Glassmorphism)

فقط روی نوار ناوبری و حداکثر یک کارت کلیدی.

```css
.glass {
  background: var(--bg-glass);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}
```

قوانین شیشه:
- **هرگز شیشه روی شیشه** (دو لایه‌ی بلور روی هم).
- شیشه نیاز به پس‌زمینه‌ی متنوع دارد تا بلور دیده شود (گرادیان ملایم یا تصویر پشت آن).
- فضای خالی کافی دور هر المان شیشه‌ای.
- مقدار بلور: ناوبری `16px`، کارت `20px`.

---

## ۷. سایه‌ها (Elevation)

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.2);
  --shadow-md: 0 4px 24px rgba(0,0,0,0.12);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.18);
}
```

سایه فقط برای کارت‌های شناور؛ سطوح ساده فقط خط مویی.

---

## ۸. کامپوننت‌ها

تمام کامپوننت‌ها در یک کانتینر با `dir="rtl"` قرار می‌گیرند.

### نوار ناوبری (شیشه‌ای)
```html
<nav class="nav glass" dir="rtl">
  <div class="nav-brand"><span class="dot"></span> لومن</div>
  <div class="nav-links"><a>مستندات</a><a>قیمت‌گذاری</a><a>درباره</a></div>
  <button class="btn btn-primary mono">شروع</button>
</nav>
```
```css
.nav { display: flex; align-items: center; justify-content: space-between;
  padding: 10px 20px; gap: var(--space-lg); }
.nav-brand { display: flex; align-items: center; gap: 8px; font-weight: var(--fw-bold); }
.dot { width: 8px; height: 8px; border-radius: 2px; background: var(--accent); }
.nav-links { display: flex; gap: 20px; color: var(--text-secondary); font-size: var(--fs-sm); }
.nav-links a { cursor: pointer; }
.nav-links a:hover { color: var(--text-primary); }
```

### دکمه‌ها
```css
.btn { font-size: var(--fs-sm); padding: 11px 22px; border-radius: var(--radius-sm);
  font-weight: var(--fw-medium); cursor: pointer; transition: all .15s ease; border: none; }

.btn-primary { background: var(--accent); color: var(--bg-base); }
.btn-primary:hover { background: var(--accent-hover); }

.btn-secondary { background: transparent; color: var(--text-primary);
  border: 1px solid var(--border-strong); }
.btn-secondary:hover { border-color: var(--text-secondary); }

.btn.mono { font-family: var(--font-mono); }  /* برای دکمه‌های فنی مثل «npm i» */
```

### کارت
```css
.card { background: var(--bg-elevated); border: 1px solid var(--border);
  border-radius: var(--radius-md); padding: var(--space-lg); }
```

### بَج (نشانه‌ی نسخه/وضعیت)
```css
.badge { display: inline-flex; align-items: center; gap: 7px;
  font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--accent);
  background: var(--accent-soft); border: 1px solid var(--accent-border);
  padding: 5px 12px; border-radius: var(--radius-pill); }
.badge .live { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }
```

### بلوک کد (نشانه‌ی اعتماد) — همیشه LTR
```html
<div class="code-block">
  <div class="code-bar">
    <span class="tdot r"></span><span class="tdot y"></span><span class="tdot g"></span>
    <span class="code-file">example.ts</span>
  </div>
  <pre dir="ltr"><code>import { lumen } from 'lumen'</code></pre>
</div>
```
```css
.code-block { background: var(--bg-glass); backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px); border: 1px solid var(--border);
  border-radius: var(--radius-md); overflow: hidden; }
.code-bar { display: flex; align-items: center; gap: 7px; padding: 9px 14px;
  border-bottom: 1px solid var(--border); }
.tdot { width: 10px; height: 10px; border-radius: 50%; opacity: .7; }
.tdot.r { background: var(--danger); } .tdot.y { background: var(--warning); } .tdot.g { background: var(--success); }
.code-file { font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--text-muted); }
.code-block pre { padding: 14px 18px; font-family: var(--font-mono);
  font-size: 13px; line-height: 1.7; direction: ltr; text-align: left; overflow-x: auto; }
```

### اینپوت
```css
.input { width: 100%; height: 40px; padding: 0 14px; font-family: var(--font-fa);
  font-size: var(--fs-sm); color: var(--text-primary); background: var(--bg-elevated);
  border: 1px solid var(--border); border-radius: var(--radius-sm); text-align: right; }
.input::placeholder { color: var(--text-muted); }
.input:focus { outline: none; border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft); }
```

### لینک
```css
a.link { color: var(--accent); text-decoration: none; }
a.link:hover { text-decoration: underline; text-underline-offset: 3px; }
```

---

## ۹. قواعد راست‌به‌چپ (RTL)

- روی ریشه: `<html dir="rtl" lang="fa">`.
- از **ویژگی‌های منطقی** استفاده شود تا قرینه‌سازی خودکار شود:
  - `margin-inline-start/end` به‌جای `margin-left/right`
  - `padding-inline-start/end`
  - `inset-inline-start/end` به‌جای `left/right`
  - `border-inline-start/end`
- متن فارسی: `text-align: right` (پیش‌فرض RTL).
- **کد، نام‌های لاتین، اعداد نسخه و دستورات ترمینال همیشه LTR** بمانند:
  ```css
  .ltr, code, pre, .mono, .version { direction: ltr; unicode-bidi: isolate; }
  ```
- آیکن‌های جهت‌دار (فلش «بعدی/قبلی») در RTL قرینه شوند:
  ```css
  [dir="rtl"] .icon-arrow { transform: scaleX(-1); }
  ```
- اعداد: برای متن فارسی می‌توان از ارقام فارسی استفاده کرد، ولی **در کد و نسخه‌ها ارقام لاتین** بماند.
- در فیلدهای مختلط (مثل ایمیل یا URL داخل متن فارسی) از `unicode-bidi: plaintext` استفاده شود.

---

## ۱۰. حرکت (Motion)

```css
:root { --ease: cubic-bezier(0.4, 0, 0.2, 1); --dur: 0.15s; }
* { transition-timing-function: var(--ease); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```
- ترنزیشن‌ها کوتاه و ظریف (`0.15s`).
- ترجیح کاربر برای کاهش حرکت رعایت شود.
- بدون انیمیشن‌های پراکنده؛ حداکثر یک حرکت هدفمند هنگام لود.

---

## ۱۱. باید / نباید

**باید:**
- یک رنگ تأکید، فضای خالی فراوان، خطوط مویی.
- شیشه فقط روی ناوبری و یک کارت.
- مونواسپیس برای برچسب‌ها و کد.
- نشانه‌های اعتماد واقعی: نسخه، بلوک کد، لینک گیت‌هاب.
- حالت تیره به‌عنوان پیش‌فرض، با امکان سوییچ به روشن.

**نباید:**
- شیشه روی شیشه یا بلور همه‌جا.
- بیش از یک رنگ تأکید.
- گرادیان پررنگ، نئون، سایه‌های نمایشی.
- `letter-spacing` منفی روی فارسی.
- چپ‌چین کردن متن فارسی یا راست‌چین کردن کد.
- وزن فونت ۷۰۰+ برای تیترهای فارسی.

---

## ۱۲. دسترس‌پذیری (حداقل‌ها)

- کنتراست متن اصلی روی پس‌زمینه حداقل ۴.۵:۱.
- فوکوس صفحه‌کلید همیشه دیده شود (`:focus-visible` با حلقه‌ی `--accent-soft`).
- اندازه‌ی فونت هرگز زیر ۱۲px.
- تمام آیکن‌های صرفاً تزئینی `aria-hidden="true"`؛ دکمه‌های فقط‌آیکن `aria-label` بگیرند.
