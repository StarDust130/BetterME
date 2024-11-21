"use client";
import Link from "next/link";
import { useState } from "react";
import { Home, CirclePlus, ChartNoAxesCombined } from "lucide-react";

function Navbar() {
  const [activeNav, setActiveNav] = useState("/home");

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-neutral-950 text-black dark:text-white flex items-center justify-around sm:justify-between gap-6 px-4 py-3 sm:bottom-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:w-auto sm:rounded-full z-50 shadow-xl border-t-2 sm:border-2 border-solid border-neutral-300 dark:border-neutral-700 transition-all rounded-t-xl">
      {/* Home Link */}
      <Link
        href="/home"
        onClick={() => setActiveNav("/home")}
        className={`p-3 rounded-full flex items-center justify-center text-lg transition-colors ${
          activeNav === "/home"
            ? "font-bold text-black bg-neutral-200 dark:text-white dark:bg-neutral-800"
            : "text-black/70 dark:text-gray-400 hover:bg-neutral-300 dark:hover:bg-neutral-700"
        }`}
      >
        <Home />
        <span className=" sm:block ml-2 text-sm">Home</span>
      </Link>

      {/* Create Link */}
      <Link
        href="/create"
        onClick={() => setActiveNav("/create")}
        className={`p-3 rounded-full flex items-center justify-center text-lg transition-colors ${
          activeNav === "/create"
            ? "font-bold text-black bg-neutral-200 dark:text-white dark:bg-neutral-800"
            : "text-black/70 dark:text-gray-400 hover:bg-neutral-300 dark:hover:bg-neutral-700"
        }`}
      >
        <CirclePlus />
        <span className=" sm:block ml-2 text-sm">Create</span>
      </Link>

      {/* Stats Link */}
      <Link
        href="/stats"
        onClick={() => setActiveNav("/stats")}
        className={`p-3 rounded-full flex items-center justify-center text-lg transition-colors ${
          activeNav === "/stats"
            ? "font-bold text-black bg-neutral-200 dark:text-white dark:bg-neutral-800"
            : "text-black/70 dark:text-gray-400 hover:bg-neutral-300 dark:hover:bg-neutral-700"
        }`}
      >
        <ChartNoAxesCombined />
        <span className=" sm:block ml-2 text-sm">Stats</span>
      </Link>
    </nav>
  );
}

export default Navbar;
