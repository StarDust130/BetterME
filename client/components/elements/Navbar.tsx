"use client";

import { ChartNoAxesCombined, CirclePlus, Home } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function Navbar() {
  const [activeNav, setActiveNav] = useState("/home");

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-neutral-950 text-black dark:text-white flex items-center gap-6 px-8 py-4 rounded-full z-50 shadow-2xl border-2 border-solid border-neutral-300 dark:border-neutral-700 transition-all">
      <div className="relative flex gap-4">
        {/* Links */}
        <Link
          href="/home"
          onClick={() => setActiveNav("/home")}
          className={`p-3 rounded-full text-lg flex items-center justify-center transition-colors ${
            activeNav === "/home"
              ? "font-bold text-black bg-neutral-100 dark:text-white dark:bg-neutral-800 "
              : "text-black/80 dark:text-gray-400 hover:bg-neutral-300 dark:hover:bg-neutral-700"
          }`}
        >
          <Home />
        </Link>
        <Link
          href="/create"
          onClick={() => setActiveNav("/create")}
          className={`p-3 rounded-full text-lg flex items-center justify-center transition-colors ${
            activeNav === "/create"
              ? "font-bold text-black bg-neutral-100 dark:text-white dark:bg-neutral-800"
              : "text-black/80 dark:text-gray-400 hover:bg-neutral-300 dark:hover:bg-neutral-700"
          }`}
        >
          <CirclePlus />
        </Link>
        <Link
          href="/stats"
          onClick={() => setActiveNav("/stats")}
          className={`p-3 rounded-full text-lg flex items-center justify-center transition-colors ${
            activeNav === "/stats"
              ? "font-bold text-black bg-neutral-100 dark:text-white dark:bg-neutral-800"
              : "text-black/80 dark:text-gray-400 hover:bg-neutral-300 dark:hover:bg-neutral-700"
          }`}
        >
          <ChartNoAxesCombined />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
