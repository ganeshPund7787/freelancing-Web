import MsgContainer from "@/components/Messages/Msg_Container/MsgContainer";
import MsgSidebar from "@/components/Messages/sidebar/MsgSidebar";

const Messages = () => {
  return (
    <div className="flex gap-4 h-[40rem] sm:h-[32rem] ">
      <MsgSidebar />
      <MsgContainer />
    </div>
  );
};

export default Messages;
