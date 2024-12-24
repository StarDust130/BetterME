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


export const getFrequencyText = (frequency: string[]): string => {
  if (frequency.length === 7) return "Daily";
  if (frequency.length === 5) return "Weekdays";
  if (frequency.length === 6) return "Mon-Sat";
  return frequency
    .map((day) => day.charAt(0).toUpperCase() + day.slice(1))
    .join(", ");
};


export const sortDays = (days: string[]) => {
  const order = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  return days.sort((a, b) => order.indexOf(a) - order.indexOf(b));
};
