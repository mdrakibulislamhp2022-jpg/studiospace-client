import Link from "next/link";
import { FiUsers, FiShield, FiHeart } from "react-icons/fi";

export const metadata = {
  title: "About Us | StudioSpace",
  description: "StudioSpace connects creators with spaces to make their best work.",
};

const values = [
  { icon: FiUsers, title: "Community first", text: "Creators and hosts are neighbours in the same scene. We build tools that make it easy for them to trust each other." },
  { icon: FiShield, title: "Fair and safe", text: "Clear prices, confirmed bookings and no double-booking, so nobody turns up to a locked door." },
  { icon: FiHeart, title: "Made for makers", text: "Photographers, podcasters, musicians and artists deserve good spaces without long-term rental contracts." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-16 px-4 py-12">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold">About StudioSpace</h1>
        <p className="mt-3 opacity-70">
          StudioSpace is a peer-to-peer marketplace where creators rent professional studios by the hour, and owners earn from spaces that would otherwise sit empty.
        </p>
      </header>

      <section className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold">Our mission</h2>
          <p className="mt-3 opacity-80">
            A good idea should not have to wait for a good room. We want every creator, from a first-time podcaster to a working photographer, to find the right space close to home and book it in minutes.
          </p>
          <p className="mt-3 opacity-80">
            For hosts, we make sharing a space simple: list it, set your price, approve the requests you like and get on with your day.
          </p>
        </div>
        <div className="rounded-box bg-primary/10 p-8">
          <p className="text-xl font-semibold">Book by the hour. Create without limits.</p>
          <p className="mt-3 text-sm opacity-70">
            Photo studios, film stages, podcast lounges, music suites and workshops, all in one place.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-center text-2xl font-semibold">What we believe in</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-box border border-base-300 bg-base-100 p-6 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl text-primary">
                <v.icon />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm opacity-70">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/studios" className="btn btn-primary">Explore Studios</Link>
        <Link href="/how-it-works" className="btn btn-outline">How It Works</Link>
      </div>
    </div>
  );
}