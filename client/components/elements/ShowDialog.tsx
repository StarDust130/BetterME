import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { CardData } from "./Card";
const ShowDialog = ({ data }: { data: CardData }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          {" "}
          <div className="mt-4 px-4 py-2 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition">
            Add {data.title}
          </div>
        </DialogTrigger>
        <DialogContent
          className={"border-2 border-dashed  p-4 rounded-lg shadow-lg w-full"}
        >
          <DialogHeader>
            <DialogTitle className="text-xl text-center md:text-2xl">
              Add Today {data.title}
            </DialogTitle>
            <DialogDescription
              className="p-6 space-y-5"
              suppressHydrationWarning
            >
              {data.title === "Expenses" && (
                <>
                  <div>
                    <Label className="block text-sm font-medium mb-2">
                      Title
                    </Label>
                    <Input
                      placeholder={data.example}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 "
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium mb-2">
                      Enter Amount <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      placeholder="e.g., 100"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 "
                    />
                  </div>
                </>
              )}

              {data.title === "Junk Food" && (
                <>
                  <div>
                    <Label className="block text-sm font-medium mb-2">
                      Food Name
                    </Label>
                    <Input
                      placeholder="Enter food name"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 "
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium mb-2">
                      Is Eaten Today
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full px-3 py-2 border rounded-lg flex items-center justify-between focus:ring-2 ">
                        <SelectValue placeholder="Yes or No" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              {/* Add other conditions for different card types as needed */}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="w-full text-right">
            <Button>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ShowDialog;
