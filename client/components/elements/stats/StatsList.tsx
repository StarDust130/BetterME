import React from "react";

const data = [
  {
    id: 1,
    date: "2024-12-26",
    title: "Work Done",
    value: "8 tasks",
    icon: "📊",
  },
  {
    id: 2,
    date: "2024-12-27",
    title: "Hours Logged",
    value: "6 hours",
    icon: "⏱️",
  },
  {
    id: 3,
    date: "2024-12-28",
    title: "Meetings",
    value: "3 meetings",
    icon: "📅",
  },
  { id: 4, date: "2024-12-29", title: "Breaks", value: "2 breaks", icon: "☕" },
  {
    id: 5,
    date: "2024-12-30",
    title: "Reports",
    value: "5 reports",
    icon: "📑",
  },
];

const StatsList = () => {
  return (
    <div className="mt-5 w-full px-4">
      <h1 className="text-lg font-bold text-center mb-6">Day Wise Stats</h1>
      <div className="grid gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl shadow-lg bg-white border-2 hover:border-sky-500 hover:shadow-xl transition-all duration-300 transform  cursor-pointer"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-bold text-gray-700">{item.date}</h3>
              <span className="text-2xl text-sky-500">{item.icon}</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">{item.title}</p>
              <p className="text-sm font-medium text-gray-800">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsList;
