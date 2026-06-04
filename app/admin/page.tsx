"use client";

import Link from "next/link";
import { BatteryCharging, CalendarCheck, CreditCard, Fuel, LayoutDashboard, MapPin, Paintbrush, Plus, Settings, Users, Waves } from "lucide-react";
import { places, toman, typeLabel } from "@/lib/data";

export default function AdminPage() {
  const bookings = [
    { name:"کیاوش", place:"کارواش VIP صفه", car:"پژو ۲۰۷", service:"روشویی کامل", status:"پرداخت‌نشده", amount:190000 },
    { name:"امیر", place:"دیتیلینگ مرداویج", car:"دنا پلاس", service:"دیتیلینگ داخل کابین", status:"تأییدشده", amount:950000 },
    { name:"سینا", place:"کارواش VIP صفه", car:"تیبا", service:"داخل‌شویی", status:"تأییدشده", amount:320000 }
  ];

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="logo-mark">خ</div>
          <div><strong>خودکار Admin</strong><span>پنل مدیریت خدمات خودرو</span></div>
        </div>
        <div className="admin-nav">
          <button className="active"><LayoutDashboard size={18}/> داشبورد</button>
          <button><CalendarCheck size={18}/> رزروها</button>
          <button><Waves size={18}/> کارواش‌ها</button>
          <button><Fuel size={18}/> پمپ بنزین‌ها</button>
          <button><BatteryCharging size={18}/> شارژ برقی</button>
          <button><MapPin size={18}/> نقشه و موقعیت</button>
          <button><Paintbrush size={18}/> طراحی سایت</button>
          <button><CreditCard size={18}/> پرداخت‌ها</button>
          <button><Settings size={18}/> تنظیمات</button>
          <Link href="/">بازگشت به سایت</Link>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-top">
          <div><span className="eyebrow">داشبورد مدیریتی خودکار</span><h1>مدیریت کارواش‌یاب و خدمات خودرو</h1></div>
          <button className="btn blue"><Plus size={18}/> افزودن مرکز جدید</button>
        </div>

        <div className="kpi-grid">
          <div className="kpi"><Users/><span>کاربران</span><strong>۱,۲۴۰</strong></div>
          <div className="kpi"><Waves/><span>کارواش‌ها</span><strong>{places.filter(p=>p.type==="carwash").length.toLocaleString("fa-IR")}</strong></div>
          <div className="kpi"><Fuel/><span>پمپ بنزین‌ها</span><strong>{places.filter(p=>p.type==="gas").length.toLocaleString("fa-IR")}</strong></div>
          <div className="kpi"><BatteryCharging/><span>شارژ برقی</span><strong>{places.filter(p=>p.type==="ev").length.toLocaleString("fa-IR")}</strong></div>
        </div>

        <div className="admin-grid">
          <section className="table-card">
            <div className="section-head"><div><span className="eyebrow">رزروهای اخیر</span><h2>مدیریت نوبت‌ها</h2></div></div>
            <div className="table-row head"><span>مشتری</span><span>مرکز</span><span>خدمت</span><span>وضعیت</span></div>
            {bookings.map((b,i) => (
              <div className="table-row" key={i}>
                <span>{b.name}<br/><small className="meta">{b.car}</small></span>
                <span>{b.place}</span>
                <span>{b.service}<br/><small className="meta">{toman(b.amount)}</small></span>
                <span className={`status ${b.status === "تأییدشده" ? "green" : "orange"}`}>{b.status}</span>
              </div>
            ))}
          </section>

          <aside className="design-card">
            <Paintbrush size={34}/>
            <h2>استودیو طراحی خودکار</h2>
            <p>این بخش برای طراحی برند است: لوگو، رنگ اصلی، فونت، عکس هدر، کارت مراکز و ظاهر پنل مدیریت.</p>
            <div className="color-row"><div className="color"></div><div className="color"></div><div className="color"></div><div className="color"></div></div>
            <button className="btn white full" style={{marginTop: 20}}>ویرایش طراحی</button>
          </aside>
        </div>

        <section className="table-card" style={{marginTop: 18}}>
          <div className="section-head"><div><span className="eyebrow">مراکز ثبت‌شده</span><h2>کارواش، پمپ بنزین و شارژ برقی</h2></div></div>
          <div className="table-row head"><span>نام مرکز</span><span>نوع</span><span>محله</span><span>وضعیت</span></div>
          {places.map(p => (
            <div className="table-row" key={p.id}>
              <span>{p.name}<br/><small className="meta">{p.address}</small></span>
              <span>{typeLabel(p.type)}</span>
              <span>{p.area}</span>
              <span className="status green">فعال</span>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
