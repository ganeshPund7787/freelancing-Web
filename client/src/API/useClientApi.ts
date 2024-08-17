import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_API_URL } from "@/main";
import { ClientType } from "@/types";
import { toast } from "react-toastify";

export type Props = {
  formData: ClientType;
};

export const useClientApi = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);

  const SignUpClient = async ({ formData }: Props) => {
    try {
      setisLoading(true);
      const res = await fetch(`${BACKEND_API_URL}/api/client/register`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      setisLoading(false);
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      navigate("/sign-in");
      return data;
    } catch (error: any) {
      toast.error(error.message);
      console.log(`Error while Sign Up : `, error);
    }
  };

  return { SignUpClient, isLoading };
};
