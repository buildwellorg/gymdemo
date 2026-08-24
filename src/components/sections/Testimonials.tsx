import { getTestimonialsData } from "@/lib/data/testimonials";

export default async function Testimonials() {
  const testimonials = await getTestimonialsData();

  return (
    <section id="gallery" className="bg-neutral-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Real Transformations
          </h2>
          <p className="mt-4 text-neutral-400">
            Real members, real results. Here&apos;s what training with us has done for
            them.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50"
            >
              <div className="grid grid-cols-2">
                <div className="relative aspect-[3/4] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.beforePhoto}
                    alt={`${item.name} before`}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale"
                  />
                  <span className="absolute bottom-2 left-2 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                    Before
                  </span>
                </div>
                <div className="relative aspect-[3/4] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.afterPhoto}
                    alt={`${item.name} after`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                    After
                  </span>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-neutral-300">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-4">
                  <p className="text-sm font-bold text-white">{item.name}</p>
                  <p className="text-xs font-semibold tracking-wide text-orange-400 uppercase">
                    {item.result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
