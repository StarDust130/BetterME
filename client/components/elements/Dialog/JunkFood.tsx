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

const JunkFood = () => {
  const { toast } = useToast();

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
    // Do something with the form values.
    toast({
      title: "Junk Food Added! 🍔",
      description: `${
        values.title || "Your treat"
      } is now on the list. Indulge wisely!`,
    });

    console.log(values);
  }

  return (
    <>
      <div className=" flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          <p className="text-center text-xs md:text-sm text-gray-600">
            Manage your finances efficiently. Log your daily JunkFood and stay
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
                        Title <span className="text-red-500">*</span>
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
              {/* isEatenToday Field */}
              <FormField
                control={form.control}
                name="isEatenToday"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-5 text-start">
                      <FormLabel className="text-sm font-medium">
                        Amount <span className="text-red-500">*</span>
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
              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium  transition"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default JunkFood;
