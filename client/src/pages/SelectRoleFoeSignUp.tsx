import { MdPersonSearch } from "react-icons/md";
import { FcBusinessman } from "react-icons/fc";
import { Link } from "react-router-dom";

const SelectRoleFoeSignUp = () => {
  return (
    <div className="h-[100vh] w-[100vw]">
      <h1 className="text-2xl px-5 tracking-tight text-cyan-400 font-semibold py-2">
        CivilHub
      </h1>
      <div className="flex flex-col gap-24 items-center mt-5">
        <h1 className="md:text-3xl">Join as a client or freelancer</h1>
        <div className="flex md:flex-row flex-col gap-12">
          <Link
            to={"/sign-up-client"}
            className="h-52 w-52 rounded-2xl p-5 text-2xl border-4 hover:bg-slate-900 border-slate-500 hover:border-cyan-500"
          >
            <FcBusinessman size={25} />
            <p className="mt-5">I am a client , hiring for project </p>
          </Link>
          <Link
            to={"/sign-up-user"}
            className="h-52 w-52 rounded-2xl p-5 text-2xl border-4 hover:bg-slate-900 border-slate-500 hover:border-cyan-500"
          >
            <MdPersonSearch size={25} />
            <p className="mt-4">I am a freelancer , looking for work </p>
          </Link>
        </div>
        <p>
          Already have an account?{" "}
          <Link to={"/sign-in"} className="text-sm text-blue-600">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SelectRoleFoeSignUp;
