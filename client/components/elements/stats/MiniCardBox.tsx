import MiniCardStats from "./MiniCardStats";
import {  Pizza, CheckCircle, Repeat, BadgeIndianRupee } from "lucide-react";

const MiniCardBox = () => {
const statsData = [
  {
    title: "Total Expenses",
    value: "₹20",
    icon: <BadgeIndianRupee className="text-yellow-600 text-xl" />,
  },
  {
    title: "Junk Food",
    value: "4 items",
    icon: <Pizza className="text-red-500 text-xl" />,
  },
  {
    title: "Todos Done",
    value: "4",
    icon: <CheckCircle className="text-green-500 text-xl" />,
  },
  {
    title: "Habits Completed",
    value: "12",
    icon: <Repeat className="text-blue-500 text-xl" />,
  },
];


  return (
    <div className="grid grid-cols-2 gap-4 md:p-6 md:grid-cols-4 w-full">
      {statsData.map((data, index) => (
        <MiniCardStats key={index} data={data} />
      ))}
    </div>
  );
};

export default MiniCardBox;
