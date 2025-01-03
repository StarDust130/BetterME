import DayTask from "../models/dayTask.models.js";

export const calculateMonthlyStats = async (clerkID, date) => {
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const monthlyStats = await DayTask.aggregate([
    {
      $match: {
        clerkID,
        date: { $gte: startOfMonth, $lte: endOfMonth },
      },
    },
    {
      $project: {
        expensesTotal: { $sum: "$expenses.amount" },
        junkFoodTotal: { $sum: "$junkFood.amount" },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: { $add: ["$expensesTotal", "$junkFoodTotal"] } },
      },
    },
  ]);

  return monthlyStats[0] || { total: 0 };
};

export const expensesStatsAggregation = async (clerkID, dateFilter) => {
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
                    $sortArray: {
                      input: "$dailyTotals",
                      sortBy: { total: -1 },
                    },
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

  return {
    totalSpent: stats[0]?.totalSpent || 0,
    essentialSpent: stats[0]?.essentialSpent || 0,
    junkFoodSpent: stats[0]?.junkFoodSpent || 0,
    highestSpendingDay: stats[0]?.highestSpendingDay || null,
    currentMonthTotal: currentMonthStats.total || 0,
    lastMonthTotal: lastMonthStats.total || 0,
    totalDays: stats[0]?.totalDays || 0,
    averageDailySpend: stats[0]?.averageDailySpend || 0,
  };
};

export const junkFoodStatsAggregation = async(clerkID , dateFilter) => {};

export const todosStatsAggregation = async(clerkID , dateFilter) => {};

export const habitsStatsAggregation = async(clerkID , dateFilter) => {};
