import DayTask from "../models/dayTask.models.js";
import Habits from "../models/habits.model.js";

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
    { $match: { clerkID, ...dateFilter } },
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
    { $unwind: "$combinedExpenses" },
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
          $divide: ["$totalSpent", { $ifNull: ["$totalDays", 1] }],
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

export const junkFoodStatsAggregation = async (clerkID, dateFilter) => {
 const stats = await DayTask.aggregate([
   {
     $match: {
       clerkID,
       ...dateFilter,
     },
   },
   {
     $unwind: "$junkFood", // Flatten the junkFood array to handle each item separately
   },
   {
     $group: {
       _id: null, // Aggregate across all documents
       totalJunkFoodSpent: { $sum: "$junkFood.amount" }, // Sum all junk food amounts
       totalJunkFoodCount: { $sum: 1 }, // Count the number of junk food items
       averageJunkFoodSpend: { $avg: "$junkFood.amount" }, // Calculate average junk food spend
       highestSpendingDay: {
         $push: {
           day: "$date",
           foodName: "$junkFood.foodName",
           amount: "$junkFood.amount",
         },
       }, // Collect all the day's junk food data to find the highest spender
       items: {
         $push: { name: "$junkFood.foodName", amount: "$junkFood.amount" },
       }, // Collect junk food items
       mostExpensiveItem: { $max: "$junkFood.amount" }, // Find the most expensive junk food item
       mostFrequentDay: {
         $addToSet: {
           $dayOfWeek: "$date",
         },
       }, // Get the day of the week for each junk food purchase
       daysWithJunkFood: {
         $addToSet: "$date",
       }, // Get distinct days with junk food consumption
     },
   },
   {
     $project: {
       totalJunkFoodSpent: 1,
       totalJunkFoodCount: 1,
       averageJunkFoodSpend: 1,
       highestSpendingDay: {
         $arrayElemAt: [
           {
             $sortArray: {
               input: "$highestSpendingDay",
               sortBy: { amount: -1 },
             },
           },
           0,
         ],
       },
       items: { $slice: ["$items", 3] },
       mostExpensiveItem: 1,
       mostFrequentDay: { $arrayElemAt: ["$mostFrequentDay", 0] }, // Pick one frequent day (or adjust as needed)
       totalDaysWithJunkFood: { $size: "$daysWithJunkFood" }, // Count of distinct days with junk food
     },
   },
 ]);

 console.log("junkFoodStats 🍔", stats);

 return {
   totalJunkFoodSpent: stats[0]?.totalJunkFoodSpent || 0,
   totalJunkFoodCount: stats[0]?.totalJunkFoodCount || 0,
   averageJunkFoodSpend: stats[0]?.averageJunkFoodSpend || 0,
   highestSpendingDay: stats[0]?.highestSpendingDay || {}, // Show the full data of the highest spending day
   topJunkFoodItems: stats[0]?.items || [], // Top 3 frequent junk food items
   mostExpensiveItem: stats[0]?.mostExpensiveItem || 0, // Most expensive junk food item
   mostFrequentDay: stats[0]?.mostFrequentDay || "", // Most frequent day for junk food consumption (e.g., Monday)
   totalDaysWithJunkFood: stats[0]?.totalDaysWithJunkFood || 0, // Number of days with junk food consumption
 };

};

