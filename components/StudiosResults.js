import EmptyState from "./EmptyState";
import StudioCard from "./StudioCard";
import { getStudios } from "@/lib/api";

export default async function StudiosResults({ filters }) {
  const studios = await getStudios(filters);

  if (studios === null) {
    return (
      <EmptyState
        title="We could not load the studios"
        text="Something went wrong while reaching our servers. Please try again in a moment."
        actionHref="/studios"
        actionLabel="Try Again"
      />
    );
  }

  if (studios.length === 0) {
    return (
      <EmptyState
        title="No studios match your search"
        text="Try a different keyword or category, or clear the filters to see every space."
        actionHref="/studios"
        actionLabel="Clear Filters"
      />
    );
  }

  return (
    <>
      <p className="mb-4 text-sm opacity-70">
        {studios.length} {studios.length === 1 ? "studio" : "studios"} found
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {studios.map((studio) => (
          <StudioCard key={studio._id} studio={studio} />
        ))}
      </div>
    </>
  );
}