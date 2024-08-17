"use client";

import { Button } from "@/components/ui/button";
import { z } from "zod";
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
import { useAppDispatch } from "@/App/store";
import { successAddProject } from "../../App/features/civilUser";
import useUpdateUser from "@/Hooks/UserHook/useUpdateUser";
import { nanoid } from "@reduxjs/toolkit";
import FormInput from "../FormInput";

const formSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .trim()
    .min(5, "Title is required and must be at least 5 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description is required and must be at least 10 characters"),
  startDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format for start date",
    })
    .transform((str) => new Date(str)),
  endDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format for end date",
    })
    .transform((str) => new Date(str)),
  role: z.string().trim().min(1, "Role is required"),
  client: z.string().optional().nullable(),
  teamSize: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Team size must be a number",
    })
    .transform((str) => Number(str))
    .refine((val) => val >= 1, {
      message: "Team size must be at least 1",
    }),
});

export type UserProjectType = z.infer<typeof formSchema>;

const AddProject = () => {
  const dispatch = useAppDispatch();
  const { UpdateOther } = useUpdateUser();
  const form = useForm<UserProjectType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: nanoid(),
      title: "",
      description: "",
      startDate: undefined,
      endDate: undefined,
      role: "",
      client: "",
      teamSize: undefined,
    },
  });

  const onSubmit = (values: UserProjectType) => {
    console.log(values);
    UpdateOther(values, "AddProject");
    dispatch(successAddProject());
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="grid md:grid-cols-3 md:grid-rows-3 items-center gap-5 space-y-3 md:p-5 p-2 md:mx-5 rounded ">
          <FormInput
            name="title"
            label="Project Name"
            placeholder="Enter your Project name"
          />

          <FormField
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <p className="flex gap-2">
                  <FormLabel>Starting date of project</FormLabel>
                  <FormMessage className="text-red-600" />
                </p>
                <FormControl>
                  <Input type="date" className="rounded-[5px]" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <p className="flex gap-2">
                  <FormLabel>Ending date of project</FormLabel>
                  <FormMessage className="text-red-600" />
                </p>
                <FormControl>
                  <Input type="date" className="rounded-[5px]" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormInput
            name="role"
            label="Your role in project"
            placeholder="Enter your Project role"
          />
          <FormInput
            name="client"
            label="Project client name (optional)"
            placeholder="client name"
          />
          <FormInput
            name="teamSize"
            label="How many members work in your team?"
            placeholder="client name"
            type="number"
          />

          <FormField
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <p className="flex gap-2">
                  <FormLabel>Short note on project</FormLabel>
                  <FormMessage className="text-red-600" />
                </p>
                <FormControl>
                  <textarea
                    minLength={10}
                    maxLength={500}
                    className="rounded-[5px] p-1 w-full bg-transparent border border-slate-500"
                    {...field}
                  ></textarea>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() => dispatch(successAddProject())}
              className="md:w-32 bg-red-600 font-semibold mt-3 mx-6 my-2 disabled:cursor-not-allowed shadow-lg hover:text-white text-black rounded-[1em] border"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="md:w-32 bg-cyan-400 mt-3 mx-6 my-2 font-semibold disabled:cursor-not-allowed shadow-lg hover:text-white text-black rounded-[1em] border"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AddProject;
