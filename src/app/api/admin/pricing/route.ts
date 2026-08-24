import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { savePricingPlans } from "@/lib/data/pricing";
import type { MembershipPlan } from "@/lib/plans";

function isValidPlan(plan: unknown): plan is MembershipPlan {
  if (typeof plan !== "object" || plan === null) return false;
  const p = plan as Record<string, unknown>;
  return (
    typeof p.id === "string" &&
    typeof p.name === "string" &&
    typeof p.tagline === "string" &&
    typeof p.priceMonthly === "number" &&
    typeof p.priceAnnual === "number" &&
    Array.isArray(p.features) &&
    p.features.every((f) => typeof f === "string")
  );
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const plans = body?.plans;

  if (!Array.isArray(plans) || plans.length === 0 || !plans.every(isValidPlan)) {
    return NextResponse.json({ error: "Invalid pricing payload" }, { status: 400 });
  }

  try {
    await savePricingPlans(plans);
  } catch (error) {
    console.error("Failed to save pricing:", error);
    return NextResponse.json({ error: "Could not save pricing" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
