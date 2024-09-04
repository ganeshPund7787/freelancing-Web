import { CivilUserType } from "@/types";

export type Props = {
  CurrentCivilUser: CivilUserType;
};

const UserLanguages = ({ CurrentCivilUser }: Props) => {
  return (
    <div className="flex flex-col w-full gap-4 mt-5">
      {CurrentCivilUser?.languages &&
        CurrentCivilUser?.languages.length > 0 &&
        CurrentCivilUser?.languages?.map((language: string) => (
          <span
            key={language}
            className="border flex items-center justify-between hover:bg-slate-800 hover:border-cyan-500 border-slate-600 rounded-full w-full px-8 py-2 "
          >
            {language}
          </span>
        ))}
    </div>
  );
};

export default UserLanguages;
