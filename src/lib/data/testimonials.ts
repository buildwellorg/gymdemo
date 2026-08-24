import { cache } from "react";
import { getAdminDb, isAdminConfigured } from "@/lib/firebase-admin";
import { testimonials as fallbackTestimonials, type Testimonial } from "@/lib/testimonials";

const TESTIMONIALS_COLLECTION = "testimonials";
const TESTIMONIALS_DOC_ID = "list";

interface TestimonialsDoc {
  testimonials: Testimonial[];
}

export const getTestimonialsData = cache(async (): Promise<Testimonial[]> => {
  if (!isAdminConfigured()) return fallbackTestimonials;

  try {
    const snap = await getAdminDb()
      .collection(TESTIMONIALS_COLLECTION)
      .doc(TESTIMONIALS_DOC_ID)
      .get();
    const data = snap.data() as TestimonialsDoc | undefined;
    if (data?.testimonials?.length) return data.testimonials;
  } catch (error) {
    console.warn("Could not load testimonials from Firestore, using fallback:", error);
  }
  return fallbackTestimonials;
});

export async function saveTestimonialsData(testimonials: Testimonial[]): Promise<void> {
  await getAdminDb()
    .collection(TESTIMONIALS_COLLECTION)
    .doc(TESTIMONIALS_DOC_ID)
    .set({ testimonials });
}
