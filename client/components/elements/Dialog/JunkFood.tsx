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
import { useRef } from "react";
import axios from "axios";
import { getClerkUserID } from "@/lib/action";

const JunkFood = () => {
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

  //! 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof junkFoodSchema>) {
    try {
      const { foodName, amount } = values;
      const clerkID = await getClerkUserID();

      closeDialogRef.current?.click();
      form.reset();

      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}`,
        {
          clerkID,
          junkFood: [
            {
              foodName,
              amount,
            },
          ],
        },
        {
          withCredentials: true, // Include cookies for authentication
        }
      );

      toast({
        title: "JunkFood Recorded 🍔",
        description: `${foodName} has been added to your list.`,
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
      <div className=" flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          <p className="text-center text-xs md:text-sm text-gray-600">
            Junk food harms health and energy. Choose better for a happier you!
            🥲🍔🚫
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

export default JunkFood;
