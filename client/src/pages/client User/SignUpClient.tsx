import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../../components/FormInput";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useClientApi } from "@/API/useClientApi";

export const formSchemaClient = z.object({
  fullName: z.string().min(5, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(3, "Password is required"),
  phoneNumber: z.string().min(10, "required"),
  company: z.string().optional(),
  address: z
    .object({
      street: z.string().trim(),
      city: z.string().trim(),
      state: z.string().trim(),
      postalCode: z.string().trim(),
      country: z.string().trim(),
    })
    .optional(),
  website: z.string().optional(),
  bio: z.string().optional(),
});

export type ClientFormDataSignUp = z.infer<typeof formSchemaClient>;

const SignUpClient = () => {
  const { SignUpClient, isLoading } = useClientApi();
  const methods = useForm<z.infer<typeof formSchemaClient>>({
    resolver: zodResolver(formSchemaClient),
  });

  const onSubmit = (values: z.infer<typeof formSchemaClient>) => {
    SignUpClient({ formData: values });
  };

  return (
    <>
      <h1 className="text-3xl bg-slate-800 px-5 tracking-tight text-cyan-400 font-semibold py-2">
        CivilHub
      </h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="md:flex mx-2 bg-slate-800 md:mx-0 mt-8 flex-none py-5 md:mt-0 items-center justify-center">
            <div className="space-y-5 border md:px-20 p-5 md:mx-10 rounded border-slate-400">
              <h2 className="text-3xl my-10 font-semibold text-center text-cyan-400">
                Sign Up As Client
              </h2>

              <div className="flex  md:flex-row flex-col md:gap-5 justify-between">
                <div className="flex-1 md:w-1/2">
                  <FormInput
                    name="fullName"
                    label="Full Name"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="flex-1 md:w-1/2">
                  <FormInput
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex-1 md:w-1/2">
                  <FormInput
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                  />
                </div>
              </div>

              <div className="flex md:flex-row flex-col md:gap-5">
                <div className="flex-1 md:w-1/2">
                  <FormInput
                    name="phoneNumber"
                    label="Phone Number (optional)"
                    placeholder="Enter your phone number"
                    type="number"
                  />
                </div>
                <div className="flex-1 md:w-1/2">
                  <FormInput
                    name="company"
                    label="Company Name (optional)"
                    placeholder="Enter your company name"
                  />
                </div>
              </div>

              <h1>Your Address (optional) </h1>
              <div className="flex md:flex-row flex-col md:gap-5">
                <FormInput
                  name="address.street"
                  label="Street"
                  placeholder="Enter your street"
                />
                <FormInput
                  name="address.city"
                  label="City"
                  placeholder="Enter your city"
                />
                <FormInput
                  name="address.state"
                  label="State"
                  placeholder="Enter your state"
                />
              </div>

              <div className="flex md:flex-row flex-col md:gap-5">
                <div className="flex-1 md:w-1/2">
                  <FormInput
                    name="address.postalCode"
                    label="Postal Code (optional)"
                    placeholder="Enter your postal code"
                  />
                </div>
                <div className="flex-1 md:w-1/2">
                  <FormInput
                    name="address.country"
                    label="Country (optional)"
                    placeholder="Enter your country"
                  />
                </div>
              </div>
              <FormInput
                name="website"
                label="Website URL (optional)"
                placeholder="Enter your website URL"
              />
              <FormField
                name="bio"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <p className="flex gap-2">
                      <FormLabel>Bio (optional)</FormLabel>
                      <FormMessage className="text-red-600" />
                    </p>
                    <FormControl>
                      <textarea
                        placeholder="Enter your bio"
                        className="rounded-[5px] p-1 w-full border border-slate-600 bg-transparent"
                        {...field}
                      ></textarea>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormDescription className="text-sm">
                Already a member?{" "}
                <Link to="/sign-in" className="text-blue-500">
                  login
                </Link>
              </FormDescription>
              <FormDescription className="text-sm">
                back to select{" "}
                <Link to="/select-role" className="text-blue-500">
                  role
                </Link>
              </FormDescription>

              <Button
                type="submit"
                disabled={isLoading}
                className="bg-cyan-400 mt-7 disabled:cursor-not-allowed shadow-lg hover:text-white text-black w-full rounded-[1em] border"
              >
                {isLoading ? (
                  <span className="loading text-cyan-600 loading-spinner"></span>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default SignUpClient;
