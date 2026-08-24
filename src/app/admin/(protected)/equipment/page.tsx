import { getEquipmentData } from "@/lib/data/equipment";
import EquipmentForm from "@/components/admin/EquipmentForm";

export default async function AdminEquipmentPage() {
  const data = await getEquipmentData();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit Equipment</h1>
      <p className="mt-1 text-sm text-neutral-400">
        Basic and advanced equipment shown on the public site.
      </p>

      <div className="mt-8">
        <EquipmentForm initialData={data} />
      </div>
    </div>
  );
}
