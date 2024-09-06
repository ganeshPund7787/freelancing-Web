import useUpdateUser from "@/Hooks/UserHook/useUpdateUser";
import { ProjectsType } from "@/types";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";

type Props = {
  Project: ProjectsType;
};

const ProjectCard = ({ Project }: Props) => {
  const parseDate = (date: Date | string | undefined): Date | undefined => {
    if (date === undefined) return undefined;
    if (typeof date === "string") {
      const parsedDate = new Date(date);
      return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
    }
    return isNaN(date.getTime()) ? undefined : date;
  };
  const { DeleteProject } = useUpdateUser();

  const formatDate = (date: Date | undefined): string => {
    if (!date) {
      return "N/A";
    }
    return date.toLocaleDateString();
  };
  const { userId } = useParams();
  console.log("CurretParams 5/09/2024", userId);
  console.log("Curret _id 5/09/2024", Project._id);

  return (
    <div className="md:p-5 flex flex-col gap-2 p-3 md:m-5 hover:bg-slate-800 hover:border-cyan-500 border rounded md:rounded-[1rem] border-slate-600">
      <div className="flex justify-between">
        <h1>
          <span className="text-slate-300">Project name</span> :-{" "}
          {Project.title}
        </h1>
        <MdDelete
          onClick={() => DeleteProject(Project._id)}
          className="hover:text-red-500 hover:border-red-500 cursor-pointer border border-cyan-500 p-2 rounded-full"
          size={40}
        />
      </div>
      <div className="flex text-sm gap-5">
        <span className="text-slate-300">My Role In project :</span>
        <span>{Project.role}</span>
      </div>
      <div className="flex text-sm gap-5">
        <span className="text-slate-300">Client Name :</span>
        <span>{Project.client ? Project.client : "No Mention"}</span>
      </div>
      <div className="flex text-sm gap-5">
        <span className="text-slate-300">Start Date :</span>
        <span>{formatDate(parseDate(Project.startDate))}</span>
      </div>
      <div className="flex text-sm gap-5">
        <span className="text-slate-300">End Date : </span>
        <span>
          <span>{formatDate(parseDate(Project.endDate))}</span>
        </span>
      </div>
      <div className="flex text-sm gap-5">
        <span className="text-slate-300">description : </span>
        <span>{Project.description}</span>
      </div>
    </div>
  );
};

export default ProjectCard;
