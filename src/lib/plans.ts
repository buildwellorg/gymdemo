export type BillingCycle = "monthly" | "annual";

export interface MembershipPlan {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnual: number;
  featured?: boolean;
  features: string[];
}

// Placeholder pricing in INR. Replace with real numbers before launch.
export const membershipPlans: MembershipPlan[] = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Everything you need to get moving",
    priceMonthly: 1499,
    priceAnnual: 14990,
    features: [
      "Full gym floor access",
      "Locker facility",
      "1 free fitness assessment",
      "Access during standard hours",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    tagline: "Our most popular plan",
    priceMonthly: 2499,
    priceAnnual: 24990,
    featured: true,
    features: [
      "Everything in Basic",
      "All group classes (Zumba, Yoga, CrossFit)",
      "2 personal training sessions / month",
      "Diet consultation",
      "Extended hours access",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Full access, zero compromises",
    priceMonthly: 3999,
    priceAnnual: 39990,
    features: [
      "Everything in Gold",
      "Unlimited personal training",
      "Priority class booking",
      "Advanced equipment zone access",
      "Guest passes (2 / month)",
      "24/7 access",
    ],
  },
];
