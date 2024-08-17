"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";

import { MdModeEditOutline } from "react-icons/md";
import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormDescription } from "../ui/form";
import useUpdateUser from "@/Hooks/UserHook/useUpdateUser";
import useUploadImg from "@/Hooks/useUploadImg";
import FormInput from "../FormInput";

type Props = {
  user: any;
  loading: boolean;
};

const UpdateProfileHead = ({ user, loading }: Props) => {
  const { update: userUpdate } = useUpdateUser();
  const { storeImage, imageUploadError, uploading } = useUploadImg();
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [update, setUpdate] = useState<boolean>(false);

  const formSchema = z
    .object({
      fullName: z.string().trim().min(5, "required"),
      photoUrl: z.string().optional(),
      city: z.string().trim().min(1, "City is required"),
      state: z.string().trim().min(1, "State is required"),
      country: z.string().trim().min(1, "Country is required"),
    })
    .refine(async (data) => {
      const photoUrl = await storeImage(imageFile);
      data.photoUrl = photoUrl;
      return true;
    });

  type UserUpdateFormData = z.infer<typeof formSchema>;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setImageFile(files[0]);
      setImageFileUrl(URL.createObjectURL(files[0]));
    }
  };

  const form = useForm<UserUpdateFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user.fullName,
      photoUrl: user.photoUrl,
      city: user.city,
      state: user.state,
      country: user.country,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (imageFile) {
      const result = await formSchema.parseAsync(values);
      await userUpdate(result);
      setUpdate(true);
      return;
    }
    values.photoUrl = user.photoUrl;
    await userUpdate(values);
    setUpdate(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <MdModeEditOutline
            className="border cursor-pointer p-2 border-cyan-500 rounded-full"
            size={40}
          />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Edit Profile Image or name</DialogTitle>

        <div className="grid gap-4 py-4">
          <p className="text-center text-xs">
            Click profile picture if you want to update
          </p>
          <div className="flex justify-center">
            <input
              onChange={handleImageChange}
              accept="image/*"
              hidden
              type="file"
              ref={fileRef}
            />
            <img
              onClick={() => fileRef.current && fileRef.current.click()}
              src={imageFileUrl || user.photoUrl}
              alt=""
              className="h-32 w-32 rounded-full object-cover cursor-pointer"
            />
          </div>
          <DialogDescription className="text-red-500 text-sm">
            {imageUploadError}
          </DialogDescription>
          <DialogDescription>
            {uploading && <span className="text-green-600">Uploading...</span>}
          </DialogDescription>
          <div className=" items-center gap-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <FormInput
                  name="fullName"
                  label="FullName"
                  placeholder="Enter your fullname"
                />

                <FormDescription className="text-sm font-semibold">
                  Address
                </FormDescription>

                <div className="flex flex-col md:flex-row gap-4">
                  <FormInput name="city" label="City" placeholder="city" />
                  <FormInput name="state" label="state" placeholder="state" />
                  <FormInput
                    name="country"
                    label="country"
                    placeholder="country"
                  />
                </div>

                <div className="flex justify-between mt-1 md:mt-5 items-center">
                  {update ? (
                    <DialogFooter className="">
                      <DialogClose asChild>
                        <Button
                          disabled={loading || uploading}
                          className="bg-green-500 disabled:cursor-not-allowed rounded"
                          type="button"
                        >
                          {loading ? (
                            <span className="loading disabled:bg-slate-700 text-cyan-600 loading-spinner"></span>
                          ) : (
                            "Close"
                          )}
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  ) : (
                    <Button
                      onClick={form.handleSubmit(onSubmit)}
                      className="bg-cyan-500 rounded px-5"
                      type="submit"
                    >
                      {loading ? (
                        <span className="loading text-cyan-600 loading-spinner"></span>
                      ) : (
                        "save"
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileHead;
