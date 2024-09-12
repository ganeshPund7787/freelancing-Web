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
import ContactToClient from "../Posts/ContactToClient";
import { useAppSelectore } from "@/App/store";
import { Link, useNavigate } from "react-router-dom";
import ContactBtn from "../styleComponents/ContactBtn";

const JobPostDetails = ({ post }: any) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const ClientCreate: Date = new Date(post?.user?.createdAt);
  const ClientCountry: string = post?.user?.address?.country;
  const { Client } = useAppSelectore((state) => state.client);
  const Navigate = useNavigate();
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
            className="flex justify-start text-sm text-wrap text-cyan-400 sm:text-[1.3rem] hover:underline cursor-pointer"
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
            <SheetTitle className="text-cyan-400 sm:text-[1.3rem]">
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
                Member since : {ClientCreate?.toLocaleDateString()}
              </span>
              <span className="flex gap-2 items-center">
                <FaLocationDot />
                {ClientCountry?.toUpperCase()}
              </span>
              {post?.user?.company && (
                <span>{post?.user?.company} company</span>
              )}
            </div>
          </SheetDescription>
          <SheetFooter>
            {Client?._id !== post.clientId && (
              <>
                <div className="flex sm:flex-row flex-col sm:gap-0 gap-5 items-center justify-center sm:mt-0 mt-5">
                  <SheetClose asChild>
                    <Link to={`/user/${post.clientId}`}>
                      <Button type="submit">
                        <ContactBtn text={"View Profile"} />
                      </Button>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <ContactToClient user={post?.user} />
                  </SheetClose>
                  <SheetClose asChild>
                    <Button onClick={() => Navigate("/messages")} type="button">
                      <ContactBtn text={"Send Message"} />
                    </Button>
                  </SheetClose>
                </div>
              </>
            )}
          </SheetFooter>
          <marquee
            behavior="scroll"
            direction="left"
            scrollamount="5"
            loop={1000}
            className="mt-7 bg-slate-900 w-full p-1"
          >
            <div className="flex text-white shadow-lg gap-5">
              <div className="">
                <span>Contact</span> :- <span> {post?.user?.email}</span>
              </div>
              <div className="">{post?.heading}</div>
              <div className="">Full Time or remote Job offer</div>
              <div className="">
                {post?.user?.company && (
                  <span>{post?.user?.company} company</span>
                )}
              </div>
            </div>
          </marquee>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default JobPostDetails;
