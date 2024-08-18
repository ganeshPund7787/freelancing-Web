import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="search.."
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-cyan-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
