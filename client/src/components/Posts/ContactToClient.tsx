import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useAppSelectore } from "@/App/store";
import FormInput from "../FormInput";
import useSendEmail from "@/Hooks/Posts/useSendEmail";
import { useState } from "react";

const formSchema = z.object({
  from: z.string().trim().min(5, "Required"),
  to: z.string().trim().min(5, "Required"),
  subject: z.string().trim().min(5, "Required").max(50),
  text: z.string().trim().min(5, "Required"),
  html: z.string().optional(),
});

export type SendEmailToClientType = z.infer<typeof formSchema>;

export type Props = {
  user: ClientTypes | any;
};

const ContactToClient = ({ user }: Props) => {
  const { Client } = useAppSelectore((state) => state.client);
  const { CurrentCivilUser } = useAppSelectore((state) => state.user);
  const { sendMessage } = useSendEmail();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const Sender = Client ? { ...Client } : { ...CurrentCivilUser };

  const form = useForm<SendEmailToClientType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: Sender?.email,
      to: user?.email,
    },
  });

  const onSubmit = async (Data: any) => {
    await sendMessage(Data);
    setIsDialogOpen(false);
    console.log(Data);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="hover:bg-cyan-400 hover:scale-105 rounded-[0.3rem] bg-cyan-400 text-black"
        >
          Send Email
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Contact to {user?.fullName} </DialogTitle>
        <div className="grid gap-4 py-4">
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <FormField
                name="from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <FormMessage className="text-red-600" />
                    <FormControl>
                      <Input
                        className="rounded-[5px] focus:outline-cyan-600 text-slate-300"
                        {...field}
                        readOnly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <FormMessage className="text-red-600" />
                    <FormControl>
                      <Input
                        className="rounded-[5px] focus:outline-cyan-600 text-slate-300"
                        {...field}
                        readOnly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormInput
                label="subject"
                name="subject"
                placeholder="Enter Subject"
              />
              <FormField
                name="text"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <p className="flex gap-2">
                      <FormLabel>Message </FormLabel>
                      <FormMessage className="text-red-600" />
                    </p>
                    <FormControl>
                      <textarea
                        placeholder="Enter your message"
                        className="rounded-[5px] p-1 w-full border resize-none border-slate-600 bg-transparent"
                        {...field}
                        maxLength={200}
                      ></textarea>
                    </FormControl>
                  </FormItem>
                )}
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
      </DialogContent>
    </Dialog>
  );
};

export default ContactToClient;
