import DashboardOverview from "../../components/DashboardOverview";

export const metadata = {
  title: "Dashboard | StudioSpace",
};

export default function DashboardPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <DashboardOverview />
    </section>
  );
}