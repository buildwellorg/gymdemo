import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { saveTrainersData } from "@/lib/data/trainers";
import type { Trainer } from "@/lib/trainers";

function isValidTrainer(item: unknown): item is Trainer {
  if (typeof item !== "object" || item === null) return false;
  const i = item as Record<string, unknown>;
  return (
    typeof i.id === "string" &&
    typeof i.name === "string" &&
    typeof i.certification === "string" &&
    typeof i.specialty === "string" &&
    typeof i.photo === "string"
  );
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const trainers = body?.trainers;

  if (!Array.isArray(trainers) || !trainers.every(isValidTrainer)) {
    return NextResponse.json({ error: "Invalid trainers payload" }, { status: 400 });
  }

  try {
    await saveTrainersData(trainers);
  } catch (error) {
    console.error("Failed to save trainers:", error);
    return NextResponse.json({ error: "Could not save trainers" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
