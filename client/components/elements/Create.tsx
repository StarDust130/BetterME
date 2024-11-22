import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";

const Create = ({ activeNav }: { activeNav: string }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className="flex flex-col md:flex-row rounded-2xl items-center justify-center w-full sm:w-auto p-2 sm:p-3 md:p-4 transition-colors ">
           
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Create;
