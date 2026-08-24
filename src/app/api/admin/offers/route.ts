import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { saveOffersData } from "@/lib/data/offers";
import type { Offer } from "@/lib/offers";

function isValidOffer(item: unknown): item is Offer {
  if (typeof item !== "object" || item === null) return false;
  const i = item as Record<string, unknown>;
  return (
    typeof i.id === "string" &&
    typeof i.title === "string" &&
    typeof i.description === "string" &&
    typeof i.discountLabel === "string" &&
    typeof i.active === "boolean" &&
    typeof i.expiresAt === "string"
  );
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const offers = body?.offers;

  if (!Array.isArray(offers) || !offers.every(isValidOffer)) {
    return NextResponse.json({ error: "Invalid offers payload" }, { status: 400 });
  }

  try {
    await saveOffersData(offers);
  } catch (error) {
    console.error("Failed to save offers:", error);
    return NextResponse.json({ error: "Could not save offers" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
