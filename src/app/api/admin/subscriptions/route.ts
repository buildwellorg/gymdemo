import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { createSubscription } from "@/lib/subscriptions";

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const required = ["memberName", "email", "phone", "planId", "planName", "billingCycle", "startAt", "endAt"];
  if (required.some((field) => typeof body[field] !== "string" || !body[field].trim())) {
    return NextResponse.json({ error: "All member and membership details are required." }, { status: 400 });
  }
  if (!["monthly", "annual"].includes(body.billingCycle)) {
    return NextResponse.json({ error: "Invalid billing cycle." }, { status: 400 });
  }

  const startAt = new Date(`${body.startAt}T00:00:00`);
  const endAt = new Date(`${body.endAt}T00:00:00`);
  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount < 0 || Number.isNaN(startAt.getTime()) || Number.isNaN(endAt.getTime()) || endAt <= startAt) {
    return NextResponse.json({ error: "Enter a valid amount and membership date range." }, { status: 400 });
  }

  try {
    const subscriptionId = await createSubscription({
      memberName: body.memberName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      planId: body.planId.trim(),
      planName: body.planName.trim(),
      billingCycle: body.billingCycle,
      amount,
      startAt,
      endAt,
    });
    return NextResponse.json({ subscriptionId }, { status: 201 });
  } catch (error) {
    console.error("Failed to add existing subscription:", error);
    return NextResponse.json({ error: "Could not save the subscription." }, { status: 500 });
  }
}