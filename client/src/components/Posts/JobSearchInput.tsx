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
    search(headingInput);
    setHeadingInput("");
    navigate("/search");
  };

  return (
    <div className="mx-3 sm:mx-0">
      <div className="flex items-center relative">
        <FaSearch className="absolute left-3" />
        <form onSubmit={(e) => handleSubmit(e)} className="w-full">
          <input
            type="text"
              value={headingInput}
            placeholder="Search for jobs"
            onChange={(e) => setHeadingInput(e.target.value)}
            className="text-white w-[60%] p-2 px-8 rounded-[0.3rem] bg-slate-800 border border-slate-500"
          />
        </form>
      </div>
      <h1 className="text-2xl my-5">Jobs you might like</h1>
    </div>
  );
};

export default JobSearchInput;
