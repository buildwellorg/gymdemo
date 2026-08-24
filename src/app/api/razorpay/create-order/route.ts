import { NextRequest, NextResponse } from "next/server";

// Stub endpoint. Wire up real Razorpay order creation once credentials are added:
// 1. npm install razorpay
// 2. Set RAZORPAY_KEY_SECRET + NEXT_PUBLIC_RAZORPAY_KEY_ID in .env.local
// 3. Create a Razorpay instance and call orders.create({ amount, currency: "INR", receipt })
// 4. Return { orderId, amount, currency, keyId } for the client to open Checkout with
export async function POST(request: NextRequest) {
  const { planId, billingCycle } = await request.json();

  if (!process.env.RAZORPAY_KEY_SECRET || !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
    return NextResponse.json(
      {
        error: "Razorpay is not configured yet.",
        planId,
        billingCycle,
      },
      { status: 501 },
    );
  }

  // TODO: real order creation once credentials are configured.
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}
