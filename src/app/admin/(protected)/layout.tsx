import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { getAdminAuth } from "@/lib/firebase-admin";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    redirect("/admin/login");
  }

  try {
    await getAdminAuth().verifySessionCookie(sessionCookie, true);
  } catch {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <Link href="/admin" className="font-bold text-white">
          Gym Admin
        </Link>
        <LogoutButton />
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
