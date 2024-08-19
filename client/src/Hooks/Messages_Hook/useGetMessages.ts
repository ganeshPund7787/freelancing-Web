import { setMessages } from "@/App/features/ConversationSlice";
import { useAppDispatch, useAppSelectore } from "@/App/store";
import { BACKEND_API_URL } from "@/main";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, messages } = useAppSelectore(
    (state) => state.conversation
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getMessages = async (): Promise<string[] | undefined> => {
      try {
        setLoading(true);
        const res = await fetch(
          `${BACKEND_API_URL}/api/message/get-msg/${selectedConversation?._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await res.json();

        if (data.success === false) {
          setLoading(false);
          throw new Error(data.message);
        }
        setLoading(false);
        dispatch(setMessages(data));
        return;
      } catch (error: any) {
        setLoading(false);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]); //selectedConversation?._id, messages
  return { loading, messages };
};

export default useGetMessages;
