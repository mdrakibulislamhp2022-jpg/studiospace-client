import StudioForm from "../../components/StudioForm";

export const metadata = {
  title: "Add New Studio | StudioSpace",
};

export default function AddStudioPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">Add a New Studio</h1>
      <p className="mt-2 mb-8 opacity-70">
        Share your creative space with creators. Fill in the details below and your listing goes live right away.
      </p>
      <div className="rounded-box border border-base-300 bg-base-100 p-6 shadow-sm">
        <StudioForm />
      </div>
    </section>
  );
}