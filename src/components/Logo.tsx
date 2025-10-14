"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Logo() {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      aria-label="Home"
      className="relative text-inherit decoration-none no-underline"
    >
      <h1 className="font-black text-underline transition-all duration-600 uppercase whitespace-pre backdrop-blur-lg italic text-2xl">
        {`
    Kritische
  Orientierungs
wochen 4Ever`}
      </h1>
    </Link>
  );
}
