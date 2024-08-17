import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { IoAdd } from "react-icons/io5";

import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "@reduxjs/toolkit";
import useUpdateUser from "@/Hooks/UserHook/useUpdateUser";

import FormInput from "../FormInput";

const formSchema = z.object({
  id: z.string(),
  jobTitle: z.string().trim().min(2, { message: "required" }),
  company: z.string().trim().min(2, { message: "required" }),
  experiance: z.string().trim().min(2, { message: "required" }),
  location: z.string().trim().min(2, { message: "required" }),
});

export type UserExperianceFormData = z.infer<typeof formSchema>;

const AddWorkExperiance = () => {
  const { UpdateOther } = useUpdateUser();
  const form = useForm<UserExperianceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: nanoid().toString(),
      jobTitle: "",
      company: "",
      experiance: "",
      location: "",
    },
  });

  const onSubmit = (values: UserExperianceFormData) => {
    UpdateOther(values, "addSkillsAndWork");
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <IoAdd
            className="border cursor-pointer p-2 border-cyan-500 rounded-full"
            size={40}
          />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="text-2xl">
          Add Your Past Experiance{" "}
        </DialogTitle>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-rows-2 md:gap-4 py-3">
              <div className="flex gap-3 md:gap-5 md:h-0 flex-col md:flex-row">
                <FormInput
                  name="jobTitle"
                  label="Job Title"
                  placeholder="Enter your job post"
                />
                <FormInput
                  name="company"
                  label="Company Name"
                  placeholder="Enter company name:"
                />
              </div>

              <div className="flex gap-3 md:gap-5 flex-col md:flex-row">
                <FormInput
                  name="experiance"
                  label="How many Experiance:"
                  placeholder="Years of Experiance"
                />
                <FormInput
                  name="location"
                  label="Company location:"
                  placeholder="Enter copany location"
                />
              </div>
            </div>
            <Button
              className="bg-cyan-500 mt-5 rounded"
              type="submit"
              variant="ghost"
            >
              Add
            </Button>
          </form>
        </FormProvider>
        <DialogFooter>
          <DialogClose>
            <Button
              className="bg-red-500 rounded"
              type="button"
              variant="ghost"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddWorkExperiance;