export const todosStatsAggregation = async (clerkID, dateFilter) => {
  const stats = await DayTask.aggregate([
    // Filter tasks by clerkID and date
    {
      $match: {
        clerkID,
        ...dateFilter,
      },
    },
    // Unwind the todo array to process each task individually
    {
      $unwind: "$todo",
    },
    // Group tasks by date
    {
      $group: {
        _id: "$date",
        totalTodos: { $sum: 1 },
        completedTodos: {
          $sum: {
            $cond: [{ $eq: ["$todo.isCompleted", true] }, 1, 0],
          },
        },
        incompleteTodos: {
          $sum: {
            $cond: [{ $eq: ["$todo.isCompleted", false] }, 1, 0],
          },
        },
      },
    },
    // Sort by totalTodos descending
    {
      $sort: { totalTodos: -1 },
    },
    // Accumulate stats across all dates
    {
      $group: {
        _id: null,
        totalTodos: { $sum: "$totalTodos" },
        completedTodos: { $sum: "$completedTodos" },
        incompleteTodos: { $sum: "$incompleteTodos" },
        dateStats: {
          $push: {
            date: "$_id",
            totalTodos: "$totalTodos",
          },
        },
      },
    },
    // Project additional insights
    {
      $project: {
        _id: 0,
        totalTodos: 1,
        completedTodos: 1,
        incompleteTodos: 1,
        mostFrequentDay: {
          $arrayElemAt: ["$dateStats.date", 0], // Extract the date with the most todos
        },
        completedPercentage: {
          $multiply: [{ $divide: ["$completedTodos", "$totalTodos"] }, 100],
        },
        incompletePercentage: {
          $multiply: [{ $divide: ["$incompleteTodos", "$totalTodos"] }, 100],
        },
      },
    },
  ]);

  console.log("todosStats 📝", stats);

  // Return the result with default values for undefined stats
  return {
    totalTodos: stats[0]?.totalTodos || 0,
    completedTodos: stats[0]?.completedTodos || 0,
    incompleteTodos: stats[0]?.incompleteTodos || 0,
    mostFrequentDay: stats[0]?.mostFrequentDay
      ? new Date(stats[0].mostFrequentDay)
          .toLocaleDateString("en-GB")
          .replace(/\//g, "-")
      : "",
    completedPercentage: stats[0]?.completedPercentage?.toFixed(2) || "0.00",
    incompletePercentage: stats[0]?.incompletePercentage?.toFixed(2) || "0.00",
  };
};

export const habitsStatsAggregation = async (clerkID, dateFilter) => {
  const stats = await Habits.aggregate([
    {
      $match: {
        clerkID,
        ...dateFilter, // Filter by date, if provided
      },
    },
    {
      $project: {
        habitName: 1,
        completedDates: 1,
        streak: 1,
        highestStreak: 1,
        frequency: 1,
        startDate: 1,
        today: { $literal: new Date().toISOString().split("T")[0] }, // Add today date for comparison
      },
    },
    {
      $addFields: {
        isCompletedToday: {
          $in: ["$today", "$completedDates"], // Check if the current date exists in completedDates array
        },
      },
    },
    {
      $group: {
        _id: null,
        totalHabits: { $sum: 1 }, // Total habits
        completedHabits: {
          $sum: { $cond: [{ $eq: ["$isCompletedToday", true] }, 1, 0] },
        }, // Completed today
        incompleteHabits: {
          $sum: { $cond: [{ $eq: ["$isCompletedToday", false] }, 1, 0] },
        }, // Not completed today
        highestStreak: { $max: "$streak" }, // Highest streak
        totalStreak: { $sum: "$streak" }, // Total streaks
        mostFrequentFrequency: { $push: "$frequency" }, // Collect frequencies
        mostFrequentHabitDay: { $addToSet: "$completedDates" }, // Collect unique completed dates
      },
    },
    {
      $project: {
        totalHabits: 1,
        completedHabits: 1,
        incompleteHabits: 1,
        highestStreak: 1,
        totalStreak: 1,
        mostFrequentFrequency: { $arrayElemAt: ["$mostFrequentFrequency", 0] }, // Get most frequent frequency
        mostFrequentHabitDay: { $arrayElemAt: ["$mostFrequentHabitDay", 0] }, // Get most frequent habit day
        completedPercentage: {
          $multiply: [{ $divide: ["$completedHabits", "$totalHabits"] }, 100],
        },
        incompletePercentage: {
          $multiply: [{ $divide: ["$incompleteHabits", "$totalHabits"] }, 100],
        },
      },
    },
  ]);

  return {
    totalHabits: stats[0]?.totalHabits || 0,
    completedHabits: stats[0]?.completedHabits || 0,
    incompleteHabits: stats[0]?.incompleteHabits || 0,
    highestStreak: stats[0]?.highestStreak || 0,
    totalStreak: stats[0]?.totalStreak || 0,
    mostFrequentFrequency: stats[0]?.mostFrequentFrequency || "Not Available", // Most common frequency
    mostFrequentHabitDay: stats[0]?.mostFrequentHabitDay
      ? new Date(stats[0].mostFrequentHabitDay)
          .toLocaleDateString("en-GB")
          .replace(/\//g, "-")
      : "",
    completedPercentage: stats[0]?.completedPercentage?.toFixed(2) || "0.00",
    incompletePercentage: stats[0]?.incompletePercentage?.toFixed(2) || "0.00",
  };
};



