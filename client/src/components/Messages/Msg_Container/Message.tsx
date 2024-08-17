import { useAppSelectore } from "@/App/store";
import { MessageType } from "@/types";
import { extractTime } from "@/utils/extractTime";

type Props = {
  message: MessageType;
};

const Message = ({ message }: Props) => {
  const { Client } = useAppSelectore((state) => state.client);
  const { CurrentCivilUser } = useAppSelectore((state) => state.user);

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
          className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
        >
          {message?.message}
        </div>
      )}

      <div className="chat-footer opacity-50 text-xs flex gap-1 mt-2 items-center">
        {formatedTime}
      </div>
    </div>
  );
};

export default Message;
