import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { saveSiteSettings } from "@/lib/data/site-settings";
import type { SiteConfig } from "@/lib/site-config";

function isValidConfig(config: unknown): config is SiteConfig {
  if (typeof config !== "object" || config === null) return false;
  const c = config as Record<string, unknown>;
  const hours = c.hours as Record<string, unknown> | undefined;
  return (
    typeof c.name === "string" &&
    typeof c.tagline === "string" &&
    typeof c.whatsappNumber === "string" &&
    typeof c.callNumber === "string" &&
    typeof c.instagramHandle === "string" &&
    typeof c.address === "string" &&
    typeof hours === "object" &&
    hours !== null &&
    typeof hours.weekdays === "string" &&
    typeof hours.sunday === "string"
  );
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (!isValidConfig(body)) {
    return NextResponse.json({ error: "Invalid site settings payload" }, { status: 400 });
  }

  try {
    await saveSiteSettings(body);
  } catch (error) {
    console.error("Failed to save site settings:", error);
    return NextResponse.json({ error: "Could not save site settings" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
