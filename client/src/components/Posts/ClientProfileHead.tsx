import { ClientType } from "@/types";
import { SlLocationPin } from "react-icons/sl";

type Props = {
  Client: ClientType;
};

const ClientProfileHead = ({ Client }: Props) => {
  return (
    <div className="flex flex-col justify-center md:flex-row">
      {" "}
      <div className="avatar">
        {/* online */}
        <div className="ml-6 md:ml-0 h-24 rounded-full">
          <img src={Client.profilePictureUrl} className="h-40 w-40" />
        </div>
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
