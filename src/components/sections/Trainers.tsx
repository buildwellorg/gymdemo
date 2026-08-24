import { getTrainersData } from "@/lib/data/trainers";

export default async function Trainers() {
  const trainers = await getTrainersData();

  return (
    <section id="trainers" className="bg-neutral-900 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Meet Our Trainers
          </h2>
          <p className="mt-4 text-neutral-400">
            Certified experts dedicated to helping you train safely and hit your goals.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 text-center"
            >
              <div className="aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={trainer.photo}
                  alt={trainer.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-white">{trainer.name}</h3>
                <p className="mt-1 text-xs font-semibold tracking-wide text-orange-400 uppercase">
                  {trainer.specialty}
                </p>
                <p className="mt-2 text-sm text-neutral-400">{trainer.certification}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
