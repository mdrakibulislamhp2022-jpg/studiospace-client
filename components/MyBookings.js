"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import { apiFetch } from "@/lib/api-client";
import ConfirmModal from "./ConfirmModal";
import EmptyState from "./EmptyState";

const statusStyles = {
  Pending: "badge-warning",
  Confirmed: "badge-success",
  Completed: "badge-info",
  Cancelled: "badge-error",
};

function displayStatus(booking) {
  if (booking.status === "Confirmed") {
    const end = new Date(`${booking.date}T${booking.endTime}:00`);
    if (end < new Date()) return "Completed";
  }
  return booking.status;
}

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatTime(time) {
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const twelveHour = hours % 12 === 0 ? 12 : hours % 12;
  return `${twelveHour}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

function BookingListSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading bookings">
      {[0, 1, 2].map((item) => (
        <div key={item} className="flex flex-col gap-4 rounded-box border border-base-300 p-4 sm:flex-row">
          <div className="skeleton h-28 w-full sm:w-40" />
          <div className="flex-1 space-y-3">
            <div className="skeleton h-5 w-1/2" />
            <div className="skeleton h-4 w-2/3" />
            <div className="skeleton h-4 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MyBookings() {
  const [tab, setTab] = useState("mine");
  const [mine, setMine] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [cancelTarget, setCancelTarget] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [confirmingId, setConfirmingId] = useState("");

  const loadAll = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const [mineResponse, requestsResponse] = await Promise.all([
        apiFetch("/bookings"),
        apiFetch("/host-bookings"),
      ]);

      if (!mineResponse.ok || !requestsResponse.ok) {
        setLoadError("We could not load your bookings. Please log in again or try later.");
        return;
      }

      setMine(await mineResponse.json());
      setRequests(await requestsResponse.json());
    } catch (error) {
      setLoadError("Network problem. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const handleCancel = async () => {
    if (!cancelTarget) return;
    const target = cancelTarget;
    setActionLoading(true);
    try {
      const response = await apiFetch(`/bookings/${target._id}/cancel`, { method: "PATCH" });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        toast.error(data.message || "We could not cancel this booking.");
      } else {
        toast.success("Your booking has been cancelled.");
        setMine((list) => list.map((item) => (item._id === target._id ? { ...item, status: "Cancelled" } : item)));
      }
    } catch (error) {
      toast.error("Network problem. Please try again.");
    } finally {
      setActionLoading(false);
      setCancelTarget(null);
    }
  };

  const handleConfirm = async (booking) => {
    setConfirmingId(booking._id);
    try {
      const response = await apiFetch(`/bookings/${booking._id}/confirm`, { method: "PATCH" });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        toast.error(data.message || "We could not confirm this booking.");
        return;
      }

      toast.success("Booking confirmed. The creator has been notified.");
      setRequests((list) =>
        list.map((item) => (item._id === booking._id ? { ...item, status: "Confirmed" } : item))
      );
    } catch (error) {
      toast.error("Network problem. Please try again.");
    } finally {
      setConfirmingId("");
    }
  };

  if (loading) return <BookingListSkeleton />;

  if (loadError) {
    return (
      <div className="rounded-box border border-dashed border-base-300 bg-base-200 px-6 py-14 text-center">
        <h3 className="text-xl font-semibold">Something went wrong</h3>
        <p className="mx-auto mt-2 max-w-md opacity-80">{loadError}</p>
        <button type="button" onClick={loadAll} className="btn btn-primary mt-6">
          Try Again
        </button>
      </div>
    );
  }

  const isMineTab = tab === "mine";
  const list = isMineTab ? mine : requests;

  return (
    <div>
      <div role="tablist" className="tabs tabs-box mb-6 w-fit">
        <button
          type="button"
          role="tab"
          className={`tab ${isMineTab ? "tab-active" : ""}`}
          onClick={() => setTab("mine")}
        >
          My Bookings ({mine.length})
        </button>
        <button
          type="button"
          role="tab"
          className={`tab ${!isMineTab ? "tab-active" : ""}`}
          onClick={() => setTab("requests")}
        >
          Booking Requests ({requests.length})
        </button>
      </div>

      {list.length === 0 ? (
        isMineTab ? (
          <EmptyState
            title="You have no bookings yet"
            text="Find a studio that fits your next project and send your first booking request."
            actionHref="/studios"
            actionLabel="Explore Studios"
          />
        ) : (
          <EmptyState
            title="No booking requests yet"
            text="When creators request your studios, their bookings will show up here for you to confirm."
            actionHref="/add-studio"
            actionLabel="List a Studio"
          />
        )
      ) : (
        <div className="space-y-4">
          {list.map((booking) => {
            const status = displayStatus(booking);
            return (
              <article
                key={booking._id}
                className="flex flex-col gap-4 rounded-box border border-base-300 bg-base-100 p-4 sm:flex-row"
              >
                <div className="h-32 w-full shrink-0 overflow-hidden rounded-box bg-base-200 sm:h-28 sm:w-40">
                  {booking.studioImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={booking.studioImage} alt={booking.studioTitle} className="h-full w-full object-cover" />
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <Link href={`/studios/${booking.studioId}`} className="text-lg font-semibold hover:underline">
                      {booking.studioTitle}
                    </Link>
                    <span className={`badge ${statusStyles[status] || "badge-ghost"}`}>{status}</span>
                  </div>

                  <p className="flex items-center gap-2 text-sm opacity-80">
                    <FiCalendar className="shrink-0" /> {formatDate(booking.date)}
                  </p>
                  <p className="flex items-center gap-2 text-sm opacity-80">
                    <FiClock className="shrink-0" /> {formatTime(booking.startTime)} to {formatTime(booking.endTime)}
                  </p>
                  {booking.studioLocation && (
                    <p className="flex items-center gap-2 text-sm opacity-80">
                      <FiMapPin className="shrink-0" /> {booking.studioLocation}
                    </p>
                  )}
                  {!isMineTab && (
                    <p className="text-sm opacity-80">
                      Requested by <span className="font-medium">{booking.userName || booking.userEmail}</span>
                    </p>
                  )}
                  <p className="font-semibold">
                    ${booking.totalPrice}{" "}
                    <span className="text-sm font-normal opacity-70">for {booking.hours} hr</span>
                  </p>
                </div>

                <div className="flex items-start sm:items-center">
                  {isMineTab && status === "Pending" && (
                    <button
                      type="button"
                      onClick={() => setCancelTarget(booking)}
                      className="btn btn-outline btn-error btn-sm"
                    >
                      Cancel Booking
                    </button>
                  )}
                  {!isMineTab && status === "Pending" && (
                    <button
                      type="button"
                      onClick={() => handleConfirm(booking)}
                      disabled={confirmingId === booking._id}
                      className="btn btn-primary btn-sm"
                    >
                      {confirmingId === booking._id ? (
                        <span className="loading loading-spinner loading-sm" />
                      ) : (
                        "Confirm Booking"
                      )}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <ConfirmModal
        open={Boolean(cancelTarget)}
        title="Cancel this booking?"
        message={
          cancelTarget
            ? `Your request for ${cancelTarget.studioTitle} on ${formatDate(cancelTarget.date)} will be cancelled. This cannot be undone.`
            : ""
        }
        confirmLabel="Yes, Cancel Booking"
        cancelLabel="Keep Booking"
        tone="error"
        loading={actionLoading}
        onConfirm={handleCancel}
        onCancel={() => setCancelTarget(null)}
      />
    </div>
  );
}