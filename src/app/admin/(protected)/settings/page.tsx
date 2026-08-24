import { getSiteSettings } from "@/lib/data/site-settings";
import SiteSettingsForm from "@/components/admin/SiteSettingsForm";

export default async function AdminSiteSettingsPage() {
  const config = await getSiteSettings();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Site Settings</h1>
      <p className="mt-1 text-sm text-neutral-400">
        Contact info, hours, and address shown across the public site.
      </p>

      <div className="mt-8 max-w-2xl">
        <SiteSettingsForm initialConfig={config} />
      </div>
    </div>
  );
}
