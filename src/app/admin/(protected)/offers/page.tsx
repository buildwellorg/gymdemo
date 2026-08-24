import { getOffersData } from "@/lib/data/offers";
import OffersForm from "@/components/admin/OffersForm";

export default async function AdminOffersPage() {
  const offers = await getOffersData();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit Offers</h1>
      <p className="mt-1 text-sm text-neutral-400">
        Active, non-expired offers appear as a banner near the top of the public site.
      </p>

      <div className="mt-8">
        <OffersForm initialOffers={offers} />
      </div>
    </div>
  );
}
