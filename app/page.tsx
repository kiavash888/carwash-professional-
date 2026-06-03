"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { CalendarDays, Car, CreditCard, MapPin, ShieldCheck, Sparkles, Star, Users } from "lucide-react";
import { demoWashes, toman, Wash } from "@/lib/demo-data";

const IsfahanMap = dynamic(() => import("@/components/IsfahanMap"), { ssr: false });

type Booking = {
  id: string;
  washId: string;
  washName: string;
  customerName: string;
  phone: string;
  carModel: string;
  serviceName: string;
  amount: number;
  day: string;
  time: string;
  status: "pending_payment" | "paid" | "confirmed";
  createdAt: string;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("همه");
  const [service, setService] = useState("همه");
  const [selectedWash, setSelectedWash] = useState<Wash>(demoWashes[0]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);
  const [dash, setDash] = useState<"customer" | "owner" | "admin">("customer");

  const areas = ["همه", ...Array.from(new Set(demoWashes.map(w => w.area)))];
  const services = ["همه", ...Array.from(new Set(demoWashes.flatMap(w => w.services.map(s => s.name))))];

  const filtered = useMemo(() => {
    return demoWashes.filter((wash) => {
      const q = query.trim();
      const matchQuery = !q || wash.name.includes(q) || wash.area.includes(q) || wash.address.includes(q) || wash.services.some(s => s.name.includes(q));
      const matchArea = area === "همه" || wash.area === area;
      const matchService = service === "همه" || wash.services.some(s => s.name === service);
      return matchQuery && matchArea && matchService;
    });
  }, [query, area, service]);

  function selectWash(wash: Wash) {
    setSelectedWash(wash);
    setTimeout(() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }), 80);
  }

  function handleBooking(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const serviceId = String(form.get("serviceId"));
    const selectedService = selectedWash.services.find(s => s.id === serviceId) || selectedWash.services[0];
    const booking: Booking = {
      id: crypto.randomUUID(),
      washId: selectedWash.id,
      washName: selectedWash.name,
      customerName: String(form.get("customerName")),
      phone: String(form.get("phone")),
      carModel: String(form.get("carModel")),
      serviceName: selectedService.name,
      amount: selectedService.price,
      day: String(form.get("day")),
      time: String(form.get("time")),
      status: "pending_payment",
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [booking, ...prev]);
    setLastBooking(booking);
    event.currentTarget.reset();
  }

  const totalIncome = bookings.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="logo">و</div>
          <div>
            <strong>کارواش‌یاب</strong>
            <span>رزرو، نقشه و پرداخت آنلاین</span>
          </div>
        </div>
        <nav className="nav">
          <a href="#washes">کارواش‌ها</a>
          <a href="#map">نقشه اصفهان</a>
          <a href="#booking">رزرو واقعی</a>
          <a href="#dashboard">پنل‌ها</a>
        </nav>
        <div className="top-actions">
          <button className="btn ghost">ورود</button>
          <button className="btn primary" onClick={() => document.getElementById("booking")?.scrollIntoView({behavior:"smooth"})}>رزرو سریع</button>
        </div>
      </header>

      <section className="hero">
        <div>
          <span className="pill"><Sparkles size={16}/> نسخه حرفه‌ای MVP برای اصفهان</span>
          <h1>پلتفرم رزرو واقعی کارواش، با نقشه و پرداخت آنلاین</h1>
          <p>
            مشتری کارواش نزدیک را روی نقشه می‌بیند، روز و ساعت را رزرو می‌کند، پرداخت را انجام می‌دهد و صاحب کارواش در پنل اختصاصی نوبت‌ها را مدیریت می‌کند.
          </p>

          <div className="search-panel">
            <div className="search-grid">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="جستجو: مرداویج، صفه، صفرشویی..." />
              <select value={area} onChange={(e) => setArea(e.target.value)}>{areas.map(a => <option key={a}>{a}</option>)}</select>
              <select value={service} onChange={(e) => setService(e.target.value)}>{services.map(s => <option key={s}>{s}</option>)}</select>
              <button className="btn blue" onClick={() => document.getElementById("washes")?.scrollIntoView({behavior:"smooth"})}>جستجو</button>
            </div>
          </div>
        </div>

        <div className="hero-card">
          <h3>وضعیت سیستم</h3>
          <p>آماده اتصال به دیتابیس Supabase و درگاه زرین‌پال.</p>
          <div className="quick-book">
            <div className="quick-row"><span>رزروها</span><strong>{bookings.length.toLocaleString("fa-IR")}</strong></div>
            <div className="quick-row"><span>کارواش‌های فعال</span><strong>{demoWashes.length.toLocaleString("fa-IR")}</strong></div>
            <div className="quick-row"><span>درآمد تستی</span><strong>{toman(totalIncome)}</strong></div>
          </div>
          <button className="btn blue" style={{width:"100%", marginTop: 22}} onClick={() => document.getElementById("booking")?.scrollIntoView({behavior:"smooth"})}>شروع رزرو</button>
        </div>
      </section>

      <div className="stats">
        <div className="stat"><Users size={22}/><span>کاربران هدف</span><strong>اصفهان</strong></div>
        <div className="stat"><MapPin size={22}/><span>نقشه</span><strong>OpenStreetMap</strong></div>
        <div className="stat"><ShieldCheck size={22}/><span>دیتابیس</span><strong>Supabase</strong></div>
        <div className="stat"><CreditCard size={22}/><span>پرداخت</span><strong>زرین‌پال</strong></div>
      </div>

      <section className="section" id="washes">
        <div className="section-head">
          <div>
            <span className="eyebrow">جستجو و انتخاب</span>
            <h2>کارواش‌های اصفهان</h2>
          </div>
          <span className="pill">{filtered.length.toLocaleString("fa-IR")} نتیجه</span>
        </div>

        <div className="layout" id="map">
          <div className="wash-list">
            {filtered.map(wash => (
              <article className="wash-card" key={wash.id}>
                <div className="wash-image" style={{background: wash.image}} />
                <h3>{wash.name}</h3>
                <div className="meta"><MapPin size={14}/> {wash.address}</div>
                <div className="meta"><Star size={14}/> {wash.rating.toLocaleString("fa-IR")} از {wash.reviews.toLocaleString("fa-IR")} نظر</div>
                <div className="chips">{wash.services.slice(0,3).map(s => <span className="chip" key={s.id}>{s.name}</span>)}</div>
                <strong>{toman(Math.min(...wash.services.map(s => s.price)))} شروع قیمت</strong>
                <div className="card-actions">
                  <button className="btn ghost" onClick={() => setSelectedWash(wash)}>نمایش روی نقشه</button>
                  <button className="btn primary" onClick={() => selectWash(wash)}>رزرو</button>
                </div>
              </article>
            ))}
          </div>

          <div className="map-wrap panel">
            <IsfahanMap washes={filtered.length ? filtered : demoWashes} selectedWash={selectedWash} onSelect={(wash) => setSelectedWash(wash)} />
          </div>
        </div>
      </section>

      <section className="section booking-layout" id="booking">
        <div className="panel">
          <span className="eyebrow">جزئیات کارواش</span>
          <h2>{selectedWash.name}</h2>
          <p className="meta">{selectedWash.address}</p>
          <p className="meta">مدیر: {selectedWash.owner} | امتیاز: {selectedWash.rating.toLocaleString("fa-IR")} ⭐</p>
          <h3>خدمات</h3>
          {selectedWash.services.map(s => (
            <div className="service-row" key={s.id}>
              <div>
                <strong>{s.name}</strong>
                <div className="meta">{s.duration.toLocaleString("fa-IR")} دقیقه</div>
              </div>
              <strong>{toman(s.price)}</strong>
            </div>
          ))}
          <h3>تایم‌های خالی</h3>
          <div className="chips">{selectedWash.times.map(t => <span className="chip" key={t}>{t}</span>)}</div>
        </div>

        <div className="booking-card">
          <span className="eyebrow">رزرو واقعی</span>
          <h2>ثبت رزرو و پرداخت</h2>
          <div className="warning">
            در این نسخه، رزرو داخل همین صفحه ثبت می‌شود. برای واقعی شدن کامل، باید کلید Supabase و Merchant ID زرین‌پال را در فایل env بگذاری.
          </div>
          <form className="booking-form" onSubmit={handleBooking}>
            <div className="form-row">
              <div><label>نام مشتری</label><input required name="customerName" placeholder="نام و نام خانوادگی" /></div>
              <div><label>موبایل</label><input required name="phone" placeholder="09..." /></div>
            </div>
            <div><label>خودرو</label><input required name="carModel" placeholder="مثلاً پژو ۲۰۷ سفید" /></div>
            <div className="form-row">
              <div><label>خدمت</label><select name="serviceId">{selectedWash.services.map(s => <option value={s.id} key={s.id}>{s.name} - {toman(s.price)}</option>)}</select></div>
              <div><label>روز</label><select name="day"><option>امروز</option><option>فردا</option><option>پس‌فردا</option></select></div>
            </div>
            <div><label>ساعت</label><select name="time">{selectedWash.times.map(t => <option key={t}>{t}</option>)}</select></div>
            <button className="btn blue" type="submit">ثبت رزرو و رفتن به پرداخت</button>
          </form>

          {lastBooking && (
            <div className="success" style={{display:"block"}}>
              رزرو ثبت شد: <strong>{lastBooking.washName}</strong>، {lastBooking.serviceName}، {lastBooking.day} ساعت {lastBooking.time}
              <br/>
              مبلغ: <strong>{toman(lastBooking.amount)}</strong>
              <br/>
              <button className="btn primary" style={{marginTop: 12}} onClick={() => alert("در نسخه واقعی، این دکمه به زرین‌پال وصل می‌شود.")}>پرداخت آنلاین</button>
            </div>
          )}
        </div>
      </section>

      <section className="section" id="dashboard">
        <div className="section-head">
          <div>
            <span className="eyebrow">پنل‌های اختصاصی</span>
            <h2>مدیریت کامل پلتفرم</h2>
          </div>
        </div>

        <div className="dashboard-grid">
          <aside className="sidebar">
            <div className="avatar">ک</div>
            <h3>داشبورد</h3>
            <button className={`side-btn ${dash==="customer" ? "active" : ""}`} onClick={() => setDash("customer")}>پنل مشتری</button>
            <button className={`side-btn ${dash==="owner" ? "active" : ""}`} onClick={() => setDash("owner")}>پنل صاحب کارواش</button>
            <button className={`side-btn ${dash==="admin" ? "active" : ""}`} onClick={() => setDash("admin")}>پنل ادمین</button>
          </aside>

          <div className="dash-card">
            <div className={`dash-view ${dash==="customer" ? "active" : ""}`}>
              <h3>رزروهای من</h3>
              {bookings.length ? bookings.map(b => <BookingItem key={b.id} b={b} />) : <p className="warning">هنوز رزروی ثبت نشده.</p>}
            </div>

            <div className={`dash-view ${dash==="owner" ? "active" : ""}`}>
              <h3>پنل صاحب کارواش</h3>
              <div className="kpis">
                <div className="kpi"><span>رزرو امروز</span><strong>{bookings.length.toLocaleString("fa-IR")}</strong></div>
                <div className="kpi"><span>درآمد</span><strong>{toman(totalIncome)}</strong></div>
                <div className="kpi"><span>تایم فعال</span><strong>۱۶</strong></div>
                <div className="kpi"><span>امتیاز</span><strong>۴.۸</strong></div>
              </div>
              {bookings.length ? bookings.map(b => <BookingItem key={b.id} b={b} />) : <p className="warning">هنوز رزروی برای کارواش ثبت نشده.</p>}
            </div>

            <div className={`dash-view ${dash==="admin" ? "active" : ""}`}>
              <h3>پنل ادمین</h3>
              <div className="kpis">
                <div className="kpi"><span>کارواش‌ها</span><strong>{demoWashes.length.toLocaleString("fa-IR")}</strong></div>
                <div className="kpi"><span>رزروها</span><strong>{bookings.length.toLocaleString("fa-IR")}</strong></div>
                <div className="kpi"><span>فروش</span><strong>{toman(totalIncome)}</strong></div>
                <div className="kpi"><span>شهر</span><strong>اصفهان</strong></div>
              </div>
              <div className="table">
                <div className="table-row head"><span>کارواش</span><span>محله</span><span>وضعیت</span><span>امتیاز</span></div>
                {demoWashes.map(w => <div className="table-row" key={w.id}><span>{w.name}</span><span>{w.area}</span><span className="green">فعال</span><span>{w.rating}</span></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <strong>CarwashYab Professional</strong>
        <span>قدم بعد: ساخت Supabase و گرفتن Merchant ID زرین‌پال</span>
      </footer>
    </div>
  );
}

function BookingItem({ b }: { b: Booking }) {
  return (
    <div className="booking-item">
      <div>
        <strong>{b.washName}</strong>
        <div className="meta"><Car size={14}/> {b.carModel} | {b.serviceName}</div>
        <div className="meta"><CalendarDays size={14}/> {b.day} ساعت {b.time}</div>
      </div>
      <div>
        <strong>{toman(b.amount)}</strong>
        <div className="meta">{b.status === "pending_payment" ? "در انتظار پرداخت" : "پرداخت‌شده"}</div>
      </div>
    </div>
  );
}
