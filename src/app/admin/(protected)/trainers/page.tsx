import { getTrainersData } from "@/lib/data/trainers";
import TrainersForm from "@/components/admin/TrainersForm";

export default async function AdminTrainersPage() {
  const trainers = await getTrainersData();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit Trainers</h1>
      <p className="mt-1 text-sm text-neutral-400">
        Trainer profiles shown on the public site.
      </p>

      <div className="mt-8">
        <TrainersForm initialTrainers={trainers} />
      </div>
    </div>
  );
}
