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

interface MoreProps {
  _id: string;
  field: string;
}

const More = ({ _id }: MoreProps) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const clerkID = await getClerkUserID();
      const data = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}?clerkID=${clerkID}&taskId=${_id}&field=todo`
      );

      console.log("Data 🫥:", data);

      toast({
        title: "Task Deleted Successfully 🥳",
        description: `${data?.data?.task} has been deleted successfully.`,
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
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical className="w-6 h-6 text-gray-600  transition-colors duration-300 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white   shadow-xl rounded-lg p-2 border border-gray-200">
          <DropdownMenuItem className="flex  items-center dark:hover:bg-gray-100 gap-3  px-4 py-2  rounded-md transition-colors duration-300">
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
