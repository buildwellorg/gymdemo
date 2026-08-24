import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { saveEquipmentData, type EquipmentData } from "@/lib/data/equipment";
import type { Equipment } from "@/lib/equipment";

function isValidItem(item: unknown): item is Equipment {
  if (typeof item !== "object" || item === null) return false;
  const i = item as Record<string, unknown>;
  return (
    typeof i.id === "string" &&
    typeof i.name === "string" &&
    typeof i.description === "string" &&
    typeof i.image === "string"
  );
}

function isValidPayload(payload: unknown): payload is EquipmentData {
  if (typeof payload !== "object" || payload === null) return false;
  const p = payload as Record<string, unknown>;
  return (
    Array.isArray(p.basic) &&
    Array.isArray(p.advanced) &&
    p.basic.every(isValidItem) &&
    p.advanced.every(isValidItem)
  );
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Invalid equipment payload" }, { status: 400 });
  }

  try {
    await saveEquipmentData(body);
  } catch (error) {
    console.error("Failed to save equipment:", error);
    return NextResponse.json({ error: "Could not save equipment" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
