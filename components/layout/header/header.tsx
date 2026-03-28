"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { Button } from "../../ui/button";
import { ThemeToggle } from "../../theme-toggle";
import Menu from "./menu";
import { MenuItem, Category } from "@/lib/types";
import Link from "next/link";

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
      className={`fixed right-0 left-0 z-50 transition-all duration-500 ${
        isScrolled ? "top-4 mx-4 rounded-full bg-white/10 shadow-lg backdrop-blur-md md:mx-8" : "top-0 bg-transparent"
      }`}
    >
      <div
        className={`flex items-center justify-between px-8 transition-all duration-500 ${isScrolled ? "py-3" : "py-6"}`}
      >
        {/* Logo */}
        <Link href="/" className="text-lg tracking-widest text-white">
          Svensson 4x4
        </Link>

        {/* Navigation Links - Center */}
        <Menu menuItems={menuItems} categories={categories} />

        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/kontakt">Kontakt</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
