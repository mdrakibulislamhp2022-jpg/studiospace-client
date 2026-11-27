"use client";

import Link from "next/link";

export default function GlobalError({ reset }) {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-2 opacity-70">
        We hit an unexpected problem while loading this page. Please try again, or head back home.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button className="btn btn-primary" onClick={() => reset()}>Try Again</button>
        <Link href="/" className="btn btn-outline">Return to Home</Link>
      </div>
    </section>
  );
}