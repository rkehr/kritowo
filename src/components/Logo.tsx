"use client";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" aria-label="Home" className="relative ">
      <h1 className="font-black glow text-underline transition-all duration-600 whitespace-pre backdrop-blur-lg text-3xl">
        {`Kritische              2026
Orientierungswochen 
`}
      </h1>
    </Link>
  );
}
