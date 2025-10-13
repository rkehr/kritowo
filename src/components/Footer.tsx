import { Copyleft } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="px-8 py-2 flex items-center text-sm gap-2">
      <Copyleft className="inline opacity-20" />
      <span className="opacity-20">2025 | no cookies, no gods, no masters</span>
      <Link href="/data-protection-agreement"> Impressum </Link>
      <Link href="/data-protection-agreement"> Datenschutzerklärung</Link>
    </div>
  );
}
