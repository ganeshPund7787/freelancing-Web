import Conversation from "./Conversation";
import { getRandomEmoji } from "@/utils/emojis";
import useGetCivilUserConversation from "@/Hooks/Messages_Hook/useGetCivilUserConversation";

const CivilConversations = () => {
  const { loading, conversations } = useGetCivilUserConversation();

  return (
    <>
      <div className="py-2 flex flex-col overflow-auto">
        {conversations.map((conversation, idx) => (
          <Conversation
            key={idx}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === conversations?.length - 1}
          />
        ))}
        {loading ? (
          <div className="text-center text-2xl">
            <span className="loading text-cyan-600 loading-spinner"></span>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CivilConversations;
