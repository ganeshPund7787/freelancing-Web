import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { Controller, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../FormInput";
import {
  experienceLevels,
  skills as rawSkills,
  salaryExeptation,
} from "@/Data/Client";
import { Button } from "../ui/button";
import useJobPost from "@/Hooks/ClientHook/useJobPost";
import { useState } from "react";
import { Link } from "react-router-dom";

const formSchema = z.object({
  heading: z.string().trim().min(10, "required more characters"),
  description: z.string().trim().min(10, "required more words"),
  experianceLevel: z.enum(experienceLevels),
  salary: z.enum(salaryExeptation),
  skills: z
    .array(z.string())
    .min(1, "At least one skill is required")
    .optional(),
  HoursePerWeak: z.preprocess(
    (val) => (val ? parseFloat(val as string) : undefined),
    z.number().positive("must be a positive number").optional()
  ),
  location: z.string().trim().min(2, "Required"),
});

export type JobPostType = z.infer<typeof formSchema>;

const CreateJobPost = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const methods = useForm<JobPostType>({
    resolver: zodResolver(formSchema),
  });
  const { createPost } = useJobPost();

  const onSubmit = async (data: JobPostType) => {
    // Include selected skills in form data
    const formData = { ...data, skills: selectedSkills };
    console.log("Form Data:", formData);
    await createPost(formData);
  };

  const handleSkillChange = (skill: string) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
    );
  };

  const skills = Array.from(new Set(rawSkills));

  return (
    <div>
      <h1 className="text-cyan-400 font-semibold text-center text-2xl">
        Create Hiring Update
      </h1>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="flex md:mx-5 sm:flex-row flex-col gap-5 md:mt-10 mt-5">
            <div className="flex-1 md:w-1/2">
              <FormInput
                name="heading"
                type="text"
                label="Title About Hiring"
                placeholder="write something.."
              />
            </div>
            <div className="flex-1 md:w-1/2">
              <FormInput
                name="location"
                type="text"
                label="location of job / work"
                placeholder="work location"
              />
            </div>
          </div>

          <div className="flex md:mx-5 sm:flex-row flex-col gap-4">
            <div className="flex-1 md:w-1/2">
              <label htmlFor="experienceLevel">Experience Level</label>
              <Controller
                name="experianceLevel"
                control={methods.control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="block w-full cursor-pointer appearance-none bg-slate-800 border border-gray-300 rounded-md py-2 px-3 pr-10 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <div className="flex-1 md:w-1/2">
              <FormInput
                label="Hourse Per Weak"
                name="HoursePerWeak"
                placeholder="Enter hours work"
                type="number"
                max={168}
                min={1}
              />
            </div>
          </div>

          <span className="mx-5">Pick-up skills</span>
          <div className="grid md:mx-5 sm:flex-row flex-col mx-1 gap-2 md:grid-cols-5 sm:grid-cols-3">
            {skills.map((skill) => (
              <label key={skill} className="text-sm cursor-pointer flex gap-2">
                <input
                  type="checkbox"
                  value={skill}
                  onChange={() => handleSkillChange(skill)}
                  checked={selectedSkills.includes(skill)}
                />
                {skill}
              </label>
            ))}
          </div>
          
          <div className="flex-1 md:w-1/2">
            <label htmlFor="experienceLevel">Salary Exeptation </label>
            <Controller
              name="salary"
              control={methods.control}
              render={({ field }) => (
                <select
                  {...field}
                  className="block w-full cursor-pointer appearance-none bg-slate-800 border border-gray-300 rounded-md py-2 px-3 pr-10 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {salaryExeptation.map((salary) => (
                    <option key={salary} value={salary}>
                      {salary}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
          <FormField
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <p className="flex gap-2">
                  <FormLabel>Description About Job </FormLabel>
                  <FormMessage className="text-red-600" />
                </p>
                <FormControl>
                  <textarea
                    maxLength={1000}
                    minLength={50}
                    placeholder="write more details about job"
                    className="rounded-[5px] h-[10rem] p-1 w-full border fixed-size-textarea resize-none border-slate-600 bg-transparent"
                    {...field}
                  ></textarea>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-evenly flex-col sm:flex-row">
            <Button
              type="submit"
              className="border w-40 bg-cyan-500 my-5 rounded-sm"
            >
              Post
            </Button>
            <Link
              to={"/client-profile"}
              className="flex border w-40 items-center justify-center font-semibold bg-red-500 my-5 rounded-sm"
            >
              cancel
            </Link>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateJobPost;
