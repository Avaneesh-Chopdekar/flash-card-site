"use client";
import { useState } from "react";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useToast } from "@/components/ui/use-toast";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  q: z.string().min(2, {
    message: "Question must be at least 2 characters.",
  }),
  a: z.string().min(1, {
    message: "Answer must be at least 1 characters.",
  }),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      q: "",
      a: "",
    },
  });

  const [items, setItems] = useState<z.infer<typeof formSchema>[]>([]);

  const { toast } = useToast();

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "New Item Added",
      description: `Added (${values.q}) to list.`,
    });
    setItems((prevState) => [...prevState, values]);
    form.reset();
  }

  return (
    <main className="w-4/5 md:w-1/2 mx-auto my-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="q"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Input placeholder="What is 1 + 1?" {...field} />
                </FormControl>
                <FormDescription>Write a suitable question</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="a"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer</FormLabel>
                <FormControl>
                  <Textarea placeholder="2" {...field} />
                </FormControl>
                <FormDescription>Write a suitable answer</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="bg-teal-600 hover:bg-teal-700" type="submit">
            Add This
          </Button>
        </form>
      </Form>
      <Link
        href={{
          pathname: "/test",
          query: {
            data: JSON.stringify(items),
          },
        }}
      >
        <Button className="bg-teal-600 hover:bg-teal-700 my-4">
          Test Yourself
        </Button>
      </Link>
    </main>
  );
}
