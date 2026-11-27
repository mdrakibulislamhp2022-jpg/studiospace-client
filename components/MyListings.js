"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2, FiEye, FiMapPin, FiPlus } from "react-icons/fi";
import { apiFetch } from "../lib/api-client";
import ConfirmModal from "./ConfirmModal";

async function readJson(res) {
  const ok = res && typeof res.ok === "boolean" ? res.ok : true;
  const data = res && typeof res.json === "function" ? await res.json().catch(() => null) : res;
  return { ok, data };
}

function ListingSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="overflow-hidden rounded-box border border-base-300 bg-base-100">
          <div className="skeleton h-44 w-full rounded-none" />
          <div className="space-y-3 p-4">
            <div className="skeleton h-5 w-3/4" />
            <div className="skeleton h-4 w-1/2" />
            <div className="skeleton h-9 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MyListings() {
  const [studios, setStudios] = useState(null);
  const [error, setError] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setError(false);
    try {
      const res = await apiFetch("/my-studios");
      const { ok, data } = await readJson(res);
      if (!ok || !Array.isArray(data)) {
        setError(true);
        return;
      }
      setStudios(data);
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      const res = await apiFetch(`/studios/${toDelete._id}`, { method: "DELETE" });
      const { ok, data } = await readJson(res);
      if (!ok) {
        toast.error(data?.message || "Could not delete the studio.");
        return;
      }
      setStudios((list) => list.filter((s) => s._id !== toDelete._id));
      toast.success("Studio deleted.");
      setToDelete(null);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  if (error) {
    return (
      <div className="rounded-box border border-base-300 p-10 text-center">
        <p className="text-lg font-semibold">We could not load your listings.</p>
        <p className="mt-1 opacity-70">Please check your connection and try again.</p>
        <button className="btn btn-primary mt-5" onClick={() => { setStudios(null); load(); }}>
          Try Again
        </button>
      </div>
    );
  }

  if (studios === null) return <ListingSkeleton />;

  if (studios.length === 0) {
    return (
      <div className="rounded-box border border-dashed border-base-300 p-12 text-center">
        <p className="text-xl font-semibold">You have not listed any studios yet</p>
        <p className="mt-2 opacity-70">Share your space with creators and start earning from it.</p>
        <Link href="/add-studio" className="btn btn-primary mt-6 gap-2">
          <FiPlus /> Add Your First Studio
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {studios.map((studio) => (
          <article key={studio._id} className="flex flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm">
            <div className="relative h-44 w-full bg-base-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={studio.image} alt={studio.title} className="h-full w-full object-cover" />
              <span className="badge badge-primary absolute left-3 top-3">{studio.category}</span>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <h3 className="line-clamp-1 text-lg font-semibold">{studio.title}</h3>
              <p className="flex items-center gap-1 text-sm opacity-70">
                <FiMapPin /> <span className="line-clamp-1">{studio.location}</span>
              </p>
              <p className="font-semibold text-primary">
                ${studio.hourlyRate} <span className="text-sm font-normal opacity-70">/ hr</span>
              </p>
              <div className="mt-auto flex gap-2 pt-3">
                <Link href={`/studios/${studio._id}`} className="btn btn-sm btn-ghost border border-base-300 gap-1 flex-1">
                  <FiEye /> View
                </Link>
                <Link href={`/studios/edit/${studio._id}`} className="btn btn-sm btn-outline gap-1 flex-1">
                  <FiEdit2 /> Update
                </Link>
                <button className="btn btn-sm btn-error btn-outline gap-1 flex-1" onClick={() => setToDelete(studio)}>
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <ConfirmModal
        open={Boolean(toDelete)}
        title="Delete this studio?"
        message={toDelete ? `"${toDelete.title}" will be removed permanently. This cannot be undone.` : ""}
        confirmLabel="Yes, Delete"
        cancelLabel="Keep It"
        tone="danger"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => !deleting && setToDelete(null)}
      />
    </>
  );
}