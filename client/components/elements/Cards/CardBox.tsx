import { BadgeIndianRupee, Pizza, Smile, MoreHorizontal } from "lucide-react";
import { DataType } from "../List";

const CardBox = ({ data }: { data: DataType }) => {
  const isExpense = data.type === "expense";

  return (
    <div className="relative w-full max-w-sm bg-gradient-to-br from-gray-50 to-white border rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300 p-6">
      {/* 3-Dot Menu */}
      <div className="absolute top-4 right-4 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
        <MoreHorizontal className="w-6 h-6 text-gray-500" />
      </div>

      {/* Icon and Title */}
      <div className="flex flex-col items-center text-center gap-4">
        <div
          className={`flex items-center justify-center w-16 h-16 rounded-full shadow-md ${
            isExpense
              ? "bg-gradient-to-tr from-red-400 to-red-600"
              : "bg-gradient-to-tr from-blue-400 to-blue-600"
          }`}
        >
          {isExpense ? (
            <BadgeIndianRupee className="text-white w-8 h-8" />
          ) : (
            <Pizza className="text-white w-8 h-8" />
          )}
        </div>
        <h3 className="text-xl font-semibold text-gray-800">
          {isExpense ? data.title : data.foodName}
        </h3>
      </div>

      {/* Content Section */}
      <div className="mt-6 space-y-4">
        {isExpense ? (
          <div className="text-center">
            <p className="text-sm text-gray-500">Amount</p>
            <p className="text-2xl font-bold text-gray-800">
              ₹{data.amount?.toFixed(2) ?? "0.00"}
            </p>
          </div>
        ) : (
          <div
            className={`flex items-center gap-4 p-4 rounded-lg shadow-md ${
              data.foodName ? "bg-red-100" : "bg-green-100"
            }`}
          >
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full ${
                data.foodName ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {data.foodName ? (
                <Pizza className="text-white w-6 h-6" />
              ) : (
                <Smile className="text-white w-6 h-6" />
              )}
            </div>
            <p
              className={`text-sm font-medium ${
                data.foodName ? "text-red-700" : "text-green-700"
              }`}
            >
              {data.foodName
                ? "Oops! Junk food today! 🍔"
                : "Awesome! No junk food today! 🥗"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardBox;
