import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "../ui/form";
import { nanoid } from "@reduxjs/toolkit";
import useUpdateUser from "@/Hooks/UserHook/useUpdateUser";
import FormInput from "../FormInput";
import AddButton from "../styleComponents/AddButton";

const formSchema = z.object({
  id: z.string(),
  degree: z.string().trim().min(2, "required"),
  fieldOfStudy: z.string().trim().min(2, "required"),
  university: z.string().trim().min(2, "required"),
  collegeName: z.string().trim().min(2, "required"),
});

export type UserEducationFormData = z.infer<typeof formSchema>;

const AddEducation = () => {
  const { addLanAndEducation } = useUpdateUser();
  const form = useForm<UserEducationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: nanoid().toString(),
      degree: "",
      fieldOfStudy: "",
      university: "",
      collegeName: "",
    },
  });

  const onSubmit = (values: UserEducationFormData) => {
    addLanAndEducation(values);
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <AddButton />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="text-2xl">
          Add Your Education Detail's{" "}
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="grid grid-rows-2 md:gap-4 py-3">
              <div className="flex gap-1 md:gap-5 md:h-0 flex-col md:flex-row">
                <FormInput
                  name="degree"
                  label="Degree"
                  placeholder="Enter your degree"
                />
                <FormInput
                  name="fieldOfStudy"
                  label="Field Of Study"
                  placeholder="Enter your field"
                />
              </div>

              <div className="flex gap-1 md:gap-5 flex-col md:flex-row">
                <FormInput
                  name="university"
                  label="university"
                  placeholder="Enter your university"
                />
                <FormInput
                  name="collegeName"
                  label="College Name"
                  placeholder="Enter your collegeName"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button
                  className="bg-cyan-500 rounded"
                  type="submit"
                  variant="ghost"
                >
                  Add
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEducation;
