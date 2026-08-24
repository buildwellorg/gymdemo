"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await signOut(getFirebaseAuth());
    await fetch("/api/auth/session", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
    >
      Log out
    </button>
  );
}
