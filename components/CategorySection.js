import Link from "next/link";
import { FiCamera, FiFilm, FiMic, FiMusic, FiPenTool } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { categories } from "@/lib/categories";

const categoryMeta = {
  "Photo Studio": { Icon: FiCamera, text: "Cyc walls, natural light and lighting rigs." },
  "Film Stage": { Icon: FiFilm, text: "Soundproofed stages for film and video." },
  "Podcast Lounge": { Icon: FiMic, text: "Treated rooms with pro microphones." },
  "Music Suite": { Icon: FiMusic, text: "Recording suites and rehearsal rooms." },
  Workshop: { Icon: FiPenTool, text: "Open workshops for art and craft." },
};

export default function CategorySection() {
  return (
    <section className="bg-base-200">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading
          eyebrow="Browse by Category"
          title="Whatever you create, there is a room for it"
          subtitle="Pick a category and jump straight to the studios that fit your project."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => {
            const { Icon, text } = categoryMeta[category.value];
            return (
              <Link
                key={category.value}
                href={`/studios?category=${encodeURIComponent(category.value)}`}
                className="group flex h-full flex-col items-center gap-3 rounded-box border border-base-300 bg-base-100 p-6 text-center transition hover:-translate-y-1 hover:border-primary hover:shadow-lg"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary transition group-hover:bg-primary group-hover:text-primary-content">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="text-lg font-semibold">{category.label}</h3>
                <p className="text-sm opacity-70">{text}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}