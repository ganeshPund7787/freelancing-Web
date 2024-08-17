import { useAppSelectore } from "@/App/store";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Form } from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../FormInput";

const formSchema = z.object({
  heading: z.string().trim().min(10, "required more characters"),
  description: z.string().trim().min(10, "required more words"),
  experianceLevel: z.string().trim().min(2, "required"),
  skills: z.array(z.string()).nonempty("required at least one skill"),
  HoursePerWeak: z.number().positive("must be a positive number").optional(),
  projectDuration: z.string().trim().min(3, "Required"),
  location: z.string().trim().min(2, "Required"),
});

export type JobPostType = z.infer<typeof formSchema>;

const HiringPost = () => {
  const { Client } = useAppSelectore((state) => state.client);

  const form = useForm<JobPostType>({
    resolver: zodResolver(formSchema),
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="border hover:bg-white hover:text-black  rounded-full"
        >
          Upload Hiring
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>
          <div className="flex gap-3 items-center">
            <img
              src={Client?.profilePictureUrl}
              alt=""
              className="h-10 w-10 rounded-full"
            />
            <span>{Client?.fullName}</span>
          </div>
        </DialogTitle>
        <h1 className="text-cyan-500">Create Hiring Update</h1>
        <Form {...form}>
          <FormInput
            name="heading"
            type="text"
            label="heading"
            placeholder="wirte something.."
          />
          <FormInput
            name="heading"
            type="text"
            label="heading"
            placeholder="wirte something.."
          />
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default HiringPost;
