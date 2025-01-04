import { AppError } from "../lib/AppError.js";
import { catchAsync } from "../lib/catchAsync.js";
import { getDateFilter } from "../lib/extras.js";

import getSummaryAndTips from "../ai/getSummaryAndTips.js";
import { expensesStatsAggregation, junkFoodStatsAggregation } from "../lib/aggregation.js";

//! Expenses Stats 💸
const ExpensesStats = catchAsync(async (req, res, next) => {
  const clerkID = req.clerkID;
  const { timeframe } = req.query;

  // Get the date filter based on the selected timeframe
  const dateFilter = getDateFilter(timeframe);

  const stats = await expensesStatsAggregation(clerkID, dateFilter);

  // const summary = await getSummaryAndTips(aiData, "expenses");

  const responseData = {
    insights: {
      ...stats,
      summary: {
        summary:
          "You spent a total of ₹6000 in 1 day, with ₹5000 on essentials 📊 and ₹1000 on junk food 😊. Your average daily spend is ₹6000.",
        recommendation:
          "Consider reducing junk food expenses, as ₹1000 is a significant amount for a single day. Allocate that amount to savings or essential expenses for a more balanced budget.",
      },
    },
  };

  res.status(200).json(responseData);
});

//! JunkFood Stats 🍔
const JunkFoodStats = catchAsync(async (req, res, next) => {
  const clerkID = req.clerkID;
  const { timeframe } = req.query;

  // Get the date filter based on the selected timeframe
  const dateFilter = getDateFilter(timeframe);

  const stats = await junkFoodStatsAggregation(clerkID, dateFilter);

  // const summary = await getSummaryAndTips(aiData, "junkFood");

  const responseData = {
    insights: {
      ...stats,
      summary: {
        summary:
          "You spent a total of ₹6000 in 1 day, with ₹5000 on essentials 📊 and ₹1000 on junk food 😊. Your average daily spend is ₹6000.",
        recommendation:
          "Consider reducing junk food expenses, as ₹1000 is a significant amount for a single day. Allocate that amount to savings or essential expenses for a more balanced budget.",
      },
    },
  };

  res.status(200).json(responseData);
});

//! Todos Stats 📝
const TodosStats = catchAsync(async (req, res, next) => {
    const clerkID = req.clerkID;
    const { timeframe } = req.query;

    // Get the date filter based on the selected timeframe
    const dateFilter = getDateFilter(timeframe);

    const stats = await todosStatsAggregation(clerkID, dateFilter);

    // const summary = await getSummaryAndTips(aiData, "todos");

    const responseData = {
        insights: {
            ...stats,
            summary: {
                summary:
                    "You spent a total of ₹6000 in 1 day, with ₹5000 on essentials 📊 and ₹1000 on junk food 😊. Your average daily spend is ₹6000.",
                recommendation:
                    "Consider reducing junk food expenses, as ₹1000 is a significant amount for a single day. Allocate that amount to savings or essential expenses for a more balanced budget.",
            },
        },
    };
});

//! Habits Stats 😉
const HabitsStats = catchAsync(async (req, res, next) => {});

//!  Day Wise  Stats 📅
const allDayStats = catchAsync(async (req, res, next) => {});

export { ExpensesStats, JunkFoodStats, TodosStats, HabitsStats, allDayStats };
