import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, phone, message } = body ?? {};

  if (!name || !phone) {
    return NextResponse.json(
      { error: "Name and phone are required." },
      { status: 400 },
    );
  }

  try {
    await getAdminDb().collection("contactSubmissions").add({
      name,
      phone,
      message: message ?? "",
      createdAt: FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to save contact submission:", error);
    return NextResponse.json(
      { error: "Could not save your message. Please try WhatsApp or call instead." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
