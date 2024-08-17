import { useEffect } from "react";
import notification from "../../assets/notification.mp3.mp3";
import { useAppDispatch, useAppSelectore } from "@/App/store";
import { useSocketContext } from "@/context/SocketContext";
import { setMessages } from "@/App/features/ConversationSlice";

const useListenMessages = () => {
  const { socket }: any = useSocketContext();
  const { messages } = useAppSelectore((s) => s.conversation);
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket?.on("newMessage", (newMessage: any) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notification);
      sound.play();
      dispatch(setMessages([...messages, newMessage]));
    });

    return () => socket?.off("newMessage");
  }, [socket, messages]);
};

export default useListenMessages;
