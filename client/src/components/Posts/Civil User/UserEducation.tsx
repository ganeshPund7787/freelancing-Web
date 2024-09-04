import EducationCard from "@/components/civilUser/EducationCard";
import { CivilUserType, EducationType } from "@/types";

type Props = {
  CurrentCivilUser: CivilUserType;
};
const UserEducation = ({ CurrentCivilUser }: Props) => {
  return (
    <div className="flex flex-col py-3 items-center gap-3 px-10">
      {CurrentCivilUser?.education &&
        CurrentCivilUser?.education.map((education: EducationType) => (
          <EducationCard key={education.id} education={education} />
        ))}
    </div>
  );
};

export default UserEducation;
