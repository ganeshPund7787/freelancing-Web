import { setMessages } from "@/App/features/ConversationSlice";
import { useAppDispatch, useAppSelectore } from "@/App/store";
import { BACKEND_API_URL } from "@/main";
import { useState } from "react";
import { toast } from "react-toastify";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, messages } = useAppSelectore(
    (state) => state.conversation
  );
  const dispatch = useAppDispatch();
  const sendMessage = async (message: string) => {
    try {
      setLoading(true);

      const res = await fetch(
        `${BACKEND_API_URL}/api/message/send-msg/${selectedConversation?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ message }),
        }
      );

      const data = await res.json();
      
      if (data.success === false) throw new Error(data.message);

      dispatch(setMessages([...messages, data]));
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading };
};

export default useSendMessage;
