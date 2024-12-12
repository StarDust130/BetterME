/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadgeIndianRupee, Pizza, Plus, CheckCircle } from "lucide-react";
import { DataType } from "../List";
import More from "../More";

interface CardBoxProps {
  data: DataType;
  setData: (data: any) => void;
}

const CardBox = ({ data, setData }: CardBoxProps) => {
  const isExpense = data.type === "expenses";

  return (
    <div className="relative w-full max-w-sm bg-white rounded-lg shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300 overflow-hidden">
      {/* Header Section */}
      <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-br from-gray-100 to-gray-50 border-b">
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full shadow-md ${
            isExpense ? "bg-red-500" : "bg-blue-500"
          }`}
        >
          {isExpense ? (
            <BadgeIndianRupee className="text-white w-6 h-6" />
          ) : (
            <Pizza className="text-white w-6 h-6" />
          )}
        </div>
        <More
          field={data.type}
          _id={data._id}
          setData={setData}
          todayData={data}
        />
      </div>

      {/* Main Content */}
      <div className="px-6 py-4 space-y-4">
        {/* Title */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {isExpense ? data.title : data.foodName}
          </h3>
          <h3 className="text-lg font-semibold text-gray-800">
            {isExpense ? "Expense" : "Meal"}
          </h3>
        </div>

        {/* Primary Info */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              ₹{data.amount?.toFixed(2) ?? "0.00"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {data.foodName ? (
              <CheckCircle className="text-green-500 w-6 h-6" />
            ) : (
              <Plus className="text-red-500 w-6 h-6" />
            )}
            <p
              className={`text-sm font-medium ${
                data.foodName ? "text-green-600" : "text-red-600"
              }`}
            >
              {data.foodName ? "Healthy choice!" : "Try something new"}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-50 border-t px-6 py-4">
        <button className="w-full py-2 bg-indigo-500 text-white rounded-md font-medium hover:bg-indigo-600 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default CardBox;
