import { useAppSelectore } from "@/App/store";
import { MessageType } from "@/types";
import { extractTime } from "@/utils/extractTime";
import { useState } from "react";

type Props = {
  message: MessageType;
};

const Message = ({ message }: Props) => {
  const { Client } = useAppSelectore((state) => state.client);
  const { CurrentCivilUser } = useAppSelectore((state) => state.user);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  let fromMe = message?.senderId === Client?._id;
  if (CurrentCivilUser?._id) {
    fromMe = message?.senderId === CurrentCivilUser?._id;
  }
  const formatedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message?.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={Client?.profilePictureUrl || CurrentCivilUser?.photoUrl}
            alt="...."
          />
        </div>
      </div>

      {message?.message && (
        <div
          className={`chat-bubble sm:w-[15rem] text-white ${bubbleBgColor} ${shakeClass} pb-2`}
        >
          <span>
            {isExpanded
              ? message?.message
              : `${(message?.message as string).substring(0, 100)}`}
          </span>
          {(message?.message as string).length > 60 && (
            <button
              onClick={toggleReadMore}
              className="text-white-500 text-xs  hover:text-red-700 font-medium ml-2"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          )}
        </div>
      )}

      <div className="chat-footer opacity-50 text-xs flex gap-1 mt-2 items-center">
        {formatedTime}
      </div>
    </div>
  );
};

export default Message;
