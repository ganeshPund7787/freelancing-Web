import { BACKEND_API_URL } from "@/main";
import { GetUserProfile } from "@/types";
import { useState } from "react";
import { toast } from "react-toastify";

const userGetProfile = () => {
  const [user, setUser] = useState<GetUserProfile | any>(null);
  const [loading, setLoading] = useState(false);
  const getProfile = async (id: any) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${BACKEND_API_URL}/api/both-user/get-user/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      setLoading(false);
      if (data.success == false) {
        toast.warn("Bad Request");
        return;
      }
      setUser(data);
      return user;
    } catch (error) {
      toast.warn("Check Your Internet");
      setLoading(false);
    }
  };
  return { getProfile, user, loading };
};

export default userGetProfile;
