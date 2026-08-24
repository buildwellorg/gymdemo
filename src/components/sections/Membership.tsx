import { getPricingPlans } from "@/lib/data/pricing";
import MembershipClient from "@/components/sections/MembershipClient";

export default async function Membership() {
  const plans = await getPricingPlans();
  return <MembershipClient plans={plans} />;
}
