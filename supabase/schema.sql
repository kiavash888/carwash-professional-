create table if not exists public.washes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_name text,
  area text,
  address text,
  lat double precision,
  lng double precision,
  rating numeric default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  wash_id uuid references public.washes(id) on delete cascade,
  name text not null,
  price integer not null,
  duration integer not null default 30,
  is_active boolean default true
);

create table if not exists public.time_slots (
  id uuid primary key default gen_random_uuid(),
  wash_id uuid references public.washes(id) on delete cascade,
  slot_date date not null,
  slot_time time not null,
  is_available boolean default true
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  wash_id text not null,
  service_id text not null,
  customer_name text not null,
  phone text not null,
  car_model text not null,
  booking_day text not null,
  booking_time text not null,
  amount integer not null,
  status text not null default 'pending_payment',
  payment_ref text,
  created_at timestamptz default now()
);

create index if not exists bookings_phone_idx on public.bookings(phone);
create index if not exists bookings_wash_id_idx on public.bookings(wash_id);
