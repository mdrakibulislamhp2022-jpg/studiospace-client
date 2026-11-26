import Link from "next/link";

export default function EmptyState({ title, text, actionHref, actionLabel }) {
  return (
    <div className="rounded-box border border-dashed border-base-300 bg-base-200 px-6 py-14 text-center">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md opacity-80">{text}</p>
      {actionHref && (
        <Link href={actionHref} className="btn btn-primary mt-6">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}