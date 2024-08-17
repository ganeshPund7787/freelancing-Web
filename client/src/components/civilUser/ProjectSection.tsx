import { CivilUserType, ProjectsType } from "@/types";
import { Button } from "../ui/button";
import { IoAdd } from "react-icons/io5";
import { useAppDispatch, useAppSelectore } from "@/App/store";
import { startAddProject } from "../../App/features/civilUser";
import ProjectCard from "./ProjectCard";
import AddProject from "./AddProject";

type Props = {
  user: CivilUserType | any;
};

const ProjectSection = ({ user }: Props) => {
  const { isAddProject } = useAppSelectore((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <div className="border-2 border-slate-500 rounded md:rounded-[1rem]">
      <div className="flex items-center justify-between p-5">
        <h1 className="text-2xl font-semibold">My Projects </h1>
        <Button>
          <IoAdd
            onClick={() => dispatch(startAddProject())}
            className="border p-1 border-cyan-500 hover:bg-opacity-30 rounded-full"
            size={40}
          />
        </Button>
      </div>
      <hr className="text-slate-500" />
      <div className="">{isAddProject && <AddProject />}</div>
      <hr className="text-slate-500" />
      <div className="">
        {user?.projects?.length > 0 &&
          user?.projects?.map((Project: ProjectsType) => (
            <div className="" key={Project._id}>
              <ProjectCard Project={Project} />
            </div>
          ))}
        {user.projects.length === 0 && (
          <center className="md:text-2xl my-20 text-sm text-cyan-500">
            No Projects Added !
          </center>
        )}
      </div>
    </div>
  );
};

export default ProjectSection;
