import DayTask from "../models/dayTask.models.js";
import Habits from "../models/habits.model.js";
import { getDateFilter } from "./extras.js";

//! Overview (Key Metrics) - GET /api/stats/overview
export const getDayTaskStats = async (clerkID, timeframe) => {
  const dateFilter = getDateFilter(timeframe);

  const aggregation = await DayTask.aggregate([
    { $match: { clerkID, ...dateFilter } }, // Add date filter
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


//! Overview (Key Metrics) - GET /api/stats/overview
export const getHabitsStats = async (clerkID, timeframe) => {
  const dateFilter = getDateFilter(timeframe);

  const aggregation = await Habits.aggregate([
    { $match: { clerkID, ...dateFilter } }, // Add date filter
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

