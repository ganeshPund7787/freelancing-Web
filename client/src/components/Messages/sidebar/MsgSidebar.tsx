import { useState } from "react";

import SearchInput from "./SearchInput";
import { Button } from "@/components/ui/button";
import ClientConversations from "./ClientConversations";
import CivilConversations from "./CivilConversations";

const MsgSidebar = () => {
  const [activeButton, setActiveButton] = useState<string | null>("Client");
  const [selectType, setSelectType] = useState("Client");

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
    setSelectType(buttonName);
  };

  return (
    <div className="flex borderp-3 border-slate-600 sm:w-[20rem] flex-col gap-5">
      <div>
        <h1 className="md:text-3xl text-cyan-400 font-semibold">Messages</h1>
      </div>
      <div>
        <SearchInput />
      </div>
      <div className="flex justify-evenly">
        <Button
          type="button"
          onClick={() => handleButtonClick("Client")}
          className={` hover:underline ${
            activeButton === "Client" ? "text-cyan-500 underline" : ""
          }`}
        >
          Client
        </Button>
        <Button
          type="button"
          onClick={() => handleButtonClick("Civil Engineers")}
          className={` hover:underline ${
            activeButton === "Civil Engineers" ? "text-cyan-500 underline" : ""
          }`}
        >
          Civil Engineers
        </Button>
      </div>
      {selectType === "Client" ? (
        <ClientConversations />
      ) : (
        <CivilConversations />
      )}
    </div>
  );
};

export default MsgSidebar;
