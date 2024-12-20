import {
  Settings2,
  CheckCircle,
  Star,
  ArrowUp,
  ArrowDown,
  Palette,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LayoutPrefer = () => {
  return (
    <div className="w-full py-2 justify-end items-center flex">
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2 border rounded-lg cursor-pointer hover:bg-gray-200">
          <Settings2 />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Star className="mr-2 text-blue-500" />
            Habit&apos;s First
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CheckCircle className="mr-2 text-green-500" />
            Todo&apos;s First
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ArrowUp className="mr-2 text-yellow-500" />
            Sort by Priority
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ArrowDown className="mr-2 text-red-500" />
            Sort by Date
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Palette className="mr-2 text-purple-500" />
            Customize Card Color
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LayoutPrefer;
