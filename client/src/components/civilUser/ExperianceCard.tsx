import { UserExperianceFormData } from "./AddWorkExperiance";

type Props = {
  work: UserExperianceFormData;
};

const ExperianceCard = ({ work }: Props) => {
  return (
    <div className="md:p-5 p-1 border rounded md:rounded-[1rem] border-slate-600">
      <div className="flex justify-between">
        <h1 className="py-3">
          <span className="text-slate-300">Position in Company</span> :-{" "}
          {work.jobTitle}
        </h1>
      </div>
      <div className="flex text-sm gap-5">
        <span className="text-slate-300">Experiance :</span>
        <span>{work.experiance}</span>
      </div>
      <div className="flex text-sm gap-5">
        <span className="text-slate-300">Company Name :</span>
        <span>{work.company}</span>
      </div>
      <div className="flex text-sm gap-5">
        <span className="text-slate-300">Company Address :</span>
        <span>{work.location}</span>
      </div>
    </div>
  );
};

export default ExperianceCard;
