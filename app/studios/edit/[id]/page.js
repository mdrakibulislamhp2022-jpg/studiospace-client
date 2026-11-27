import { notFound } from "next/navigation";
import { getStudio } from "../../../../lib/api";
import EditStudio from "../../../../components/EditStudio";

export const metadata = {
  title: "Update Studio | StudioSpace",
};

export default async function EditStudioPage({ params }) {
  const { id } = await params;
  const studio = await getStudio(id);
  if (!studio) notFound();

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">Update Studio</h1>
      <p className="mt-2 mb-8 opacity-70">Change any detail below and save to update your listing.</p>
      <div className="rounded-box border border-base-300 bg-base-100 p-6 shadow-sm">
        <EditStudio studio={studio} />
      </div>
    </section>
  );
}