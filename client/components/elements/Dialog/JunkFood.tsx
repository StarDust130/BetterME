/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { junkFoodSchema } from "@/lib/zodSchema";
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
import { DialogClose } from "@/components/ui/dialog";
import { useEffect, useRef } from "react";
import axios from "axios";
import { getClerkUserID } from "@/lib/action";
import { DataType } from "../List";
import Image from "next/image";

interface JunkFoodProps {
  todayData?: DataType;
  setData?: (data: any) => void;
}

interface JunkFood {
  foodName: string;
  amount: number;
  _id?: string;
}

const JunkFood = ({ todayData, setData }: JunkFoodProps) => {
  const { toast } = useToast();
  const closeDialogRef = useRef<HTMLButtonElement | null>(null);

  //! 1. Define your form.
  const form = useForm<z.infer<typeof junkFoodSchema>>({
    resolver: zodResolver(junkFoodSchema),
    defaultValues: {
      foodName: "",
      amount: 0, // Added amount field here
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
  async function onSubmit(values: z.infer<typeof junkFoodSchema>) {
    const { foodName, amount } = values;
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
          { field: "junkFood", updates: { foodName, amount } },
          options
        );
        responseData = data;
        toast({
          title: "JunkFood Updated 🍔",
          description: `${foodName} has been updated to your list.`,
        });
      } else {
        // Create a new task
        const { data } = await axios.post(
          url,
          { clerkID, todo: [{ foodName, amount }] },
          options
        );
        responseData = data;
        toast({
          title: "JunkFood Recorded 🍔",
          description: `${foodName} has been added to your list.`,
        });
      }

      // Update state with the new or updated task
      if (responseData) {
        setData?.((prevTasks: JunkFood[]) => {
          const updatedTasks = todayData
            ? prevTasks.map((t) =>
                t._id === todayData._id ? { ...t, foodName, amount } : t
              )
            : [...prevTasks, responseData.data.todo[0]];

          return updatedTasks;
        });
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Error 😿",
        description:
          error.response?.data?.message ||
          error.message ||
          "An error occurred.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-col items-center w-full gap-4">
      <Image
        src={todayData ? "/anime-girl-2.png" : "/anime-girl-3.png"}
        alt="Anime Girl"
        width={300}
        height={300}
      />
      <div className="flex items-center justify-center w-full ">
        <div className="w-full max-w-md space-y-6">
          <p className="text-center text-xs md:text-sm">
            {todayData
              ? "Update your task and say no to junk food! 🥲🍔🚫"
              : "Junk food = bad vibes. Create a task for a healthier you! 🥔💪"}
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* foodName Field */}
              <FormField
                control={form.control}
                name="foodName"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-5 text-start">
                      <FormLabel className="text-sm font-medium">
                        What did you eat?{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                    </div>

                    <FormControl>
                      <Input
                        placeholder="e.g. Momos 🥟"
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
                {!todayData ? "Add Junk Food 🍔📝" : "Edit Junk Food 🍟🔄"}
              </Button>
            </form>
          </Form>
          {/* Add DialogClose button here, outside of the form */}
          <DialogClose ref={closeDialogRef} />
        </div>
      </div>
    </div>
  );
};

export default JunkFood;
