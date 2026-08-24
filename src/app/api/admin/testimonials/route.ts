import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { saveTestimonialsData } from "@/lib/data/testimonials";
import type { Testimonial } from "@/lib/testimonials";

function isValidTestimonial(item: unknown): item is Testimonial {
  if (typeof item !== "object" || item === null) return false;
  const i = item as Record<string, unknown>;
  return (
    typeof i.id === "string" &&
    typeof i.name === "string" &&
    typeof i.result === "string" &&
    typeof i.quote === "string" &&
    typeof i.beforePhoto === "string" &&
    typeof i.afterPhoto === "string"
  );
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const testimonials = body?.testimonials;

  if (!Array.isArray(testimonials) || !testimonials.every(isValidTestimonial)) {
    return NextResponse.json({ error: "Invalid testimonials payload" }, { status: 400 });
  }

  try {
    await saveTestimonialsData(testimonials);
  } catch (error) {
    console.error("Failed to save testimonials:", error);
    return NextResponse.json({ error: "Could not save testimonials" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
