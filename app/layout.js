import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToasterProvider from "@/components/ToasterProvider";
import AuthTokenSync from "@/components/AuthTokenSync";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "StudioSpace | Book Creative Studios by the Hour",
    template: "%s | StudioSpace",
  },
  description:
    "StudioSpace is a peer-to-peer marketplace where creators list and book photo studios, film stages, podcast lounges and music suites.",
};

// runs before the page paints, so the saved theme never flashes
const themeScript = `(function () {
  try {
    var theme = localStorage.getItem("studiospace-theme");
    if (!theme) {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "studiodark" : "studiolight";
    }
    document.documentElement.setAttribute("data-theme", theme);
  } catch (error) {}
})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geist.className} flex min-h-screen flex-col bg-base-100 text-base-content`}>
        <AuthTokenSync />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ToasterProvider />
      </body>
    </html>
  );
}