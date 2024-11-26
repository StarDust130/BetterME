import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pizza,
  Calendar,
  BadgeIndianRupee,
  Tag,
  Clock,
  Check,
} from "lucide-react";
import { DataType } from "./List";

interface CardBoxProps {
  data: DataType;
  type: "expense" | "junkFood";
}

const CardBox = ({ data, type }: CardBoxProps) => {
  const isExpense = type === "expense";
  const isJunkFood = type === "junkFood";

  return (
    <Card
      className={`transition-transform shadow-sm rounded-lg p-4 bg-white hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]`}
    >
      {/* Card Header */}
      <CardHeader className="flex items-center gap-3">
        <div
          className={`flex items-center justify-center w-10 h-10 p-2 rounded-full ${
            isExpense
              ? "bg-green-500"
              : isJunkFood
              ? "bg-orange-500"
              : "bg-gray-500"
          }`}
        >
          {isExpense ? (
            <BadgeIndianRupee className="text-white w-6 h-6" />
          ) : isJunkFood ? (
            <Pizza className="text-white w-6 h-6" />
          ) : (
            <Calendar className="text-white w-6 h-6" />
          )}
        </div>
        <CardTitle className="text-lg font-semibold text-gray-800">
          {isExpense
            ? (data as DataType).title
            : isJunkFood
            ? (data as DataType).foodName
            : "Unknown Type"}
        </CardTitle>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="text-left w-full flex justify-start p-3  rounded-lg">
        <CardDescription className="text-sm font-medium text-gray-700 flex items-center gap-2">
          {isExpense ? (
            <>
              <span className="inline-block rounded-full bg-blue-100 px-1 py-1 text-sm text-blue-800">
                ₹{(data as DataType).amount?.toFixed(2) ?? "0.00"}
              </span>
              <span className="text-gray-600">|</span>
              <span className="flex items-center gap-1">
                <Tag className="w-4 h-4 text-gray-500" />
                {(data as DataType).category}
              </span>
            </>
          ) : isJunkFood ? (
            <div className="flex items-center gap-2 text-yellow-600">
              {data.isEatenToday ? (
                <>
                  <Check className="w-5 h-5" />
                  You&lsquo;ve eaten this today! 🍔
                </>
              ) : (
                <>
                  <Clock className="w-5 h-5" />
                  This junk food is waiting for you! 🍟
                </>
              )}
            </div>
          ) : (
            <div className="text-gray-400 italic">No data available</div>
          )}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default CardBox;
