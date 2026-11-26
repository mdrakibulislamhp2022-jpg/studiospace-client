import Link from "next/link";
import { FiAperture } from "react-icons/fi";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
      <FiAperture className="h-7 w-7 text-primary" />
      <span>
        Studio<span className="text-primary">Space</span>
      </span>
    </Link>
  );
}