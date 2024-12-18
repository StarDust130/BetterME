export const frequencyMap = {
  "mon-wed-fri": ["mon", "wed", "fri"],
  "tue-thu-sat": ["tue", "thu", "sat"],
  weekdays: ["mon", "tue", "wed", "thu", "fri"], // Monday to Friday
  "mon-sat": ["mon", "tue", "wed", "thu", "fri", "sat"], // Monday to Saturday
  daily: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"], // All days
};

//! Helper Function
export function isDayInFrequency(date, frequency) {
  const dayOfWeek = new Date(date)
    .toLocaleString("en-us", { weekday: "short" })
    .toLowerCase();

  console.log("dayOfWeek 💮", dayOfWeek);

  return frequency.includes("daily") || frequency.includes(dayOfWeek);
}

