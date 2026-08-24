import { cookies } from "next/headers";
import { getAdminAuth } from "@/lib/firebase-admin";

// Every admin write route must call this — Admin SDK writes bypass Firestore
// security rules entirely, so this check IS the access control for writes.
export async function requireAdmin(): Promise<{ uid: string } | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decoded = await getAdminAuth().verifySessionCookie(sessionCookie, true);
    return { uid: decoded.uid };
  } catch {
    return null;
  }
}
