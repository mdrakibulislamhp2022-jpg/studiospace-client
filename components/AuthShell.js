import { FiAperture } from "react-icons/fi";

export default function AuthShell({ title, subtitle, children }) {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-neutral p-12 text-neutral-content lg:flex">
        <FiAperture className="h-12 w-12 text-primary" />
        <div className="space-y-4">
          <h2 className="text-4xl font-bold leading-tight">
            Every great shoot starts with the right room.
          </h2>
          <p className="max-w-md opacity-80">
            Book photo studios, film stages, podcast lounges and music suites by the hour, or list
            your own space and earn from the hours you are not using.
          </p>
        </div>
        <p className="text-sm opacity-60">StudioSpace, the creative workspace marketplace.</p>
      </div>

      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-2 opacity-80">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}