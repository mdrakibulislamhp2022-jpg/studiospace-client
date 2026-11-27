export default function DashboardLoading() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="skeleton h-9 w-64" />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="skeleton h-32 w-full" />
        ))}
      </div>
    </section>
  );
}