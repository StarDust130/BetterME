export const frequencyMap = {
  "mon-wed-fri": ["mon", "wed", "fri"],
  "tue-thu-sat": ["tue", "thu", "sat"],
  daily: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"], // All days
};

export const updateStreakMiddleware = async function (next) {
  const habit = this; // `this` refers to the document being saved
  const today = new Date().toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)

  console.log(`Updating streak for habit: ${habit.habitName}`);
  console.log(`Today's date: ${today}`);

  // 1. Check if habit follows a custom frequency pattern (e.g., "mon", "tue", "wed")
  if (habit.frequency.length > 1) {
    console.log("Frequency: Custom (e.g., mon, tue, wed)");

    // Convert completedDates to day names (e.g., "mon", "tue", "wed", ...)
    const completedDays = habit.completedDates.map((date) =>
      new Date(date).toLocaleString("en-us", { weekday: "short" }).toLowerCase()
    );
    console.log(`Completed days: ${completedDays.join(", ")}`);

    // Track streak and reset logic
    let streak = 0;
    let highestStreak = habit.highestStreak || 0;
    let lastValidDayIndex = -1;

    // Iterate over completed days and check against the frequency pattern
    for (let i = 0; i < completedDays.length; i++) {
      const day = completedDays[i];
      const currentDayIndex = habit.frequency.indexOf(day);
      if (currentDayIndex !== -1) {
        // If the day is valid, check if it's the next expected day in the sequence
        if (currentDayIndex === lastValidDayIndex + 1) {
          streak++; // Increment streak if it follows the expected pattern
          console.log(`Completed on valid day: ${day}. Streak: ${streak}`);
        } else {
          // If it's not the next expected day in the sequence, reset streak
          streak = 1; // Reset to 1 for a new streak
          console.log(
            `Day ${day} is out of order. Resetting streak to: ${streak}`
          );
        }
        lastValidDayIndex = currentDayIndex;
      } else {
        // Reset streak if day is not in the frequency pattern
        streak = 1;
        console.log(`Day ${day} does not match pattern. Resetting streak.`);
      }
    }

    // Update streak and highestStreak
    habit.streak = streak;
    if (habit.streak > highestStreak) {
      console.log(`New highest streak: ${habit.streak}`);
      habit.highestStreak = habit.streak;
    }
  } else {
    // 2. Handle daily frequency: if habit marked today, update streak accordingly
    if (habit.frequency.includes("daily")) {
      console.log("Frequency: Daily");

      // If today is not in completedDates, reset streak to 0
      if (!habit.completedDates.includes(today)) {
        console.log(
          "Today's date not found in completed dates, resetting streak."
        );
        habit.streak = 0;
      } else {
        // Streak continues based on the number of completed dates
        habit.streak = habit.completedDates.length;
        console.log(`Streak updated to: ${habit.streak}`);
      }
    }
  }

  // 3. Update highest streak if needed
  if (habit.streak > habit.highestStreak) {
    console.log(`New highest streak: ${habit.streak}`);
    habit.highestStreak = habit.streak;
  }

  next(); // Proceed with saving the document
};


export const getDateFilter = (timeframe) => {
  const now = new Date();
  let start;

  switch (timeframe) {
    case "today":
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "week":
      start = new Date(now);
      start.setDate(start.getDate() - 7);
      break;
    case "month":
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    default: // "all"
      return {};
  }

  return { createdAt: { $gte: start, $lt: now } };
};
