import useSearchHeading from "@/Hooks/Posts/useSearchHeading";
import { FormEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const JobSearchInput = () => {
  const [headingInput, setHeadingInput] = useState<string>("");
  const navigate = useNavigate();

  const { search } = useSearchHeading();

  const handleSubmit = (e: Event | FormEvent) => {
    e.preventDefault();
    if (!headingInput.trim()) return;
    search(headingInput.trim());
    setHeadingInput("");
    navigate("/search");
  };

  return (
    <div className="mx-3 sm:mx-0 w-full">
      <div className="flex w-full items-center relative">
        <FaSearch className="absolute left-3" />
        <form onSubmit={(e) => handleSubmit(e)} className="flex w-full">
          <input
            type="text"
            value={headingInput}
            placeholder="Search for jobs"
            onChange={(e) => setHeadingInput(e.target.value)}
            className="text-white w-[90%] p-2 px-8 rounded-[0.3rem] bg-slate-800 border border-slate-500"
          />
          <button
            type="submit"
            className="overflow-hidden w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer relative  group"
          >
            search
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-200 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-right"></span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-right"></span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-right"></span>
            <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">
              click
            </span>
          </button>
        </form>
      </div>
      <h1 className="text-2xl my-5">Jobs you might like</h1>
    </div>
  );
};

export default JobSearchInput;
