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
import MDEditor from "@uiw/react-md-editor";
import { journalSchema } from "@/lib/zodSchema";
import { DrawerClose } from "@/components/ui/drawer";

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
                    className="rounded-2xl p-1   min-h-[180px]"
                    data-color-mode="auto"
                  >
                    <MDEditor
                      className="w-full min-h-[300px] sm:min-h-[400px]"
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
              <div className="flex justify-end gap-2 mt-4">
        <Button
          type="submit"
          className="px-4 py-2 text-sm sm:text-base"
        >
          Save
        </Button>
        <Button
          type="button"
          variant="outline"
          className="px-4 py-2 text-sm sm:text-base"
          onClick={() => form.reset({ text: "" })}
        >
          Clear
        </Button>
      </div>
        </form>
      </Form>
      {/* Add DialogClose button here, outside of the form */}
      <DrawerClose ref={closeDialogRef} />
    </div>
  );
};

export default Journal;
