import { getDayTaskStats, getHabitsStats } from "../lib/aggregation.js";
import { AppError } from "../lib/AppError.js";
import { catchAsync } from "../lib/catchAsync.js";
import DayTask from "../models/dayTask.models.js";

//! Habit Progress - GET /api/stats/habit-progress
// Purpose: Fetch streaks and completion rates for all habits.
// [
//   { "habitName": "Read 10 pages", "streak": 5, "completionRate": 80 },
//   { "habitName": "Exercise", "streak": 3, "completionRate": 60 }
// ]

//! Todos Completion Stats
const OverviewStats = catchAsync(async (req, res) => {
  const clerkID = req.clerkID;
  const { timeframe = "all" } = req.query;

  const [dayTaskStats, habitsStats] = await Promise.all([
    getDayTaskStats(clerkID, timeframe),
    getHabitsStats(clerkID, timeframe),
  ]);

  return res.json({
    totalExpenses: dayTaskStats.totalExpenses,
    junkFoodCount: dayTaskStats.junkFoodCount,
    todosCompleted: dayTaskStats.todosCompleted,
    habitsCompleted: habitsStats.habitsCompleted,
  });
});

//! Expenses vs Junk Trend
const ExpensesVsJunkTrend = catchAsync(async (req, res) => {
  const clerkID = req.clerkID;
    const { timeframe = "all" } = req.query;

  const trendData = await getDayTaskStats(clerkID, timeframe, true); // Pass `includeDate = true`

  return res.json({
    aggregation: trendData,
  });
});

const HabitsProgress = catchAsync(async (req, res, next) => {});

const TodosCompletionStats = catchAsync(async (req, res, next) => {});

const DailyLogs = catchAsync(async (req, res, next) => {});

export {
  OverviewStats,
  ExpensesVsJunkTrend,
  HabitsProgress,
  TodosCompletionStats,
  DailyLogs,
};
