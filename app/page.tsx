"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BatteryCharging, CreditCard, Fuel, Search, Sparkles, Waves } from "lucide-react";
import { places, toman, typeLabel, Place, PlaceType } from "@/lib/data";

type Booking = { id:string; placeName:string; customerName:string; phone:string; carModel:string; serviceName:string; amount:number; day:string; time:string };

export default function Home() {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("همه");
  const [type, setType] = useState<"all" | PlaceType>("all");
  const [selectedPlace, setSelectedPlace] = useState<Place>(places[0]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);

  const areas = ["همه", ...Array.from(new Set(places.map(p => p.area)))];
  const filtered = useMemo(() => places.filter(place => {
    const q = query.trim();
    const okQ = !q || place.name.includes(q) || place.area.includes(q) || place.address.includes(q) || place.services.some(s => s.name.includes(q));
    const okArea = area === "همه" || place.area === area;
    const okType = type === "all" || place.type === type;
    return okQ && okArea && okType;
  }), [query, area, type]);

  const carwashPlaces = places.filter(p => p.type === "carwash");

  function book(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const bookingPlace = selectedPlace.type === "carwash" ? selectedPlace : carwashPlaces[0];
    const serviceId = String(form.get("serviceId"));
    const service = bookingPlace.services.find(s => s.id === serviceId) || bookingPlace.services[0];
    const booking: Booking = {
      id: crypto.randomUUID(),
      placeName: bookingPlace.name,
      customerName: String(form.get("customerName")),
      phone: String(form.get("phone")),
      carModel: String(form.get("carModel")),
      serviceName: service.name,
      amount: service.price,
      day: String(form.get("day")),
      time: String(form.get("time"))
    };
    setBookings(prev => [booking, ...prev]);
    setLastBooking(booking);
    event.currentTarget.reset();
  }

  function selectForBooking(place: Place) {
    setSelectedPlace(place);
    if (place.type === "carwash") setTimeout(() => document.getElementById("booking")?.scrollIntoView({behavior:"smooth"}), 80);
  }

  const bookingPlace = selectedPlace.type === "carwash" ? selectedPlace : carwashPlaces[0];

  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/">
          <div className="logo-mark">خ</div>
          <div><strong>خودکار</strong><span>کارواش‌یاب و خدمات خودرو</span></div>
        </Link>
        <nav className="nav">
          <a href="#places">مراکز خودرو</a><a href="#booking">رزرو کارواش</a><a href="#map">نقشه اصفهان</a><Link href="/admin">پنل مدیریت</Link>
        </nav>
        <div className="actions">
          <Link className="btn white" href="/admin">پنل مدیریت</Link>
          <button className="btn primary" onClick={() => document.getElementById("booking")?.scrollIntoView({behavior:"smooth"})}>رزرو سریع</button>
        </div>
      </header>

      <section className="hero">
        <div>
          <span className="badge"><Sparkles size={16}/> برند جدید: خودکار، همه خدمات خودرو در یک نقشه</span>
          <h1><span>خودکار</span>؛ کارواش‌یاب، پمپ بنزین و شارژ خودرو برقی</h1>
          <p>با خودکار، کارواش‌های اطراف را رزرو کن، پمپ‌بنزین‌ها را ببین، جایگاه‌های شارژ خودرو برقی را پیدا کن و بعداً همه خدمات خودرو را از یک اپ مدیریت کن.</p>
          <div className="search-card">
            <div className="search-grid">
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="جستجو: صفه، مرداویج، بنزین، شارژ برقی..." />
              <select value={area} onChange={e => setArea(e.target.value)}>{areas.map(a => <option key={a}>{a}</option>)}</select>
              <select value={type} onChange={e => setType(e.target.value as "all" | PlaceType)}>
                <option value="all">همه مراکز</option><option value="carwash">کارواش</option><option value="gas">پمپ بنزین</option><option value="ev">شارژ برقی</option>
              </select>
              <button className="btn blue"><Search size={18}/> جستجو</button>
            </div>
          </div>
        </div>
        <div className="hero-panel">
          <h3>داشبورد زنده خودکار</h3>
          <p>نمای سریع وضعیت رزرو و مراکز خودرو</p>
          <div className="status-list">
            <div className="status-item"><span>رزروهای امروز</span><strong>{bookings.length.toLocaleString("fa-IR")}</strong></div>
            <div className="status-item"><span>کارواش‌ها</span><strong>{places.filter(p=>p.type==="carwash").length.toLocaleString("fa-IR")}</strong></div>
            <div className="status-item"><span>پمپ بنزین‌ها</span><strong>{places.filter(p=>p.type==="gas").length.toLocaleString("fa-IR")}</strong></div>
            <div className="status-item"><span>شارژ برقی</span><strong>{places.filter(p=>p.type==="ev").length.toLocaleString("fa-IR")}</strong></div>
          </div>
          <Link className="btn blue full" style={{marginTop: 20}} href="/admin">ورود به پنل مدیریت</Link>
        </div>
      </section>

      <div className="stats">
        <div className="stat-card"><Waves/><span>رزرو کارواش</span><strong>آنلاین</strong></div>
        <div className="stat-card"><Fuel/><span>پمپ بنزین‌ها</span><strong>روی نقشه</strong></div>
        <div className="stat-card"><BatteryCharging/><span>شارژ خودرو برقی</span><strong>جدید</strong></div>
        <div className="stat-card"><CreditCard/><span>پرداخت</span><strong>زرین‌پال</strong></div>
      </div>

      <section className="section" id="places">
        <div className="section-head">
          <div><span className="eyebrow">نقشه خدمات خودرو</span><h2>مراکز منتخب اصفهان</h2></div>
          <span className="badge">{filtered.length.toLocaleString("fa-IR")} نتیجه</span>
        </div>
        <div className="category-tabs">
          <button className={`tab ${type==="all" ? "active" : ""}`} onClick={() => setType("all")}>همه</button>
          <button className={`tab ${type==="carwash" ? "active" : ""}`} onClick={() => setType("carwash")}>کارواش‌ها</button>
          <button className={`tab ${type==="gas" ? "active" : ""}`} onClick={() => setType("gas")}>پمپ بنزین‌ها</button>
          <button className={`tab ${type==="ev" ? "active" : ""}`} onClick={() => setType("ev")}>شارژ برقی</button>
        </div>

        <div className="main-grid">
          <div className="place-grid">
            {filtered.map(place => (
              <article className={`card place-card ${place.type}`} key={place.id}>
                <div className="cover"></div>
                <div className={`chip ${place.type === "gas" ? "gas" : place.type === "ev" ? "ev" : ""}`}>{typeLabel(place.type)}</div>
                <h3>{place.name}</h3>
                <div className="meta">{place.address}</div>
                <div className="meta">⭐ {place.rating.toLocaleString("fa-IR")} از {place.reviews.toLocaleString("fa-IR")} نظر</div>
                <div className="chips">{place.services.slice(0,3).map(s => <span className={`chip ${place.type === "gas" ? "gas" : place.type === "ev" ? "ev" : ""}`} key={s.id}>{s.name}</span>)}</div>
                <strong>{place.type === "carwash" ? `${toman(Math.min(...place.services.map(s => s.price)))} شروع قیمت` : "نمایش اطلاعات و مسیر"}</strong>
                <div className="card-actions">
                  <button className="btn soft" onClick={() => setSelectedPlace(place)}>نمایش روی نقشه</button>
                  {place.type === "carwash" ? <button className="btn primary" onClick={() => selectForBooking(place)}>رزرو</button> : <button className="btn primary" onClick={() => alert("در نسخه بعد، مسیر‌یابی و وضعیت لحظه‌ای اضافه می‌شود.")}>مسیریابی</button>}
                </div>
              </article>
            ))}
          </div>
          <div className="card map-box" id="map">
            <div className="map-placeholder">
              <div className="pin cw"><span>و</span></div><div className="pin gas"><span>ب</span></div><div className="pin ev"><span>ش</span></div><div className="pin gas four"><span>ب</span></div><div className="pin ev five"><span>ش</span></div>
              <div className="map-label"><strong>نقشه اصفهان در خودکار</strong><p className="meta">آبی: کارواش، نارنجی: پمپ بنزین، سبز: جایگاه شارژ برقی. در مرحله بعد به OpenStreetMap واقعی وصل می‌شود.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section booking-layout" id="booking">
        <div className="card panel">
          <span className="eyebrow">جزئیات رزرو</span><h2>{bookingPlace.name}</h2><p className="meta">{bookingPlace.address}</p>
          {bookingPlace.services.map(s => <div className="service-row" key={s.id}><div><strong>{s.name}</strong><div className="meta">{s.duration.toLocaleString("fa-IR")} دقیقه</div></div><strong>{toman(s.price)}</strong></div>)}
        </div>
        <div className="card panel">
          <span className="eyebrow">رزرو کارواش</span><h2>ثبت رزرو جدید</h2>
          <div className="notice">بعد از اتصال Supabase، رزروها در دیتابیس واقعی ذخیره می‌شوند. پرداخت زرین‌پال هم در مرحله بعد وصل می‌شود.</div>
          <form className="booking-form" onSubmit={book}>
            <div className="form-row"><div><label>نام مشتری</label><input required name="customerName" placeholder="نام و نام خانوادگی" /></div><div><label>شماره موبایل</label><input required name="phone" placeholder="09..." /></div></div>
            <div><label>خودرو</label><input required name="carModel" placeholder="مثلاً پژو ۲۰۷ سفید" /></div>
            <div className="form-row"><div><label>خدمت</label><select name="serviceId">{bookingPlace.services.map(s => <option value={s.id} key={s.id}>{s.name} - {toman(s.price)}</option>)}</select></div><div><label>روز</label><select name="day"><option>امروز</option><option>فردا</option><option>پس‌فردا</option></select></div></div>
            <div><label>ساعت</label><select name="time">{bookingPlace.times?.map(t => <option key={t}>{t}</option>)}</select></div>
            <button className="btn blue full" type="submit">ثبت رزرو و ادامه پرداخت</button>
          </form>
          {lastBooking && <div className="success">رزرو ثبت شد: <strong>{lastBooking.placeName}</strong>، {lastBooking.serviceName}، {lastBooking.day} ساعت {lastBooking.time}<br/>مبلغ: <strong>{toman(lastBooking.amount)}</strong></div>}
        </div>
      </section>

      <footer className="footer"><strong>خودکار | کارواش‌یاب و خدمات خودرو</strong><span>نسخه آماده برای پنل مدیریت، دیتابیس، زرین‌پال و نقشه واقعی اصفهان</span></footer>
    </>
  );
}
