import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-In", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
