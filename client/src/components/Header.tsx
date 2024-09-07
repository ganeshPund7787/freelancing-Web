import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useAppSelectore } from "@/App/store";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import MobileNav from "./MobNav";
import { MdOutlineFindInPage } from "react-icons/md";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { MdPermMedia } from "react-icons/md";
import { FormEvent, useState } from "react";
import useSearchHeading from "@/Hooks/Posts/useSearchHeading";

const Header = () => {
  const { CurrentCivilUser } = useAppSelectore((state) => state.user);
  const { Client } = useAppSelectore((state) => state.client);

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

  console.log(headingInput);
  return (
    <>
      <nav className="flex bg-slate-900 justify-between p-4">
        <div className="flex gap-5 items-center">
          <NavLink to={"/"} className="text-3xl text-cyan-400 font-semibold">
            civilHub
          </NavLink>
          <div className="md:flex hidden mx-8 gap-8">
            <NavLink
              to="/find-jobs"
              className={({ isActive }) =>
                `p-1 rounded-[4px] border-none flex items-center gap-2 ${
                  isActive ? "text-cyan-500 underline" : " hover:underline"
                }`
              }
            >
              Find Work <MdOutlineFindInPage />
            </NavLink>

            <NavLink
              to="/messages"
              className={({ isActive }) =>
                `p-1 rounded-[4px] border-none flex items-center gap-2 ${
                  isActive ? "text-cyan-500 underline" : " hover:underline"
                }`
              }
            >
              Messages <BiSolidMessageSquareDetail />
            </NavLink>

            <NavLink
              to="/media"
              className={({ isActive }) =>
                `p-1 rounded-[4px] border-none flex items-center gap-2 ${
                  isActive ? "text-cyan-500 underline" : " hover:underline"
                }`
              }
            >
              Media <MdPermMedia />
            </NavLink>
          </div>
        </div>

        <div className="md:flex hidden items-center gap-5">
          <div className="flex items-center rounded-[1rem] px-2  ">
            <div className="p-2 overflow-hidden w-[38px] h-[38px] hover:w-[270px] bg-cyan-400 shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
              <div className="flex items-center justify-center fill-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Isolation_Mode"
                  data-name="Isolation Mode"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <FaSearch size={25} className="text-black" />
                </svg>
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  placeholder="search jobs"
                  type="text"
                  value={headingInput}
                  onChange={(e) => setHeadingInput(e.target.value)}
                  className="outline-none text-md bg-transparent w-full placeholder:text-black text-black font-sebold px-2"
                />
              </form>
            </div>
          </div>
          {CurrentCivilUser ? (
            <Avatar>
              <NavLink to="/user-profile">
                <AvatarImage
                  src={CurrentCivilUser?.photoUrl}
                  className="object-cover"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </NavLink>
            </Avatar>
          ) : (
            <Avatar>
              <NavLink to="/client-profile">
                <AvatarImage
                  src={Client?.profilePictureUrl}
                  className="object-cover"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </NavLink>
            </Avatar>
          )}
        </div>

        <div className="md:hidden block">
          <MobileNav />
        </div>
      </nav>
      <hr className="text-cyan-600" />
    </>
  );
};

export default Header;
