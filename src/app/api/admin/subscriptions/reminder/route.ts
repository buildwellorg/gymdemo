import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { getAdminDb } from "@/lib/firebase-admin";

function getDate(value: { toDate?: () => Date } | Date): Date {
  return value instanceof Date ? value : value.toDate ? value.toDate() : new Date(0);
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.RESEND_API_KEY || !process.env.REMINDER_FROM_EMAIL) {
    return NextResponse.json({ error: "Reminder email is not configured." }, { status: 501 });
  }

  const { subscriptionId } = await request.json();
  if (typeof subscriptionId !== "string" || !subscriptionId.trim()) {
    return NextResponse.json({ error: "A subscription is required." }, { status: 400 });
  }

  const document = await getAdminDb().collection("subscriptions").doc(subscriptionId).get();
  if (!document.exists) return NextResponse.json({ error: "Subscription not found." }, { status: 404 });

  const data = document.data()!;
  const endAt = getDate(data.endAt);
  const daysRemaining = (endAt.getTime() - Date.now()) / (24 * 60 * 60 * 1000);
  const isExpired = endAt.getTime() <= Date.now();
  const isEndingSoon = daysRemaining > 0 && daysRemaining <= 7;
  if (data.billingCycle !== "monthly" || (!isExpired && !isEndingSoon)) {
    return NextResponse.json({ error: "Reminders are only available for monthly memberships ending within 7 days or already expired." }, { status: 400 });
  }

  const message = isExpired
    ? `Your ${data.planName} subscription has expired.`
    : `Your ${data.planName} subscription is coming to an end on ${endAt.toLocaleDateString("en-IN")}.`;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.REMINDER_FROM_EMAIL,
      to: [data.email],
      subject: isExpired ? `${data.planName} subscription expired` : `${data.planName} subscription ending soon`,
      html: `<p>Hi ${data.memberName},</p><p>${message}</p><p>Please contact the gym to renew your membership.</p>`,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "The reminder email could not be sent." }, { status: 502 });
  }

  await document.ref.update({ lastReminderAt: new Date(), lastReminderKey: isExpired ? "manual-expired" : "manual-ending-soon" });
  return NextResponse.json({ success: true });
}