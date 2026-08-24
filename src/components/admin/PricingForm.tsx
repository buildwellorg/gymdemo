"use client";

import { useState, type FormEvent } from "react";
import type { MembershipPlan } from "@/lib/plans";

interface FormPlan {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnual: number;
  featured: boolean;
  featuresText: string;
}

function toFormPlan(plan: MembershipPlan): FormPlan {
  return { ...plan, featured: !!plan.featured, featuresText: plan.features.join("\n") };
}

function toMembershipPlan(plan: FormPlan): MembershipPlan {
  return {
    id: plan.id,
    name: plan.name,
    tagline: plan.tagline,
    priceMonthly: plan.priceMonthly,
    priceAnnual: plan.priceAnnual,
    featured: plan.featured,
    features: plan.featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean),
  };
}

function emptyFormPlan(): FormPlan {
  return {
    id: `tier-${Date.now()}`,
    name: "",
    tagline: "",
    priceMonthly: 0,
    priceAnnual: 0,
    featured: false,
    featuresText: "",
  };
}

type Status = "idle" | "saving" | "success" | "error";

export default function PricingForm({ initialPlans }: { initialPlans: MembershipPlan[] }) {
  const [plans, setPlans] = useState<FormPlan[]>(initialPlans.map(toFormPlan));
  const [status, setStatus] = useState<Status>("idle");

  function updatePlan<K extends keyof FormPlan>(index: number, field: K, value: FormPlan[K]) {
    setPlans((prev) =>
      prev.map((plan, i) => (i === index ? { ...plan, [field]: value } : plan)),
    );
  }

  function removePlan(index: number) {
    setPlans((prev) => prev.filter((_, i) => i !== index));
  }

  function addPlan() {
    setPlans((prev) => [...prev, emptyFormPlan()]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");

    try {
      const res = await fetch("/api/admin/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plans: plans.map(toMembershipPlan) }),
      });

      if (!res.ok) throw new Error("Save failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                Tier {index + 1}
              </span>
              <button
                type="button"
                onClick={() => removePlan(index)}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs text-neutral-400">Name</label>
                <input
                  type="text"
                  required
                  value={plan.name}
                  onChange={(e) => updatePlan(index, "name", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400">Tagline</label>
                <input
                  type="text"
                  value={plan.tagline}
                  onChange={(e) => updatePlan(index, "tagline", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-neutral-400">
                    Price / month (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={plan.priceMonthly}
                    onChange={(e) =>
                      updatePlan(index, "priceMonthly", Number(e.target.value))
                    }
                    className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400">
                    Price / year (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={plan.priceAnnual}
                    onChange={(e) =>
                      updatePlan(index, "priceAnnual", Number(e.target.value))
                    }
                    className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-400">
                  Features (one per line)
                </label>
                <textarea
                  rows={5}
                  value={plan.featuresText}
                  onChange={(e) => updatePlan(index, "featuresText", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-neutral-400">
                <input
                  type="checkbox"
                  checked={plan.featured}
                  onChange={(e) => updatePlan(index, "featured", e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-neutral-950"
                />
                Mark as &quot;Most Popular&quot;
              </label>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addPlan}
          className="flex min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-white/20 text-sm text-neutral-400 transition-colors hover:border-orange-500/50 hover:text-orange-400"
        >
          + Add Tier
        </button>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "saving"}
          className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-60"
        >
          {status === "saving" ? "Saving..." : "Save Changes"}
        </button>
        {status === "success" && (
          <span className="text-sm text-green-400">Saved.</span>
        )}
        {status === "error" && (
          <span className="text-sm text-red-400">
            Could not save. Check Firebase Admin credentials are configured.
          </span>
        )}
      </div>
    </form>
  );
}
