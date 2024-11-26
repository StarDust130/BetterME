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
  const isExpense = type === "expense";
  const isJunkFood = type === "junkFood";

  return (
    <Card
      className={`transition-all shadow-sm rounded-lg p-4 bg-white hover:shadow-lg hover:scale-105`}
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
        <CardTitle className="text-lg font-semibold text-gray-800">
          {isExpense
            ? (data as DataType).title
            : isJunkFood
            ? (data as DataType).foodName
            : "Unknown Type"}
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-2">
        <CardDescription className="text-sm text-gray-600">
          {isExpense
            ? `Amount: ₹${
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
