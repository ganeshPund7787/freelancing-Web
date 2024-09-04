import useGetClientConversation from "@/Hooks/Messages_Hook/useGetClientConversation";
import Conversation from "./Conversation";
import { getRandomEmoji } from "@/utils/emojis";

const ClientConversations = () => {
  const { loading, conversations } = useGetClientConversation();

  return (
    <>
      <div className="py-2 flex flex-col overflow-hidden">
        {" "}
        {/* Fixed height */}
        {conversations.map((conversation, idx) => (
          <Conversation
            key={idx}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === conversations?.length - 1}
          />
        ))}
        {loading ? (
          <div className="text-center">
            <span className="loading text-cyan-600 loading-spinner"></span>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ClientConversations;
