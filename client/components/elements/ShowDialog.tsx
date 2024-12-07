"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Expenses from "./Dialog/Expenses";
import JunkFood from "./Dialog/JunkFood";
import Journal from "./Dialog/Journal";
import Todo from "./Dialog/Todo";
import Habits from "./Dialog/Habits";

export interface ExpnessProps {
  title: string;
  amount: number | null;
}

const ShowDialog = ({ title }: { title: string }) => {
  if (title !== "Coming Soon") {
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
              {title === "Journal" && <Journal />}
              {title === "Todo" && <Todo />}
              {title === "Habits" && <Habits />}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  } else {
    return null;
  }
};

export default ShowDialog;
