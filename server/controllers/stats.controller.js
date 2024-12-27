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
  const { timeframe = "all" } = req.query; // Default to "all" if no timeframe is specified

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
const ExpensesVsJunkTrend = catchAsync(async (req, res, next) => {
  const clerkID = req.clerkID;

  const aggregation = await DayTask.aggregate([
    {
      $match: { clerkID },
    },
    {
      $project: {
        date: { $dateToString: { format: "%d-%m-%Y", date: "$date" } },
          expenses: {
          $sum: [{ $sum: "$expenses.amount" }, { $sum: "$junkFood.amount" }],
        },
        junkFood: { $size: "$junkFood" },
      },
    },
    {
      $group: {
        _id: "$date",
        expenses: { $sum: "$expenses" },
        junkFood: { $sum: "$junkFood" },
      },
    },
  ]);

  console.log(aggregation);
  


  return res.json({
    aggregation,
  })
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
