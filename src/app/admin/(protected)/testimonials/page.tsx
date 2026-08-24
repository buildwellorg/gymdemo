import { getTestimonialsData } from "@/lib/data/testimonials";
import TestimonialsForm from "@/components/admin/TestimonialsForm";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonialsData();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit Testimonials</h1>
      <p className="mt-1 text-sm text-neutral-400">
        Transformations and member quotes shown on the public site.
      </p>

      <div className="mt-8">
        <TestimonialsForm initialTestimonials={testimonials} />
      </div>
    </div>
  );
}
