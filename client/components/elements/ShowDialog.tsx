import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl">
              Add Today {data}
            </DialogTitle>
            <DialogDescription>
              <Input />
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
