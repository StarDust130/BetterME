const prepareAiData = (aggregation, lastMonthAggregation) => {
  if (!aggregation || !Array.isArray(aggregation)) return {}; // Guard clause if aggregation is invalid

  // Calculate total spending and junk food spending
  const totalSpent = aggregation.reduce(
    (sum, day) => sum + (day.totalSpent || 0),
    0
  );

  // Ensure junkFoodDetails exists and calculate the junk food spending
  const junkFoodSpent = aggregation.reduce((sum, day) => {
    const junkFoodAmount = day.junkFoodDetails
      ? day.junkFoodDetails.reduce(
          (foodSum, food) => foodSum + (food.amount || 0),
          0
        )
      : 0;
    return sum + junkFoodAmount;
  }, 0);

  const essentialSpent = totalSpent - junkFoodSpent;

  // Identify high spending days and their dates
  const highSpendingDays = aggregation
    .filter((day) => day.totalSpent > 1000) // You can adjust the threshold here
    .map((day) => ({ date: day._id, totalSpent: day.totalSpent })); // Assuming '_id' is the date

  // Month vs Last Month Comparison: Calculate total for current and last month
  const currentMonthTotal = totalSpent;

  const lastMonthTotal =
    lastMonthAggregation?.reduce(
      (sum, day) => sum + (day.totalSpent || 0),
      0
    ) || 0;

  // Calculate trends and stats
  const junkFoodTrend = junkFoodSpent / totalSpent > 0.3; // Junk food is more than 30% of total spending
  const averageDailySpend = aggregation.length
    ? Math.round(totalSpent / aggregation.length)
    : 0;

  return {
    totalSpent,
    essentialSpent,
    junkFoodSpent,
    junkFoodTrend,
    highSpendingDays,
    currentMonthTotal,
    lastMonthTotal,
    totalDays: aggregation.length,
    averageDailySpend,
  };
};

export default prepareAiData;
