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
        } has been deleted successfully.`,
      });
    } catch (error : any) {
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

  return (
    <div className="overflow-hidden">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical className="w-6 h-6 text-gray-600  transition-colors duration-300 cursor-pointer" />
          
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white   shadow-xl rounded-lg p-2 border border-gray-200">
          <DropdownMenuItem
            onClick={handleEdit}
            className="flex  items-center dark:hover:bg-gray-100 gap-3  px-4 py-2  rounded-md transition-colors duration-300"
          >
            <Pencil className="w-4 h-4 text-blue-500" />
            <span className="text-gray-800 font-medium">Edit Details</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center dark:hover:bg-gray-100 gap-3 px-4 py-2  rounded-md transition-colors duration-300">
            <EyeOff className="w-4 h-4 text-yellow-500" />
            <span className="text-gray-800  font-medium">Hide Activity</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center dark:hover:bg-red-100 gap-3 px-4 py-2  rounded-md transition-colors duration-300"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
            <span className="text-red-500 font-medium">Delete Permanently</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default More;
