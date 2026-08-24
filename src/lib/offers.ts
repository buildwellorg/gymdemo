export interface Offer {
  id: string;
  title: string;
  description: string;
  discountLabel: string;
  active: boolean;
  expiresAt: string; // ISO date string, e.g. "2026-12-31"; empty string = no expiry
}

// No offers by default — the banner simply doesn't render until the admin adds one.
export const offers: Offer[] = [];
