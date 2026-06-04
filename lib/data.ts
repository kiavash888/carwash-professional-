export type Service = { id: string; name: string; price: number; duration: number };
export type PlaceType = "carwash" | "gas" | "ev";
export type Place = {
  id: string; type: PlaceType; name: string; area: string; address: string;
  rating: number; reviews: number; lat: number; lng: number; open: boolean;
  owner?: string; services: Service[]; times?: string[];
};

export const places: Place[] = [
  {
    id:"cw-1", type:"carwash", name:"کارواش VIP صفه", area:"صفه",
    address:"اصفهان، بلوار صفه، نزدیک پارک کوهستانی صفه",
    rating:4.8, reviews:214, lat:32.6049, lng:51.6622, open:true, owner:"علی رضایی",
    services:[
      {id:"s1",name:"روشویی کامل",price:190000,duration:25},
      {id:"s2",name:"داخل‌شویی",price:320000,duration:45},
      {id:"s3",name:"صفرشویی VIP",price:1450000,duration:180}
    ],
    times:["09:30","10:30","12:00","14:30","16:00","18:30"]
  },
  {
    id:"cw-2", type:"carwash", name:"دیتیلینگ مرداویج", area:"مرداویج",
    address:"اصفهان، مرداویج، خیابان شیخ صدوق جنوبی",
    rating:4.9, reviews:326, lat:32.6265, lng:51.6689, open:true, owner:"مهدی کاظمی",
    services:[
      {id:"s4",name:"روشویی پریمیوم",price:220000,duration:25},
      {id:"s5",name:"سرامیک بدنه",price:2900000,duration:240},
      {id:"s6",name:"دیتیلینگ داخل کابین",price:950000,duration:120}
    ],
    times:["10:00","12:30","15:00","19:00"]
  },
  {
    id:"gas-1", type:"gas", name:"جایگاه سوخت چهارباغ", area:"چهارباغ",
    address:"اصفهان، چهارباغ بالا", rating:4.4, reviews:88, lat:32.642, lng:51.668, open:true,
    services:[
      {id:"g1",name:"بنزین معمولی",price:0,duration:5},
      {id:"g2",name:"بنزین سوپر",price:0,duration:5},
      {id:"g3",name:"سرویس باد لاستیک",price:0,duration:5}
    ]
  },
  {
    id:"gas-2", type:"gas", name:"جایگاه سوخت مرداویج", area:"مرداویج",
    address:"اصفهان، مرداویج", rating:4.3, reviews:71, lat:32.623, lng:51.672, open:true,
    services:[
      {id:"g4",name:"بنزین معمولی",price:0,duration:5},
      {id:"g5",name:"گاز CNG",price:0,duration:8}
    ]
  },
  {
    id:"ev-1", type:"ev", name:"ایستگاه شارژ برقی صفه", area:"صفه",
    address:"اصفهان، محدوده صفه", rating:4.7, reviews:42, lat:32.607, lng:51.656, open:true,
    services:[
      {id:"e1",name:"شارژ سریع DC",price:0,duration:35},
      {id:"e2",name:"شارژ AC",price:0,duration:90}
    ]
  },
  {
    id:"ev-2", type:"ev", name:"ایستگاه شارژ سیتی‌سنتر", area:"سیتی‌سنتر",
    address:"اصفهان، سیتی‌سنتر", rating:4.6, reviews:63, lat:32.556, lng:51.668, open:true,
    services:[
      {id:"e3",name:"شارژ سریع",price:0,duration:40},
      {id:"e4",name:"پارکینگ شارژدار",price:0,duration:120}
    ]
  }
];

export function toman(value: number) {
  if (value === 0) return "قیمت در محل";
  return value.toLocaleString("fa-IR") + " تومان";
}
export function typeLabel(type: PlaceType) {
  if (type === "carwash") return "کارواش";
  if (type === "gas") return "پمپ بنزین";
  return "شارژ برقی";
}
