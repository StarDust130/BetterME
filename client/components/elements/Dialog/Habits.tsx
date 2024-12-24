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

  //! Define the form
  const form = useForm<z.infer<typeof habitSchema>>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      habitName: habitsData?.habitName || "",
      frequency: habitsData
        ? habitsData.frequency.length === 7
          ? "daily"
          : habitsData.frequency.join("-")
        : "",
    },
  });

  useEffect(() => {
    if (habitsData) {
      form.reset({
        habitName: habitsData.habitName,
        frequency:
          habitsData.frequency.length === 7
            ? "daily"
            : habitsData.frequency.join("-"),
      });
    }
  }, [habitsData, form]);

  //! Submit handler
  async function onSubmit(values: z.infer<typeof habitSchema>) {
    const { habitName, frequency } = values;
    const clerkID = await getClerkUserID();

    try {
      closeDialogRef.current?.click();
      form.reset();

      const url = `${process.env.NEXT_PUBLIC_HABITS_SERVER_URL}`;
      const options = { withCredentials: true };

      let responseData;

      if (habitsData) {
        const { data } = await axios.patch(
          `${url}?clerkID=${clerkID}&habitID=${habitsData._id}`,
          { habitName, frequency },
          options
        );
        responseData = data;
        toast({
          title: "Task Updated! 🔄",
          description: `Habit "${habitName}" updated successfully. 🥳`,
        });
      } else {
        const { data } = await axios.post(
          `${url}?clerkID=${clerkID}`,
          { habitName, frequency },
          options
        );
        responseData = data;
        toast({
          title: "Task Added! 📝",
          description: `Habit "${habitName}" added successfully. 🥳`,
        });
      }

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

  //! Render
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
                    <FormLabel>
                      Habit Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Habit Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Frequency Field */}
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Frequency <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
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
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit">
                {!habitsData ? "Add Habit 😎" : "Edit Habit 🔄"}
              </Button>
            </form>
          </Form>
          <DialogClose ref={closeDialogRef} />
        </div>
      </div>
    </div>
  );
};

export default Habits;
