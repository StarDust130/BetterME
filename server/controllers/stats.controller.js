import { getDayTaskStats, getHabitsStats } from "../lib/aggregation.js";
import { AppError } from "../lib/AppError.js";
import { catchAsync } from "../lib/catchAsync.js";

//! Overview (Key Metrics) - GET /api/stats/overview
// Purpose: Fetch high-level metrics for today, this week, or this month.
// response : {
//   "totalExpenses": 1200,
//   "junkFoodCount": 3,
//   "todosCompleted": 5,
//   "habitsCompleted": 3,
//   "date": "2024-12-26"
// }

//! Expenses vs Junk Food Trend - GET /api/stats/expenses-vs-junk-food
// Purpose: Get daily or weekly trend data for expenses and junk food.
// [
//   { date: "2024-12-20", expenses: 500, junkFood: 2 },
//   { date: "2024-12-21", expenses: 300, junkFood: 1 },
//   { date: "2024-12-22", expenses: 400, junkFood: 3 },
// ];

//! Habit Progress - GET /api/stats/habit-progress
// Purpose: Fetch streaks and completion rates for all habits.
// [
//   { "habitName": "Read 10 pages", "streak": 5, "completionRate": 80 },
//   { "habitName": "Exercise", "streak": 3, "completionRate": 60 }
// ]

//! Todos Completion Rate - GET /api/stats/todos-completion-rate
// Purpose: Get total completed vs incomplete todos for a time range.
//{
//   "totalTodos": 20,
//   "completedTodos": 15,
//   "completionRate": 75
// }

//! Daily Logs (Detailed Stats) - GET /api/stats/daily-logs
// Purpose: Fetch detailed logs for each day, combining data from all models.
// {
//   "date": "2024-12-26",
//   "expenses": [
//     { "title": "Food", "amount": 500 },
//     { "title": "Transport", "amount": 300 }
//   ],
//   "junkFood": [
//     { "foodName": "Pizza", "amount": 200 },
//     { "foodName": "Burger", "amount": 150 }
//   ],
//   "todos": [
//     { "task": "Study React", "isCompleted": true, "priority": "high" },
//     { "task": "Exercise", "isCompleted": false, "priority": "medium" }
//   ],
//   "habits": [
//     { "habitName": "Meditation", "streak": 5, "highestStreak": 10 },
//     { "habitName": "Reading", "streak": 3, "highestStreak": 7 }
//   ]
// }

const OverviewStats = catchAsync(async (req, res) => {
  const { clerkID } = req;

  // 1) Fetch aggregated stats concurrently
  const [dayTaskStats, habitsStats] = await Promise.all([
    getDayTaskStats(clerkID),
    getHabitsStats(clerkID),
  ]);

  // 2) Send response
  return res.json({
    totalExpenses: dayTaskStats.totalExpenses,
    junkFoodCount: dayTaskStats.junkFoodCount,
    todosCompleted: dayTaskStats.todosCompleted,
    habitsCompleted: habitsStats.habitsCompleted,
  });
});

const ExpensesVsJunkTrend = catchAsync(async (req, res, next) => {});

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
