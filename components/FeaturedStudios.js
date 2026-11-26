import Link from "next/link";
import SectionHeading from "./SectionHeading";
import StudioCard from "./StudioCard";
import { getFeaturedStudios } from "@/lib/api";

export default async function FeaturedStudios() {
  const studios = await getFeaturedStudios();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading
        eyebrow="Featured Studios"
        title="Fresh spaces ready to book"
        subtitle="The newest studios on StudioSpace, listed by hosts who care about your shoot."
      />

      {studios.length === 0 ? (
        <div className="rounded-box border border-dashed border-base-300 bg-base-200 px-6 py-14 text-center">
          <h3 className="text-xl font-semibold">No studios listed yet</h3>
          <p className="mx-auto mt-2 max-w-md opacity-80">
            Be the first host on StudioSpace and put your space in front of local creators.
          </p>
          <Link href="/add-studio" className="btn btn-primary mt-6">
            List Your Studio
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studios.map((studio) => (
            <StudioCard key={studio._id} studio={studio} />
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link href="/studios" className="btn btn-outline">
          See All Studios
        </Link>
      </div>
    </section>
  );
}