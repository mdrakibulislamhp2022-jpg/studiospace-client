import { FiSearch, FiClock, FiCheckCircle, FiZap } from "react-icons/fi";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    Icon: FiSearch,
    title: "Discover Spaces",
    text: "Browse studios by category, location and price, and compare amenities side by side.",
  },
  {
    Icon: FiClock,
    title: "Select Shoot Hours",
    text: "Choose your date and the exact hours you need. The total price updates as you pick.",
  },
  {
    Icon: FiCheckCircle,
    title: "Book Instantly",
    text: "Send your request in one click and track its status from your bookings page.",
  },
  {
    Icon: FiZap,
    title: "Create & Produce",
    text: "Arrive, set up and make something great. The room is yours for the whole slot.",
  },
];

export default function BookingSteps() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading
        eyebrow="How Booking Works"
        title="From idea to studio in four steps"
        subtitle="Booking a creative space should take minutes, not a week of emails."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ Icon, title, text }, index) => (
          <div
            key={title}
            className="relative h-full rounded-box border border-base-300 bg-base-100 p-6 pt-10"
          >
            <span className="absolute -top-4 left-6 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content">
              {index + 1}
            </span>
            <Icon className="mb-3 h-8 w-8 text-secondary" />
            <h3 className="mb-2 text-lg font-semibold">{title}</h3>
            <p className="text-sm opacity-80">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}