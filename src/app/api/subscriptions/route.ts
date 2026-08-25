import { NextRequest, NextResponse } from "next/server";
import { createSubscription } from "@/lib/subscriptions";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const required = ["memberName", "email", "phone", "planId", "planName", "billingCycle"];

  if (required.some((field) => typeof body[field] !== "string" || !body[field].trim())) {
    return NextResponse.json({ error: "Member details are required." }, { status: 400 });
  }

  if (!["monthly", "annual"].includes(body.billingCycle)) {
    return NextResponse.json({ error: "Invalid billing cycle." }, { status: 400 });
  }

  try {
    const subscriptionId = await createSubscription({
      memberName: body.memberName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      planId: body.planId,
      planName: body.planName,
      billingCycle: body.billingCycle,
      amount: Number(body.amount),
    });
    return NextResponse.json({ subscriptionId }, { status: 201 });
  } catch (error) {
    console.error("Failed to create subscription:", error);
    return NextResponse.json({ error: "Could not save the subscription." }, { status: 500 });
  }
}