import { getRandomEmoji } from "@/lib/utils";
import { HabitsType } from "../List";
import { CheckSquare, Square, MoreVertical } from "lucide-react"; // Import Lucide icons

interface HabitsCardsProps {
  habitsData: HabitsType[];
}

const HabitsCards = ({ habitsData }: HabitsCardsProps) => {
  return (
    <div className="p-6 rounded-xl bg-gray-100 shadow-md w-full md:max-w-4xl md:mx-auto border-b-2 border-t-2">
      <h2 className="text-xl font-semibold mb-4 text-black text-center">
        Today’s Habits
      </h2>
      <ul className="space-y-4">
        {habitsData.map((habit, index) => {
          // Ensure habit.startDate is a Date object
          const startDate = new Date(habit.startDate);
          const completed = habit.completedDates.includes(
            startDate.toISOString()
          );

          return (
            <li
              key={index}
              className={`flex items-center justify-center border-4 p-4 bg-white rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ${
                completed ? "opacity-60" : "opacity-100"
              }`}
            >
              <div className="flex items-center gap-4 w-full rounded-full">
                {/* Checkboxes with icons */}
                {completed ? (
                  <CheckSquare className="w-6 h-6 text-green-500 transform scale-110 transition-transform duration-300" />
                ) : (
                  <Square className="w-6 h-6 text-gray-400 transform scale-90 transition-transform duration-300" />
                )}
                <div className="flex flex-col flex-grow">
                  <span
                    className={`text-lg cursor-pointer flex justify-start transition-colors duration-300 ${
                      completed ? "line-through text-gray-400" : "text-gray-800"
                    }`}
                  >
                    {getRandomEmoji()} {habit.habitName}
                  </span>
                </div>
                <span className="flex "> {habit.streak} 🔥</span>

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
