import DayTask from "../models/dayTask.models.js";
import Habits from "../models/habits.model.js";

export const getDayTaskStats = async (clerkID) => {
  const aggregation = await DayTask.aggregate([
    { $match: { clerkID } },
    {
      $project: {
        totalExpenses: {
          $sum: [{ $sum: "$expenses.amount" }, { $sum: "$junkFood.amount" }],
        },
        junkFoodCount: { $size: "$junkFood" },
        todosCompleted: {
          $size: {
            $filter: {
              input: "$todo",
              as: "task",
              cond: { $eq: ["$$task.isCompleted", true] },
            },
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        totalExpenses: { $sum: "$totalExpenses" },
        junkFoodCount: { $sum: "$junkFoodCount" },
        todosCompleted: { $sum: "$todosCompleted" },
      },
    },
  ]);

  return (
    aggregation[0] || {
      totalExpenses: 0,
      junkFoodCount: 0,
      todosCompleted: 0,
    }
  );
};

export const getHabitsStats = async (clerkID) => {
  const aggregation = await Habits.aggregate([
    { $match: { clerkID } },
    {
      $project: {
        habitsCompleted: { $size: "$completedDates" },
      },
    },
    {
      $group: {
        _id: null,
        habitsCompleted: { $sum: "$habitsCompleted" },
      },
    },
  ]);

  return aggregation[0] || { habitsCompleted: 0 };
};
