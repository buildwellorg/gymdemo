export interface SiteConfig {
  name: string;
  tagline: string;
  whatsappNumber: string;
  callNumber: string;
  instagramHandle: string;
  address: string;
  hours: {
    weekdays: string;
    sunday: string;
  };
}

// Fallback used until Site Settings are saved in Firestore (or if Firebase
// Admin isn't configured yet). See src/lib/data/site-settings.ts.
export const defaultSiteConfig: SiteConfig = {
  name: "PowerHouse Fitness",
  tagline: "Train Hard. Live Stronger.",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919284812726",
  callNumber: process.env.NEXT_PUBLIC_CALL_NUMBER || "+919284812726",
  instagramHandle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "yourgym",
  address: "123 MG Road, Near City Mall, Bengaluru, Karnataka 560001",
  hours: {
    weekdays: "5:00 AM - 10:00 PM",
    sunday: "6:00 AM - 8:00 PM",
  },
};

export const navLinks = [
  { label: "Gym", href: "#gym" },
  { label: "Classes", href: "#classes" },
  { label: "Trainers", href: "#trainers" },
  { label: "Membership", href: "#membership" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function whatsappLink(
  siteConfig: SiteConfig,
  message = "Hi! I'd like to know more about membership.",
): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function callLink(siteConfig: SiteConfig): string {
  return `tel:${siteConfig.callNumber}`;
}
