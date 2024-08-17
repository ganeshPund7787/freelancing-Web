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
import useCreatePost from "@/API/useCreatePost";

const formSchema = z.object({
  image: z.string().trim().optional(),
  description: z.string().trim().min(10, "minimum 10 character required"),
});

export type PostFormData = z.infer<typeof formSchema>;

const CreatePost = () => {
  const { CurrentCivilUser } = useAppSelectore((state) => state.user);
  const { Client } = useAppSelectore((state) => state.client);

  const { storeImage, uploading } = useUploadImg();
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [isComplite, setComplite] = useState(false);
  const { createPost } = useCreatePost();

  const form = useForm<PostFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      description: "",
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setImageFile(files[0]);
      setImageFileUrl(URL.createObjectURL(files[0]));
    }
  };

  const onSubmit = async (values: PostType) => {
    if (imageFile) {
      const photoUrl = await storeImage(imageFile);
      values.image = photoUrl;
    }

    createPost({ formData: values });
    setComplite(true);
    setImageFileUrl("");
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="border hover:bg-white hover:text-black  rounded-full"
        >
          create Post
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 mt-2 mb-5">
              <div className="flex gap-1 ">
                <FormField
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <p className="flex gap-2">
                        <FormLabel>Bio </FormLabel>
                        <FormMessage className="text-red-600" />
                      </p>
                      <FormControl>
                        <textarea
                          placeholder="Enter your bio"
                          className="rounded-[5px] p-1 w-full border fixed-size-textarea resize-none border-slate-600 bg-transparent"
                          {...field}
                        >
                          Write something
                        </textarea>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
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
              {!isComplite ? (
                <Button
                  disabled={uploading}
                  className={`disabled:cursor-pointer disabled:bg-cyan-300  bg-cyan-500 rounded`}
                  type="submit"
                  variant="ghost"
                >
                  Post
                </Button>
              ) : (
                <DialogFooter>
                  <DialogClose>
                    <Button type="button" className="bg-red-600">
                      Close
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

export default CreatePost;
