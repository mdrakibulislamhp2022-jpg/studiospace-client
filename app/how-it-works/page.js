import Link from "next/link";
import { FiSearch, FiCalendar, FiCheckCircle, FiCamera, FiUploadCloud, FiInbox, FiDollarSign, FiStar } from "react-icons/fi";

export const metadata = {
  title: "How It Works | StudioSpace",
  description: "See how creators book studios and how hosts share their spaces on StudioSpace.",
};

const creatorSteps = [
  { icon: FiSearch, title: "Find a space", text: "Browse photo studios, film stages, podcast lounges, music suites and workshops. Filter by category and sort by price or rating." },
  { icon: FiCalendar, title: "Pick your slot", text: "Choose a date and your start and end time. The total price, including the hourly rate, is shown before you send the request." },
  { icon: FiCheckCircle, title: "Wait for approval", text: "Your booking starts as Pending. Once the host confirms it, the slot is locked for you and nobody else can book it." },
  { icon: FiCamera, title: "Create", text: "Show up, shoot, record or build. Afterwards, share a review to help the next creator choose well." },
];

const hostSteps = [
  { icon: FiUploadCloud, title: "List your space", text: "Add photos, amenities, your hourly rate, a security deposit and the maximum number of people your space can hold." },
  { icon: FiInbox, title: "Review requests", text: "Every request lands in your My Bookings page. Confirm the ones that work for you." },
  { icon: FiDollarSign, title: "Get paid for idle hours", text: "Turn empty hours into income. You set the price and you decide who comes in." },
  { icon: FiStar, title: "Build your reputation", text: "Good reviews push your studio higher in the rankings and bring in more creators." },
];

const faqs = [
  { q: "Can two people book the same time slot?", a: "No. Once a host confirms a booking, that time slot is blocked. Any request that overlaps a confirmed booking is rejected automatically." },
  { q: "What does Pending mean?", a: "The host has not replied yet. You can cancel a pending booking at any time from the My Bookings page." },
  { q: "What is the security deposit?", a: "It is an amount set by the host to cover damage or missing equipment. The amount is shown on every studio page before you book." },
  { q: "Do I need an account to browse?", a: "No. You can explore every studio without signing in. You only need an account to book, host or review." },
];

function StepGrid({ steps }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <div key={s.title} className="rounded-box border border-base-300 bg-base-100 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl text-primary">
              <s.icon />
            </span>
            <span className="text-3xl font-bold opacity-20">{i + 1}</span>
          </div>
          <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
          <p className="mt-2 text-sm opacity-70">{s.text}</p>
        </div>
      ))}
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 py-12">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold">How StudioSpace works</h1>
        <p className="mt-3 opacity-70">
          Whether you need a space for a day or have a space to share, getting started takes only a few minutes.
        </p>
      </header>

      <section>
        <h2 className="mb-6 text-2xl font-semibold">For creators</h2>
        <StepGrid steps={creatorSteps} />
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold">For hosts</h2>
        <StepGrid steps={hostSteps} />
      </section>

      <section className="mx-auto max-w-3xl">
        <h2 className="mb-6 text-center text-2xl font-semibold">Common questions</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="collapse collapse-arrow border border-base-300 bg-base-100">
              <input type="radio" name="faq" defaultChecked={i === 0} aria-label={f.q} />
              <div className="collapse-title font-medium">{f.q}</div>
              <div className="collapse-content text-sm opacity-80">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/studios" className="btn btn-primary">Explore Studios</Link>
        <Link href="/add-studio" className="btn btn-outline">Host Your Space</Link>
      </div>
    </div>
  );
}