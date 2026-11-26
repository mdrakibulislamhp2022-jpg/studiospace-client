import Link from "next/link";
import { notFound } from "next/navigation";
import { FiMapPin, FiCheck, FiArrowLeft } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";
import StudioGallery from "@/components/StudioGallery";
import BookingCard from "@/components/BookingCard";
import { getStudio } from "@/lib/api";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const studio = await getStudio(id);
  return { title: studio ? studio.title : "Studio not found" };
}

export default async function StudioDetailsPage({ params }) {
  const { id } = await params;
  const studio = await getStudio(id);

  if (!studio) notFound();

  const images = [studio.image, ...(Array.isArray(studio.gallery) ? studio.gallery : [])].filter(Boolean);
  const amenities = Array.isArray(studio.amenities) ? studio.amenities : [];
  const reviews = Array.isArray(studio.reviews) ? studio.reviews : [];
  const rating = Number(studio.rating) || 0;
  const hostName = studio.ownerName || "StudioSpace host";

  const bookingStudio = {
    _id: String(studio._id),
    title: studio.title,
    hourlyRate: studio.hourlyRate,
    securityDeposit: studio.securityDeposit,
    maxCapacity: studio.maxCapacity,
    location: studio.location,
    ownerEmail: studio.ownerEmail,
    rating: studio.rating,
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <Link
        href="/studios"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium opacity-80 hover:opacity-100"
      >
        <FiArrowLeft /> Back to all studios
      </Link>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge badge-primary">{studio.category}</span>
              <span className="badge badge-outline gap-1">
                <FaStar className="text-warning" />
                {rating > 0
                  ? `${rating.toFixed(1)} (${studio.reviewCount || reviews.length} reviews)`
                  : "New listing"}
              </span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl">{studio.title}</h1>
            <p className="flex items-center gap-2 opacity-80">
              <FiMapPin className="shrink-0" /> {studio.location}
            </p>
          </div>

          <StudioGallery images={images} title={studio.title} />

          <div>
            <h2 className="mb-3 text-2xl font-semibold">About this space</h2>
            <p className="whitespace-pre-line leading-relaxed opacity-90">{studio.overview}</p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold">Amenities</h2>
            {amenities.length === 0 ? (
              <p className="opacity-70">The host has not listed any amenities yet.</p>
            ) : (
              <ul className="grid gap-3 sm:grid-cols-2">
                {amenities.map((item) => (
                  <li key={item} className="flex items-center gap-3 rounded-box border border-base-300 p-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success/20 text-success">
                      <FiCheck className="h-4 w-4" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold">Your host</h2>
            <div className="flex items-center gap-4 rounded-box border border-base-300 p-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-content">
                {hostName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-lg font-semibold">{hostName}</p>
                <p className="truncate text-sm opacity-70">{studio.ownerEmail}</p>
                <p className="mt-1 text-xs font-medium text-secondary">Verified StudioSpace host</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold">Reviews</h2>
            {reviews.length === 0 ? (
              <div className="rounded-box border border-dashed border-base-300 bg-base-200 p-6 text-center">
                <p className="font-medium">No reviews yet</p>
                <p className="mt-1 text-sm opacity-70">Book this studio and be the first to share your experience.</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {reviews.map((review, index) => (
                  <li key={`${review.userEmail || review.name}-${index}`} className="rounded-box border border-base-300 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold">{review.name || "Creator"}</p>
                      <span className="flex items-center gap-1 text-sm">
                        <FaStar className="text-warning" />
                        {Number(review.rating).toFixed(1)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed opacity-90">{review.comment}</p>
                    {review.createdAt && (
                      <p className="mt-2 text-xs opacity-60">
                        {new Date(review.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <aside>
          <BookingCard studio={bookingStudio} />
        </aside>
      </div>
    </section>
  );
}