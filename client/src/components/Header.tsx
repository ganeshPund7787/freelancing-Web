import { NavLink } from "react-router-dom";
import { Input } from "./ui/input";
import { FaSearch } from "react-icons/fa";
import { useAppSelectore } from "@/App/store";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import MobileNav from "./MobNav";
import { MdOutlineFindInPage } from "react-icons/md";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { MdPermMedia } from "react-icons/md";

const Header = () => {
  const { CurrentCivilUser } = useAppSelectore((state) => state.user);
  const { Client } = useAppSelectore((state) => state.client);

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
          <div className="flex items-center rounded-[1rem] border border-slate-600 px-2 w-72 ">
            <Input
              type="text"
              placeholder="Search jobs"
              className="border-none"
            />
            <FaSearch className="text-white font-normal" />
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
