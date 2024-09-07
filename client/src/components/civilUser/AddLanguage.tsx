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
import { Form } from "@/components/ui/form";
import useUpdateUser from "@/Hooks/UserHook/useUpdateUser";
import FormInput from "../FormInput";
import AddButton from "../styleComponents/AddButton";

const formSchema = z.object({
  language: z.string().trim().min(2, "required"),
});

export type UserLanguageFormData = z.infer<typeof formSchema>;

const AddLanguage = () => {
  const { addLanAndEducation } = useUpdateUser();
  const form = useForm<UserLanguageFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: "",
    },
  });

  const onSubmit = (values: UserLanguageFormData) => {
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
        <DialogTitle>Add New Language</DialogTitle>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <FormInput
                name="language"
                label="language"
                placeholder="language"
              />
              <Button
                type="submit"
                className="bg-cyan-400 mt-7 disabled:cursor-not-allowed shadow-lg hover:text-white text-black w-full rounded-[1em] border"
              >
                Add
              </Button>
            </form>
          </Form>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button
              className="bg-red-500 rounded"
              type="submit"
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

export default AddLanguage;
