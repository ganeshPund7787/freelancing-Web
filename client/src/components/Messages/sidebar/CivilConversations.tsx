import Conversation from "./Conversation";
import { getRandomEmoji } from "@/utils/emojis";
import useGetCivilUserConversation from "@/Hooks/Messages_Hook/useGetCivilUserConversation";
import Loader from "@/components/styleComponents/Loader";

const CivilConversations = () => {
  const { loading, conversations } = useGetCivilUserConversation();

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

export default CivilConversations;
