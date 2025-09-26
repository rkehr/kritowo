"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Logo() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <Link href="/" aria-label="Home">
      <h1
        className={`font-black text-underline transition-all duration-600 ${
          isHome ? "text-4xl" : "text-2xl"
        }`}
      >
        Kritische Orientierungswochen
      </h1>
    </Link>
  );
}
