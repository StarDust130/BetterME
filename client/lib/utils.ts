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
  const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  frequency.sort((a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b));

  if (frequency.length === 7) return "Daily";
  if (
    frequency.length === 5 &&
    frequency.every(
      (day) =>
        daysOfWeek.indexOf(day) >= daysOfWeek.indexOf("mon") &&
        daysOfWeek.indexOf(day) <= daysOfWeek.indexOf("fri")
    )
  ) {
    return "Weekdays";
  }
  if (
    frequency.length === 6 &&
    frequency.every(
      (day) =>
        daysOfWeek.indexOf(day) >= daysOfWeek.indexOf("mon") &&
        daysOfWeek.indexOf(day) <= daysOfWeek.indexOf("sat")
    )
  ) {
    return "Mon-Sat";
  }

  const ranges: string[] = [];
  let tempRange: string[] = [];

  frequency.forEach((day) => {
    if (
      !tempRange.length ||
      isConsecutive(tempRange[tempRange.length - 1], day)
    ) {
      tempRange.push(day);
    } else {
      ranges.push(formatRange(tempRange));
      tempRange = [day];
    }
  });

  if (tempRange.length) ranges.push(formatRange(tempRange));
  return ranges.join(", ");
};

const isConsecutive = (day1: string, day2: string): boolean => {
  const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return daysOfWeek.indexOf(day2) === daysOfWeek.indexOf(day1) + 1;
};

const formatRange = (days: string[]): string =>
  days.length > 1
    ? `${Capitalized(days[0])}-${Capitalized(days[days.length - 1])}`
    : Capitalized(days[0]);

export const sortDays = (days: string[]) => {
  const order = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  return days.sort((a, b) => order.indexOf(a) - order.indexOf(b));
};
