"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import Expenses from "./Dialog/Expenses";
import JunkFood from "./Dialog/JunkFood";
import Journal from "./Dialog/Journal";
import Todo from "./Dialog/Todo";
import Habits from "./Dialog/Habits";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export interface ExpnessProps {
  title: string;
  amount: number | null;
}

const ShowDialog = ({ title }: { title: string }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark the component as client-side rendered after the initial mount
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Ensure the component renders only on the client-side
  }

  if (title === "Journal") {
    return (
      <Drawer>
        <DrawerTrigger className="mt-4 px-4 py-2 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition">
          Add {title}
        </DrawerTrigger>
        <DrawerContent className=" w-full max-w-[100vw]  h-auto  flex flex-col">
          <DrawerHeader className="w-full  flex-none">
            <DrawerTitle className="w-full  text-center text-xl md:text-2xl">
              ADD Today Journal! 📔
            </DrawerTitle>
          </DrawerHeader>

          <Journal />
          <DrawerFooter>
            <DrawerClose>
              <X className="absolute right-3 top-3 text-red-500  h-6 w-6" />
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  } else if (title !== "Coming Soon") {
    return (
      <Dialog>
        <DialogTrigger>
          <div className="mt-4 px-4 py-2 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition">
            Add {title}
          </div>
        </DialogTrigger>
        <DialogContent className="border-2 border-black dark:border-gray-300 border-dashed p-4 rounded-lg shadow-lg w-full">
          <DialogHeader>
            <DialogTitle className="text-xl text-center md:text-2xl">
              Add Today {title}
            </DialogTitle>

            <div className="text-sm text-muted-foreground mx-2 my-2">
              {title === "Expenses" && <Expenses />}
              {title === "Junk Food" && <JunkFood />}
              {title === "Todo" && <Todo />}
              {title === "Habits" && <Habits />}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  } else {
    return null; // Hide if "Coming Soon"
  }
};

export default ShowDialog;
