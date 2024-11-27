import {
  MoreHorizontal,
  BadgeIndianRupee,
  Pizza,
  Smile,
  Frown,
} from "lucide-react";
import { DataType } from "../List";

const CardBox = ({ data }: { data: DataType }) => {
  const isExpense = data.type === "expense";

  return (
    <div className="relative w-full max-w-sm bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 p-5">
      {/* 3-Dot Menu */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
        <MoreHorizontal className="w-5 h-5 text-gray-500 hover:text-gray-800" />
      </div>

      {/* Header Section */}
      <div className="flex justify-between items-start">
        {/* Icon */}
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full ${
            isExpense ? "bg-green-500" : "bg-orange-500"
          }`}
        >
          {isExpense ? (
            <BadgeIndianRupee className="text-white w-6 h-6" />
          ) : (
            <Pizza className="text-white w-6 h-6" />
          )}
        </div>

        {/* Date */}
        {/* Title */}
        <h3 className="mt-4 text-xl font-semibold text-gray-800">
          {isExpense ? data.title : data.foodName}
        </h3>
      </div>

      {/* Content Section */}
      <div className="mt-3">
        {isExpense ? (
          <>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-500">Amount</p>
              <p className="text-lg font-bold text-gray-800">
                ₹{data.amount?.toFixed(2) ?? "0.00"}
              </p>
            </div>
            <div className="flex justify-between gap-1 items-center">
              <p className="text-sm text-gray-500">Category:</p>
              <p className="text-sm text-gray-800">{data.category}</p>
            </div>
          </>
        ) : (
          <div
            className={`flex items-center gap-2 p-3 rounded-md ${
              data.isEatenToday ? "bg-green-100" : "bg-orange-100"
            }`}
          >
            {data.isEatenToday ? (
              <>
                <Frown className="w-10 h-10 text-orange-600" />
                <p className="text-sm font-medium text-orange-800">
                  You ate this today! 🍔
                </p>
              </>
            ) : (
              <>
                <Smile  className="w-10 h-10 text-green-600" />
                <p className="text-xs font-medium text-green-800">
                  Great! No Junk Food Today! 🥗
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="mt-5 flex justify-end">
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 shadow">
          View More
        </button>
      </div>
    </div>
  );
};

export default CardBox;
