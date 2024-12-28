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
import { Settings2, Palette } from "lucide-react";
import { Preferences } from "../elements/List";

interface LayoutPreferProps {
  preferences: Preferences;
  setPreferences: React.Dispatch<React.SetStateAction<Preferences>>;
}

const LayoutPrefer = ({ preferences, setPreferences }: LayoutPreferProps) => {
  return (
    <div className="w-full flex justify-end items-center py-3 px-2 md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2   rounded-lg bg-gray-100 dark:dark:bg-[#1d1d1d] hover:shadow-md transition-all duration-200">
          <Settings2 className="w-5 h-5 text-gray-600 dark:text-white  " />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[280px] border-none shadow-lg rounded-lg">
          <DropdownMenuLabel className="text-sm font-bold text-gray-800 dark:text-white mb-2">
            Preferences
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={preferences.priority === "todos"}
            onCheckedChange={() =>
              setPreferences((prev) => ({
                ...prev,
                priority: "todos",
              }))
            }
            className={`flex items-center gap-3 text-sm py-2 px-3 hover:bg-gray-50 rounded-md transition ${
              preferences.priority === "todos"
                ? "bg-gray-100 dark:dark:bg-[#1d1d1d] font-bold"
                : ""
            }`}
          >
            <span className="text-lg">📝</span>
            Todo&apos;s First
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={preferences.priority === "habits"}
            onCheckedChange={() =>
              setPreferences((prev) => ({
                ...prev,
                priority: "habits",
              }))
            }
            className={`flex items-center gap-3 text-sm py-2 px-3 hover:bg-gray-50 rounded-md transition ${
              preferences.priority === "habits"
                ? "bg-gray-100 dark:dark:bg-[#1d1d1d] font-bold"
                : ""
            }`}
          >
            <span className="text-lg">🎉</span> Habit&apos;s First
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={preferences.hideEmptySections}
            onCheckedChange={() =>
              setPreferences((prev) => ({
                ...prev,
                hideEmptySections: !prev.hideEmptySections,
              }))
            }
            className="flex items-center gap-3 text-sm py-2 px-3 hover:bg-gray-50 rounded-md transition"
          >
            <span className="text-lg">🫣</span> Hide Empty Sections
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={preferences.enableColorCustomization}
            onCheckedChange={() =>
              setPreferences((prev) => ({
                ...prev,
                enableColorCustomization: !prev.enableColorCustomization,
              }))
            }
            className="flex items-center gap-3 text-sm py-2 px-3 hover:bg-gray-50 rounded-md transition"
          >
            <Palette className="w-4 h-4 text-purple-500" />
            Enable Color Customization
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LayoutPrefer;
