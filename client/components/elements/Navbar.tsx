"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Home,
  ChartNoAxesCombined,
  CirclePlus,
  Handshake,
  Sparkles,
} from "lucide-react";

function Navbar() {
  const [activeNav, setActiveNav] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      setActiveNav(window.location.pathname);
    }
  }, []);

  if (!isMounted) return null;

  const navItems = [
    { href: "/home", label: "Home", Icon: Home },
    { href: "/ai", label: "AI", Icon: Sparkles },
    { href: "/create", label: "Create", Icon: CirclePlus },
    { href: "/friend", label: "Friend", Icon: Handshake },
    { href: "/stats", label: "Stats", Icon: ChartNoAxesCombined },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full h-[60px] sm:h-auto bg-white dark:bg-neutral-950 text-black dark:text-white flex items-center justify-around sm:justify-between px-4 sm:rounded-full sm:bottom-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 z-50 shadow-lg border-t-2 sm:border-2 border-neutral-300 dark:border-neutral-700 transition-all md:max-w-4xl lg:max-w-6xl">
      {navItems.map(({ href, label, Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={() => setActiveNav(href)}
          className={`flex flex-col items-center justify-center w-full sm:w-auto p-2 sm:p-3 transition-colors ${
            activeNav === href
              ? "text-black dark:text-white"
              : "text-gray-600 dark:text-gray-400"
          } hover:text-black dark:hover:text-white`}
        >
          <Icon
            className={`h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 ${
              activeNav === href ? "fill-transparent" : ""
            }`}
          />
          <span className="md:hidden  text-[10px] sm:text-sm md:text-base mt-1 sm:mt-2">
            {label}
          </span>
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;
