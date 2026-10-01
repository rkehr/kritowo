"use client";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" aria-label="Home" className="relative ">
      <h1 className="font-black text-underline transition-all duration-600  whitespace-pre backdrop-blur-lg italic text-2xl">
        {`Kritische 
Orientierungswochen 
2026`}
      </h1>
    </Link>
  );
}
