import {
  getDayTaskStats,
  getHabitsStats,
  getTodosCompletionStats,
  habitsProgressStats,
} from "../lib/aggregation.js";
import { AppError } from "../lib/AppError.js";
import { catchAsync } from "../lib/catchAsync.js";
import DayTask from "../models/dayTask.models.js";

//! Habit Progress - GET /api/stats/habit-progress
// Purpose: Fetch streaks and completion rates for all habits.
// [
//   { "habitName": "Read 10 pages", "streak": 5, "completionRate": 80 },
//   { "habitName": "Exercise", "streak": 3, "completionRate": 60 }
// ]

//! Todos Completion Stats 🛺
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

//! Expenses vs Junk Trend 💪
const ExpensesVsJunkTrend = catchAsync(async (req, res) => {
  const clerkID = req.clerkID;
  const { timeframe = "all" } = req.query;

  const trendData = await getDayTaskStats(clerkID, timeframe, true);

  return res.json({
    trendData,
  });
});

const HabitsProgress = catchAsync(async (req, res, next) => {
  const clerkID = req.clerkID;
  const { timeframe = "all" } = req.query;

  const habitsProgress = await habitsProgressStats(clerkID, timeframe);

  return res.json({
    habitsProgress,
  });
});

//! Todos Completion Stats 👩‍🚀
const TodosCompletionStats = catchAsync(async (req, res, next) => {
  const clerkId = req.clerkID;
  const { timeframe = "all" } = req.query;

  const todoStats = await getTodosCompletionStats(clerkId, timeframe);

  return res.json({
    todoStats,
  });
});

const DailyLogs = catchAsync(async (req, res, next) => {});

export {
  OverviewStats,
  ExpensesVsJunkTrend,
  HabitsProgress,
  TodosCompletionStats,
  DailyLogs,
};
