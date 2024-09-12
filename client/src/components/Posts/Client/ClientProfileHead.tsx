import ShowProfilePicture from "@/components/BothUser/ShowProfilePicture";
import { useSocketContext } from "@/context/SocketContext";
import { ClientType } from "@/types";
import { SlLocationPin } from "react-icons/sl";

type Props = {
  Client: ClientType;
};
const ClientProfileHead = ({ Client }: Props) => {
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(Client._id);
  return (
    <div className="flex flex-col items-start sm:items-center sm:gap-0 gap-5 pt-5 justify-center md:flex-row">
      {" "}
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <ShowProfilePicture img={Client.profilePictureUrl} />
      </div>
      <div className="p-5">
        <h1 className="md:text-2xl text-cyan-400 font-semibold">
          {Client.fullName}
        </h1>
        {Client.address && (
          <p className="mt-2 flex gap-1 items-center text-sm lowercase">
            <SlLocationPin />{" "}
            {Client.address.street ? Client.address.street : "No share"}{" "}
            {Client.address.state} {Client.address.country}
          </p>
        )}
      </div>
    </div>
  );
};

export default ClientProfileHead;
