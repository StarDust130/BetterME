import { AppError } from "../lib/AppError.js";
import { catchAsync } from "../lib/catchAsync.js";
import { getDateFilter } from "../lib/extras.js";
import DayTask from "../models/dayTask.models.js";
import getSummaryAndTips from "../ai/getSummaryAndTips.js";

//! Expenes Stats 🤑
const ExpenesStats = catchAsync(async (req, res, next) => {
  const clerkID = req.clerkID;
  const { timeframe } = req.query;

  // Function to get date filters based on timeframe
  const dateFilter = getDateFilter(timeframe);

  // Aggregation pipeline
  const aggregation = await DayTask.aggregate([
    {
      $match: {
        clerkID,
        ...dateFilter,
      },
    },
    {
      $project: {
        date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        totalSpent: {
          $add: [{ $sum: "$expenses.amount" }, { $sum: "$junkFood.amount" }],
        },
        expenses: "$expenses",
        junkFood: "$junkFood",
      },
    },
    {
      $group: {
        _id: "$date",
        totalSpent: { $sum: "$totalSpent" },
        expenseDetails: { $push: "$expenses" },
        junkFoodDetails: { $push: "$junkFood" },
      },
    },
    {
      $sort: { totalSpent: -1 }, // Sort by highest spending
    },
  ]);

  // Calculate additional stats
  const totalSpent = aggregation.reduce((sum, day) => sum + day.totalSpent, 0);
  const highestSpendingDay = aggregation.length ? aggregation[0]._id : null;
  const averageDailySpend =
    aggregation.length > 0 ? totalSpent / aggregation.length : 0;

  // Prepare AI summary request
  const aiData = {
    totalSpent,
    highestSpendingDay,
    averageDailySpend: Math.round(averageDailySpend),
  };

  // Call the AI summary function (mocked here)
  const summary = await getSummaryAndTips(aiData, "expenses");

  // Combine aggregation with AI response
  const responseData = {
    insights: {
      totalSpent,
      highestSpendingDay,
      averageDailySpend: Math.round(averageDailySpend),
      details: aggregation,
    },
    summary,
  };

  // Send response
  res.status(200).json(responseData);
});

//! JunkFood Stats 🍔
const JunkFoodStats = catchAsync(async (req, res, next) => {});

//! Todos Stats 📝
const TodosStats = catchAsync(async (req, res, next) => {});

//! Habits Stats 😉
const HabitsStats = catchAsync(async (req, res, next) => {});

//!  Day Wise  Stats 📅
const allDayStats = catchAsync(async (req, res, next) => {});

export { ExpenesStats, JunkFoodStats, TodosStats, HabitsStats, allDayStats };
