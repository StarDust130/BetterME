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
    color: "from-yellow-500 to-yellow-600", // Yellow gradient to represent money/expenses
    example: "e.g. Spent 200 on snacks",
    desc: "Track your cash flow, big spender.",
  },
  {
    id: "unique-id-2",
    title: "Junk Food",
    icon: Pizza,
    color: "from-orange-500 to-orange-600", // Orange gradient to represent junk food (warm and vibrant)
    example: "e.g. Pizza... again",
    desc: "For those tasty, guilty moments.",
  },
  {
    id: "unique-id-3",
    title: "Journal",
    icon: BookOpen,
    color: "from-pink-500 to-pink-600", // Neutral pink gradient to represent journaling/thoughts
    example: "e.g. Felt like a rockstar today",
    desc: "Your thoughts, your stage, always.",
  },
  {
    id: "unique-id-4",
    title: "Task",
    icon: CheckCircle,
    color: "from-green-500 to-green-600", // Green gradient to represent productivity and tasks
    example: "e.g. Read 2 pages... maybe 3",
    desc: "Tackle the to-dos, like a pro.",
  },
  {
    id: "unique-id-5",
    title: "Habits",
    icon: Repeat,
    color: "from-purple-500 to-purple-600", // Purple gradient to represent consistency and growth in habits
    example: "e.g. Meditated for 10 minutes",
    desc: "Build routines, shape your future.",
  },
  {
    id: "unique-id-6",
    title: "Exercise",
    icon: Dumbbell,
    color: "from-green-400 to-green-500", // Green gradient to represent health and exercise
    example: "e.g. 15 push-ups, 20 squats",
    desc: "Stay fit, stay unstoppable.",
  },
];



