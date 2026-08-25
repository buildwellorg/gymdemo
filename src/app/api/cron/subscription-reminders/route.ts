import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

const REMINDER_WINDOWS = [7, 3, 1];

export async function GET(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.RESEND_API_KEY || !process.env.REMINDER_FROM_EMAIL) {
    return NextResponse.json({ error: "Reminder email is not configured." }, { status: 501 });
  }

  const snapshot = await getAdminDb().collection("subscriptions").where("status", "==", "active").get();
  const now = Date.now();
  let sent = 0;

  for (const document of snapshot.docs) {
    const data = document.data();
    const endAt = data.endAt.toDate() as Date;
    const daysRemaining = Math.ceil((endAt.getTime() - now) / (24 * 60 * 60 * 1000));
    const window = REMINDER_WINDOWS.find((days) => daysRemaining <= days && daysRemaining > days - 1);
    if (!window || data.lastReminderKey === `${window}-day`) continue;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.REMINDER_FROM_EMAIL,
        to: [data.email],
        subject: `${data.planName} membership ends in ${window} day${window === 1 ? "" : "s"}`,
        html: `<p>Hi ${data.memberName},</p><p>Your ${data.planName} membership ends on <strong>${endAt.toLocaleDateString("en-IN")}</strong>. Please contact the gym to renew your membership.</p>`,
      }),
    });

    if (response.ok) {
      await document.ref.update({ lastReminderKey: `${window}-day`, lastReminderAt: new Date() });
      sent += 1;
    }
  }

  return NextResponse.json({ sent });
}