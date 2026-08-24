import { cache } from "react";
import { getAdminDb, isAdminConfigured } from "@/lib/firebase-admin";
import { defaultSiteConfig, type SiteConfig } from "@/lib/site-config";

const SITE_SETTINGS_COLLECTION = "siteConfig";
const SITE_SETTINGS_DOC_ID = "main";

// Cached per-request so every component that needs site settings (Header,
// Footer, Contact, Location, Classes, ...) can fetch independently without
// hitting Firestore more than once for the same page render.
export const getSiteSettings = cache(async (): Promise<SiteConfig> => {
  if (!isAdminConfigured()) return defaultSiteConfig;

  try {
    const snap = await getAdminDb()
      .collection(SITE_SETTINGS_COLLECTION)
      .doc(SITE_SETTINGS_DOC_ID)
      .get();
    const data = snap.data() as SiteConfig | undefined;
    if (data?.name) return data;
  } catch (error) {
    console.warn("Could not load site settings from Firestore, using fallback:", error);
  }
  return defaultSiteConfig;
});

export async function saveSiteSettings(config: SiteConfig): Promise<void> {
  await getAdminDb()
    .collection(SITE_SETTINGS_COLLECTION)
    .doc(SITE_SETTINGS_DOC_ID)
    .set(config);
}
