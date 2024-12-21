/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadgeIndianRupee, Pizza } from "lucide-react";
import { DataType } from "../List";
import { getRandomEmoji } from "@/lib/utils";
import More from "../More";

interface CardBoxProps {
  data: DataType;
  setData: (data: any) => void;
}

const CardBox = ({ data, setData }: CardBoxProps) => {
  const isExpense = data.type === "expenses";

  return (
    <div className="relative w-full max-w-sm bg-gray-50 border rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 overflow-hidden">
      <div className="absolute right-5 top-5">
        <More
          setData={setData}
          field={data.type}
          todayData={data}
          _id={data._id}
        />
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Title Section */}
        <div className="flex flex-col items-start">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            {isExpense ? (
              <>
                {data.title} {getRandomEmoji(1, "expenses")}
              </>
            ) : (
              <>
                {data.foodName} {getRandomEmoji(1, "junkFood")}
              </>
            )}
          </h3>
          <span
            className={`text-sm  font-light mt-1 px-3 py-1 rounded-full text-white border-2 border-gray-100 ${
              isExpense ? "bg-rose-600  " : "bg-cyan-800"
            }`}
          >
            {isExpense ? "Expenses" : "Junk Food"}
          </span>
        </div>

        {/* Amount Section */}
        <div className="flex items-center justify-between">
          <p className="text-2xl md:text-3xl font-extrabold text-gray-900">
            ₹{data.amount?.toFixed(2) ?? "0.00"}
          </p>

          {/* Icon Section */}
          <div className="absolute bottom-4 opacity-80 right-4 w-14 h-14 flex items-center justify-center  rounded-lg">
            <div className="w-12 h-12 flex items-center justify-center   md:hover:scale-105 transform transition-transform duration-300 rounded-md">
              {isExpense ? (
                <BadgeIndianRupee className="text-green-600 w-8 h-8" />
              ) : (
                <Pizza className="text-yellow-600 w-8 h-8" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBox;
