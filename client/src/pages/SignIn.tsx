import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Form, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useCivilApi } from "@/API/useCivilUserApi";
import { useAppSelectore } from "@/App/store";
import FormInput from "@/components/FormInput";
import OAuth from "@/components/OAuth";

const formSchema = z.object({
  email: z.string().trim().min(5, "required"),
  password: z.string().trim().min(3, "required"),
});

export type UserFormData = z.infer<typeof formSchema>;

const SignIn = () => {
  const { SignInUser } = useCivilApi();

  const { loading } = useAppSelectore((state) => state.user);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    SignInUser(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <h1 className="text-2xl px-5 tracking-tight text-cyan-400 font-semibold py-2">
          CivilHub
        </h1>
        <div className="md:flex mx-5 md:mx-0  mt-16 items-center justify-center">
          <div className="space-y-6 border bg-slate-800 rounded border-slate-500 p-8 md:w-96">
            <div>
              <h2 className="text-3xl font-semibold text-center">
                {" "}
                login in to civilHub{" "}
              </h2>
            </div>
            <FormInput
              name="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
            />

            <FormInput
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <div className="">
              <FormDescription className="text-sm">
                Looking to join us?
                <Link to={"/select-role"} className="text-blue-500">
                  {" "}
                  Register now!
                </Link>
              </FormDescription>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="bg-cyan-400 disabled:cursor-not-allowed mt-7 shadow-lg hover:text-white text-black w-full  rounded-[1em] border"
            >
              {loading ? (
                <span className="loading text-cyan-600 loading-spinner"></span>
              ) : (
                "SIGN IN"
              )}
            </Button>
            <hr className="text-slate-600" />
            <OAuth />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignIn;
