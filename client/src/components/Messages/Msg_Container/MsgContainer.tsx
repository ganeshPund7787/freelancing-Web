import { setSelectedConversation } from "@/App/features/ConversationSlice";
import { useAppDispatch, useAppSelectore } from "@/App/store";
import { useEffect } from "react";
import { TiMessages } from "react-icons/ti";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MsgContainer = () => {
  const { selectedConversation } = useAppSelectore((c) => c.conversation);
  const dispatch = useAppDispatch();

  useEffect((): any => {
    return () => dispatch(setSelectedConversation(null));
  }, []);

  return (
    <div className="md:min-w-[450px] border border-slate-600 flex flex-col h-[36rem] sm:h-full min-w-[20rem]">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="flex items-center gap-3 bg-slate-500 px-4 py-2 mb-2">
            <img
              src={
                selectedConversation?.photoUrl ||
                selectedConversation?.profilePictureUrl
              }
              className="h-10 w-10 rounded-full"
              alt="IMG"
            />
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullName}
            </span>
          </div>
          <Messages />

          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MsgContainer;

const NoChatSelected = () => {
  const { Client } = useAppSelectore((s) => s.client);
  const { CurrentCivilUser } = useAppSelectore((s) => s.user);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>
          Welcome To Messages👋 {Client?.fullName || CurrentCivilUser?.fullName}{" "}
          ❄
        </p>
        <p>
          Once you connect with a client, you’ll be able to chat and collaborate
          here
        </p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
