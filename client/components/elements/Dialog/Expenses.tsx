import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { expensesSchema } from "@/lib/zodSchema";
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

const Expenses = () => {
  //! 1. Define your form.
  const form = useForm<z.infer<typeof expensesSchema>>({
    resolver: zodResolver(expensesSchema),
    defaultValues: {
      title: "",
      amount: undefined,
    },
  });

  //! 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof expensesSchema>) {
    // Do something with the form values.
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="eg: Momos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-left w-full">Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="eg: 100"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? undefined : +e.target.value // Convert empty string to undefined for zod validation
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="text-right w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Expenses;
