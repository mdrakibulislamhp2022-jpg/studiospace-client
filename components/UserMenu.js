"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiGrid, FiPlusCircle, FiList, FiCalendar, FiLogOut } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", Icon: FiGrid },
  { href: "/add-studio", label: "Add New Studio", Icon: FiPlusCircle },
  { href: "/my-listings", label: "My Studio Listings", Icon: FiList },
  { href: "/my-bookings", label: "My Bookings", Icon: FiCalendar },
];

export default function UserMenu({ user }) {
  const router = useRouter();
  const [imageFailed, setImageFailed] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const initial = (user.name || user.email || "?").charAt(0).toUpperCase();

  const closeMenu = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleLogout = async () => {
    closeMenu();
    setLoggingOut(true);
    const { error } = await authClient.signOut();
    setLoggingOut(false);

    if (error) {
      toast.error("Could not log you out. Please try again.");
      return;
    }

    toast.success("You have been logged out.");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="dropdown dropdown-end dropdown-hover">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle"
        aria-label="Open user menu"
        title={user.name}
      >
        {user.image && !imageFailed ? (
          <div className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.image}
              alt={user.name || "Profile photo"}
              referrerPolicy="no-referrer"
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-primary-content">
            {initial}
          </div>
        )}
      </div>

      <ul
        tabIndex={0}
        className="menu dropdown-content z-10 mt-1 w-64 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
      >
        <li className="px-3 py-2">
          <span className="block cursor-default p-0 text-base font-semibold hover:bg-transparent">
            {user.name}
          </span>
          <span className="block cursor-default truncate p-0 text-xs opacity-70 hover:bg-transparent">
            {user.email}
          </span>
        </li>
        <li className="menu-title p-0">
          <hr className="border-base-300" />
        </li>
        {menuItems.map(({ href, label, Icon }) => (
          <li key={href}>
            <Link href={href} onClick={closeMenu}>
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          </li>
        ))}
        <li>
          <button type="button" onClick={handleLogout} disabled={loggingOut}>
            <FiLogOut className="h-4 w-4" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}