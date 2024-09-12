import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "../FormInput";
import { Button } from "../ui/button";
import { IoSend } from "react-icons/io5";
import useCommentPost from "@/Hooks/Posts/useCommentPost";

const formSchema = z.object({
  comment: z.string().trim().min(1, "Required"),
});

export type CommentType = z.infer<typeof formSchema>;

const CommentInput = (postId: any) => {
  const { AddComment, loading } = useCommentPost();
  const form = useForm<CommentType>({
    resolver: zodResolver(formSchema),
    defaultValues: { comment: "" },
  });

  const onSubmit = (data: string | any) => {
    AddComment(postId.postId, data?.comment);
    form.reset();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-5">
        <label htmlFor="" className="mx-5 font-semibold">
          Add comment
        </label>
        <div className="flex gap-3 mx-1 md:mx-3 items-center mt-2">
          <FormInput placeholder="Enter your message" label="" name="comment" />
          {!loading && (
            <Button type="submit">
              <IoSend size={20} />
            </Button>
          )}
          {loading && <span>Loading</span>}
        </div>
      </form>
    </FormProvider>
  );
};

export default CommentInput;
