import { gymClasses } from "@/lib/classes";
import { whatsappLink } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/data/site-settings";

export default async function Classes() {
  const siteConfig = await getSiteSettings();

  return (
    <section id="classes" className="bg-neutral-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Classes &amp; Services
          </h2>
          <p className="mt-4 text-neutral-400">
            Group classes, personal coaching, and nutrition guidance &mdash; pick what
            fits your goals.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gymClasses.map((item) => (
            <div
              key={item.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50"
            >
              <div className="aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold text-white">{item.name}</h3>
                <p className="mt-2 text-sm text-neutral-400">{item.description}</p>
                <p className="mt-3 text-xs font-semibold tracking-wide text-orange-400 uppercase">
                  {item.schedule}
                </p>
                <a
                  href={whatsappLink(
                    siteConfig,
                    `Hi! I'd like to reserve a slot for ${item.name}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-500 hover:border-orange-500"
                >
                  Reserve Slot
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
