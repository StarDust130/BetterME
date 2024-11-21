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
            <CirclePlus
              className={`h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 ${
                activeNav === "#create" ? "fill-transparent" : ""
              }`}
            />
            <span className="text-[10px] sm:text-sm md:text-base mt-1 sm:mt-2 md:mt-0 md:ml-2">
              Create
            </span>
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
