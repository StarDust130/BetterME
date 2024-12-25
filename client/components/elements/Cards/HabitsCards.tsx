import { getFrequencyText, getRandomEmoji } from "@/lib/utils";
import { HabitsType } from "../List";
import { CheckCircle, Circle, CalendarCheck } from "lucide-react"; // Import Lucide icons
import { useToast } from "@/hooks/use-toast";
import { getClerkUserID } from "@/lib/action";
import axios from "axios";
import HabitsMore from "../HabitsMore";
import { Dispatch, SetStateAction } from "react";

interface HabitsCardsProps {
  habitsData: HabitsType[];
  setHabitsData: Dispatch<SetStateAction<HabitsType[]>>;
}

const HabitsCards: React.FC<HabitsCardsProps> = ({
  habitsData,
  setHabitsData,
}) => {
  const { toast } = useToast();

  //! Mark habit completion
  const markCompletion = async (id: string) => {
    const today = new Date().toISOString().split("T")[0];

    // Update habits with the new completion status
    const updatedHabits = habitsData.map((habit) => {
      if (habit._id === id) {
        const isCompletedToday = habit.completedDates.includes(today);
        const newCompletedDates = isCompletedToday
          ? habit.completedDates.filter((date) => date !== today)
          : [...habit.completedDates, today];

        return { ...habit, completedDates: newCompletedDates };
      }
      return habit;
    });

    try {
      // Update state with the new habit data
      setHabitsData(updatedHabits);

      // Get the current user ID from Clerk
      const clerkID = await getClerkUserID();

      // Send the update request to the server
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_HABITS_SERVER_URL}/markCompletion?clerkID=${clerkID}&habitID=${id}`
      );

      console.log("Habit updated 🫠", res.data);

      const updatedHabit = updatedHabits.find((habit) => habit._id === id);

      toast({
        title: "Habit Updated 🥳",
        description: `"${updatedHabit?.habitName || "Habit"} is now ${
          updatedHabit?.completedDates.includes(today)
            ? "✅ completed! Great job! 🎊"
            : "❌ pending! Keep going! 💪"
        }"`,
      });
    } catch (error) {
      console.error(error);

      // Revert to previous state on error
      setHabitsData(habitsData);

      toast({
        title: "Failed to update task 😢",
        description:
          "Something went wrong while updating the task! 🚨 Please try again. 🔄",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 rounded-xl bg-gray-100 shadow-lg w-full md:max-w-4xl md:mx-auto border-b-2 border-t-2">
      <h2 className="text-xl font-semibold mb-4 flex justify-center items-center gap-3 text-black text-center">
        <span className="text-3xl">🎉</span> Today’s Habits
      </h2>

      <ul className="space-y-6">
        {habitsData.map((habit) => {
          const today = new Date().toISOString().split("T")[0];
          const completed = habit.completedDates.includes(today);

          return (
            <li
              key={habit._id}
              className={`flex items-center justify-between bg-white border-2 border-blue-50 p-4 rounded-lg shadow-md transition-all duration-300 transform md:hover:scale-105 ${
                completed ? "opacity-60" : "opacity-100"
              }`}
            >
              <div className="flex gap-4 w-full">
                {/* Circle Icon */}
                <div
                  onClick={() => markCompletion(habit._id)}
                  className="flex items-center justify-center cursor-pointer"
                >
                  {completed ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400" />
                  )}
                </div>

                {/* Habit Details */}
                <div className="flex flex-col w-full justify-center items-start flex-grow">
                  {/* Habit Name and Streak */}
                  <div
                    className="flex justify-between items-center w-full"
                    onClick={() => markCompletion(habit._id)}
                  >
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

                  {/* Frequency */}
                  <div className="flex items-center text-sm font-light mt-1 px-3 py-1 rounded-full text-white border-2 border-blue-500 bg-blue-100">
                    <CalendarCheck className="w-5 h-5 text-blue-500" />
                    <span className="ml-2 text-gray-800 font-semibold">
                      {getFrequencyText(habit.frequency)}
                    </span>
                  </div>
                </div>

                {/* More Icon */}
                <HabitsMore
                  _id={habit._id}
                  habitsData={habitsData}
                  setHabitsData={setHabitsData}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HabitsCards;
