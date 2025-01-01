import { Card } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Chart } from "./Chart";

interface MiniCardStatsProps {
  data: {
    title: string;
    value: number | string;
    icon: React.ReactNode;
  };
}

const MiniCardStats = ({ data }: MiniCardStatsProps) => {
  const getDrawerContent = () => {
    switch (data.title) {
      case "Total Expenses":
        return (
          <div className="">
            <h4 className="text-lg font-semibold">Expense Breakdown</h4>
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <span>Rent</span>
                <span className="font-bold text-gray-800">₹10</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Groceries</span>
                <span className="font-bold text-gray-800">₹5</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Utilities</span>
                <span className="font-bold text-gray-800">₹3</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Miscellaneous</span>
                <span className="font-bold text-gray-800">₹2</span>
              </li>
            </ul>
            <div className="mt-4">
              <h5 className="text-sm font-semibold text-gray-500">
                Monthly Spending Goal
              </h5>
            </div>
          </div>
        );
      case "Junk Food":
        return (
          <div className="">
            <h4 className="text-lg font-semibold">Junk Food Stats</h4>
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <span>Pizza</span>
                <span className="font-bold text-gray-800">2 times</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Burgers</span>
                <span className="font-bold text-gray-800">1 time</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Fries</span>
                <span className="font-bold text-gray-800">3 times</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Soda</span>
                <span className="font-bold text-gray-800">5 times</span>
              </li>
            </ul>
            <div className="mt-4">
              <h5 className="text-sm font-semibold text-gray-500">
                Daily Calorie Limit
              </h5>
            </div>
          </div>
        );
      case "Todos Done":
        return (
          <div className="">
            <h4 className="text-lg font-semibold">Completed Tasks</h4>
            <ul className="space-y-3">
              <li>🧹 Clean the house</li>
              <li>✍ Write an essay</li>
              <li>💡 Pay electricity bill</li>
              <li>🏋️ Exercise</li>
            </ul>
            <div className="mt-4">
              <h5 className="text-sm font-semibold text-gray-500">
                Productivity Score
              </h5>
            </div>
          </div>
        );
      case "Habits Completed":
        return (
          <div className="">
            <h4 className="text-lg font-semibold">Daily Habits</h4>
            <ul className="space-y-3">
              <li>💧 Drank water</li>
              <li>🌅 Woke up early</li>
              <li>🧘 Meditated</li>
              <li>📚 Read a book</li>
            </ul>
            <div className="mt-4">
              <h5 className="text-sm font-semibold text-gray-500">
                Habit Streak
              </h5>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <Card className="p-4  rounded-3xl  shadow-md  transition-all duration-300 transform ">
          <h3 className="text-sm text-start md:text-base mb-2 w-full font-bold">
            {data.title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="md:text-xl">{data.value}</div>
            <div className="md:text-4xl">{data.icon}</div>
          </div>
        </Card>
      </DrawerTrigger>
      <DrawerContent className="   border   shadow-lg p-6 transform transition-all duration-300 scale-95 ">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold tracking-wide">
            {data.title}
          </DrawerTitle>
          <DrawerDescription className="text-sm mt-2">
            Insights for {data.title.toLowerCase()}.
          </DrawerDescription>
        </DrawerHeader>
        <Chart />
        <div className="mt-4 ">{getDrawerContent()}</div>
      </DrawerContent>
    </Drawer>
  );
};

export default MiniCardStats;
