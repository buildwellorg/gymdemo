import { getSiteSettings } from "@/lib/data/site-settings";
import ContactClient from "@/components/sections/ContactClient";

export default async function Contact() {
  const siteConfig = await getSiteSettings();
  return <ContactClient siteConfig={siteConfig} />;
}
