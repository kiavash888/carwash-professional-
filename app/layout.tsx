import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "خودکار | کارواش‌یاب و خدمات خودرو",
  description: "رزرو کارواش، نمایش پمپ بنزین‌ها و جایگاه شارژ خودرو برقی در اصفهان"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fa" dir="rtl"><body>{children}</body></html>;
}
