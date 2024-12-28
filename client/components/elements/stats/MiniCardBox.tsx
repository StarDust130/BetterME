import MiniCardStats from "./MiniCardStats";
import {  Pizza, CheckCircle, Activity, HandCoins } from "lucide-react"; // Import Lucide icons

const MiniCardBox = () => {
  const statsData = [
    {
      title: "Total Expenses",
      value: "₹20",
      icon: <HandCoins className="text-yellow-500" />, // Cool icon for expenses
    },
    {
      title: "Junk Food Count",
      value: "4",
      icon: <Pizza className="text-red-500" />, // Cool icon for junk food
    },
    {
      title: "Todos Completed",
      value: "4",
      icon: <CheckCircle className="text-green-500" />, // Cool icon for todos
    },
    {
      title: "Habits Completed",
      value: "12",
      icon: <Activity className="text-blue-500" />, // Cool icon for habits
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:p-6 md:grid-cols-4 shadow-lg rounded-2xl">
      {statsData.map((data, index) => (
        <MiniCardStats key={index} data={data} />
      ))}
    </div>
  );
};

export default MiniCardBox;
