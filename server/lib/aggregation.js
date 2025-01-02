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

//! Habits Progress Stats
export const habitsProgressStats = async (clerkID, timeframe) => {
  const dateFilter = getDateFilter(timeframe);

  const aggregation = await Habits.aggregate([
    // Step 1: Match the records based on clerkID and timeframe
    {
      $match: { clerkID, ...dateFilter },
    },

    // Step 2: Ensure completedDates is always an array (defaults to an empty array if missing)
    {
      $project: {
        habitName: 1,
        streak: 1,
        completedDates: { $ifNull: ["$completedDates", []] }, // Make sure it's an array
        frequency: 1, // Add frequency to the projection as well
      },
    },

    // Step 3: Group by habitName and get the necessary fields
    {
      $group: {
        _id: "$habitName", // Group by habitName
        streak: { $first: "$streak" }, // Get the first streak value
        completedDates: { $first: "$completedDates" }, // Ensure the array is preserved
        frequency: { $first: "$frequency" }, // Get the frequency array
      },
    },

    // Step 4: Calculate completionRate with rounding and ensure it's capped at 100
    {
      $project: {
        habitName: "$_id", // Rename _id to habitName
        streak: 1,
        completionRate: {
          $cond: {
            if: { $eq: [{ $size: "$completedDates" }, 0] }, // No completed dates
            then: 0,
            else: {
              $let: {
                vars: {
                  rate: {
                    $multiply: [
                      {
                        $divide: [
                          { $size: "$completedDates" },
                          { $size: "$frequency" },
                        ],
                      }, // Completion rate calculation
                      100,
                    ],
                  },
                },
                in: {
                  $round: [{ $min: ["$$rate", 100] }, 2], // Round to 2 decimal places and ensure it doesn't exceed 100
                },
              },
            },
          },
        },
      },
    },
  ]);

  return aggregation; // Return all the habits progress
};



export const calculateMonthlyStats = async (clerkID, date) => {
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const monthlyStats = await DayTask.aggregate([
    {
      $match: {
        clerkID,
        date: { $gte: startOfMonth, $lte: endOfMonth },
      },
    },
    {
      $project: {
        expensesTotal: { $sum: "$expenses.amount" },
        junkFoodTotal: { $sum: "$junkFood.amount" },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: { $add: ["$expensesTotal", "$junkFoodTotal"] } },
      },
    },
  ]);

  return monthlyStats[0] || { total: 0 };
};
