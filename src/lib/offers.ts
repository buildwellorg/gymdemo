export interface Offer {
  id: string;
  title: string;
  description: string;
  discountLabel: string;
  active: boolean;
  expiresAt: string; // ISO date string, e.g. "2026-12-31"; empty string = no expiry
}

export function getDiscountPercent(discountLabel: string): number {
  const match = discountLabel.match(/(\d+(?:\.\d+)?)\s*%/);
  if (!match) return 0;
  return Math.min(100, Math.max(0, Number(match[1])));
}

// No offers by default — the banner simply doesn't render until the admin adds one.
export const offers: Offer[] = [];
