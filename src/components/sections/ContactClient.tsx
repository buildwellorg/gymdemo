"use client";

import { useState, type FormEvent } from "react";
import { callLink, whatsappLink, type SiteConfig } from "@/lib/site-config";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactClient({ siteConfig }: { siteConfig: SiteConfig }) {
  const [status, setStatus] = useState<Status>("idle");

  const contactChannels = [
    {
      label: "WhatsApp",
      value: "Chat with us instantly",
      href: whatsappLink(siteConfig),
      external: true,
    },
    {
      label: "Call",
      value: siteConfig.callNumber,
      href: callLink(siteConfig),
      external: false,
    },
    {
      label: "Instagram",
      value: `@${siteConfig.instagramHandle}`,
      href: `https://instagram.com/${siteConfig.instagramHandle}`,
      external: true,
    },
    {
      label: "Walk-in Hours",
      value: `${siteConfig.hours.weekdays} (Mon-Sat)`,
      href: undefined,
      external: false,
    },
  ];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          message: formData.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-neutral-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mt-4 text-neutral-400">
            Reach us however&apos;s easiest &mdash; we respond fastest on WhatsApp.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactChannels.map((channel) =>
            channel.href ? (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6 text-center transition-colors hover:border-orange-500/50 hover:bg-neutral-900"
              >
                <p className="text-sm font-semibold tracking-wide text-orange-400 uppercase">
                  {channel.label}
                </p>
                <p className="mt-2 text-sm text-neutral-300">{channel.value}</p>
              </a>
            ) : (
              <div
                key={channel.label}
                className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6 text-center"
              >
                <p className="text-sm font-semibold tracking-wide text-orange-400 uppercase">
                  {channel.label}
                </p>
                <p className="mt-2 text-sm text-neutral-300">{channel.value}</p>
              </div>
            ),
          )}
        </div>

        <div className="mx-auto mt-14 max-w-xl">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-neutral-900/50 p-8"
          >
            <h3 className="text-lg font-bold text-white">Send us a message</h3>
            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm text-neutral-300">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-2.5 text-sm text-white outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm text-neutral-300">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-2.5 text-sm text-white outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-neutral-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-2.5 text-sm text-white outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-6 w-full rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="mt-4 text-sm text-green-400">
                Thanks! We&apos;ll get back to you shortly.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm text-red-400">
                Something went wrong. Please try WhatsApp or call instead.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
