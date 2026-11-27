import Link from "next/link";

export const metadata = {
  title: "Page not found | StudioSpace",
};

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center">
      <svg viewBox="0 0 400 260" className="w-full max-w-md" role="img" aria-label="An empty photo studio with a camera on a tripod">
        <rect x="20" y="20" width="360" height="190" rx="18" className="fill-base-200" style={{ fill: "var(--color-base-200)" }} />
        <rect x="0" y="210" width="400" height="30" rx="6" style={{ fill: "var(--color-base-300)" }} />
        <g className="text-primary" fill="currentColor">
          <polygon points="60,70 120,82 120,150 60,162" opacity="0.9" />
          <rect x="88" y="150" width="4" height="60" />
        </g>
        <g stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-neutral">
          <line x1="300" y1="150" x2="270" y2="212" />
          <line x1="300" y1="150" x2="300" y2="214" />
          <line x1="300" y1="150" x2="332" y2="212" />
        </g>
        <g className="text-neutral" fill="currentColor">
          <rect x="268" y="108" width="64" height="44" rx="8" />
          <rect x="280" y="98" width="22" height="14" rx="4" />
        </g>
        <circle cx="300" cy="130" r="16" style={{ fill: "var(--color-base-100)" }} />
        <circle cx="300" cy="130" r="9" className="text-primary" fill="currentColor" />
        <text x="190" y="140" textAnchor="middle" fontSize="64" fontWeight="800" fontFamily="Arial, Helvetica, sans-serif" style={{ fill: "var(--color-base-content)" }} opacity="0.85">
          404
        </text>
      </svg>

      <h1 className="mt-6 text-3xl font-bold">This studio is empty</h1>
      <p className="mt-2 max-w-md opacity-70">
        The page you are looking for has moved, been removed, or never existed. Let us get you back to a space that is open.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">Return to Home</Link>
        <Link href="/studios" className="btn btn-outline">Explore Studios</Link>
      </div>
    </section>
  );
}