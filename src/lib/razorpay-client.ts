import type { BillingCycle } from "@/lib/plans";

// Kicks off the checkout flow for a plan. Currently the API route always
// returns "not configured" until real Razorpay credentials are added, so
// this surfaces a friendly message instead of a broken payment popup.
export async function startCheckout(planId: string, billingCycle: BillingCycle) {
  try {
    const res = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId, billingCycle }),
    });

    if (!res.ok) {
      alert(
        "Online payments are coming soon! Please contact us via WhatsApp or call to sign up for now.",
      );
      return;
    }

    // TODO: once the API route returns a real order, load Razorpay Checkout
    // (https://checkout.razorpay.com/v1/checkout.js) and open it here with
    // the returned orderId/amount/keyId.
  } catch {
    alert("Something went wrong. Please try again or reach out via WhatsApp.");
  }
}
