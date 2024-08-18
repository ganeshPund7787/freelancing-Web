import { fetchFail, fetchSuccess } from "@/App/features/civilUser";
import {
  fetchFailClient,
  fetchSuccessClient,
} from "@/App/features/clientSlice";
import { useAppDispatch } from "@/App/store";
import { BACKEND_API_URL } from "@/main";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useSignInWithGoogle = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const SignIn = async (email: string) => {
    try {
      const res = await fetch(`${BACKEND_API_URL}/api/auth/OAuth-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success === false) {
        toast.warning(data.message);
        dispatch(fetchFail());
        dispatch(fetchFailClient());
        navigate("/select-role");
        return;
      }

      toast.success("User login successfully");

      if (data?.role === "engineer") {
        dispatch(fetchSuccess(data || null));
        navigate("/");
        return;
      }
      dispatch(fetchSuccessClient(data || null));
      navigate("/");
      return data;
    } catch (error) {
      console.log(`Error while Continuw with google: `, error);
    }
  };
  return { SignIn };
};

export default useSignInWithGoogle;
