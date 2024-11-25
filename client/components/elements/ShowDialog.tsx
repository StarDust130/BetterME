"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Expenses from "./Dialog/Expenses";
import JunkFood from "./Dialog/JunkFood";
import { useState } from "react";

export interface ExpnessProps {
  title: string;
  amount: number | null;
}

const ShowDialog = ({ title }: { title: string }) => {
  const [expenses, setExpenses] = useState<ExpnessProps>({
    title: "",
    amount: 0,
  });

  return (
    <Dialog>
      <DialogTrigger>
        <div className="mt-4 px-4 py-2 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition">
          Add {title}
        </div>
      </DialogTrigger>
      <DialogContent className="border-2 border-dashed p-4 rounded-lg shadow-lg w-full">
        <DialogHeader>
          <DialogTitle className="text-xl text-center md:text-2xl">
            Add Today {title}
          </DialogTitle>

          <div className="text-sm text-muted-foreground mx-2 my-2">
            {title === "Expenses" && (
              <Expenses expenses={expenses} setExpenses={setExpenses} />
            )}
            {title === "Junk Food" && <JunkFood />}
            {title !== "Expenses" && title !== "Junk Food" && (
              <span className="text-2xl md:text-4xl animate-pulse flex justify-center items-center">
                Coming Soon 😉
              </span>
            )}
            {/* Add other conditions for different card types as needed */}
          </div>
        </DialogHeader>
        <DialogFooter className="w-full text-right">
          <Button onClick={() => console.log(expenses)}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShowDialog;
