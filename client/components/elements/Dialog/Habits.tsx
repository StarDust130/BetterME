"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { habitSchema } from "@/lib/zodSchema";
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
import React, { useEffect, useRef } from "react";
import { DialogClose } from "@/components/ui/dialog";
import axios from "axios";
import { getClerkUserID } from "@/lib/action";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { HabitsType } from "../List";

interface TodoProps {
  habitsData?: HabitsType | null;
  setHabitsData?: React.Dispatch<React.SetStateAction<HabitsType[]>>;
}
const Habits = ({ habitsData = null, setHabitsData }: TodoProps) => {
  const { toast } = useToast();
  const closeDialogRef = useRef<HTMLButtonElement | null>(null);

  //! 1. Define your form.
  const form = useForm<z.infer<typeof habitSchema>>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      habitName: "",
      frequency: habitsData?.frequency || habitsData?.frequency,
    },
  });

  useEffect(() => {
    if (habitsData) {
      // Pre-fill the form with existing task data when in edit mode
      console.log("Habits Data 👺:", habitsData);
      form.reset({
        habitName: habitsData.habitName,
        frequency: habitsData.frequency,
      });
    }
  }, [habitsData, form]);

  //! 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof habitSchema>) {
    const { habitName, frequency } = values;
    const clerkID = await getClerkUserID();

    try {
      closeDialogRef.current?.click();
      form.reset();

      const url = `${process.env.NEXT_PUBLIC_HABITS_SERVER_URL}`;
      const options = { withCredentials: true };

      let responseData;

      console.log("habitsData fro Edit 🍥 🙃", habitsData);

      if (habitsData) {
        // Update existing task
        const { data } = await axios.patch(
          `${url}?clerkID=${clerkID}&habitID=${habitsData._id}`,
          { habitName, frequency },
          options
        );
        console.log("data from habitEdit 🙃", data);
        
        responseData = data;
        toast({
          title: "Task Updated! 🔄",
          description: `Habit "${habitName}" updated successfully. 🥳`,
        });
      } else {
        // Create a new task
        const { data } = await axios.post(
          `${url}?clerkID=${clerkID}`,
          { habitName, frequency },
          options
        );
        responseData = data;

        console.log("responseData 🙃", responseData);
        toast({
          title: "Task Added!🥳",
          description: `Habit "${habitName}" added successfully. 🥳`,
        });
      }

      // Update state with the new or updated task
      if (responseData) {
        setHabitsData?.((prevHabit) => {
          const updatedTasks = habitsData
            ? prevHabit.map((t) =>
                t._id === habitsData._id ? { ...t, habitName, frequency } : t
              )
            : [...prevHabit, responseData.data.todo[0]];

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
        src={habitsData ? "/anime-girl-2.png" : "/anime-girl-3.png"}
        alt="Anime Girl"
        width={300}
        height={300}
      />
      <div className="flex items-center justify-center w-full ">
        <div className="w-full max-w-md space-y-6">
          <p className="text-center text-xs md:text-sm ">
            {habitsData
              ? "Edit your task to keep it updated and relevant. ✏️"
              : "Add a new task to stay organized and on top of your to-do list! 📝"}
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Habit Name Field */}
              <FormField
                control={form.control}
                name="habitName"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-5 text-start">
                      <FormLabel className="text-sm font-medium">
                        Habit Name <span className="text-red-500">*</span>
                      </FormLabel>
                    </div>

                    <FormControl>
                      <Input
                        placeholder="Enter Habit Name"
                        className="border rounded-md p-2 focus:ring-2 focus:ring-gray-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Frequency Field */}
              <div className="w-full cursor-pointer">
                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-5 text-start">
                        <FormLabel className="text-sm font-medium">
                          Frequency <span className="text-red-500">*</span>
                        </FormLabel>
                      </div>

                      <Select
                        value={field.value} // Use value here instead of defaultValue
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full cursor-pointer">
                            <SelectValue placeholder="Select Habit Frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="cursor-pointer">
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="mon-sat">Mon-Sat</SelectItem>
                          <SelectItem value="mon-wed-fri">
                            Mon-Wed-Fri
                          </SelectItem>
                          <SelectItem value="tue-thu-sat">
                            Tue-Thu-Sat
                          </SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* //TODO ADD startDate 😜  */}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium transition"
              >
                {!habitsData ? "Add Task 📝" : "Edit Todo 🔄"}
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

export default Habits;
