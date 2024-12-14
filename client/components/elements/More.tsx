/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

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
import { DataType, TodoType } from "./List";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import Todo from "./Dialog/Todo";
import { Capitalized } from "@/lib/utils";

// 🛠️ Props Interface
interface MoreProps {
  _id: string;
  field: "expenses" | "junkFood" | "todo";
  setTodoData?: (data: any) => void;
  todoData?: TodoType[];
  setData?: (data: any) => void;
  todayData?: DataType;
}

const More = ({
  _id,
  field,
  setTodoData,
  todoData,
  setData,
  todayData,
}: MoreProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //! ✨ Update UI after task is deleted
  const updateUIAfterDelete = () => {
    if (field === "todo" && todoData && setTodoData) {
      const updatedTodos = todoData.filter((todo) => todo._id !== _id);
      setTodoData(updatedTodos);
    }

    if (
      (field === "expenses" || field === "junkFood") &&
      todayData &&
      setData
    ) {
      setData((prevData: DataType[]) =>
        prevData.filter((item) => item._id !== _id)
      );
    }
  };

  //! ✏️ Handle task editing
  const handleEditTask = async () => {
    setIsDialogOpen(true); // Open dialog
    try {
      const clerkID = await getClerkUserID();
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}?clerkID=${clerkID}&taskId=${_id}&field=${field}`
      );

      console.log("Task to edit 😅", response.data);

      // toast({
      //   title: "Task Edited Successfully 🥳",
      //   description: `${
      //     field === "todo"
      //       ? todoData?.find((todo) => todo._id === _id)?.task
      //       : todayData?.title || todayData?.foodName
      //   } has been edited successfully.`,
      // });
    } catch (error: any) {
      console.error("Error editing task", error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  //! 🗑️ Handle task deletion
  const handleDelete = async () => {
    updateUIAfterDelete();
    try {
      const clerkID = await getClerkUserID();
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}?clerkID=${clerkID}&taskId=${_id}&field=${field}`
      );

      console.log("Task deleted successfully", response);

      toast({
        title: "Task Deleted Successfully 🥳",
        description: `${
          field === "todo"
            ? todoData?.find((todo) => todo._id === _id)?.task
            : todayData?.title || todayData?.foodName
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
        <DialogContent className="z-50">
          <DialogHeader>
            <DialogTitle className="text-center w-full">
              Edit {Capitalized(field)} ✏️
            </DialogTitle>

            <div className="flex flex-col items-center gap-4">
              <Image
                src="/anime-girl-2.png"
                alt="Anime Girl"
                width={300}
                height={300}
              />
              <Todo
                taskData={todoData?.find((todo) => todo._id === _id) || null}
                setTodoData={setTodoData}
              />
            </div>
          </DialogHeader>
          {/* Add form fields for editing the task here */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default More;
