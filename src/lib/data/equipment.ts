import { cache } from "react";
import { getAdminDb, isAdminConfigured } from "@/lib/firebase-admin";
import {
  basicEquipment as fallbackBasic,
  advancedEquipment as fallbackAdvanced,
  type Equipment,
} from "@/lib/equipment";

const EQUIPMENT_COLLECTION = "equipment";
const EQUIPMENT_DOC_ID = "list";

export interface EquipmentData {
  basic: Equipment[];
  advanced: Equipment[];
}

export const getEquipmentData = cache(async (): Promise<EquipmentData> => {
  const fallback: EquipmentData = { basic: fallbackBasic, advanced: fallbackAdvanced };
  if (!isAdminConfigured()) return fallback;

  try {
    const snap = await getAdminDb().collection(EQUIPMENT_COLLECTION).doc(EQUIPMENT_DOC_ID).get();
    const data = snap.data() as EquipmentData | undefined;
    if (data?.basic?.length) return data;
  } catch (error) {
    console.warn("Could not load equipment from Firestore, using fallback:", error);
  }
  return fallback;
});

export async function saveEquipmentData(data: EquipmentData): Promise<void> {
  await getAdminDb().collection(EQUIPMENT_COLLECTION).doc(EQUIPMENT_DOC_ID).set(data);
}
