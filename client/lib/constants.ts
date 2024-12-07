import {
  BadgeIndianRupee,
  Pizza,
  BookOpen,
  CheckCircle,
  Dumbbell,
  Repeat,
} from "lucide-react";

export const cardData = [
  {
    id: "unique-id-1",
    title: "Expenses",
    icon: BadgeIndianRupee,
    color: "from-red-600 to-red-700", // Richer, medium red gradient
    example: "e.g. Spent 200 on snacks",
    desc: "Track your cash flow, big spender.",
  },
  {
    id: "unique-id-2",
    title: "Junk Food",
    icon: Pizza,
    color: "from-amber-500 to-amber-600", // Warm amber gradient (peachy-orange)
    example: "e.g. Pizza... again",
    desc: "For those tasty, guilty moments.",
  },
  {
    id: "unique-id-3",
    title: "Journal",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600", // Calming blue gradient
    example: "e.g. Felt like a rockstar today",
    desc: "Your thoughts, your stage, always.",
  },
  {
    id: "unique-id-4",
    title: "Task",
    icon: CheckCircle,
    color: "from-green-500 to-green-600", // Fresh green gradient
    example: "e.g. Read 2 pages... maybe 3",
    desc: "Tackle the to-dos, like a pro.",
  },
  {
    id: "unique-id-5",
    title: "Habits",
    icon: Repeat,
    color: "from-purple-500 to-purple-600", // Vibrant purple gradient
    example: "e.g. Meditated for 10 minutes",
    desc: "Build routines, shape your future.",
  },
  {
    id: "unique-id-6",
    title: "Exercise",
    icon: Dumbbell,
    color: "from-teal-500 to-teal-600", // Refreshing teal gradient
    example: "e.g. 15 push-ups, 20 squats",
    desc: "Stay fit, stay unstoppable.",
  },
];
