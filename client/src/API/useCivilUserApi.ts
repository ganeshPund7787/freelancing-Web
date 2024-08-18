import { fetchFail, fetchStart, fetchSuccess } from "@/App/features/civilUser";
import {
  fetchFailClient,
  fetchStartClient,
  fetchSuccessClient,
} from "@/App/features/clientSlice";
import { useAppDispatch } from "@/App/store";
import { BACKEND_API_URL } from "@/main";
import { UserFormDataSignUp } from "@/pages/civilUser/SignUp";
import { UserFormData } from "@/pages/SignIn";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useCivilApi = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoading, setisLoading] = useState(false);

  const SignUpCivilUser = async (formData: UserFormDataSignUp) => {
    setisLoading(true);
    const res = await fetch(`${BACKEND_API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    
    setisLoading(false);
    if (!data.success) {
      toast.error(data.message);
      return;
    }
    toast.success(data.message);
    navigate("/sign-in");
    return data;
  };

  const SignInUser = async (formData: UserFormData) => {
    dispatch(fetchStart());
    dispatch(fetchStartClient());
    const res = await fetch(`${BACKEND_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    
    
    if (data.success === false) {
      toast.warning(data.message);
      dispatch(fetchFail());
      dispatch(fetchFailClient());
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
  };

  return { SignUpCivilUser, SignInUser, isLoading };
};
