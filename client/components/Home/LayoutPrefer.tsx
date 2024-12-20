"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Settings2, CheckCircle,  EyeOff, Palette } from "lucide-react";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const LayoutPrefer = () => {
  const [showTodo, setShowTodo] = React.useState<Checked>(true);
  const [showHabits, setShowHabits] = React.useState<Checked>(false);

  return (
    <div className="w-full flex justify-end items-center py-3 px-4">
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2 border rounded-lg bg-gray-100 hover:shadow-md transition-all duration-200">
          <Settings2 className="w-5 h-5 text-gray-600" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[280px] shadow-lg rounded-lg">
          <DropdownMenuLabel className="text-sm font-bold text-gray-800 mb-2">
            Preferences
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={showTodo}
            onCheckedChange={() => setShowTodo(!showTodo)}
            className="flex items-center gap-3 text-sm py-2 px-3 hover:bg-gray-50 rounded-md transition"
          >
            <CheckCircle className="w-4 h-4 text-green-500" />
            Todo&apos;s First
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showHabits}
            onCheckedChange={() => setShowHabits(!showHabits)}
            className="flex items-center gap-3 text-sm py-2 px-3 hover:bg-gray-50 rounded-md transition"
          >
            <span className="text-xl">🎉</span> Habit&apos;s First
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem className="flex items-center gap-3 text-sm py-2 px-3 hover:bg-gray-50 rounded-md transition">
            <EyeOff className="w-4 h-4 text-gray-500" />
            Hide Empty Section
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem className="flex items-center gap-3 text-sm py-2 px-3 hover:bg-gray-50 rounded-md transition">
            <Palette className="w-4 h-4 text-purple-500" />
            Customize Card Color
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LayoutPrefer;
