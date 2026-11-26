"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" aria-label="Open menu">
              <FiMenu className="h-5 w-5" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-10 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow"
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={isActive(link.href) ? "font-semibold" : ""}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Logo />
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "border-primary font-semibold"
                  : "border-transparent hover:border-base-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isPending ? (
            <div className="skeleton h-9 w-9 rounded-full" />
          ) : user ? (
            <UserMenu user={user} />
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}