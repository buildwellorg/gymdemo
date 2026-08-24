import { cache } from "react";
import { getAdminDb, isAdminConfigured } from "@/lib/firebase-admin";
import { trainers as fallbackTrainers, type Trainer } from "@/lib/trainers";

const TRAINERS_COLLECTION = "trainers";
const TRAINERS_DOC_ID = "list";

interface TrainersDoc {
  trainers: Trainer[];
}

export const getTrainersData = cache(async (): Promise<Trainer[]> => {
  if (!isAdminConfigured()) return fallbackTrainers;

  try {
    const snap = await getAdminDb().collection(TRAINERS_COLLECTION).doc(TRAINERS_DOC_ID).get();
    const data = snap.data() as TrainersDoc | undefined;
    if (data?.trainers?.length) return data.trainers;
  } catch (error) {
    console.warn("Could not load trainers from Firestore, using fallback:", error);
  }
  return fallbackTrainers;
});

export async function saveTrainersData(trainers: Trainer[]): Promise<void> {
  await getAdminDb().collection(TRAINERS_COLLECTION).doc(TRAINERS_DOC_ID).set({ trainers });
}
