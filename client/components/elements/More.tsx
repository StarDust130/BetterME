import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, EyeOff, Pencil, Trash2 } from "lucide-react";

const More = () => {
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
          <DropdownMenuItem className="flex items-center dark:hover:bg-red-100 gap-3 px-4 py-2  rounded-md transition-colors duration-300">
            <Trash2 className="w-4 h-4 text-red-500" />
            <span className="text-red-500 font-medium">Delete Permanently</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default More;
