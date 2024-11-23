import { BadgeIndianRupee, Pizza, BookOpen, CheckCircle } from "lucide-react";

export const cardData = [
  {
    id: "unique-id-1",
    title: "Expenses",
    icon: BadgeIndianRupee,
    color: "from-red-500 to-pink-500",
    example: "e.g. Spent 200 on snacks",
    desc: "Track your cash flow, big spender.",
  },
  {
    id: "unique-id-2",
    title: "Junk Food",
    icon: Pizza,
    color: "from-yellow-400 to-orange-500",
    example: "e.g. Pizza... again",
    desc: "For those tasty, guilty moments.",
  },
  {
    id: "unique-id-3",
    title: "Journal",
    icon: BookOpen,
    color: "from-blue-500 to-indigo-500",
    example: "e.g. Felt like a rockstar today",
    desc: "Your thoughts, your stage, always.",
  },
  {
    id: "unique-id-4",
    title: "Task",
    icon: CheckCircle,
    color: "from-green-400 to-teal-500",
    example: "e.g. Read 2 pages... maybe 3",
    desc: "Tackle the to-dos, like a pro.",
  },
];
