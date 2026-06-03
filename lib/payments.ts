export type PaymentRequest = {
  amount: number;
  description: string;
  bookingId: string;
  mobile?: string;
};

export async function createZarinpalPayment(input: PaymentRequest) {
  // برای پرداخت واقعی:
  // 1) ZARINPAL_MERCHANT_ID را در env بگذار.
  // 2) این تابع را به API رسمی زرین‌پال وصل کن.
  // 3) Callback را به /payment/verify تنظیم کن.
  return {
    mode: "demo",
    authority: "DEMO-" + input.bookingId,
    paymentUrl: `/payment/demo?booking=${input.bookingId}&amount=${input.amount}`
  };
}
