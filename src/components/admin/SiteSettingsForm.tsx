"use client";

import { useState, type FormEvent } from "react";
import type { SiteConfig } from "@/lib/site-config";

type Status = "idle" | "saving" | "success" | "error";

export default function SiteSettingsForm({ initialConfig }: { initialConfig: SiteConfig }) {
  const [config, setConfig] = useState<SiteConfig>(initialConfig);
  const [status, setStatus] = useState<Status>("idle");

  function updateField<K extends keyof SiteConfig>(field: K, value: SiteConfig[K]) {
    setConfig((prev) => ({ ...prev, [field]: value }));
  }

  function updateHours(field: keyof SiteConfig["hours"], value: string) {
    setConfig((prev) => ({ ...prev, hours: { ...prev.hours, [field]: value } }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");

    try {
      const res = await fetch("/api/admin/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (!res.ok) throw new Error("Save failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-white/10 bg-neutral-900/50 p-6"
    >
      <div>
        <label className="block text-xs text-neutral-400">Gym Name</label>
        <input
          type="text"
          required
          value={config.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
        />
      </div>

      <div>
        <label className="block text-xs text-neutral-400">Tagline</label>
        <input
          type="text"
          value={config.tagline}
          onChange={(e) => updateField("tagline", e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-neutral-400">
            WhatsApp Number (with country code, no +)
          </label>
          <input
            type="text"
            required
            placeholder="919284812726"
            value={config.whatsappNumber}
            onChange={(e) => updateField("whatsappNumber", e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
          />
        </div>
        <div>
          <label className="block text-xs text-neutral-400">Call Number</label>
          <input
            type="text"
            required
            placeholder="+919284812726"
            value={config.callNumber}
            onChange={(e) => updateField("callNumber", e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-neutral-400">Instagram Handle (no @)</label>
        <input
          type="text"
          value={config.instagramHandle}
          onChange={(e) => updateField("instagramHandle", e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
        />
      </div>

      <div>
        <label className="block text-xs text-neutral-400">Address</label>
        <input
          type="text"
          required
          value={config.address}
          onChange={(e) => updateField("address", e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-neutral-400">Hours: Mon&ndash;Sat</label>
          <input
            type="text"
            required
            value={config.hours.weekdays}
            onChange={(e) => updateHours("weekdays", e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
          />
        </div>
        <div>
          <label className="block text-xs text-neutral-400">Hours: Sunday</label>
          <input
            type="text"
            required
            value={config.hours.sunday}
            onChange={(e) => updateHours("sunday", e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2">
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
