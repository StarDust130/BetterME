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

  // Handle dialog close
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  //! Update UI to Edit a Task
  const UpdateUI = () => {
    // Update the todoData after deletion
    if (field === "todo") {
      if (todoData) {
        const updatedTodos = todoData.filter((todo) => todo._id !== _id);
        if (setTodoData) {
          setTodoData(updatedTodos);
        }
      }
    }

    // Update `data` if the field is `expenses` or `junkFood`
    if (
      (field === "expenses" || field === "junkFood") &&
      todayData &&
      setData
    ) {
      setData((prevData: DataType[]) => {
        return prevData.filter((item) => item._id !== _id);
      });
    }
  };

  //! Edit a Task
  const handleEdit = async () => {
    setIsDialogOpen(true); // Open the dialog after successful edit
    try {
      const clerkID = await getClerkUserID();
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}?clerkID=${clerkID}&taskId=${_id}&field=${field}`
      );

      console.log("Data 🫥:", data);

      toast({
        title: "Task Edited Successfully 🥳",
        description: `${
          data?.data?.task || todayData?.title || todayData?.foodName
        } has been edited successfully.`,
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  //! Delete a task
  const handleDelete = async () => {
    UpdateUI();
    try {
      const clerkID = await getClerkUserID();
      const data = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}?clerkID=${clerkID}&taskId=${_id}&field=${field}`
      );

      console.log("Data 🫥:", data);

      toast({
        title: "Task Deleted Successfully 🥳",
        description: `${
          data?.data?.task || todayData?.title || todayData?.foodName
        } has been deleted successfully.`,
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  // Close dropdown when dialog opens
  const handleOpenDialog = () => {
    console.log("Todo Data 😶‍🌫️", todoData);
    handleEdit();
    setIsDialogOpen(true);
    setIsDropdownOpen(false); // Ensure dropdown closes
  };

  return (
    <div>
      {/* Dropdown Menu */}
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger>
          <EllipsisVertical className="w-6 h-6 text-gray-600 transition-colors duration-300 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={`bg-white shadow-xl rounded-lg p-2 border border-gray-200 ${
            isDropdownOpen ? "z-50" : "z-auto"
          }`}
        >
          <DropdownMenuItem
            onClick={handleOpenDialog}
            className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-300 hover:bg-gray-100"
          >
            <Pencil className="w-4 h-4 text-blue-500" />
            <span className="text-gray-800 font-medium">Edit Details</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-300 hover:bg-gray-100">
            <EyeOff className="w-4 h-4 text-yellow-500" />
            <span className="text-gray-800 font-medium">Hide Activity</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-300 hover:bg-red-100"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
            <span className="text-red-500 font-medium">Delete Permanently</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog Component */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="z-50">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              You can update the details of this task here.
            </DialogDescription>
          </DialogHeader>
          {/* Add form or content to edit task here */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default More;
