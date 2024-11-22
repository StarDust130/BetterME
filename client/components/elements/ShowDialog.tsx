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
const ShowDialog = ({ data }: { data: string }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          {" "}
          <div className="mt-4 px-4 py-2 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition">
            Add {data}
          </div>
        </DialogTrigger>
        <DialogContent
          className={
            "border-2 border-dashed  p-4 rounded-lg shadow-lg w-full"
          }
        >
          <DialogHeader>
            <DialogTitle className="text-xl text-center md:text-2xl">
              Add Today {data}
            </DialogTitle>
            <DialogDescription className="p-6 space-y-5" suppressHydrationWarning>
              <div>
                <Label className="block text-sm font-medium mb-2">Title</Label>
                <Input
                  placeholder="e.g., Junk Food"
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

              <div>
                <Label className="block text-sm font-medium mb-2">
                  Category
                </Label>
                <Select>
                  <SelectTrigger className="w-full px-3 py-2 border rounded-lg flex items-center justify-between focus:ring-2 ">
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food 🍔</SelectItem>
                    <SelectItem value="self-improvement">
                      Self Improvement 📚
                    </SelectItem>
                    <SelectItem value="entertainment">
                      Entertainment 🎥
                    </SelectItem>
                    <SelectItem value="essential">Essential 😉</SelectItem>
                    <SelectItem value="girlfriend">Girlfriend 😿</SelectItem>
                    <SelectItem value="other">Other 🤔</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="w-full text-right">
            <Button variant={"secondary"}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ShowDialog;
