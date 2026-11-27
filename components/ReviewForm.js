"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa6";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api-client";

export default function ReviewForm({ studioId, ownerEmail }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  if (isPending) return <div className="skeleton mb-6 h-24 w-full" />;

  if (!session) {
    return (
      <div className="mb-6 rounded-box border border-base-300 bg-base-200 p-5 text-center">
        <p className="font-medium">Booked this studio? Share how it went.</p>
        <Link href={`/login?redirect=/studios/${studioId}`} className="btn btn-primary btn-sm mt-3">
          Log in to write a review
        </Link>
      </div>
    );
  }

  if (session.user.email === ownerEmail) {
    return (
      <p className="mb-6 rounded-box border border-base-300 bg-base-200 p-4 text-sm opacity-80">
        This is your own studio, so you cannot review it.
      </p>
    );
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (rating < 1) {
      setError("Please choose a star rating.");
      return;
    }
    if (comment.trim().length < 10) {
      setError("Please write at least 10 characters.");
      return;
    }
    setError("");
    setSaving(true);
    try {
      const res = await apiFetch(`/studios/${studioId}/reviews`, {
        method: "POST",
        body: JSON.stringify({ rating, comment: comment.trim() }),
      });
      const ok = res && typeof res.ok === "boolean" ? res.ok : true;
      const data = res && typeof res.json === "function" ? await res.json().catch(() => ({})) : res || {};
      if (!ok) {
        toast.error(data.message || "Could not post your review.");
        return;
      }
      toast.success("Thanks for your review!");
      setRating(0);
      setComment("");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mb-6 space-y-3 rounded-box border border-base-300 p-5" noValidate>
      <p className="font-semibold">Write a review</p>
      <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onMouseEnter={() => setHover(n)}
            onClick={() => setRating(n)}
            className="text-2xl"
          >
            <FaStar className={(hover || rating) >= n ? "text-warning" : "opacity-25"} />
          </button>
        ))}
      </div>
      <textarea
        rows={3}
        maxLength={500}
        className="textarea textarea-bordered w-full"
        placeholder="What was the space like? Was the equipment as described?"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      {error && <p className="text-sm text-error">{error}</p>}
      <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>
        {saving ? "Posting..." : "Post Review"}
      </button>
    </form>
  );
}