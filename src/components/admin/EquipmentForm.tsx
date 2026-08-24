"use client";

import { useState, type FormEvent } from "react";
import type { Equipment } from "@/lib/equipment";
import type { EquipmentData } from "@/lib/data/equipment";

type Status = "idle" | "saving" | "success" | "error";

function emptyItem(): Equipment {
  return { id: `item-${Date.now()}`, name: "", description: "", image: "" };
}

function EquipmentList({
  title,
  items,
  onChange,
}: {
  title: string;
  items: Equipment[];
  onChange: (items: Equipment[]) => void;
}) {
  function updateItem(index: number, field: keyof Equipment, value: string) {
    onChange(items.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function addItem() {
    onChange([...items, emptyItem()]);
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="rounded-2xl border border-white/10 bg-neutral-900/50 p-4"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Name"
                required
                value={item.name}
                onChange={(e) => updateItem(index, "name", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Description"
                value={item.description}
                onChange={(e) => updateItem(index, "description", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={item.image}
                onChange={(e) => updateItem(index, "image", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="flex min-h-[140px] items-center justify-center rounded-2xl border border-dashed border-white/20 text-sm text-neutral-400 transition-colors hover:border-orange-500/50 hover:text-orange-400"
        >
          + Add Item
        </button>
      </div>
    </div>
  );
}

export default function EquipmentForm({ initialData }: { initialData: EquipmentData }) {
  const [data, setData] = useState<EquipmentData>(initialData);
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");

    try {
      const res = await fetch("/api/admin/equipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Save failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <EquipmentList
        title="Basic Equipment"
        items={data.basic}
        onChange={(basic) => setData((prev) => ({ ...prev, basic }))}
      />
      <EquipmentList
        title="Advanced Equipment"
        items={data.advanced}
        onChange={(advanced) => setData((prev) => ({ ...prev, advanced }))}
      />

      <div className="flex items-center gap-4">
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
