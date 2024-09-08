import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { IoMdOptions } from "react-icons/io";
import { useAppSelectore } from "@/App/store";

const MobileNav = () => {
  const { CurrentCivilUser } = useAppSelectore((s) => s.user);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <IoMdOptions size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-slate-800">
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center gap-5">
              <h1 className="md:mx-0 ml-9 text-cyan-400 text-2xl">CivilHub</h1>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-5 mt-10">
          <Link className="py-1" to={"/"}>
            <SheetClose>Home</SheetClose>
          </Link>
          <Link
            className="py-1"
            to={`${CurrentCivilUser ? "/user-profile" : "/client-profile"}`}
          >
            <SheetClose>My Profile</SheetClose>
          </Link>

          <Link to={"/messages"} className="py-1">
            <SheetClose>Messages</SheetClose>
          </Link>

          <Link to={"/media"} className="py-1">
            <SheetClose>Media</SheetClose>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
