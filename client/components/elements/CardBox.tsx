import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataType } from "./List";
import { Pizza, Calendar, BadgeIndianRupee } from "lucide-react";

interface CardBoxProps {
  data: DataType;
  type: "expense" | "junkFood";
}

const CardBox = ({ data, type }: CardBoxProps) => {
  const isExpense = type === "expense"; // Check if the card is for an expense
  const isJunkFood = type === "junkFood"; // Check if the card is for junk food

  return (
    <Card
      className={`transition-all shadow-md rounded-lg p-3 ${
        isExpense
          ? "bg-green-200 shadow-lg "
          : isJunkFood
          ? "bg-orange-300 shadow-lg "
          : "bg-gray-300 shadow-lg"
      } hover:shadow-lg hover:scale-105`}
    >
      <CardHeader className="flex items-center gap-3">
        <div
          className={`flex items-center justify-center p-2 rounded-full ${
            isExpense
              ? "bg-green-500"
              : isJunkFood
              ? "bg-orange-500"
              : "bg-gray-500"
          }`}
        >
          {isExpense ? (
            <BadgeIndianRupee className="text-white" />
          ) : isJunkFood ? (
            <Pizza className="text-white" />
          ) : (
            <Calendar className="text-white" />
          )}
        </div>
        <CardTitle className="text-lg font-medium text-gray-800">
          {isExpense
            ? (data as DataType).title
            : isJunkFood
            ? (data as DataType).foodName
            : "Unknown Type"}
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-2 flex justify-between w-full">
        <CardDescription className="text-sm text-gray-600">
          {isExpense
            ? `Amount: $${
                (data as DataType).amount?.toFixed(2) ?? "0.00"
              } | Category: ${(data as DataType).category}`
            : isJunkFood
            ? (data as DataType).isEatenToday
              ? "You've eaten this today! 🍔"
              : "This junk food is waiting for you! 🍟"
            : "No data available"}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default CardBox;
