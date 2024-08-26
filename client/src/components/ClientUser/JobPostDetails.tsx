import { useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { FaLocationDot } from "react-icons/fa6";

const JobPostDetails = ({ post }: any) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const ClientCreate: Date = new Date(post?.user?.createdAt);
  const ClientCountry: string = post?.user?.address?.country;
  console.log("JobPostDetails: ", post);
  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const getShortDescription = (description: string, wordLimit: number) => {
    const words = description.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : description;
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="hover:text-cyan-400 flex justify-start truncate text-xs sm:text-[1.3rem] hover:underline cursor-pointer"
            variant="ghost"
          >
            {post?.heading}
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="h-[80vh] bg-slate-800 overflow-y-auto"
        >
          <SheetHeader>
            <SheetTitle className="sm:text-[1.3rem]">
              {post?.heading}
            </SheetTitle>
          </SheetHeader>
          <SheetDescription className="text-slate-100 flex flex-wrap gap-5 my-3">
            <div className="flex gap-2">
              <span>Experiance level : </span>
              <span>{post?.experianceLevel}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span>Monthly</span>
              <span>{post?.salary} salary</span>/<span>Less than </span>
              <span>{post?.HoursePerWeak} Hours work per week</span>
            </div>
          </SheetDescription>
          <div className="my-8 flex gap-5 flex-wrap">
            {post?.skills?.map((skill: string, index: number) => (
              <span
                key={index}
                className="border rounded-[1rem] hover:bg-slate-900 border-cyan-500 p-2 cursor-pointer text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>
          <SheetDescription>
            {showFullDescription
              ? post?.description
              : getShortDescription(post?.description, 50)}
            {post?.description.split(" ").length > 50 && (
              <Button
                variant="link"
                className="ml-2"
                onClick={toggleDescription}
              >
                {showFullDescription ? "Show Less" : "Show More"}
              </Button>
            )}
          </SheetDescription>

          <SheetDescription className="my-2">
            <span className="flex gap-2 items-center">
              <FaLocationDot /> {post?.location}
            </span>
          </SheetDescription>
          <SheetDescription>
            <h1 className="sm:text-2xl mt-5">About The Client</h1>
            <div className="flex flex-col gap-5">
              <span className="text-xs text-slate-300">
                Member since : {ClientCreate.toLocaleDateString()}
              </span>
              <span className="flex gap-2 items-center">
                <FaLocationDot />
                {ClientCountry.toUpperCase()}{" "}
              </span>
              {post?.user?.company && (
                <span>{post?.user?.company} company</span>
              )}
              <div className="">
                <Button
                  type="submit"
                  className="border border-slate-500 bg-cyan-400 text-black"
                >
                  View Profile
                </Button>
                <Button
                  type="submit"
                  className="border border-slate-500 bg-cyan-400 text-black"
                >
                  Message 
                </Button>
              </div>
            </div>
          </SheetDescription>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default JobPostDetails;
