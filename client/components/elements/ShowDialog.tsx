"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CardData } from "./Card";
import Expenses from "./Dialog/Expenses";
import JunkFood from "./Dialog/JunkFood";

const ShowDialog = ({ data }: { data: Omit<CardData, "icon"> }) => {
   if (typeof window === "undefined") return null;
  return (
    <div suppressHydrationWarning>
      <Dialog>
        <DialogTrigger>
          <div className="mt-4 px-4 py-2 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition">
            Add {data.title}
          </div>
        </DialogTrigger>
        <DialogContent className="border-2 border-dashed p-4 rounded-lg shadow-lg w-full">
          <DialogHeader>
            <DialogTitle className="text-xl text-center md:text-2xl">
              Add Today {data.title}
            </DialogTitle>
            <DialogDescription
              className="p-6 space-y-5"
              suppressHydrationWarning
            >
              {data.title === "Expenses" && <Expenses data={data} />}
              {data.title === "Junk Food" && <JunkFood data={data} />}
              {data.title !== "Expenses" && data.title !== "Junk Food" && (
                <span className="text-2xl md:text-4xl animate-pulse flex justify-center items-center">
                  Coming Soon 😉
                </span>
              )}
              {/* Add other conditions for different card types as needed */}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="w-full text-right">
            <Button>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShowDialog;
