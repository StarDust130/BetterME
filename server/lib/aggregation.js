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

export const habitsProgressStats = async (clerkID, timeframe) => {
  const dateFilter = getDateFilter(timeframe);

  const aggregation = await Habits.aggregate([
    // Step 1: Match by clerkID and date filter
    { $match: { clerkID, ...dateFilter } },

    // Step 2: Project necessary fields (habitName, streak, frequency, completedDates)
    {
      $project: {
        habitName: 1,
        streak: 1,
        frequency: 1,
        completedDates: 1,
      },
    },

    // Step 3: Group by habitName to calculate completion rate
    {
      $group: {
        _id: "$habitName", // Group by habit name
        streak: { $first: "$streak" },
        frequency: { $first: "$frequency" },
        completedDates: { $first: "$completedDates" },
      },
    },

    // Step 4: Calculate completion rate based on frequency and completedDates
    {
      $project: {
        habitName: "$_id",
        streak: 1,
        completionRate: {
          $let: {
            vars: {
              expectedDays: { $size: "$frequency" }, // You can calculate the expected number of days based on frequency
              completedCount: { $size: "$completedDates" }, // Number of completed days
            },
            in: {
              $cond: {
                if: { $eq: ["$$expectedDays", 0] }, // If no expected days, set completion rate to 0
                then: 0,
                else: {
                  $multiply: [
                    { $divide: ["$$completedCount", "$$expectedDays"] },
                    100,
                  ],
                },
              },
            },
          },
        },
        _id: 0,
      },
    },

    // Optionally, sort by streak or completion rate
    { $sort: { streak: -1 } },
  ]);

  return aggregation;
};


