import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-neutral-950"
    >
      {/* Placeholder background image. Swap with a real photo or <video> later. */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <span className="mb-4 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-1 text-xs font-semibold tracking-wide text-orange-400 uppercase">
          Now open in your neighborhood
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          Train Hard. <span className="text-orange-500">Live Stronger.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-neutral-300 sm:text-lg">
          State-of-the-art equipment, expert trainers, and a community that pushes you
          further &mdash; all under one roof. Your transformation starts here.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="#contact"
            className="rounded-full bg-orange-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition-colors hover:bg-orange-600"
          >
            Book Free Trial
          </Link>
          <Link
            href="#membership"
            className="rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            View Membership Plans
          </Link>
        </div>
      </div>
    </section>
  );
}
