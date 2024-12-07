import {
  BadgeIndianRupee,
  Pizza,
  BookOpen,
  CheckCircle,
  Repeat,
  TimerReset,
} from "lucide-react";

export const cardData = [
  {
    id: "unique-id-5",
    title: "Habits",
    icon: Repeat,
    color: "from-indigo-500 to-indigo-600", // Blueish-indigo gradient for habits
    example: "e.g. Meditated for 10 minutes",
    desc: "Build routines, shape your future.",
  },
  {
    id: "unique-id-4",
    title: "Task",
    icon: CheckCircle,
    color: "from-teal-500 to-teal-600", // Cool teal gradient for tasks
    example: "e.g. Read 2 pages... maybe 3",
    desc: "Tackle the to-dos, like a pro.",
  },
  {
    id: "unique-id-1",
    title: "Expenses",
    icon: BadgeIndianRupee,
    color: "from-pink-500 to-pink-600", // Soft pink gradient for expenses
    example: "e.g. Spent 200 on snacks",
    desc: "Track your cash flow, big spender.",
  },
  {
    id: "unique-id-2",
    title: "Junk Food",
    icon: Pizza,
    color: "from-yellow-400 to-yellow-500", // Bright yellow gradient for junk food
    example: "e.g. Pizza... again",
    desc: "For those tasty, guilty moments.",
  },
  {
    id: "unique-id-3",
    title: "Journal",
    icon: BookOpen,
    color: "from-red-500 to-red-600", // Warm red gradient for journaling
    example: "e.g. Felt like a rockstar today",
    desc: "Your thoughts, your stage, always.",
  },
  {
    id: "unique-id-6",
    title: "Coming Soon",
    icon: TimerReset,
    color: "from-blue-500 to-teal-400", // Existing cool blue-to-teal gradient
    desc: "We Add more soon.😎",
  },
];
