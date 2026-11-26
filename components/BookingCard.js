"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa6";
import { FiMapPin, FiUsers, FiShield, FiX } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api-client";

function toMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export default function BookingCard({ studio }) {
  const router = useRouter();
  const pathname = usePathname();
  const dialogRef = useRef(null);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const isOwner = Boolean(user && user.email === studio.ownerEmail);

  const [today, setToday] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("12:00");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setToday(new Date().toLocaleDateString("en-CA"));
  }, []);

  const hours = useMemo(() => {
    if (!startTime || !endTime) return 0;
    const difference = (toMinutes(endTime) - toMinutes(startTime)) / 60;
    return difference > 0 ? difference : 0;
  }, [startTime, endTime]);

  const total = hours * studio.hourlyRate;
  const rating = Number(studio.rating) || 0;

  const openBooking = () => {
    if (!user) {
      toast.error("Please log in to book a studio.");
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    setFormError("");
    dialogRef.current?.showModal();
  };

  const closeBooking = () => dialogRef.current?.close();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (!date) {
      setFormError("Please choose a date for your shoot.");
      return;
    }
    if (hours <= 0) {
      setFormError("The end time must be after the start time.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await apiFetch("/bookings", {
        method: "POST",
        body: JSON.stringify({ studioId: studio._id, date, startTime, endTime }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message = data.message || "We could not send your booking request.";
        setFormError(message);
        toast.error(message);
        return;
      }

      toast.success("Booking request sent! The host will confirm it soon.");
      closeBooking();
      router.push("/my-bookings");
    } catch (error) {
      const message = "Network problem. Please check your connection and try again.";
      setFormError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="space-y-5 rounded-box border border-base-300 bg-base-100 p-6 shadow-sm lg:sticky lg:top-24">
        <div className="flex items-end justify-between gap-3">
          <p className="text-3xl font-bold">
            ${studio.hourlyRate} <span className="text-base font-normal opacity-70">/ hour</span>
          </p>
          <span className="badge badge-outline gap-1">
            <FaStar className="text-warning" />
            {rating > 0 ? rating.toFixed(1) : "New"}
          </span>
        </div>

        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-3">
            <FiUsers className="h-4 w-4 shrink-0 text-secondary" />
            Up to {studio.maxCapacity} people
          </li>
          <li className="flex items-center gap-3">
            <FiMapPin className="h-4 w-4 shrink-0 text-secondary" />
            {studio.location}
          </li>
          <li className="flex items-center gap-3">
            <FiShield className="h-4 w-4 shrink-0 text-secondary" />
            Security deposit: ${studio.securityDeposit || 0}
          </li>
        </ul>

        {isOwner ? (
          <button type="button" disabled className="btn btn-primary w-full">
            This is your listing
          </button>
        ) : (
          <button type="button" onClick={openBooking} disabled={isPending} className="btn btn-primary btn-lg w-full">
            Book Workspace Now
          </button>
        )}
        <p className="text-center text-xs opacity-70">
          You will not be charged yet. The host confirms every request.
        </p>
      </div>

      <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <button
            type="button"
            onClick={closeBooking}
            className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
            aria-label="Close booking window"
          >
            <FiX className="h-4 w-4" />
          </button>

          <h3 className="pr-8 text-xl font-bold">Book {studio.title}</h3>
          <p className="mt-1 text-sm opacity-70">Choose the day and hours you need the space.</p>

          <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
            {formError && (
              <div role="alert" className="alert alert-error alert-soft text-sm">
                {formError}
              </div>
            )}

            <div>
              <label htmlFor="booking-date" className="mb-1 block text-sm font-medium">
                Date
              </label>
              <input
                id="booking-date"
                type="date"
                min={today}
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="input w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="booking-start" className="mb-1 block text-sm font-medium">
                  Start time
                </label>
                <input
                  id="booking-start"
                  type="time"
                  step="1800"
                  value={startTime}
                  onChange={(event) => setStartTime(event.target.value)}
                  className="input w-full"
                />
              </div>
              <div>
                <label htmlFor="booking-end" className="mb-1 block text-sm font-medium">
                  End time
                </label>
                <input
                  id="booking-end"
                  type="time"
                  step="1800"
                  value={endTime}
                  onChange={(event) => setEndTime(event.target.value)}
                  className="input w-full"
                />
              </div>
            </div>

            <div className="space-y-1 rounded-box bg-base-200 p-4 text-sm">
              <div className="flex justify-between">
                <span>Hours</span>
                <span>{hours > 0 ? `${hours} hr` : "-"}</span>
              </div>
              <div className="flex justify-between">
                <span>Rate</span>
                <span>${studio.hourlyRate} / hr</span>
              </div>
              <div className="flex justify-between border-t border-base-300 pt-2 text-base font-bold">
                <span>Total</span>
                <span>${total}</span>
              </div>
              <p className="pt-1 text-xs opacity-70">
                A refundable security deposit of ${studio.securityDeposit || 0} may apply.
              </p>
            </div>

            <div className="modal-action">
              <button type="button" onClick={closeBooking} className="btn btn-ghost">
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="btn btn-primary">
                {submitting ? <span className="loading loading-spinner loading-sm" /> : "Confirm Booking"}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="submit">close</button>
        </form>
      </dialog>
    </>
  );
}