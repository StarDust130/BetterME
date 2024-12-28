"use client";

import { useEffect } from "react";
import NProgress from "nprogress";
import { usePathname } from "next/navigation"; // App Router's usePathname for route change detection

const ProgressBar = () => {
  const pathname = usePathname(); // Detect route changes

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    // Trigger start and stop on route changes
    handleStart();
    handleStop();

    return () => {
      handleStop(); // Cleanup
    };
  }, [pathname]); // Runs whenever the pathname changes

  return null; // No UI rendered, only the progress bar handled by NProgress
};

export default ProgressBar;
