import MyBookings from "@/components/MyBookings";

export const metadata = { title: "My Bookings" };

export default function MyBookingsPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-secondary">Bookings</p>
        <h1 className="text-3xl font-bold md:text-4xl">Manage your bookings</h1>
        <p className="mt-3 opacity-80">
          Track the studios you have booked and confirm requests for the spaces you host.
        </p>
      </div>
      <MyBookings />
    </section>
  );
}