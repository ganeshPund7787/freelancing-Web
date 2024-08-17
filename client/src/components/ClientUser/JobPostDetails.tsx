import { useEffect, useState } from "react";
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
import { useAppSelectore } from "@/App/store";
// import Contact from "./ContactClient";
// import { BACKEND_API_URL } from "@/main";

const JobPostDetails = ({ post }: any) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  // const [client, setClient] = useState({});
  const { CurrentCivilUser } = useAppSelectore((s) => s.user);

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const getShortDescription = (description: string, wordLimit: number) => {
    const words = description.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : description;
  };

  useEffect(() => {
    //   // const getClientInfo = async () => {
    //   //   try {
    //   //     const res = await fetch(
    //   //       `${BACKEND_API_URL}/api/client/${post?.clientId}`
    //   //     );
    //   //     const data = await res.json();
    //   //     setClient(data);
    //   //     return data;
    //   //   } catch (error) {
    //   //     console.log(`Error while `, error);
    //   //   }
    //   // };
    //   // getClientInfo();
  }, []);
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
            <span className="flex gap-2 ">
              <FaLocationDot /> {post?.location}
            </span>
          </SheetDescription>
          <SheetDescription>
            {CurrentCivilUser ? <></> : <div className=""></div>}
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
