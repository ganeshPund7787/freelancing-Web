import { BACKEND_API_URL } from "@/main";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetCivilUserConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BACKEND_API_URL}/api/user/getAllCivil`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();

        if (data.success === false) {
          throw new Error(data.message);
        }
        setConversations(data);
      } catch (error: any) {
        toast.error(error.message);
        return;
      } finally {
        setLoading(false);
      }
    };
    getConversation();
  }, []);

  return { loading, conversations };
};

export default useGetCivilUserConversation;
