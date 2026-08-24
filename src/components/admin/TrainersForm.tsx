"use client";

import { useState, type FormEvent } from "react";
import type { Trainer } from "@/lib/trainers";

type Status = "idle" | "saving" | "success" | "error";

function emptyTrainer(): Trainer {
  return { id: `trainer-${Date.now()}`, name: "", certification: "", specialty: "", photo: "" };
}

export default function TrainersForm({ initialTrainers }: { initialTrainers: Trainer[] }) {
  const [trainers, setTrainers] = useState<Trainer[]>(initialTrainers);
  const [status, setStatus] = useState<Status>("idle");

  function updateTrainer(index: number, field: keyof Trainer, value: string) {
    setTrainers((prev) =>
      prev.map((t, i) => (i === index ? { ...t, [field]: value } : t)),
    );
  }

  function removeTrainer(index: number) {
    setTrainers((prev) => prev.filter((_, i) => i !== index));
  }

  function addTrainer() {
    setTrainers((prev) => [...prev, emptyTrainer()]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");

    try {
      const res = await fetch("/api/admin/trainers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trainers }),
      });
      if (!res.ok) throw new Error("Save failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trainers.map((trainer, index) => (
          <div
            key={trainer.id}
            className="rounded-2xl border border-white/10 bg-neutral-900/50 p-4"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removeTrainer(index)}
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
                value={trainer.name}
                onChange={(e) => updateTrainer(index, "name", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Specialty"
                value={trainer.specialty}
                onChange={(e) => updateTrainer(index, "specialty", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Certification"
                value={trainer.certification}
                onChange={(e) => updateTrainer(index, "certification", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Photo URL"
                value={trainer.photo}
                onChange={(e) => updateTrainer(index, "photo", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addTrainer}
          className="flex min-h-[180px] items-center justify-center rounded-2xl border border-dashed border-white/20 text-sm text-neutral-400 transition-colors hover:border-orange-500/50 hover:text-orange-400"
        >
          + Add Trainer
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
