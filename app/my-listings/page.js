import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import MyListings from "../../components/MyListings";

export const metadata = {
  title: "My Studio Listings | StudioSpace",
};

export default function MyListingsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Studio Listings</h1>
          <p className="mt-1 opacity-70">Manage the spaces you share on StudioSpace.</p>
        </div>
        <Link href="/add-studio" className="btn btn-primary gap-2">
          <FiPlus /> Add New Studio
        </Link>
      </div>
      <MyListings />
    </section>
  );
}