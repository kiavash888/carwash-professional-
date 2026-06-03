import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";

export const metadata: Metadata = {
  title: "کارواش‌یاب | رزرو واقعی کارواش در اصفهان",
  description: "پلتفرم رزرو آنلاین کارواش با نقشه، پنل اختصاصی و پرداخت آنلاین"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
