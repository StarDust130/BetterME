/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import React, { useEffect, useRef, useState } from "react";
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
import { sortDays } from "@/lib/utils";

interface HabitsProps {
  habitsData?: HabitsType | null;
  setHabitsData?: React.Dispatch<React.SetStateAction<HabitsType[]>>;
}

const Habits = ({ habitsData = null, setHabitsData }: HabitsProps) => {
  const { toast } = useToast();
  const closeDialogRef = useRef<HTMLButtonElement | null>(null);

  // State for custom days
  const [customDays, setCustomDays] = useState<string[]>([]);

  const predefinedFrequencies = [
    "daily",
    "mon-sat",
    "mon-wed-fri",
    "tue-thu-sat",
  ];
  const isPredefined = predefinedFrequencies.includes(
    habitsData?.frequency.join("-")
  );
  const isDaily = habitsData?.frequency.length === 7;

  //! Define the form
  const form = useForm<z.infer<typeof habitSchema>>({
    resolver: zodResolver(habitSchema),
    defaultValues: habitsData
      ? {
          habitName: habitsData.habitName || "", // Ensure it is always a string
          frequency:
            habitsData.frequency && isDaily
              ? "daily"
              : isPredefined
              ? habitsData.frequency.join("-")
              : "custom", // Always provide a valid value
        }
      : {
          habitName: "", 
        },
  });

  useEffect(() => {
    if (habitsData) {
      const predefinedFrequencies = [
        "daily",
        "mon-sat",
        "mon-wed-fri",
        "tue-thu-sat",
      ];
      const isPredefined = predefinedFrequencies.includes(
        habitsData.frequency.join("-")
      );
      const isDaily = habitsData.frequency.length === 7;
      const isCustom = !isDaily && !isPredefined;

      form.reset({
        habitName: habitsData.habitName,
        frequency: isDaily
          ? "daily"
          : isPredefined
          ? habitsData.frequency.join("-")
          : "custom",
      });

      // Initialize customDays when frequency is custom
      if (isCustom) {
        setCustomDays(habitsData.frequency || []); // Set pre-filled days
      } else {
        setCustomDays([]); // Clear customDays if not custom
      }
    } else {
      // Clear customDays for new habits
      setCustomDays([]);
      form.reset({
        habitName: "",
        frequency: "daily",
      });
    }
  }, [form, habitsData]);

  // Function to toggle day selection
  const handleDayToggle = (day: string) => {
    setCustomDays(
      (prevDays) =>
        prevDays.includes(day)
          ? prevDays.filter((d) => d !== day) // Remove day if already selected
          : [...prevDays, day] // Add day if not selected
    );
  };

  //! Submit handler
  async function onSubmit(values) {
    const { habitName, frequency } = values;
    const clerkID = await getClerkUserID();

    // Use a local variable for selected days to ensure the latest value
    const currentSelectedDays = [...customDays]; // Snapshot of selected days
    const selectedFrequency =
      frequency === "custom"
        ? sortDays(currentSelectedDays) // Use the sorted days
        : frequency === "daily"
        ? "daily"
        : frequency.split("-");

    console.log("Selected Frequency 😘", selectedFrequency);

    // Reset form and close modal after submission
    closeDialogRef.current?.click();
    form.reset();

    // Perform API call for submission (POST or PATCH)
    const url = `${process.env.NEXT_PUBLIC_HABITS_SERVER_URL}`;
    const options = { withCredentials: true };

    let responseData;

    try {
      if (habitsData) {
        const { data } = await axios.patch(
          `${url}?clerkID=${clerkID}&habitID=${habitsData._id}`,
          { habitName, frequency: selectedFrequency },
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
          { habitName, frequency: selectedFrequency },
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
                t._id === habitsData._id
                  ? { ...t, habitName, frequency: selectedFrequency }
                  : t
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
                      <div className="space-y-5 text-start">
                        <FormLabel className="text-sm font-medium">
                          Habit Name <span className="text-red-500">*</span>
                        </FormLabel>
                      </div>
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
                    <FormLabel className="w-full flex justify-start px-2">
                      <div className="space-y-5 text-start">
                        <FormLabel className="text-sm font-medium">
                          Frequency <span className="text-red-500">*</span>
                        </FormLabel>
                      </div>
                    </FormLabel>

                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          if (value !== "custom") setCustomDays([]);
                        }}
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

              {/* Custom Days */}
              {form.getValues("frequency") === "custom" && (
                <div className="flex flex-wrap gap-2">
                  {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map(
                    (day) => (
                      <Button
                        key={day}
                        type="button"
                        variant={
                          customDays.includes(day) ? "default" : "outline"
                        }
                        onClick={() => handleDayToggle(day)}
                      >
                        {day.toUpperCase()}
                      </Button>
                    )
                  )}
                </div>
              )}

              <Button type="submit" className="w-full">
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

