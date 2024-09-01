import { ClientType } from "@/types";

type Props = {
  Client: ClientType;
};

const ClientAboutInfoProfile = ({ Client }: Props) => {
  return (
    <div className="flex flex-col gap-3 min-h-full rounded-t-[1rem] max-w-full p-1 md:p-5 border-b-2 border-slate-500">
      {" "}
      {Client.email && (
        <div className="flex gap-3">
          <span> * Email Address : </span>
          <span className="text-cyan-400">{Client.email}</span>{" "}
        </div>
      )}
      {Client.phoneNumber && (
        <div className="flex gap-3">
          <span> * Contact : </span>
          <span className="text-cyan-400">{Client.phoneNumber}</span>{" "}
        </div>
      )}
      {Client.company && (
        <div className="flex gap-3">
          <span> * Company Name : </span>
          <span className="text-cyan-400">{Client.company}</span>
        </div>
      )}
      {Client.website && (
        <div className="flex gap-3">
          <span> * website Name : </span>
          <a
            href={Client.website}
            className="text-cyan-400 hover:underline hover:text-blue-700"
          >
            {Client.website}
          </a>
        </div>
      )}
      {Client.bio && (
        <div className="gap-3">
          <span> * Bio : </span>
          <div className="flex flex-wrap">{Client.bio}</div>
        </div>
      )}
    </div>
  );
};

export default ClientAboutInfoProfile;
