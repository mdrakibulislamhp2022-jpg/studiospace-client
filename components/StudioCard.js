import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";

export default function StudioCard({ studio }) {
  const rating = Number(studio.rating) || 0;

  return (
    <article className="card h-full overflow-hidden border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <figure className="relative h-52 w-full shrink-0 bg-base-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={studio.image}
          alt={studio.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span className="badge badge-primary absolute left-3 top-3">{studio.category}</span>
      </figure>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-lg font-semibold">{studio.title}</h3>
          <span className="badge badge-outline shrink-0 gap-1">
            <FaStar className="text-warning" />
            {rating > 0 ? rating.toFixed(1) : "New"}
          </span>
        </div>

        <p className="flex items-center gap-1 text-sm opacity-70">
          <FiMapPin className="shrink-0" />
          <span className="line-clamp-1">{studio.location}</span>
        </p>

        <p className="text-xl font-bold">
          ${studio.hourlyRate} <span className="text-sm font-normal opacity-70">/ hr</span>
        </p>

        <Link href={`/studios/${studio._id}`} className="btn btn-primary mt-auto w-full">
          View Details
        </Link>
      </div>
    </article>
  );
}