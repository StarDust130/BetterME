import { AppError } from "../lib/AppError.js";
import { catchAsync } from "../lib/catchAsync.js";
import { getDateFilter } from "../lib/extras.js";

import getSummaryAndTips from "../ai/getSummaryAndTips.js";
import {
  expensesStatsAggregation,
  habitsStatsAggregation,
  junkFoodStatsAggregation,
  todosStatsAggregation,
} from "../lib/aggregation.js";
import Habits from "../models/habits.model.js";
import DayTask from "../models/dayTask.models.js";

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

  res.status(200).json(responseData);
});

//! Habits Stats 😉
const HabitsStats = catchAsync(async (req, res, next) => {
  const clerkID = req.clerkID;
  const { timeframe } = req.query;

  // Get the date filter based on the selected timeframe
  const dateFilter = getDateFilter(timeframe);

  const stats = await habitsStatsAggregation(clerkID, dateFilter);

  // const summary = await getSummaryAndTips(aiData, "habits");

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

//!  Day Wise  Stats 📅
const allDayStats = catchAsync(async (req, res, next) => {
  const clerkID = req.clerkID; // Clerk ID from the request (assumed to be set in middleware)
  const { limit = 10, skip = 0, sort = "desc" } = req.query;

  // Fetch Habits data for the given clerkID, ordered by date
  const habits = await Habits.find({ clerkID: clerkID })
    .limit(parseInt(limit)) // Apply limit
    .skip(parseInt(skip)) // Apply skip for pagination
    .sort({ createdAt: sort === "desc" ? -1 : 1 }); // Sort by createdAt field

  // Fetch DayTask data for the given clerkID, ordered by date
  const dayTasks = await DayTask.find({ clerkID: clerkID })
    .limit(parseInt(limit)) // Apply limit
    .skip(parseInt(skip)) // Apply skip for pagination
    .sort({ date: sort === "desc" ? -1 : 1 }); // Sort by date

  // If no day tasks found, return a 404 error
  if (!dayTasks || dayTasks.length === 0) {
    return res.status(404).json({ message: "No tasks found for this clerk." });
  }

  // Combine the data from both models by date
  const combinedData = dayTasks.map((dayTask) => {
    const habitData = habits.filter((habit) =>
      habit.completedDates.includes(dayTask.date.toISOString().split("T")[0])
    );

    return {
      date: dayTask.date.toISOString().split("T")[0],
      habits: habitData,
      expenses: dayTask.expenses,
      junkFood: dayTask.junkFood,
      journal: dayTask.journal,
      todo: dayTask.todo,
    };
  });

  // Return the combined data
  return res.status(200).json({ data: combinedData });
});




export { ExpensesStats, JunkFoodStats, TodosStats, HabitsStats, allDayStats };
