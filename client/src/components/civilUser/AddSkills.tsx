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
import useUpdateUser from "@/Hooks/UserHook/useUpdateUser";

import FormInput from "../FormInput";

const formSchema = z.object({
  skill: z.string().trim().min(2, "required"),
});

export type UserSkillFormData = z.infer<typeof formSchema>;

const AddSkills = () => {
  const { UpdateOther } = useUpdateUser();
  const formMethods = useForm<UserSkillFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skill: "",
    },
  });

  const onSubmit = (values: UserSkillFormData) => {
    UpdateOther(values, "addSkillsAndWork");
    formMethods.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <IoAdd
            className="border p-1 border-cyan-500 hover:bg-opacity-30 rounded-full"
            size={40}
          />
        </Button>
      </DialogTrigger>

      <DialogContent aria-describedby="dialog-description">
        <DialogTitle>Add Skill</DialogTitle>
        <p id="dialog-description" className="sr-only">
          Enter the skill you want to add.
        </p>

        <div className="grid gap-4 py-4">
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <FormInput
                name="skill"
                label="Language"
                placeholder="Enter the language"
              />

              <Button
                type="submit"
                className="bg-cyan-400 mt-7 disabled:cursor-not-allowed shadow-lg hover:text-white text-black w-full rounded-[1em] border"
              >
                Add
              </Button>
            </form>
          </FormProvider>
        </div>

        <DialogFooter>
          <DialogClose>
            <Button
              className="bg-cyan-500 rounded"
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

export default AddSkills;
