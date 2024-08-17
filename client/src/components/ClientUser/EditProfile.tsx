import useUploadImg from "@/Hooks/useUploadImg";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import FormInput from "../FormInput";
import { Button } from "../ui/button";
import { useAppSelectore } from "@/App/store";
import useUpdateClient from "@/Hooks/ClientHook/useUpdateClient";

const EditProfile = () => {
  const { storeImage, imageUploadError, uploading } = useUploadImg();
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const { updateClient } = useUpdateClient();
  const { Client, Clientloading } = useAppSelectore((state) => state.client);

  const formSchemaClient = z.object({
    fullName: z.string().min(5, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "required"),
    company: z.string().optional(),
    address: z
      .object({
        street: z.string().trim().optional(),
        city: z.string().trim().optional(),
        state: z.string().trim().optional(),
        postalCode: z.string().trim().optional(),
        country: z.string().trim().optional(),
      })
      .optional(),
    website: z.string().optional(),
    bio: z.string().optional(),
    profilePictureUrl: z.string().optional(),
  });

  type ClientFormDataSignUp = z.infer<typeof formSchemaClient>;

  const form = useForm<ClientFormDataSignUp>({
    resolver: zodResolver(formSchemaClient),
    defaultValues: {
      email: Client?.email,
      fullName: Client?.fullName,
      phoneNumber: Client?.phoneNumber,
      company: Client?.company,
      website: Client?.website,
      address: {
        street: Client?.address?.street || "",
        city: Client?.address?.city || "",
        postalCode: Client?.address?.postalCode || "",
        state: Client?.address?.state || "",
        country: Client?.address?.country || "",
      },
      profilePictureUrl: Client?.profilePictureUrl,
      bio: Client?.bio,
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setImageFile(files[0]);
      setImageFileUrl(URL.createObjectURL(files[0]));
    }
  };

  const onSubmit = async (values: ClientFormDataSignUp) => {
    if (imageFile) {
      const photoUrl = await storeImage(imageFile);
      values.profilePictureUrl = photoUrl;
    }
    updateClient({ formData: values });
  };

  return (
    <div>
      <div className="grid gap-4 py-4">
        <p className="text-center text-green-500 text-xs">
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
            src={imageFileUrl || Client.profilePictureUrl}
            alt="user img"
            className="h-32 w-32 rounded-full object-cover cursor-pointer"
          />
        </div>
        <span className="text-red-500 text-sm">{imageUploadError}</span>
        <span>
          {uploading && <span className="text-green-600">Uploading...</span>}
        </span>
        <div className="items-center gap-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <div className="flex md:flex-row gap-4 flex-col">
                <div className="flex-1 1/2">
                  <FormInput
                    name="fullName"
                    label="FullName"
                    placeholder="Enter your fullname"
                  />
                </div>
                <div className="flex-1 1/2">
                  <FormInput
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>
                <div className="flex-1 1/2">
                  <FormInput
                    name="phoneNumber"
                    label="Phone Number"
                    placeholder="Enter your number"
                    type="text"
                  />
                </div>
              </div>

              <div className="flex md:flex-row gap-4 my-3 flex-col">
                <div className="md:w-[26rem]">
                  <FormInput
                    name="company"
                    label="Company Name"
                    placeholder="Enter your company name"
                  />
                </div>
                <div className="md:w-[26rem]">
                  <FormInput
                    name="website"
                    label="Your / company website url"
                    placeholder="Enter website url"
                  />
                </div>
              </div>

              <span className="text-sm font-semibold my-2">Address</span>
              <div className="flex flex-col md:flex-row gap-4">
                <FormInput
                  name="address.street"
                  label="Street"
                  placeholder="street"
                />
                <FormInput
                  name="address.city"
                  label="City"
                  placeholder="city"
                />
                <FormInput
                  name="address.state"
                  label="State"
                  placeholder="state"
                />
                <FormInput
                  name="address.postalCode"
                  label="Postal Code"
                  placeholder="postal code"
                />
                <FormInput
                  name="address.country"
                  label="Country"
                  placeholder="country"
                />
              </div>
              <FormField
                name="bio"
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
              <div className="flex justify-between mt-1 md:mt-5 items-center">
                <Button
                  type="submit"
                  disabled={Clientloading || uploading}
                  className="bg-cyan-500 rounded px-5"
                >
                  {Clientloading || uploading ? (
                    <span className="loading text-cyan-600 loading-spinner"></span>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
