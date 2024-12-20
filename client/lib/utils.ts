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

type EmojiCategory = "junkFood" | "expenses" | "others";

const emojiCategories = {
  junkFood: ["🍕", "🍔", "🍟", "🍩", "🍪", "🍦", "🍫", "🍿", "🍓", "🍇"],
  expenses: ["💰", "💸", "📉", "📊", "💳", "💵", "🏦", "💼", "🛒", "💸"],
  others: [
    "🚀",
    "🎉",
    "🐱",
    "🌟",
    "🎵",
    "💻",
    "😎",
    "👾",
    "🏖️",
    "🎮",
    "🧑‍💻",
    "🐉",
    "🦄",
    "🌈",
    "🦊",
    "⚡",
    "🥑",
    "🍉",
    "🍿",
    "🍩",
    "🎨",
    "🏅",
    "🌍",
    "🛸",
    "🤖",
    "🎩",
    "💡",
  ],
};

export function getRandomEmoji(
  count: number = 1,
  category?: EmojiCategory
): string {
  const emojis = category ? emojiCategories[category] : emojiCategories.others;
  return Array.from(
    { length: count },
    () => emojis[Math.floor(Math.random() * emojis.length)]
  ).join(" ");
}

export const Capitalized = (text: string) => {
  if (!text) return ""; // Handle empty or undefined text input
  return text.charAt(0).toUpperCase() + text.slice(1);
};
