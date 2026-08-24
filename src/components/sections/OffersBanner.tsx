import { getActiveOffers } from "@/lib/data/offers";

export default async function OffersBanner() {
  const offers = await getActiveOffers();
  if (offers.length === 0) return null;

  return (
    <div className="border-b border-orange-500/20 bg-orange-500/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-6 sm:px-6 lg:px-8">
        {offers.map((offer) => (
          <div key={offer.id} className="flex items-center gap-2 text-sm">
            {offer.discountLabel && (
              <span className="rounded-full bg-orange-500 px-2.5 py-0.5 text-xs font-bold text-white">
                {offer.discountLabel}
              </span>
            )}
            <span className="font-semibold text-white">{offer.title}</span>
            {offer.description && (
              <span className="text-orange-200/80">{offer.description}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
