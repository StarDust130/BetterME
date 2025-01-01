import React from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
    <div className="mt-2 w-full px-4">
      <h1 className="text-lg md:text-2xl font-bold text-center mb-6">Day Wise Stats</h1>
      <div className="grid gap-4">
        {data.map((item) => (
          <Drawer key={item.id}>
            <DrawerTrigger asChild>
              <Card className="p-4 rounded-xl  shadow-lg dark:shadow-md border border-gray-300 dark:border-gray-700 hover:shadow-xl  transition-all duration-300 cursor-pointer">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {item.date}
                  </h3>
                  <span className="text-3xl text-sky-500">{item.icon}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.title}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                    {item.value}
                  </p>
                </div>
              </Card>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{item.title}</DrawerTitle>
                <DrawerDescription>
                  Details for <span className="font-bold">{item.date}</span>.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 text-sm">
                <p>
                  <span className="font-bold">Date:</span> {item.date}
                </p>
                <p>
                  <span className="font-bold">Value:</span> {item.value}
                </p>
                <p>
                  <span className="font-bold">Icon:</span> {item.icon}
                </p>
              </div>
              <DrawerFooter>
                <Button>Confirm</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </div>
  );
};

export default StatsList;
