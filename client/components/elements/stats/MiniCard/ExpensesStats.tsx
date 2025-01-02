"use client";
import { getClerkUserID } from "@/lib/action";
import axios from "axios";
import { useEffect, useState } from "react";

interface SpendingInsights {
  totalSpent: number;
  essentialSpent: number;
  junkFoodSpent: number;
  highestSpendingDay: {
    date: string;
    total: number;
  };
  currentMonthTotal: number;
  lastMonthTotal: number;
  totalDays: number;
  averageDailySpend: number;
  summary: {
    summary: string;
    recommendation: string;
  };
}

const ExpensesStats = () => {
  const [data, setData] = useState<SpendingInsights | null>(null);

  const getData = async () => {
    const clerkID = await getClerkUserID();

    try {
      const url = `${process.env.NEXT_PUBLIC_STATS_SERVER_URL}`;
      const options = { withCredentials: true };

      const response = await axios.get(
        `${url}/expenses?clerkID=${clerkID}`,
        options
      );

      setData(response.data.insights);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!data) return null;

  return (
    <div className="mx-auto p-4 sm:p-6 max-w-screen-md">
      {/* Total Spending Summary */}
      <div className="mb-4">
        <p className="text-sm md:text-lg text-gray-700">{data.summary.summary}</p>
      </div>

      {/* Spending Breakdown */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <p className="text-sm text-gray-600">Total Spent:</p>
          <p className="text-lg font-semibold text-gray-800">
            ₹{data.totalSpent}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-600">Essentials:</p>
          <p className="text-lg font-semibold text-green-600">
            ₹{data.essentialSpent}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-600">Junk Food:</p>
          <p className="text-lg font-semibold text-red-600">
            ₹{data.junkFoodSpent}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-600">Highest Spending Day:</p>
          <p className="text-lg font-semibold text-gray-800">
            {data.highestSpendingDay.date}
          </p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center mb-3">
          <span className="text-xl font-semibold text-gray-800 mr-2">
            💡 Recommendation
          </span>
        </div>
        <p className="text-base text-gray-800">{data.summary.recommendation}</p>
      </div>

      {/* Monthly Comparison */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="text-sm text-gray-600">Current Month Total:</p>
          <p className="text-lg font-semibold text-gray-800">
            ₹{data.currentMonthTotal}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-600">Last Month Total:</p>
          <p className="text-lg font-semibold text-gray-800">
            ₹{data.lastMonthTotal}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-600">Average Daily Spend:</p>
          <p className="text-lg font-semibold text-gray-800">
            ₹{data.averageDailySpend}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpensesStats;
