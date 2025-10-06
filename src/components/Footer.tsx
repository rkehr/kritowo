import { Copyleft } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="px-8 py-2 opacity-15 flex items-center text-sm ">
      <Copyleft className="inline" />
      2025 | no cookies, no gods, no masters
      <Link href="/imprint">Imressum</Link>
      <Link href="/data-protection-agreement">Datenschutzerklärung</Link>
    </div>
  );
}
