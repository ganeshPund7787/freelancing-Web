import { setSelectedConversation } from "@/App/features/ConversationSlice";
import { useAppDispatch, useAppSelectore } from "@/App/store";
import { useSocketContext } from "@/context/SocketContext";
import { CivilUserType } from "@/types";

type Props = {
  conversation: ClientTypes | CivilUserType | any;
  emoji: string;
  lastIdx: boolean;
};

const Conversation = ({ conversation, emoji, lastIdx }: Props) => {
  const { selectedConversation } = useAppSelectore((c) => c.conversation);
  const isSelected = selectedConversation?._id === conversation?._id;
  const dispatch = useAppDispatch();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  return (
    <>
      <div
        className={`flex gap-2 hover:bg-cyan-500 rounded p-2 py-1 cursor-pointer
          ${isSelected ? "bg-sky-500" : ""}`}
        onClick={() => dispatch(setSelectedConversation(conversation))}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              src={conversation?.profilePictureUrl || conversation?.photoUrl}
              alt="user avatar"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation?.fullName}</p>
            <span className="">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h1" />}
    </>
  );
};

export default Conversation;
