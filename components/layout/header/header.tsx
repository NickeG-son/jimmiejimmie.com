"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { Button } from "../../ui/button";
import { ThemeToggle } from "../../theme-toggle";
import Menu from "./menu";
import { MenuItem, Category } from "@/lib/types";
import Link from "next/link";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

interface HeaderProps {
  menuItems: MenuItem[];
  categories: Category[];
}

export default function Header({ menuItems, categories }: HeaderProps) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // useMotionValueEvent är det moderna sättet att lyssna på värden
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && !isScrolled) {
      setIsScrolled(true);
    } else if (latest <= 50 && isScrolled) {
      setIsScrolled(false);
    }
  });

  return (
    <header
      className={`fixed top-4 right-0 left-0 z-50 mx-4 rounded-full bg-black/20 shadow-lg backdrop-blur-md transition-all duration-500 md:mx-8`}
    >
      <div
        className={`flex items-center justify-between px-3 py-3 transition-all duration-500`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="bg-muted flex size-12 flex-shrink-0 items-center justify-center rounded-full p-1 text-xl font-bold tracking-widest"
        >
          JJ
        </Link>

        {/* Navigation Links - Center */}
        <Menu menuItems={menuItems} categories={categories} />

        <div className="flex items-center gap-4">
          <Link
            className={`hover:!bg-transparent ${navigationMenuTriggerStyle()} `}
            href="/kontakt"
          >
            Kontakt
          </Link>

          {/*     <ThemeToggle /> */}
        </div>
      </div>
    </header>
  );
}
