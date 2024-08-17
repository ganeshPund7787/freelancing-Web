import useSendMessage from "@/Hooks/Messages_Hook/useSendMessage";
import { useState } from "react";
import { BsSend } from "react-icons/bs";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  console.log(message);

  const handlSubmit = async (e: Event | any) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <>
      <div className="flex gap-3 items-center cursor-pointer">
        <form onSubmit={handlSubmit} className="w-full">
          <div className="w-full relative">
            <input
              type="text"
              name=""
              id=""
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="send a message"
              className="border text-sm rounded-lg block w-full p-2 md:p-3 bg-gray-700 border-gray-600 text-white"
            />
            <button
              type="submit"
              className="absolute inset-y-0 end-0 flex items-center pe-3"
            >
              {loading ? (
                <div className="loading loading-spinner"></div>
              ) : (
                <BsSend />
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MessageInput;
