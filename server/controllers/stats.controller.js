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
  const clerkID = req.clerkID;
  const { timeframe } = req.query;

  // Get the date filter based on the selected timeframe
  const dateFilter = getDateFilter(timeframe);

  try {
    const page = req.query.page || 1;
    const limit = parseInt(req.query.limit) || 10; // Ensure limit is a number
    const sortBy = req.query.sortBy || "completedDate";
    const sortOrder = req.query.sortOrder || "desc";

    // Pagination offset
    const skip = (page - 1) * limit;

    // Aggregate for DayTask: Tasks completed on a particular day
    const dayTaskStats = await DayTask.aggregate([
      {
        $match: {
          clerkID,
          ...dateFilter, // Filter by date range (e.g., completed date)
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$completedDate" },
          }, // Group by day
          tasks: { $push: "$$ROOT" }, // Push all task data for that day
        },
      },
      {
        $sort: { _id: sortOrder === "asc" ? 1 : -1 }, // Sort by date
      },
      {
        $skip: skip, // Pagination skip
      },
      {
        $limit: limit, // Pagination limit
      },
      {
        $project: {
          date: "$_id", // Return the date in a readable format
          tasks: 1,
        },
      },
    ]);

    // Aggregate for Habits: Habits completed on the given day
    const habitStats = await Habits.aggregate([
      {
        $match: {
          clerkID,
          completedDates: { $in: [dateFilter.completedDate] }, // Filter by specific completed date
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$completedDates" },
          }, // Group by day
          habits: { $push: "$$ROOT" }, // Push all habit data for that day
        },
      },
      {
        $sort: { _id: sortOrder === "asc" ? 1 : -1 }, // Sort by date
      },
      {
        $skip: skip, // Pagination skip
      },
      {
        $limit: limit, // Pagination limit
      },
      {
        $project: {
          date: "$_id", // Return the date in a readable format
          habits: 1,
        },
      },
    ]);

    // Calculate total number of records for pagination (optional)
    const totalDayTasks = await DayTask.countDocuments({
      clerkID,
      ...dateFilter,
    });
    const totalHabits = await Habits.countDocuments({
      clerkID,
      completedDates: { $in: [dateFilter.completedDate] },
    });

    const totalItems = totalDayTasks + totalHabits;
    const totalPages = Math.ceil(totalItems / limit);

    const responseData = {
      insights: {
        dayTaskStats,
        habitStats,
        summary: {
          summary:
            "You spent a total of ₹6000 in 1 day, with ₹5000 on essentials 📊 and ₹1000 on junk food 😊. Your average daily spend is ₹6000.",
          recommendation:
            "Consider reducing junk food expenses, as ₹1000 is a significant amount for a single day. Allocate that amount to savings or essential expenses for a more balanced budget.",
        },
        page,
        limit,
        totalPages,
        totalItems,
      },
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching daily stats:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});




export { ExpensesStats, JunkFoodStats, TodosStats, HabitsStats, allDayStats };
