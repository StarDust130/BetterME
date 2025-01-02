import { Card } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ExpensesStats from "./MiniCard/ExpensesStats";
import JunkFoodStats from "./MiniCard/JunkFoodStats";
import TodoStats from "./MiniCard/TodoStats";
import HabitsStats from "./MiniCard/HabitsStats";

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
        return <ExpensesStats />;
      case "Junk Food":
        return <JunkFoodStats />;
      case "Todos Done":
        return <TodoStats />;
      case "Habits Completed":
        return <HabitsStats />;
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
      <DrawerContent className="border shadow-lg p-6 transform transition-all duration-300 scale-95 ">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold tracking-wide">
            {data.title}
          </DrawerTitle>
          <DrawerDescription className="text-sm mt-2">
            Insights for {data.title.toLowerCase()}.
          </DrawerDescription>
        </DrawerHeader>
        <div className="mt-4 ">{getDrawerContent()}</div>
      </DrawerContent>
    </Drawer>
  );
};

export default MiniCardStats;
