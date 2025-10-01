"use client";

import Logo from "./Logo";
import Menu from "./Menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu as MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <Logo />

        <nav className="hidden md:block">
          <Menu showOnMobile={false} />
        </nav>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetTitle className="text-sm sr-only">Navigation</SheetTitle>
            <SheetContent side="right" className="w-72 sm:w-80 max-w-[80vw]">
              <Menu showOnMobile={true} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
