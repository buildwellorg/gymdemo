"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReminderButton({ subscriptionId }: { subscriptionId: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function sendReminder() {
    setStatus("sending");
    try {
      const response = await fetch("/api/admin/subscriptions/reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionId }),
      });
      if (!response.ok) throw new Error();
      setStatus("sent");
      router.refresh();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") return <span className="text-xs text-green-400">Sent</span>;

  return (
    <button type="button" onClick={sendReminder} disabled={status === "sending"} className="mt-2 text-xs font-semibold text-orange-400 hover:text-orange-300 disabled:opacity-60">
      {status === "sending" ? "Sending..." : status === "error" ? "Try again" : "Send reminder"}
    </button>
  );
}