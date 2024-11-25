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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogClose } from "@/components/ui/dialog";
import { useRef } from "react";

const JunkFood = () => {
  const { toast } = useToast();
  const closeDialogRef = useRef<HTMLButtonElement | null>(null);

  //! 1. Define your form.
  const form = useForm<z.infer<typeof junkFoodSchema>>({
    resolver: zodResolver(junkFoodSchema),
    defaultValues: {
      title: "",
      isEatenToday: undefined,
    },
  });

  //! 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof junkFoodSchema>) {
    const isEatenMessage =
      values.isEatenToday === "yes"
        ? `${
            values.title || "Your treat"
          } is now on the list. Indulge wisely! 🍔`
        : "Good choice! Keep it healthy! 🍏";

    toast({
      title: "Junk Food Added! 🍔",
      description: isEatenMessage,
    });

    // Close the dialog after submission
    closeDialogRef.current?.click();

    console.log(values);
  }

  return (
    <>
      <div className=" flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          <p className="text-center text-xs md:text-sm text-gray-600">
            Treat yourself! Log your favorite junk food items and keep track of
            your cravings. 🍔
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* isEatenToday Field */}
              <FormField
                control={form.control}
                name="isEatenToday"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-5 text-start">
                      <FormLabel className="text-sm font-medium">
                        Have you eaten junk food today?{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full px-3 py-2 border rounded-lg flex items-center justify-between focus:ring-2 ">
                          <SelectValue placeholder="Yes or No" />
                        </SelectTrigger>
                        <SelectContent {...field}>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Title Field */}
              {form.watch("isEatenToday") === "yes" && (
                <FormField
                  control={form.control}
                  name="title"
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
              )}

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
