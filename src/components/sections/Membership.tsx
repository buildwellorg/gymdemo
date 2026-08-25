import { getPricingPlans } from "@/lib/data/pricing";
import { getActiveOffers } from "@/lib/data/offers";
import { getDiscountPercent } from "@/lib/offers";
import MembershipClient from "@/components/sections/MembershipClient";

export default async function Membership() {
  const [plans, offers] = await Promise.all([getPricingPlans(), getActiveOffers()]);
  const discountPercent = Math.max(...offers.map((offer) => getDiscountPercent(offer.discountLabel)), 0);
  return <MembershipClient plans={plans} discountPercent={discountPercent} />;
}
