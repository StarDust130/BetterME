import { Capitalized, getRandomEmoji } from "@/lib/utils";
import { HabitsType } from "../List";
import { MoreVertical, CheckCircle, Circle, CalendarCheck,} from "lucide-react"; // Import Lucide icons

interface HabitsCardsProps {
  habitsData: HabitsType[];
}

const HabitsCards = ({ habitsData }: HabitsCardsProps) => {
  return (
    <div className="p-5 rounded-xl bg-gray-100 shadow-lg w-full md:max-w-4xl md:mx-auto border-b-2 border-t-2">
      <h2 className="text-xl font-semibold mb-4 flex justify-center items-center gap-3 text-black text-center">
        <span className="text-3xl">🎉</span> Today’s Habits
      </h2>

      <ul className="space-y-6">
        {habitsData.map((habit, index) => {
          const startDate = new Date(habit.startDate);
          const completed = habit.completedDates.includes(
            startDate.toISOString()
          );
          const frequencyText =
            habit.frequency.length === 7
              ? "Daily"
              : habit.frequency.length === 5
              ? "Weekdays"
              : habit.frequency.length === 6
              ? "Mon-Sat"
              : Capitalized(habit.frequency.join(", "));

          return (
            <li
              key={index}
              className={`flex items-center justify-between bg-white border-2 border-blue-50 p-5 rounded-lg shadow-md transition-all duration-300 transform md:hover:scale-105 ${
                completed ? "opacity-60" : "opacity-100"
              }`}
            >
              <div className="flex gap-4 w-full">
                {/* Circle Icon */}
                <div className="flex items-center justify-center">
                  {completed ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400" />
                  )}
                </div>

                {/* Habit Details */}
                <div className="flex flex-col w-full justify-center items-start flex-grow">
                  {/* Habit Name and Streak */}
                  <div className="flex justify-between items-center w-full">
                    <span
                      className={`text-xl font-semibold cursor-pointer transition-colors duration-300 ${
                        completed
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {habit.habitName}
                    </span>

                    <div className="mt-2 text-sm text-gray-700 flex justify-center items-center">
                      <span className="font-semibold">{habit.streak}</span> 🔥{" "}
                      {habit.habitName.length <= 7
                        ? getRandomEmoji(2)
                        : getRandomEmoji(1)}
                    </div>
                  </div>

                  {/* Frequency  */}
                  <div className=" flex items-center  text-sm  font-light mt-1 px-3 py-1 rounded-full text-white border-2 border-blue-500 bg-blue-100">
                    <CalendarCheck className="w-5 h-5 text-blue-500" />
                    <span className="ml-2 text-gray-800 font-semibold">{frequencyText}</span>
                  </div>
                </div>

                {/* More Icon */}
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
