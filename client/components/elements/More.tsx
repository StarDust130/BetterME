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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

// 🛠️ Props Interface
interface MoreProps {
  _id: string;
  field: string;
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

      toast({
        title: "Task Edited Successfully 🥳",
        description: `${
          response?.data?.task || todayData?.title || todayData?.foodName
        } has been edited successfully.`,
      });
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
  const handleDeleteTask = async () => {
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

        <DropdownMenuContent className="z-50 bg-white shadow rounded-lg p-2">
          {/* ✏️ Edit Task */}
          <DropdownMenuItem
            onClick={handleOpenEditDialog}
            className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100"
          >
            <Pencil className="w-4 h-4 text-blue-500" />
            <span>Edit Task</span>
          </DropdownMenuItem>

          {/* 👁️ Hide Task */}
          <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100">
            <EyeOff className="w-4 h-4 text-yellow-500" />
            <span>Hide Task</span>
          </DropdownMenuItem>

          {/* 🗑️ Delete Task */}
          <DropdownMenuItem
            onClick={handleDeleteTask}
            className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-red-100"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 🔍 Dialog for Task Editing */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="z-50">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Modify the task details below:
            </DialogDescription>
          </DialogHeader>
          {/* Add form fields for editing the task here */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default More;
