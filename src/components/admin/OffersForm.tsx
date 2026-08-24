"use client";

import { useState, type FormEvent } from "react";
import type { Offer } from "@/lib/offers";

type Status = "idle" | "saving" | "success" | "error";

function emptyOffer(): Offer {
  return {
    id: `offer-${Date.now()}`,
    title: "",
    description: "",
    discountLabel: "",
    active: true,
    expiresAt: "",
  };
}

export default function OffersForm({ initialOffers }: { initialOffers: Offer[] }) {
  const [offers, setOffers] = useState<Offer[]>(initialOffers);
  const [status, setStatus] = useState<Status>("idle");

  function updateOffer<K extends keyof Offer>(index: number, field: K, value: Offer[K]) {
    setOffers((prev) => prev.map((o, i) => (i === index ? { ...o, [field]: value } : o)));
  }

  function removeOffer(index: number) {
    setOffers((prev) => prev.filter((_, i) => i !== index));
  }

  function addOffer() {
    setOffers((prev) => [...prev, emptyOffer()]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");

    try {
      const res = await fetch("/api/admin/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offers }),
      });
      if (!res.ok) throw new Error("Save failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        {offers.map((offer, index) => (
          <div
            key={offer.id}
            className="rounded-2xl border border-white/10 bg-neutral-900/50 p-4"
          >
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-neutral-400">
                <input
                  type="checkbox"
                  checked={offer.active}
                  onChange={(e) => updateOffer(index, "active", e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-neutral-950"
                />
                Active
              </label>
              <button
                type="button"
                onClick={() => removeOffer(index)}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>
            <div className="mt-2 space-y-2">
              <input
                type="text"
                placeholder="Title (e.g. New Year Special)"
                required
                value={offer.title}
                onChange={(e) => updateOffer(index, "title", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Discount Label (e.g. 20% OFF)"
                value={offer.discountLabel}
                onChange={(e) => updateOffer(index, "discountLabel", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
              />
              <textarea
                placeholder="Description"
                rows={2}
                value={offer.description}
                onChange={(e) => updateOffer(index, "description", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
              />
              <div>
                <label className="block text-xs text-neutral-400">
                  Expires (optional)
                </label>
                <input
                  type="date"
                  value={offer.expiresAt}
                  onChange={(e) => updateOffer(index, "expiresAt", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addOffer}
          className="flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-white/20 text-sm text-neutral-400 transition-colors hover:border-orange-500/50 hover:text-orange-400"
        >
          + Add Offer
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
        {status === "success" && <span className="text-sm text-green-400">Saved.</span>}
        {status === "error" && (
          <span className="text-sm text-red-400">Could not save.</span>
        )}
      </div>
    </form>
  );
}
