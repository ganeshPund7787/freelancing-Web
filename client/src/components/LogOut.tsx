import { IoIosLogOut } from "react-icons/io";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/App/store";
import { fetchFail, fetchStart, logOutuser } from "@/App/features/civilUser";
import { BACKEND_API_URL } from "@/main";

import {
  fetchFailClient,
  fetchStartClient,
  logOutClient,
} from "@/App/features/clientSlice";
import { toast } from "react-toastify";

const LogOut = () => {
  const disptch = useAppDispatch();

  const logOutUser = async () => {
    try {
      disptch(fetchStart());
      disptch(fetchStartClient());
      const res = await fetch(`${BACKEND_API_URL}/api/auth/logout`);

      const data = await res.json();
      if (data.success === false) {
        disptch(fetchFail());
        disptch(fetchFailClient());
        toast.warning(data.message);
        return;
      }
      toast.success(data.message);
      disptch(logOutuser());
      disptch(logOutClient());
    } catch (error: any) {
      toast.error(error.message);
      disptch(fetchFail());
    }
  };
  return (
    <Button className="flex items-center mt-5 text-red-600 ">
      <IoIosLogOut size={40} title="logout" onClick={logOutUser} />
    </Button>
  );
};

export default LogOut;
