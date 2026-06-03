export type Service = {
  id: string;
  name: string;
  price: number;
  duration: number;
};

export type Wash = {
  id: string;
  name: string;
  area: string;
  address: string;
  rating: number;
  reviews: number;
  lat: number;
  lng: number;
  image: string;
  owner: string;
  services: Service[];
  times: string[];
};

export const demoWashes: Wash[] = [
  {
    id: "wash-sefeh",
    name: "کارواش VIP صفه",
    area: "صفه",
    address: "اصفهان، بلوار صفه، نزدیک پارک کوهستانی صفه",
    rating: 4.8,
    reviews: 214,
    lat: 32.6049,
    lng: 51.6622,
    image: "linear-gradient(135deg,#0f172a,#2563eb)",
    owner: "علی رضایی",
    services: [
      { id: "s1", name: "روشویی کامل", price: 190000, duration: 25 },
      { id: "s2", name: "داخل‌شویی", price: 320000, duration: 45 },
      { id: "s3", name: "صفرشویی VIP", price: 1450000, duration: 180 },
      { id: "s4", name: "واکس و پولیش", price: 780000, duration: 90 }
    ],
    times: ["09:30", "10:30", "12:00", "14:30", "16:00", "18:30"]
  },
  {
    id: "wash-chaharbagh",
    name: "کارواش چهارباغ",
    area: "چهارباغ بالا",
    address: "اصفهان، چهارباغ بالا، حوالی سی‌وسه‌پل",
    rating: 4.6,
    reviews: 151,
    lat: 32.6449,
    lng: 51.6677,
    image: "linear-gradient(135deg,#164e63,#06b6d4)",
    owner: "حسین محمدی",
    services: [
      { id: "s5", name: "روشویی اقتصادی", price: 160000, duration: 20 },
      { id: "s6", name: "داخل‌شویی", price: 290000, duration: 40 },
      { id: "s7", name: "موتورشویی", price: 480000, duration: 50 }
    ],
    times: ["08:30", "11:00", "13:00", "15:30", "17:00"]
  },
  {
    id: "wash-mardavij",
    name: "دیتیلینگ مرداویج",
    area: "مرداویج",
    address: "اصفهان، مرداویج، خیابان شیخ صدوق جنوبی",
    rating: 4.9,
    reviews: 326,
    lat: 32.6265,
    lng: 51.6689,
    image: "linear-gradient(135deg,#581c87,#9333ea)",
    owner: "مهدی کاظمی",
    services: [
      { id: "s8", name: "روشویی پریمیوم", price: 220000, duration: 25 },
      { id: "s9", name: "سرامیک بدنه", price: 2900000, duration: 240 },
      { id: "s10", name: "دیتیلینگ داخل کابین", price: 950000, duration: 120 }
    ],
    times: ["10:00", "12:30", "15:00", "19:00"]
  },
  {
    id: "wash-jolfa",
    name: "کارواش جلفا",
    area: "جلفا",
    address: "اصفهان، محله جلفا، خیابان حکیم نظامی",
    rating: 4.5,
    reviews: 98,
    lat: 32.6336,
    lng: 51.6562,
    image: "linear-gradient(135deg,#14532d,#22c55e)",
    owner: "سینا احمدی",
    services: [
      { id: "s11", name: "روشویی", price: 175000, duration: 25 },
      { id: "s12", name: "داخل‌شویی", price: 310000, duration: 45 },
      { id: "s13", name: "نانو واکس", price: 620000, duration: 70 }
    ],
    times: ["09:00", "10:45", "13:30", "16:30", "18:00"]
  }
];

export function toman(value: number) {
  return value.toLocaleString("fa-IR") + " تومان";
}
