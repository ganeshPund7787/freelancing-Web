import { BACKEND_API_URL } from "@/main";
import { GetUserProfile } from "@/types";
import { useState } from "react";
import { toast } from "react-toastify";

const userGetProfile = () => {
  const [user, setUser] = useState<GetUserProfile | any>(null);

  const getProfile = async (id: any) => {
    try {
      const res = await fetch(
        `${BACKEND_API_URL}/api/both-user/get-user/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success == false) {
        toast.warn(data?.message);
        return;
      }
      setUser(data);
      return user;
    } catch (error) {
      toast.warn("Check Your Internet");
    }
  };
  return { getProfile, user };
};

export default userGetProfile;
