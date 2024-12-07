/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useToast } from "@/hooks/use-toast";
import React, { useRef } from "react";
import axios from "axios";
import { getClerkUserID } from "@/lib/action";
import  MDEditor  from "@uiw/react-md-editor";
import { journalSchema } from "@/lib/zodSchema";


const Journal = () => {
  const { toast } = useToast();
  const closeDialogRef = useRef<HTMLButtonElement | null>(null);

  //! Form setup
  const form = useForm<z.infer<typeof journalSchema>>({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      text: "**Hello world!!!**", // Initial content
    },
  });

  //! Submit handler
  const onSubmit = async (values: z.infer<typeof journalSchema>) => {
    try {
      const clerkID = await getClerkUserID();

      // Prepare payload
      const payload = {
        clerkID,
        journal: {
          text: values.text, // Get the text value from the form
        },
      };
      // API call
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}`, payload, {
        withCredentials: true,
      });


      toast({
        title: "Journal Added! 📓",
        description: `Journal has been added successfully. 🎉`,
      });

      form.reset();
      closeDialogRef.current?.click();
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          error.message ||
          "An error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 md:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Markdown Editor */}
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium mb-2">
                  Journal Content <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div
                    className="rounded border p-2 bg-white"
                    data-color-mode="auto"
                  >
                    <MDEditor
                      className="w-full"
                      value={field.value}
                      onChange={(val) => field.onChange(val || "")}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4">
            <Button type="submit" className="w-full sm:w-auto">
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => form.reset()}
            >
              Clear
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Journal;
