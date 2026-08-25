"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { MembershipPlan } from "@/lib/plans";

type Status = "idle" | "saving" | "success" | "error";

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function ExistingMemberForm({ plans }: { plans: MembershipPlan[] }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ memberName: "", email: "", phone: "", planId: plans[0]?.id ?? "", billingCycle: "monthly", amount: String(plans[0]?.priceMonthly ?? 0), startAt: today(), endAt: "" });

  function update(field: string, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function selectPlan(planId: string) {
    const plan = plans.find((item) => item.id === planId);
    setForm((current) => ({ ...current, planId, amount: String(current.billingCycle === "annual" ? plan?.priceAnnual ?? 0 : plan?.priceMonthly ?? 0) }));
  }

  function selectCycle(billingCycle: string) {
    const plan = plans.find((item) => item.id === form.planId);
    setForm((current) => ({ ...current, billingCycle, amount: String(billingCycle === "annual" ? plan?.priceAnnual ?? 0 : plan?.priceMonthly ?? 0) }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setError("");
    const plan = plans.find((item) => item.id === form.planId);
    try {
      const response = await fetch("/api/admin/subscriptions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, planName: plan?.name }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Could not save member");
      setStatus("success");
      setForm((current) => ({ ...current, memberName: "", email: "", phone: "" }));
      router.refresh();
    } catch (submissionError) {
      setStatus("error");
      setError(submissionError instanceof Error ? submissionError.message : "Could not save member");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[["memberName", "Member name", "text"], ["email", "Email", "email"], ["phone", "Phone", "tel"]].map(([field, label, type]) => (
          <label key={field} className="text-xs text-neutral-400">{label}<input required type={type} value={form[field as keyof typeof form]} onChange={(event) => update(field, event.target.value)} className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2.5 text-sm text-white outline-none focus:border-orange-500" /></label>
        ))}
        <label className="text-xs text-neutral-400">Plan<select required value={form.planId} onChange={(event) => selectPlan(event.target.value)} className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2.5 text-sm text-white outline-none focus:border-orange-500">{plans.map((plan) => <option key={plan.id} value={plan.id}>{plan.name}</option>)}</select></label>
        <label className="text-xs text-neutral-400">Billing cycle<select value={form.billingCycle} onChange={(event) => selectCycle(event.target.value)} className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2.5 text-sm text-white outline-none focus:border-orange-500"><option value="monthly">Monthly</option><option value="annual">Annual</option></select></label>
        <label className="text-xs text-neutral-400">Amount paid (INR)<input required min="0" type="number" value={form.amount} onChange={(event) => update("amount", event.target.value)} className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2.5 text-sm text-white outline-none focus:border-orange-500" /></label>
        <label className="text-xs text-neutral-400">Membership started<input required type="date" value={form.startAt} onChange={(event) => update("startAt", event.target.value)} className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2.5 text-sm text-white outline-none focus:border-orange-500" /></label>
        <label className="text-xs text-neutral-400">Membership ends<input required type="date" value={form.endAt} onChange={(event) => update("endAt", event.target.value)} className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2.5 text-sm text-white outline-none focus:border-orange-500" /></label>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-4"><button type="submit" disabled={status === "saving" || !plans.length} className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60">{status === "saving" ? "Adding..." : "Add existing member"}</button>{status === "success" && <span className="text-sm text-green-400">Member added.</span>}{status === "error" && <span className="text-sm text-red-400">{error}</span>}</div>
    </form>
  );
}