import { AppError } from "../lib/AppError.js";
import { catchAsync } from "../lib/catchAsync.js";
import { getDateFilter } from "../lib/extras.js";
import DayTask from "../models/dayTask.models.js";
import getSummaryAndTips from "../ai/getSummaryAndTips.js";
import { calculateMonthlyStats } from "../lib/aggregation.js";

//! Expenses Stats 💸
const ExpensesStats = catchAsync(async (req, res, next) => {
  const clerkID = req.clerkID;
  const { timeframe } = req.query;

  // Get the date filter based on the selected timeframe
  const dateFilter = getDateFilter(timeframe);

const stats = await DayTask.aggregate([
  {
    $match: { clerkID, ...dateFilter },
  },
  {
    $project: {
      expensesTotal: { $sum: "$expenses.amount" },
      junkFoodTotal: { $sum: "$junkFood.amount" },
      date: 1,
    },
  },
  {
    $group: {
      _id: null,
      totalSpent: { $sum: { $add: ["$expensesTotal", "$junkFoodTotal"] } },
      essentialSpent: { $sum: "$expensesTotal" },
      junkFoodSpent: { $sum: "$junkFoodTotal" },
      dailyTotals: {
        $push: {
          date: "$date",
          total: { $add: ["$expensesTotal", "$junkFoodTotal"] },
        },
      },
      totalDays: { $sum: 1 },
    },
  },
  {
    $addFields: {
      averageDailySpend: {
        $cond: [
          { $gt: ["$totalDays", 0] },
          { $divide: ["$totalSpent", "$totalDays"] },
          0,
        ],
      },
      highestSpendingDay: {
        $let: {
          vars: {
            highestSpending: {
              $arrayElemAt: [
                {
                  $sortArray: { input: "$dailyTotals", sortBy: { total: -1 } },
                },
                0,
              ],
            },
          },
          in: {
            date: {
              $dateToString: {
                format: "%d-%m-%Y",
                date: "$$highestSpending.date",
              },
            },
            total: "$$highestSpending.total",
          },
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      totalSpent: 1,
      essentialSpent: 1,
      junkFoodSpent: 1,
      averageDailySpend: 1,
      totalDays: 1,
      dailyTotals: 1,
      highestSpendingDay: 1,
    },
  },
]);


  const currentMonthStats = await calculateMonthlyStats(clerkID, new Date());
  const lastMonthStats = await calculateMonthlyStats(
    clerkID,
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );

  console.log("currentMonthStats 🙂", currentMonthStats);
  console.log("lastMonthStats 😆", lastMonthStats);
  console.log("stats", stats);

  const aiData = {
    totalSpent: stats[0]?.totalSpent || 0,
    essentialSpent: stats[0]?.essentialSpent || 0,
    junkFoodSpent: stats[0]?.junkFoodSpent || 0,
    highestSpendingDay: stats[0]?.highestSpendingDay || null,
    currentMonthTotal: currentMonthStats.total || 0,
    lastMonthTotal: lastMonthStats.total || 0,
    totalDays: stats[0]?.totalDays || 0,
    averageDailySpend: stats[0]?.averageDailySpend || 0,
  };

  // const summary = await getSummaryAndTips(aiData, "expenses");

  const responseData = {
    insights: {
      ...aiData,
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
const JunkFoodStats = catchAsync(async (req, res, next) => {});

//! Todos Stats 📝
const TodosStats = catchAsync(async (req, res, next) => {});

//! Habits Stats 😉
const HabitsStats = catchAsync(async (req, res, next) => {});

//!  Day Wise  Stats 📅
const allDayStats = catchAsync(async (req, res, next) => {});

export { ExpensesStats, JunkFoodStats, TodosStats, HabitsStats, allDayStats };
