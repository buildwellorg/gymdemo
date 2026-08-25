import { getActiveOffers } from "@/lib/data/offers";

export default async function OffersBanner() {
  const offers = await getActiveOffers();
  if (offers.length === 0) return null;

  return (
    <div className="offer-strip relative isolate overflow-hidden border-b border-orange-300/30 bg-[#170b05] text-white">
      <div className="offer-strip__spotlight" aria-hidden="true" />
      <div className="offer-strip__perforations" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-7xl items-center gap-4 px-5 py-3 sm:gap-6 sm:px-8">
        <div className="offer-strip__stamp hidden shrink-0 sm:flex">
          <span className="text-[9px] font-black tracking-[0.2em] text-orange-950 uppercase">Special</span>
          <span className="text-xl font-black leading-none text-orange-950">OFFER</span>
        </div>
        <div className="min-w-0 flex-1">
          {offers.slice(0, 1).map((offer) => (
            <div key={offer.id} className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-[10px] font-bold tracking-[0.24em] text-orange-300 uppercase">Now showing</span>
              {offer.discountLabel && <span className="offer-strip__badge rounded-md bg-orange-500 px-2.5 py-1 text-xs font-black text-white">{offer.discountLabel}</span>}
              <span className="text-sm font-bold text-white sm:text-base">{offer.title}</span>
              {offer.description && <span className="text-xs text-orange-100/70 sm:text-sm">{offer.description}</span>}
            </div>
          ))}
        </div>
        <span className="hidden shrink-0 border-l border-orange-200/20 pl-5 text-right text-[10px] font-bold tracking-[0.18em] text-orange-200 uppercase md:block">
          Claim yours<br />today
        </span>
      </div>
    </div>
  );
}
