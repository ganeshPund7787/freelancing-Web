import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useAppSelectore } from "@/App/store";
import useUploadImg from "@/Hooks/useUploadImg";
import { ChangeEvent, useRef, useState } from "react";
import { PostType } from "@/types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaImage } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { toast } from "react-toastify";
import useGetPost from "@/Hooks/useFetchPost";

const formSchema = z.object({
  image: z.string().trim().optional(),
  description: z.string().trim().min(10, "minimum 10 characters required"),
});

export type PostFormData = z.infer<typeof formSchema>;

type Props = {
  post: PostType;
};

const EditPost = ({ post }: Props) => {
  const { CurrentCivilUser, loading } = useAppSelectore((state) => state.user);
  const { Client, Clientloading } = useAppSelectore((state) => state.client);
  const { updatePost } = useGetPost();

  const { storeImage, uploading } = useUploadImg();
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(
    post?.image || null
  );
  const [isComplete, setComplete] = useState(false);

  const form = useForm<PostFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: post?.image || "",
      description: post.description?.toString() || "",
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setImageFile(files[0]);
      setImageFileUrl(URL.createObjectURL(files[0]));
    }
  };

  const onSubmit = async (values: PostFormData) => {
    if (imageFile) {
      try {
        const photoUrl = await storeImage(imageFile);
        values.image = photoUrl;
      } catch (error) {
        toast.error("image not upload! check your internet");
        console.error("Error uploading image: ", error);
      }
    }

    updatePost(post._id, values);
    form.reset();
    setComplete(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          title="Update Post"
          variant="ghost"
          type="button"
          className="flex gap-3"
        >
          <MdEditSquare size={20} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>
          <div className="flex gap-3 items-center">
            <img
              src={Client?.profilePictureUrl || CurrentCivilUser?.photoUrl}
              alt=""
              className="h-10 w-10 rounded-full"
            />
            <span>{Client?.fullName || CurrentCivilUser?.fullName}</span>
          </div>
        </DialogTitle>
        <div className="text-cyan-400">Update Post</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 mt-2 mb-5">
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <p className="flex gap-2">
                      <FormLabel>Description </FormLabel>
                      <FormMessage className="text-red-600" />
                    </p>
                    <FormControl>
                      <textarea
                        placeholder="Enter your bio"
                        className="rounded-[5px] p-1 w-full border fixed-size-textarea resize-none border-slate-600 bg-transparent"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="">
                {imageFileUrl && (
                  <img
                    src={imageFileUrl}
                    alt=""
                    className="w-full h-80 object-center object-cover cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-3">
                <input
                  onChange={handleImageChange}
                  accept="image/*"
                  hidden
                  type="file"
                  ref={fileRef}
                />
                <Button
                  type="button"
                  onClick={() => fileRef.current && fileRef.current.click()}
                  title="Add image"
                >
                  <FaImage size={25} />
                </Button>
                {imageFileUrl && (
                  <img
                    className="rounded-full h-10 w-10 object-cover"
                    src={imageFileUrl || undefined}
                    alt=""
                  />
                )}
              </div>
              {!isComplete ? (
                <Button
                  disabled={loading || Clientloading}
                  className={`disabled:cursor-pointer bg-cyan-500 rounded`}
                  type="submit"
                  variant="ghost"
                >
                  Update
                </Button>
              ) : (
                <DialogFooter>
                  <DialogClose>
                    <Button type="button" className="bg-red-600">
                      {loading || Clientloading || uploading ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        "Close"
                      )}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPost;
