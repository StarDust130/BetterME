/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { getClerkUserID } from "@/lib/action";
import axios from "axios";
import { EllipsisVertical, EyeOff, Pencil, Trash2 } from "lucide-react";
import { HabitsType } from "./List";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Habits from "./Dialog/Habits";
import { useState } from "react";

interface HabitMoreProps {
  _id: string;
  habitsData: HabitsType[];
  setHabitsData: React.Dispatch<React.SetStateAction<HabitsType[]>>;
}

const HabitsMore = ({ _id, habitsData, setHabitsData }: HabitMoreProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //! ✨ Update UI after task is deleted
  const updateUIAfterDelete = () => {
    const updatedTodos = habitsData.filter((todo) => todo._id !== _id);
    setHabitsData(updatedTodos);
  };

  //! ✏️ Handle task editing
  const handleEditTask = async () => {
    setIsDialogOpen(true); // Open dialog
  };

  //! 🗑️ Handle task deletion
  const handleDelete = async () => {
    updateUIAfterDelete();
    try {
      const clerkID = await getClerkUserID();
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_HABITS_SERVER_URL}?clerkID=${clerkID}&habitID=${_id}`
      );

      console.log("Habit deleted successfully", response);

      toast({
        title: "Task Deleted Successfully 🥳",
        description: `${
          habitsData?.find((habit) => habit._id === _id)?.habitName
        } has been deleted successfully.`,
      });
    } catch (error: any) {
      console.error("Error deleting task", error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  //! 😚 Handle dropdown closing when opening dialog
  const handleOpenEditDialog = () => {
    setIsDropdownOpen(false);
    handleEditTask();
  };

  return (
    <div>
      {/* 📜 Dropdown Menu */}
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger>
          <EllipsisVertical className="w-6 h-6 text-gray-600 cursor-pointer" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="z-50 bg-white text-black shadow rounded-lg p-2">
          {/* ✏️ Edit Task */}
          <DropdownMenuItem
            onClick={handleOpenEditDialog}
            className="flex items-center dark:hover:bg-gray-100 gap-3 px-4 py-2 rounded-md transition-colors duration-300"
          >
            <Pencil className="w-4 h-4 text-blue-500" />
            <span className="text-gray-800 font-medium">Edit Details</span>
          </DropdownMenuItem>

          {/* 👁️ Hide Task */}
          <DropdownMenuItem className="flex items-center dark:hover:bg-gray-100 gap-3 px-4 py-2 rounded-md transition-colors duration-300">
            <EyeOff className="w-4 h-4 text-yellow-500" />
            <span className="text-gray-800 font-medium">Hide Activity</span>
          </DropdownMenuItem>

          {/* 🗑️ Delete Task */}
          <DropdownMenuItem
            className="flex items-center dark:hover:bg-red-100 gap-3 px-4 py-2 rounded-md transition-colors duration-300"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
            <span className="text-red-500 font-medium">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 🔍 Dialog for Task Editing */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="z-50 border-2 border-black dark:border-gray-300 border-dashed p-4 rounded-lg shadow-lg w-full">
          <DialogHeader>
            <DialogTitle className="text-xl text-center md:text-2xl">
              Edit Habits 🤕
            </DialogTitle>

            <div className="text-sm text-muted-foreground mx-2 my-2">
              <Habits
                habitsData={
                  habitsData?.find((habit) => habit._id === _id) || null
                }
                setHabitsData={setHabitsData}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default HabitsMore;
