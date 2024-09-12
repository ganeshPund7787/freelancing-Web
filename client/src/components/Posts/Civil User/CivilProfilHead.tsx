import ShowProfilePicture from "@/components/BothUser/ShowProfilePicture";
import { useSocketContext } from "@/context/SocketContext";
import { CivilUserType } from "@/types";
import { SlLocationPin } from "react-icons/sl";

export type Props = {
  CurrentCivilUser: CivilUserType;
};
const CivilProfilHead = ({ CurrentCivilUser }: Props) => {
  if (!CurrentCivilUser) {
    return <>Not Found</>;
  }
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(CurrentCivilUser._id);
  return (
    <div className="flex items-center flex-col pt-5 sm:gap-0 gap-5 justify-center md:flex-row">
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <ShowProfilePicture img={CurrentCivilUser?.photoUrl} />
      </div>
      <div className="p-5">
        <h1 className="md:text-2xl font-semibold">
          {CurrentCivilUser?.fullName}
        </h1>
        <p className="mt-2 flex gap-1 items-center text-sm lowercase">
          <SlLocationPin /> {CurrentCivilUser?.city}, {CurrentCivilUser?.state},{" "}
          {CurrentCivilUser?.country}
        </p>
      </div>
    </div>
  );
};

export default CivilProfilHead;
