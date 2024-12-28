import DayTask from "../models/dayTask.models.js";
import Habits from "../models/habits.model.js";
import { getDateFilter } from "./extras.js";

//! Overview (Key Metrics) - GET /api/stats/overview
export const getDayTaskStats = async (
  clerkID,
  timeframe = null,
  includeDate = false
) => {
  const dateFilter = timeframe ? getDateFilter(timeframe) : {};

  const aggregationPipeline = [
    { $match: { clerkID, ...dateFilter } },
    {
      $project: {
        date: includeDate
          ? { $dateToString: { format: "%d-%m-%Y", date: "$date" } }
          : null,
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
        _id: includeDate ? "$date" : null,
        totalExpenses: { $sum: "$totalExpenses" },
        junkFoodCount: { $sum: "$junkFoodCount" },
        todosCompleted: { $sum: "$todosCompleted" },
      },
    },
    ...(includeDate
      ? [
          {
            $project: {
              date: "$_id",
              totalExpenses: 1,
              junkFoodCount: 1,
              _id: 0,
            },
          },
          { $sort: { date: -1 } },
        ]
      : [
          {
            $project: {
              _id: 0,
              totalExpenses: 1,
              junkFoodCount: 1,
              todosCompleted: 1,
            },
          },
        ]),
  ];

  const aggregation = await DayTask.aggregate(aggregationPipeline);

  return aggregation.length > 0
    ? includeDate
      ? aggregation
      : aggregation[0]
    : {
        totalExpenses: 0,
        junkFoodCount: 0,
        todosCompleted: 0,
      };
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

//! Todos Completion Stats
export const getTodosCompletionStats = async (clerkID, timeframe) => {
  const dateFilter = getDateFilter(timeframe);

  const aggregation = await DayTask.aggregate([
    { $match: { clerkID, ...dateFilter } }, // Add date filter
    {
      $project: {
        completedTodos: {
          $size: {
            $filter: {
              input: "$todo",
              as: "task",
              cond: { $eq: ["$$task.isCompleted", true] },
            },
          },
        },
        totalTodos: {
          $size: "$todo",
        },
      },
    },
    {
      $group: {
        _id: null,
        completedTodos: { $sum: "$completedTodos" },
        totalTodos: { $sum: "$totalTodos" },
      },
    },
    {
      $project: {
        completedTodos: 1,
        _id: 0,
        totalTodos: 1,
        completionRate: {
          $cond: {
            if: { $eq: ["$totalTodos", 0] },
            then: 0,
            else: {
              $multiply: [{ $divide: ["$completedTodos", "$totalTodos"] }, 100],
            },
          },
        },
      },
    },
  ]);

  return (
    aggregation[0] || { completedTodos: 0, totalTodos: 0, completionRate: 0 }
  );
};
