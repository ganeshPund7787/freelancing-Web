import { FaSearch } from "react-icons/fa";

const JobSearchInput = () => {
  return (
    <div className="mx-3 sm:mx-0 ">
      <div className="flex items-center relative">
        <FaSearch className="absolute left-3" />
        <input
          type="text"
          autoFocus
          placeholder="Search for jobs"
          className="text-white w-[60%] p-2 px-8 rounded-[0.3rem] bg-slate-800 border border-slate-500"
        />
      </div>
      <h1 className="text-2xl my-5">Jobs you might like</h1>
    </div>
  );
};

export default JobSearchInput;
