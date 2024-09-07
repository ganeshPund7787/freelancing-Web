import useGetMessages from "@/Hooks/Messages_Hook/useGetMessages";
import useListenMessages from "@/Hooks/Messages_Hook/useListenMessages";
import MessageSkeletons from "@/components/skeletons/MessageSkeletons";
import { MessageType } from "@/types";
import { useEffect, useRef } from "react";
import Message from "./Message";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  
  return (
    <div className="px-4 h-[40rem] sm:h-[32rem] flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message: any | MessageType) => (
          <div ref={lastMessageRef} key={message._id}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(4)].map((_, idx) => <MessageSkeletons key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center">
          send the message to start the conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
