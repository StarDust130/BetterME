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
      date: 1,
      expensesTotal: { $sum: "$expenses.amount" },
      junkFoodTotal: { $sum: "$junkFood.amount" },
      combinedExpenses: {
        $concatArrays: [
          {
            $map: {
              input: "$expenses",
              as: "e",
              in: { name: "$$e.title", amount: "$$e.amount" },
            },
          },
          {
            $map: {
              input: "$junkFood",
              as: "jf",
              in: { name: "$$jf.foodName", amount: "$$jf.amount" },
            },
          },
        ],
      },
    },
  },
  {
    $unwind: "$combinedExpenses",
  },
  {
    $group: {
      _id: "$date",
      total: { $sum: "$combinedExpenses.amount" },
      essentialSpent: { $first: "$expensesTotal" },
      junkFoodSpent: { $first: "$junkFoodTotal" },
      items: { $push: "$combinedExpenses" },
    },
  },
  {
    $group: {
      _id: null,
      totalSpent: { $sum: "$total" },
      essentialSpent: { $sum: "$essentialSpent" },
      junkFoodSpent: { $sum: "$junkFoodSpent" },
      dailyTotals: {
        $push: { date: "$_id", total: "$total", items: "$items" },
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
              $first: {
                $sortArray: { input: "$dailyTotals", sortBy: { total: -1 } },
              },
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
            items: "$$highestSpending.items",
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
