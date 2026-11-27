export default function StudioDetailsLoading() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="skeleton h-80 w-full" />
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="skeleton h-9 w-2/3" />
          <div className="skeleton h-5 w-1/3" />
          <div className="skeleton h-24 w-full" />
          <div className="flex flex-wrap gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-8 w-24" />
            ))}
          </div>
        </div>
        <div className="skeleton h-56 w-full" />
      </div>
    </section>
  );
}