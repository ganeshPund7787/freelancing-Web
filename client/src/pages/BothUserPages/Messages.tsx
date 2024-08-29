import { useAppSelectore } from "@/App/store";
import MsgContainer from "@/components/Messages/Msg_Container/MsgContainer";
import MsgSidebar from "@/components/Messages/sidebar/MsgSidebar";

const Messages = () => {
  const { selectedConversation } = useAppSelectore(
    (state) => state.conversation
  );
  return (
    <div className="flex mx-[1rem] sm:mx-0 h-[40rem] sm:h-[450px] md:h-[500px]  rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
      <div className={`${selectedConversation ? "hidden md:block" : "block"}`}>
        <MsgSidebar />
      </div>

      <div
        className={` ${
          selectedConversation ? "block" : "hidden md:block"
        }`}
      >
        <MsgContainer />
      </div>
    </div>
  );
};

export default Messages;
