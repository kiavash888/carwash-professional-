import { NextResponse } from "next/server";
import { createZarinpalPayment } from "@/lib/payments";

export async function POST(request: Request) {
  const body = await request.json();

  const payment = await createZarinpalPayment({
    amount: Number(body.amount),
    description: body.description || "پرداخت رزرو کارواش",
    bookingId: body.bookingId,
    mobile: body.mobile
  });

  return NextResponse.json(payment);
}
