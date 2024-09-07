import useGetClientConversation from "@/Hooks/Messages_Hook/useGetClientConversation";
import Conversation from "./Conversation";
import { getRandomEmoji } from "@/utils/emojis";
import Loader from "@/components/styleComponents/Loader";

const ClientConversations = () => {
  const { loading, conversations } = useGetClientConversation();

  return (
    <>
      <div className="py-8 flex h-[56vh] flex-col gap-2 overflow-auto">
        {conversations.map((conversation, idx) => (
          <Conversation
            key={idx}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === conversations?.length - 1}
          />
        ))}
        {loading ? <Loader /> : null}
      </div>
    </>
  );
};

export default ClientConversations;
