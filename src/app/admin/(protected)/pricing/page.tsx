import { getPricingPlans } from "@/lib/data/pricing";
import PricingForm from "@/components/admin/PricingForm";

export default async function AdminPricingPage() {
  const plans = await getPricingPlans();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit Pricing</h1>
      <p className="mt-1 text-sm text-neutral-400">
        Changes here update the Membership section on the public site on next page
        load.
      </p>

      <div className="mt-8">
        <PricingForm initialPlans={plans} />
      </div>
    </div>
  );
}
