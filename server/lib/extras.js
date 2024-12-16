
export const frequencyMap = {
  "mon-wed-fri": ["mon", "wed", "fri"],
  "tue-thu-sat": ["tue", "thu", "sat"],
  weekdays: ["mon", "tue", "wed", "thu", "fri"], // Monday to Friday
  "mon-sat": ["mon", "tue", "wed", "thu", "fri", "sat"], // Monday to Saturday
  daily: ["daily"], // Default for every day
};

// Function to calculate the streak based on completed dates
export const calculateStreak = (completedDates) => {
  // Sort completed dates in ascending order
  const allDates = completedDates
    .map((date) => new Date(date))
    .sort((a, b) => a - b);

  let streak = 1; // Start with 1 because the first day is part of the streak
  for (let i = 1; i < allDates.length; i++) {
    // Check if there's a 1-day gap between the dates
    if (allDates[i] - allDates[i - 1] !== 86400000) {
      // 86400000 is the number of milliseconds in a day
      return 0; // Streak broken, return 0
    }
    streak++; // Increment the streak
  }

  return streak; // Return the streak count if no gaps were found
};
