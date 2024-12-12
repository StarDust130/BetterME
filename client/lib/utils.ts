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

const emojiCategories = {
  junkFood: ["🍕", "🍔", "🌭", "🍟", "🍩", "🍪", "🥤" , "🧁"],
  expenses: ["💸", "💰", "💳", "🏦", "📈", "📉"],
  others: ["🚀", "🎉", "🐱", "🌟", "🎵", "💻", "😎", "👾", "🏖️", "🎮", "🧑‍💻"],
};

// Function to get a random emoji based on the argument
export function getRandomEmoji(category?: "junkfood" | "expenses"): string {
  if (category === "junkfood") {
    return emojiCategories.junkFood[
      Math.floor(Math.random() * emojiCategories.junkFood.length)
    ];
  } else if (category === "expenses") {
    return emojiCategories.expenses[
      Math.floor(Math.random() * emojiCategories.expenses.length)
    ];
  } else {
    // Pick a random emoji from "others"
    return emojiCategories.others[
      Math.floor(Math.random() * emojiCategories.others.length)
    ];
  }
}