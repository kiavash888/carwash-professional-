import { NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

const BookingSchema = z.object({
  place_id: z.string(),
  service_id: z.string(),
  customer_name: z.string().min(2),
  phone: z.string().min(10),
  car_model: z.string().min(2),
  booking_day: z.string(),
  booking_time: z.string(),
  amount: z.number()
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = BookingSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "اطلاعات رزرو ناقص است." }, { status: 400 });

  if (!supabase) {
    return NextResponse.json({
      mode: "demo",
      message: "Supabase هنوز وصل نشده است.",
      booking: { id: crypto.randomUUID(), ...parsed.data, status: "pending_payment" }
    });
  }

  const { data, error } = await supabase
    .from("bookings")
    .insert({ ...parsed.data, status: "pending_payment" })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ booking: data });
}
