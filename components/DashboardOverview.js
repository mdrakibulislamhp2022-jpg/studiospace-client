"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiGrid, FiCalendar, FiClock, FiInbox, FiPlus, FiList } from "react-icons/fi";
import { useSession } from "../lib/auth-client";
import { apiFetch } from "../lib/api-client";

async function load(path) {
  try {
    const res = await apiFetch(path);
    const ok = res && typeof res.ok === "boolean" ? res.ok : true;
    const data = res && typeof res.json === "function" ? await res.json().catch(() => null) : res;
    return ok && Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

function StatCard({ icon: Icon, label, value, href, hint }) {
  return (
    <Link href={href} className="rounded-box border border-base-300 bg-base-100 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-sm opacity-70">{label}</span>
        <Icon className="text-xl text-primary" />
      </div>
      <p className="mt-3 text-3xl font-bold">{value}</p>
      <p className="mt-1 text-xs opacity-60">{hint}</p>
    </Link>
  );
}

export default function DashboardOverview() {
  const { data: session } = useSession();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const [studios, bookings, requests] = await Promise.all([
        load("/my-studios"),
        load("/bookings"),
        load("/host-bookings"),
      ]);
      if (!active) return;
      setStats({
        listings: studios ? studios.length : "-",
        bookings: bookings ? bookings.length : "-",
        upcoming: bookings ? bookings.filter((b) => b.status === "Confirmed").length : "-",
        requests: requests ? requests.filter((b) => b.status === "Pending").length : "-",
      });
    })();
    return () => {
      active = false;
    };
  }, []);

  const name = session?.user?.name?.split(" ")[0] || "there";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {name}</h1>
        <p className="mt-1 opacity-70">Here is a quick look at your listings and bookings.</p>
      </div>

      {stats === null ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-32 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={FiGrid} label="My listings" value={stats.listings} href="/my-listings" hint="Studios you host" />
          <StatCard icon={FiCalendar} label="My bookings" value={stats.bookings} href="/my-bookings" hint="Sessions you requested" />
          <StatCard icon={FiClock} label="Confirmed sessions" value={stats.upcoming} href="/my-bookings" hint="Approved by the host" />
          <StatCard icon={FiInbox} label="Requests to review" value={stats.requests} href="/my-bookings" hint="Waiting for your reply" />
        </div>
      )}

      <div className="rounded-box border border-base-300 bg-base-100 p-6">
        <h2 className="text-lg font-semibold">Quick actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/add-studio" className="btn btn-primary gap-2">
            <FiPlus /> Add New Studio
          </Link>
          <Link href="/my-listings" className="btn btn-outline gap-2">
            <FiList /> Manage Listings
          </Link>
          <Link href="/studios" className="btn btn-ghost border border-base-300">
            Explore Studios
          </Link>
        </div>
      </div>
    </div>
  );
}