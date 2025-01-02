
export interface SpendingInsights {
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

interface ExpensesProps {
  expenses: SpendingInsights | null;
  getExpenses: () => void;
}

const ExpensesStats = ({ expenses }: ExpensesProps) => {
  if (!expenses) return null;

  return (
    <div className="mx-auto p-2  w-full">
      {/* Total Spending Summary */}
      <div className="mb-6">
        <p className="md:text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {expenses.summary.summary}
        </p>
      </div>

      {/* Spending Breakdown */}
      <div className="space-y-6 mb-6">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Total Spent:
          </p>
          <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            ₹{expenses.totalSpent}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-green-600">Essentials:</p>
          <p className="text-xl font-semibold text-green-600">
            ₹{expenses.essentialSpent}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-red-600">Junk Food:</p>
          <p className="text-xl font-semibold text-red-600">
            ₹{expenses.junkFoodSpent}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Highest Spending Day:
          </p>
          <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {expenses.highestSpendingDay.date}
          </p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mb-8 p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
        <div className="flex items-center mb-3">
          <span className="text-xl font-semibold">🌟 Recommendation</span>
        </div>
        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
          {expenses.summary.recommendation}
        </p>
      </div>

      {/* Monthly Comparison */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Current Month Total:
          </p>
          <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            ₹{expenses.currentMonthTotal}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Last Month Total:
          </p>
          <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            ₹{expenses.lastMonthTotal}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Average Daily Spend:
          </p>
          <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            ₹{expenses.averageDailySpend}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpensesStats;
