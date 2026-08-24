import { cache } from "react";
import { getAdminDb, isAdminConfigured } from "@/lib/firebase-admin";
import { offers as fallbackOffers, type Offer } from "@/lib/offers";

const OFFERS_COLLECTION = "offers";
const OFFERS_DOC_ID = "list";

interface OffersDoc {
  offers: Offer[];
}

export const getOffersData = cache(async (): Promise<Offer[]> => {
  if (!isAdminConfigured()) return fallbackOffers;

  try {
    const snap = await getAdminDb().collection(OFFERS_COLLECTION).doc(OFFERS_DOC_ID).get();
    const data = snap.data() as OffersDoc | undefined;
    if (data?.offers) return data.offers;
  } catch (error) {
    console.warn("Could not load offers from Firestore, using fallback:", error);
  }
  return fallbackOffers;
});

// Offers that are marked active and not past their expiry date, if any.
export async function getActiveOffers(): Promise<Offer[]> {
  const all = await getOffersData();
  const today = new Date().toISOString().slice(0, 10);
  return all.filter((o) => o.active && (!o.expiresAt || o.expiresAt >= today));
}

export async function saveOffersData(offers: Offer[]): Promise<void> {
  await getAdminDb().collection(OFFERS_COLLECTION).doc(OFFERS_DOC_ID).set({ offers });
}
