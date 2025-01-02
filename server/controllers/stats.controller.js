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
      $match: {
        clerkID,
        ...dateFilter,
      },
    },
    {
      $project: {
        expensesTotal: { $sum: "$expenses.amount" },
        junkFoodTotal: { $sum: "$junkFood.amount" },
        date: 1,
        expensesDetails: "$expenses", 
        junkFoodDetails: "$junkFood", 
      },
    },
    {
      $group: {
        _id: null,
        totalSpent: { $sum: { $add: ["$expensesTotal", "$junkFoodTotal"] } },
        essentialSpent: { $sum: "$expensesTotal" },
        junkFoodSpent: { $sum: "$junkFoodTotal" },
        highSpendingDays: {
          $push: {
            $cond: [{ $gt: ["$expensesTotal", 1000] }, "$date", "$$REMOVE"],
          },
        },
        dailyTotals: {
          $push: {
            date: "$date",
            total: { $add: ["$expensesTotal", "$junkFoodTotal"] },
            expensesDetails: "$expensesDetails",
            junkFoodDetails: "$junkFoodDetails",
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
      },
    },
    {
      $addFields: {
        highestSpendingDay: {
          $arrayElemAt: [
            { $sortArray: { input: "$dailyTotals", sortBy: { total: -1 } } },
            0,
          ],
        },
      },
    },
    {
      $addFields: {
        highestSpendingDay: {
          $let: {
            vars: {
              highestSpendingDate: "$highestSpendingDay.date",
              total: "$highestSpendingDay.total",
            },
            in: {
              date: {
                $dateToString: {
                  format: "%d-%m-%Y",
                  date: "$$highestSpendingDate",
                },
              },
              total: "$$total",
              // Removed junkFoodDescription as it was undefined.
            },
          },
        },
      },
    },
  ]);

  const currentMonthStats = await calculateMonthlyStats(clerkID, new Date());
  const lastMonthStats = await calculateMonthlyStats(
    clerkID,
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );

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

  const summary = await getSummaryAndTips(aiData, "expenses");

  const responseData = {
    insights: {
      ...aiData,
      summary,
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
