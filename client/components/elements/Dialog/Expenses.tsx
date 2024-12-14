/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { expensesSchema } from "@/lib/zodSchema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef } from "react";
import { DialogClose } from "@/components/ui/dialog";
import axios from "axios";
import { getClerkUserID } from "@/lib/action";
import Image from "next/image";
import { DataType } from "../List";

interface ExpensesProps {
  todayData?: DataType;
  setData?: (data: any) => void;
}

const Expenses = ({ todayData, setData }: ExpensesProps) => {
  const { toast } = useToast();
  const closeDialogRef = useRef<HTMLButtonElement | null>(null);

  //! 1. Define your form.
  const form = useForm<z.infer<typeof expensesSchema>>({
    resolver: zodResolver(expensesSchema),
    defaultValues: {
      title: "",
      amount: 0,
    },
  });

  useEffect(() => {
    if (todayData) {
      // Pre-fill the form with existing task data when in edit mode
      form.reset(todayData);
      console.log("Task Data 👺:", todayData);
    }
  }, [todayData, form]);

  //! 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof expensesSchema>) {
    const { title, amount } = values;
    const clerkID = await getClerkUserID();

    try {
      closeDialogRef.current?.click();
      form.reset();

      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}`;
      const options = { withCredentials: true };

      let responseData;

      if (todayData) {
        // Update existing task
        const { data } = await axios.patch(
          `${url}?clerkID=${clerkID}&taskID=${todayData._id}`,
          { field: "expenses", updates: { title, amount } },
          options
        );
        responseData = data;
        toast({
          title: "Expense Updated! 💸",
          description: `₹${values.amount} spent on ${
            values.title || "an item"
          } has been added successfully.`,
        });
      } else {
        // Create a new task
        const { data } = await axios.post(
          url,
          { clerkID, todo: [{ title, amount }] },
          options
        );
        responseData = data;
        toast({
          title: "Expense Recorded! 💸",
          description: `₹${values.amount} spent on ${
            values.title || "an item"
          } has been added successfully.`,
        });
      }

      // Update state with the new or updated task
      if (responseData) {
        interface Task {
          _id: string;
          title: string;
          amount: number;
        }

        interface ResponseData {
          data: {
            todo: Task[];
          };
        }

        setData?.((prevTasks: Task[]) => {
          const updatedTasks = todayData
            ? prevTasks.map((t) =>
                t._id === todayData._id ? { ...t, title, amount } : t
              )
            : [...prevTasks, (responseData as ResponseData).data.todo[0]];

          return updatedTasks;
        });
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Error 😿",
        description: error.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <Image
        src={todayData ? "/anime-girl-2.png" : "/anime-girl-3.png"}
        alt="Anime Girl"
        width={300}
        height={300}
        className=" w-full "
      />
      <div className=" flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          <p className="text-center text-xs md:text-sm text-gray-600">
            Manage your finances efficiently. Log your daily expenses and stay
            on top of your budget! 💸
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-5 text-start">
                      <FormLabel className="text-sm font-medium">
                        Where did you spend it?{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                    </div>

                    <FormControl>
                      <Input
                        placeholder="e.g. Snacks 🐍"
                        className="border rounded-md p-2 focus:ring-2 focus:ring-gray-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Amount Field */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-5 text-start">
                      <FormLabel className="text-sm font-medium">
                        How much did you spend today?{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute font-semibold left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          ₹
                        </span>
                        <Input
                          type="number"
                          placeholder="500"
                          className="border rounded-md pl-7 pr-3 py-2 focus:ring-2 focus:ring-gray-500"
                          {...field}
                          value={field.value || ""} // Ensure value is never null
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === "" ? "" : +e.target.value
                            )
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium transition"
              >
                Submit
              </Button>
            </form>
          </Form>
          {/* Add DialogClose button here, outside of the form */}
          <DialogClose ref={closeDialogRef} />
        </div>
      </div>
    </>
  );
};

export default Expenses;
