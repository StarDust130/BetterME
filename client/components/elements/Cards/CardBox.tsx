import { BadgeIndianRupee, Pizza, Smile } from "lucide-react";
import { DataType } from "../List";
import More from "../More";

const CardBox = ({ data }: { data: DataType }) => {
  const isExpense = data.type === "expense";

  return (
    <div className="relative w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 p-6">
      {/* 3-Dot Menu */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
        <More />
      </div>

      {/* Icon and Title */}
      <div className="flex items-center gap-4">
        <div
          className={`flex items-center justify-center w-14 h-14 rounded-full shadow-md ${
            isExpense ? "bg-green-500" : "bg-orange-500"
          }`}
        >
          {isExpense ? (
            <BadgeIndianRupee className="text-white w-7 h-7" />
          ) : (
            <Pizza className="text-white w-7 h-7" />
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          {isExpense ? data.title : data.foodName}
        </h3>
      </div>

      {/* Content Section */}
      <div className="mt-4">
        {isExpense ? (
          <>
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-gray-500">Amount</p>
              <p className="text-xl font-bold text-gray-800">
                ₹{data.amount?.toFixed(2) ?? "0.00"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500">Category:</p>
              <p className="text-sm text-gray-800">{data.category || "N/A"}</p>
            </div>
          </>
        ) : (
          <div
            className={`mt-4 flex items-center gap-3 p-4 rounded-lg ${
              data.isEatenToday ? "bg-red-50" : "bg-green-50"
            }`}
          >
            <div
              className={`p-2 rounded-full ${
                data.isEatenToday ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {data.isEatenToday ? (
                <Pizza className="text-white w-6 h-6" />
              ) : (
                <Smile className="text-white w-6 h-6" />
              )}
            </div>
            <p
              className={`text-sm font-medium ${
                data.isEatenToday ? "text-red-600" : "text-green-600"
              }`}
            >
              {data.isEatenToday
                ? "Junk food consumed today! 🍔"
                : "Great! No junk food today! 🥗"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardBox;
