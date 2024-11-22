import { Button } from "@/components/ui/button";
import { BadgeIndianRupee, Pizza, BookOpen, CheckCircle } from "lucide-react";

const cardData = [
  {
    title: "Expenses",
    icon: BadgeIndianRupee,
    color: "from-red-500 to-pink-500",
  },
  {
    title: "Junk Food",
    icon: Pizza,
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "Journal",
    icon: BookOpen,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Task",
    icon: CheckCircle,
    color: "from-green-400 to-teal-500",
  },
];

const Page = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen  p-6">
      {/* Page Header */}
      <h1 className="text-3xl md:text-5xl font-bold  bg-clip-text mb-6">
        Your Daily Hub 📝
      </h1>
      <p className="text-center text-gray-400 text-sm md:text-lg mb-8 max-w-xl">
        Simplify your day—track expenses, manage tasks, and log your habits with
        ease!
      </p>

      {/* Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`relative p-6 rounded-2xl shadow-xl  transform md:hover:scale-105 transition-all bg-gradient-to-tr ${card.color}`}
          >
            {/* Icon */}
            <card.icon className="absolute top-4 right-4 w-10 h-10 opacity-70 text-white" />
            <div className="flex flex-col items-start">
              {/* Title */}
              <h2 className="text-2xl font-semibold text-white mb-3">
                {card.title}
              </h2>
              {/* Description */}
              <p className="text-base text-gray-200">
                Stay on top of your {card.title.toLowerCase()} in style.
              </p>
              {/* Button */}
              <Button className="mt-4 px-4 py-2 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition">
                Add {card.title}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-gray-400 text-sm">
          Start building your productive habits today! 🚀
        </p>
      </div>
    </div>
  );
};

export default Page;
