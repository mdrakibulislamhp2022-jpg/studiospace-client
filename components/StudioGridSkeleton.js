export default function StudioGridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading studios">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-box border border-base-300 bg-base-100">
          <div className="skeleton h-52 w-full rounded-none" />
          <div className="space-y-3 p-5">
            <div className="skeleton h-5 w-3/4" />
            <div className="skeleton h-4 w-1/2" />
            <div className="skeleton h-6 w-1/3" />
            <div className="skeleton h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}