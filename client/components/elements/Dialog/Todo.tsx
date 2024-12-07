/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { todoSchema } from "@/lib/zodSchema";
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
import React, { useRef } from "react";
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

const Todo = () => {
  const { toast } = useToast();
  const closeDialogRef = useRef<HTMLButtonElement | null>(null);

  //! 1. Define your form.
  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      task: "",
      description: "",
    },
  });

  //! 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof todoSchema>) {
    try {
      const { task, description, priority } = values;
      const clerkID = await getClerkUserID();

      closeDialogRef.current?.click();
      form.reset();

      console.log(clerkID);

      // Make the API request
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}`,
        {
          clerkID,
          todo: [
            {
              task,
              description,
              priority,
            },
          ],
        },
        {
          withCredentials: true, // Include cookies for authentication
        }
      );

      console.log("Data:", data);

      toast({
        title: "Task Recorded! 📝",
        description: `Task "${values.task}" has been added successfully.`,
      });
    } catch (error: any) {
      console.error("Error:", error);

      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          error.message ||
          "An error occurred.",
        variant: "destructive",
      });
    } finally {
      closeDialogRef.current?.click();
      form.reset();
    }
  }

  return (
    <>
      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          <p className="text-center text-xs md:text-sm text-gray-600">
            Keep track of your tasks and stay organized. Log your daily
            activities and stay on top of your to-do list! 📝
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Task Field */}
              <FormField
                control={form.control}
                name="task"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-5 text-start">
                      <FormLabel className="text-sm font-medium">
                        Task Name <span className="text-red-500">*</span>
                      </FormLabel>
                    </div>

                    <FormControl>
                      <Input
                        placeholder="Enter your task here 📝"
                        className="border rounded-md p-2 focus:ring-2 focus:ring-gray-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-5 text-start">
                      <FormLabel className="text-sm font-medium">
                        Task Description
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Add details for your task 📖"
                        className="border rounded-md p-2 focus:ring-2 focus:ring-gray-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Priority Field */}
              <div className="w-full ">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-5 text-start">
                        <FormLabel className="text-sm font-medium">
                          Priority
                        </FormLabel>
                      </div>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Task Priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium transition"
              >
                Add Task
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

export default Todo;
