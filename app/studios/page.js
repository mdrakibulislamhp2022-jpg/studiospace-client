import { Suspense } from "react";
import StudioFilters from "@/components/StudioFilters";
import StudiosResults from "@/components/StudiosResults";
import StudioGridSkeleton from "@/components/StudioGridSkeleton";

export const metadata = { title: "Explore Studios" };

const pick = (value) => (typeof value === "string" ? value : "");

export default async function StudiosPage({ searchParams }) {
  const params = await searchParams;
  const filters = {
    category: pick(params.category),
    search: pick(params.search),
    sort: pick(params.sort),
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-secondary">
          Explore Studios
        </p>
        <h1 className="text-3xl font-bold md:text-4xl">Find the space for your next project</h1>
        <p className="mt-3 opacity-80">
          Search by name, narrow by category and sort by price or rating to find the right room.
        </p>
      </div>

      <Suspense fallback={<div className="skeleton h-12 w-full" />}>
        <StudioFilters />
      </Suspense>

      <div className="mt-8">
        <Suspense key={JSON.stringify(filters)} fallback={<StudioGridSkeleton />}>
          <StudiosResults filters={filters} />
        </Suspense>
      </div>
    </section>
  );
}