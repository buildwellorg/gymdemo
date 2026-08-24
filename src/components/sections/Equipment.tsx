import { getEquipmentData } from "@/lib/data/equipment";

export default async function Equipment() {
  const { basic: basicEquipment, advanced: advancedEquipment } = await getEquipmentData();

  return (
    <section id="gym" className="bg-neutral-900 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Our Equipment
          </h2>
          <p className="mt-4 text-neutral-400">
            A fully-equipped floor for every kind of training &mdash; from your first
            workout to your heaviest lift.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {basicEquipment.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-neutral-950"
            >
              <div className="aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <p className="mt-1 text-sm text-neutral-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-1 text-xs font-semibold tracking-wide text-orange-400 uppercase">
              Advanced Equipment
            </span>
            <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
              Train Like a Pro
            </h3>
            <p className="mt-3 text-neutral-400">
              Premium machines for members who want to push past the basics.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {advancedEquipment.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl border border-orange-500/30"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h4 className="text-lg font-bold text-white">{item.name}</h4>
                  <p className="mt-1 text-sm text-neutral-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
