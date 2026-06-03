# CarwashYab Professional

نسخه حرفه‌ای‌تر پلتفرم رزرو کارواش برای اصفهان.

## امکانات
- Next.js
- نقشه اصفهان با OpenStreetMap + Leaflet
- لیست کارواش‌ها و فیلتر محله/خدمت
- رزرو نوبت
- پنل مشتری
- پنل صاحب کارواش
- پنل ادمین
- API آماده برای ذخیره رزرو
- ساختار اتصال به Supabase
- مسیر آماده برای پرداخت زرین‌پال

## اجرا روی سیستم
```bash
npm install
npm run dev
```

بعد باز کن:
```bash
http://localhost:3000
```

## راه‌اندازی رزرو واقعی با Supabase
1. در Supabase یک پروژه بساز.
2. داخل SQL Editor فایل `supabase/schema.sql` را اجرا کن.
3. از Project Settings مقدارهای زیر را بردار:
   - Project URL
   - anon public key
4. فایل `.env.local` بساز و این‌ها را وارد کن:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ZARINPAL_MERCHANT_ID=...
```

## پرداخت آنلاین
فعلاً پرداخت Demo است. برای پرداخت واقعی باید Merchant ID زرین‌پال بگیری و تابع `lib/payments.ts` را به API واقعی زرین‌پال وصل کنی.

## Deploy
برای نسخه Next.js بهتر است با Vercel منتشر شود. برای انتشار کامل:
1. پروژه را در GitHub آپلود کن.
2. در Vercel گزینه New Project بزن.
3. Environment Variables را از `.env.example` وارد کن.
4. Deploy بزن.
