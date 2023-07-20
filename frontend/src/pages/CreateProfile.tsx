import * as z from "zod";

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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  username: z
    .string()
    .nonempty({
      message: "Username cannot be empty",
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .optional()
    .or(z.literal(""))
    .transform((e) => (e === "" ? undefined : e?.trim())),
  useremail: z
    .string()
    .nonempty({
      message: "Email is required.",
    })
    .email({
      message: "Please enter a valid email address",
    }),
});

export function CreateProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Make call to contract to create account for the user
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)!} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="text-white">Username</FormLabel>
              <FormControl>
                <Input placeholder="What is your username?" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="useremail"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="text-white">User Email</FormLabel>
              <FormControl>
                <Input placeholder="Email Address" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" loading={false}>
            Submit
          </Button>
        </div>{" "}
      </form>
    </Form>
  );
}

export const CreateProfilePage = () => {
  return (
    <div className="w-2/4">
      <CreateProfileForm />
    </div>
  );
};
