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
    color: "from-[#F85032] to-[#E73827]", // Rich warm red-orange gradient
    example: "e.g. Spent 200 on snacks",
    desc: "Track your cash flow, big spender.",
  },
  {
    id: "unique-id-2",
    title: "Junk Food",
    icon: Pizza,
    color: "from-[#FF9F43] to-[#FF5722]", // Medium orange gradient
    example: "e.g. Pizza... again",
    desc: "For those tasty, guilty moments.",
  },
  {
    id: "unique-id-3",
    title: "Journal",
    icon: BookOpen,
    color: "from-[#3B82F6] to-[#2563EB]", // Medium blue gradient
    example: "e.g. Felt like a rockstar today",
    desc: "Your thoughts, your stage, always.",
  },
  {
    id: "unique-id-4",
    title: "Task",
    icon: CheckCircle,
    color: "from-[#10B981] to-[#059669]", // Bold green-teal gradient
    example: "e.g. Read 2 pages... maybe 3",
    desc: "Tackle the to-dos, like a pro.",
  },
  {
    id: "unique-id-5",
    title: "Habits",
    icon: Repeat,
    color: "from-[#8B5CF6] to-[#7C3AED]", // Vibrant purple gradient
    example: "e.g. Meditated for 10 minutes",
    desc: "Build routines, shape your future.",
  },
  {
    id: "unique-id-6",
    title: "Exercise",
    icon: Dumbbell,
    color: "from-[#22C55E] to-[#16A34A]", // Fresh lime-green gradient
    example: "e.g. 15 push-ups, 20 squats",
    desc: "Stay fit, stay unstoppable.",
  },
];
