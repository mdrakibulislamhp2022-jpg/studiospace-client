import Link from "next/link";
import { FaXTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa6";
import Logo from "./Logo";
import NewsletterForm from "./NewsletterForm";
import { categories } from "@/lib/categories";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
  { href: "/add-studio", label: "Host Your Space" },
];

const socialLinks = [
  { href: "https://x.com", label: "StudioSpace on X", Icon: FaXTwitter },
  { href: "https://instagram.com", label: "StudioSpace on Instagram", Icon: FaInstagram },
  { href: "https://youtube.com", label: "StudioSpace on YouTube", Icon: FaYoutube },
  { href: "https://linkedin.com", label: "StudioSpace on LinkedIn", Icon: FaLinkedinIn },
];

export default function Footer() {
  return (
    <footer className="border-t border-base-300 bg-base-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm leading-relaxed opacity-80">
            Our mission is to put every creator in the right room. Find photo studios, film stages,
            podcast lounges and music suites near you, and book them by the hour.
          </p>
          <div className="flex gap-2">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="btn btn-circle btn-ghost btn-sm border border-base-300"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="opacity-80 transition hover:opacity-100 hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Popular Categories</h3>
          <ul className="space-y-2 text-sm">
            {categories.map((category) => (
              <li key={category.value}>
                <Link
                  href={`/studios?category=${encodeURIComponent(category.value)}`}
                  className="opacity-80 transition hover:opacity-100 hover:underline"
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider">Studio News</h3>
          <p className="text-sm opacity-80">
            Get new listings and booking tips in your inbox. No spam, just studios.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-base-300">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs opacity-70 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} StudioSpace. All rights reserved.</p>
          <p>By using StudioSpace you agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </div>
    </footer>
  );
}