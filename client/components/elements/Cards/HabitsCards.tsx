import { getRandomEmoji } from "@/lib/utils";
import { HabitsType } from "../List";
import {  MoreVertical, CheckCircle, Circle } from "lucide-react"; // Import Lucide icons

interface HabitsCardsProps {
  habitsData: HabitsType[];
}

const HabitsCards = ({ habitsData }: HabitsCardsProps) => {
  return (
    <div className="p-6 rounded-xl shadow-lg w-full md:max-w-4xl md:mx-auto border-t-2 border-b-2 border-gray-300">
      <h2 className="text-2xl font-semibold mb-6 text-black text-center">
        Today’s Habits
      </h2>
      <ul className="space-y-6">
        {habitsData.map((habit, index) => {
          // Ensure habit.startDate is a Date object
          const startDate = new Date(habit.startDate);
          const completed = habit.completedDates.includes(
            startDate.toISOString()
          );

          return (
            <li
              key={index}
              className={`flex items-center justify-between p-5 bg-white rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ${
                completed ? "opacity-60" : "opacity-100"
              }`}
            >
              <div className="flex items-center gap-4 w-full">
                {/* Checkboxes with icons */}
                {completed ? (
                  <CheckCircle className="w-6 h-6 text-green-500 transition-transform duration-300 transform scale-110" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400 transition-transform duration-300 transform scale-90" />
                )}
                <div className="flex flex-col flex-grow">
                  <span
                    className={`text-lg cursor-pointer transition-colors duration-300 ${
                      completed ? "line-through text-gray-400" : "text-gray-800"
                    }`}
                  >
                    {habit.habitName}
                  </span>
                </div>
                <span className="text-sm flex text-gray-500">
                  {habit.streak} 🔥 {getRandomEmoji()}
                </span>
                <span>
                  <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HabitsCards;
