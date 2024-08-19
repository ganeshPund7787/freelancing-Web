import { setSelectedConversation } from "@/App/features/ConversationSlice";
import { useAppDispatch } from "@/App/store";
import useGetCivilUserConversation from "@/Hooks/Messages_Hook/useGetCivilUserConversation";
import useGetClientConversation from "@/Hooks/Messages_Hook/useGetClientConversation";
import { FormEvent, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { conversations } = useGetCivilUserConversation();
  const { conversations: ClientConversation } = useGetClientConversation();
  const dispatch = useAppDispatch();
  // console.log(search);
  console.log(`conversations: `, conversations);
  console.log(`ClientConversation: `, ClientConversation);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    if (search?.length < 3) {
      return toast.error("Search term must be at least 3 character long");
    }
    const conversationCivilUser = conversations?.find((c: any) =>
      c?.fullName?.toLowerCase().includes(search?.toLowerCase())
    );

    const ConversationClient = ClientConversation?.find((c: any) =>
      c?.fullName?.toLowerCase().includes(search?.toLowerCase())
    );

    if (conversationCivilUser) {
      dispatch(setSelectedConversation(conversationCivilUser));
      setSearch("");
    } else if (ConversationClient) {
      dispatch(setSelectedConversation(ConversationClient));
      setSearch("");
    } else {
      toast.error("No search user found");
    }
  };

  return (
    <form
      onSubmit={(e: FormEvent) => handleSubmit(e)}
      className="flex items-center gap-2"
    >
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="search.."
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-cyan-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
