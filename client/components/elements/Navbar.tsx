"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Home, ChartNoAxesCombined, CirclePlus } from "lucide-react";

function Navbar() {
 const [activeNav, setActiveNav] = useState<string>(""); // Initialize with an empty string
  const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted

  useEffect(() => {
    setIsMounted(true); // Indicate that the component is mounted
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      setActiveNav(currentPath);
    }
  }, []);

  if (!isMounted) {
    return null; // Prevent rendering during SSR
  }

  return (
    <nav className="fixed bottom-0 left-0 w-full h-[60px] sm:h-auto  bg-white dark:bg-neutral-950 text-black dark:text-white flex items-center justify-between px-4 sm:justify-around sm:w-auto sm:rounded-full sm:bottom-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 z-50 shadow-md md:shadow-lg border-t-2 sm:border-2 border-solid border-neutral-300 dark:border-neutral-700 transition-all md:gap-8 md:px-6 lg:px-12 md:rounded-full md:max-w-4xl lg:max-w-6xl">
      {/* Home Link */}
      <Link
        href="/home"
        onClick={() => setActiveNav("/home")}
        className={`flex flex-col md:flex-row rounded-2xl items-center justify-center w-full sm:w-auto p-2 sm:p-3 md:p-4 transition-colors ${
          activeNav === "/home"
            ? "  text-black dark:text-white"
            : "text-gray-600 dark:text-gray-400 "
        }`}
      >
        <Home
          className={`h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 ${
            activeNav === "/home" ? "fill-transparent " : ""
          }`}
        />

        <span className="text-[10px] sm:text-sm md:text-base mt-1 sm:mt-2 md:mt-0 md:ml-2">
          Home
        </span>
      </Link>

      {/* Create Link */}
      <Link
        href="/create"
        onClick={() => setActiveNav("/create")}
        className={`flex flex-col md:flex-row rounded-2xl items-center justify-center w-full sm:w-auto p-2 sm:p-3 md:p-4 transition-colors ${
          activeNav === "/create"
            ? "  text-black dark:text-white"
            : "text-gray-600 dark:text-gray-400 "
        }`}
      >
        <CirclePlus
          className={`h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 ${
            activeNav === "/create" ? "fill-transparent" : ""
          }`}
        />
        <span className="text-[10px] sm:text-sm md:text-base mt-1 sm:mt-2 md:mt-0 md:ml-2">
          Create
        </span>
      </Link>

      {/* Stats Link */}
      <Link
        href="/stats"
        onClick={() => setActiveNav("/stats")}
        className={`flex flex-col md:flex-row rounded-2xl items-center justify-center w-full sm:w-auto p-2 sm:p-3 md:p-4 transition-colors ${
          activeNav === "/stats"
            ? "  text-black dark:text-white"
            : "text-gray-600 dark:text-gray-400 "
        }`}
      >
        <ChartNoAxesCombined
          className={`h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 ${
            activeNav === "/stats" ? "fill-transparent" : ""
          }`}
        />
        <span className="text-[10px] sm:text-sm md:text-base mt-1 sm:mt-2 md:mt-0 md:ml-2">
          Stats
        </span>
      </Link>
    </nav>
  );
}

export default Navbar;
