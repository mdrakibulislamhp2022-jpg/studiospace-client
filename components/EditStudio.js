"use client";

import Link from "next/link";
import { useSession } from "../lib/auth-client";
import StudioForm from "./StudioForm";

export default function EditStudio({ studio }) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-12 w-full" />
        <div className="skeleton h-12 w-full" />
        <div className="skeleton h-40 w-full" />
      </div>
    );
  }

  if (session?.user?.email !== studio.ownerEmail) {
    return (
      <div className="rounded-box border border-base-300 p-10 text-center">
        <p className="text-lg font-semibold">You can only edit your own listings.</p>
        <Link href="/my-listings" className="btn btn-primary mt-5">
          Back to My Listings
        </Link>
      </div>
    );
  }

  return <StudioForm studio={studio} />;
}