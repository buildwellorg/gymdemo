"use client";

import { useState, type FormEvent } from "react";
import type { Testimonial } from "@/lib/testimonials";

type Status = "idle" | "saving" | "success" | "error";

function emptyTestimonial(): Testimonial {
  return {
    id: `testimonial-${Date.now()}`,
    name: "",
    result: "",
    quote: "",
    beforePhoto: "",
    afterPhoto: "",
  };
}

export default function TestimonialsForm({
  initialTestimonials,
}: {
  initialTestimonials: Testimonial[];
}) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [status, setStatus] = useState<Status>("idle");

  function updateTestimonial(index: number, field: keyof Testimonial, value: string) {
    setTestimonials((prev) =>
      prev.map((t, i) => (i === index ? { ...t, [field]: value } : t)),
    );
  }

  function removeTestimonial(index: number) {
    setTestimonials((prev) => prev.filter((_, i) => i !== index));
  }

  function addTestimonial() {
    setTestimonials((prev) => [...prev, emptyTestimonial()]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");

    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testimonials }),
      });
      if (!res.ok) throw new Error("Save failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 lg:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className="rounded-2xl border border-white/10 bg-neutral-900/50 p-4"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removeTestimonial(index)}
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
                value={testimonial.name}
                onChange={(e) => updateTestimonial(index, "name", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Result (e.g. Lost 14 kg in 6 months)"
                value={testimonial.result}
                onChange={(e) => updateTestimonial(index, "result", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
              />
              <textarea
                placeholder="Quote"
                rows={3}
                value={testimonial.quote}
                onChange={(e) => updateTestimonial(index, "quote", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Before Photo URL"
                value={testimonial.beforePhoto}
                onChange={(e) => updateTestimonial(index, "beforePhoto", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="After Photo URL"
                value={testimonial.afterPhoto}
                onChange={(e) => updateTestimonial(index, "afterPhoto", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addTestimonial}
          className="flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-white/20 text-sm text-neutral-400 transition-colors hover:border-orange-500/50 hover:text-orange-400"
        >
          + Add Testimonial
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
