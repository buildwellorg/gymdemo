import Link from "next/link";

const sections = [
  { name: "Pricing", description: "Membership tiers & pricing", href: "/admin/pricing" },
  { name: "Offers", description: "Promotions & discounts", href: "/admin/offers" },
  {
    name: "Equipment",
    description: "Basic & advanced equipment",
    href: "/admin/equipment",
  },
  { name: "Trainers", description: "Trainer profiles", href: "/admin/trainers" },
  {
    name: "Testimonials",
    description: "Transformations & quotes",
    href: "/admin/testimonials",
  },
  {
    name: "Site Settings",
    description: "Contact info, hours, address",
    href: "/admin/settings",
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-neutral-400">
        Manage the content shown on the public site.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const content = (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-white">{section.name}</h2>
                {!section.href && (
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-neutral-400 uppercase">
                    Coming soon
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-neutral-400">{section.description}</p>
            </>
          );

          if (section.href) {
            return (
              <Link
                key={section.name}
                href={section.href}
                className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6 transition-colors hover:border-orange-500/50 hover:bg-neutral-900"
              >
                {content}
              </Link>
            );
          }

          return (
            <div
              key={section.name}
              className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6"
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
