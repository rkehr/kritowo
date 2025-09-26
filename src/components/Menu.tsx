"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuProps {
  showOnMobile: boolean;
}
export default function Menu(props: MenuProps) {
  const pathname = usePathname();
  const { showOnMobile } = props;
  return (
    <div
      className={`gap-8 sticky justify-between items-baseline 
      p-4 md:relative md:p-0 transition-all duration-600 ${
        showOnMobile ? "flex md:hidden" : "hidden md:flex"
      }`}
    >
      {links.map(({ href, text }, index) => {
        const isActive =
          (href === "/" && pathname === href) ||
          (href !== "/" && pathname.startsWith(href));
        return (
          <Link
            key={index}
            className={`hover-glow opacity-80 hover:opacity-100 transition ${
              isActive ? "underline glow opacity-100" : ""
            }`}
            href={href}
          >
            {text}
          </Link>
        );
      })}
    </div>
  );
}

const links = [
  { text: "Programm", href: "/events" },
  { text: "Veranstaltungsorte", href: "/locations" },
  { text: "Blog", href: "/blog" },
  { text: "Selbstverständis", href: "/about" },
];
