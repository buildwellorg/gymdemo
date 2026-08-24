import { getSiteSettings } from "@/lib/data/site-settings";

export default async function Location() {
  const siteConfig = await getSiteSettings();
  const mapQuery = encodeURIComponent(siteConfig.address);

  return (
    <section className="bg-neutral-900 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Find Us
          </h2>
          <p className="mt-4 text-neutral-400">
            Drop by anytime during our operating hours &mdash; walk-ins are always
            welcome.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="Gym location map"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-80 w-full lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-neutral-950 p-8">
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-orange-400 uppercase">
                Address
              </h3>
              <p className="mt-2 text-lg text-white">{siteConfig.address}</p>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold tracking-wide text-orange-400 uppercase">
                Hours
              </h3>
              <dl className="mt-2 space-y-2 text-neutral-300">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <dt>Monday &ndash; Saturday</dt>
                  <dd className="font-medium text-white">{siteConfig.hours.weekdays}</dd>
                </div>
                <div className="flex justify-between pb-2">
                  <dt>Sunday</dt>
                  <dd className="font-medium text-white">{siteConfig.hours.sunday}</dd>
                </div>
              </dl>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-orange-500 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
