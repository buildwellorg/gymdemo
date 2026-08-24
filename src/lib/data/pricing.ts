import { cache } from "react";
import { getAdminDb, isAdminConfigured } from "@/lib/firebase-admin";
import { membershipPlans as fallbackPlans, type MembershipPlan } from "@/lib/plans";

const PRICING_COLLECTION = "pricing";
const PRICING_DOC_ID = "plans";

interface PricingDoc {
  plans: MembershipPlan[];
}

// Server-only. Reads the live pricing doc for the public site and admin
// forms. Falls back to placeholder plans if Firebase Admin isn't configured
// yet, or if the document doesn't exist, so the site keeps working either way.
export const getPricingPlans = cache(async (): Promise<MembershipPlan[]> => {
  if (!isAdminConfigured()) return fallbackPlans;

  try {
    const snap = await getAdminDb()
      .collection(PRICING_COLLECTION)
      .doc(PRICING_DOC_ID)
      .get();
    const data = snap.data() as PricingDoc | undefined;
    if (data?.plans?.length) return data.plans;
  } catch (error) {
    console.warn("Could not load pricing from Firestore, using fallback:", error);
  }
  return fallbackPlans;
});

export async function savePricingPlans(plans: MembershipPlan[]): Promise<void> {
  await getAdminDb()
    .collection(PRICING_COLLECTION)
    .doc(PRICING_DOC_ID)
    .set({ plans });
}
