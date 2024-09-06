import { CivilUserType, PostType, ProjectsType } from "@/types";
import CivilProfilHead from "../Posts/Civil User/CivilProfilHead";
import UserLanguages from "../Posts/Civil User/UserLanguages";
import UserEducation from "../Posts/Civil User/UserEducation";
import ExperianceCard from "../civilUser/ExperianceCard";
import ProjectCard from "../civilUser/ProjectCard";

type Props = {
  user: CivilUserType;
  Posts: PostType[];
};

const CivilUserProfile = ({ Posts, user: CurrentCivilUser }: Props) => {
  console.log(CurrentCivilUser);

  return (
    <>
      {CurrentCivilUser && (
        <div className="flex flex-col min-h-full md:p-5">
          <div className="flex justify-between items-center min-h-full rounded-t-[1rem] max-w-full p-1 md:p-5 border-b-2 border-slate-500">
            <CivilProfilHead CurrentCivilUser={CurrentCivilUser} />
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="w-full mt-5 md:w-[30%]">
              <h1 className="font-bold my-3 sm:pl-0 pl-5">Known Languages</h1>
              <div className="flex flex-col items-center px-6">
                <UserLanguages CurrentCivilUser={CurrentCivilUser} />
              </div>
              <h1 className="font-bold my-5 sm:pl-0 pl-5">Education</h1>
              <UserEducation CurrentCivilUser={CurrentCivilUser} />
            </div>
            <div className="border-t-2 md:border-l-2 md:border-t-0 border-slate-500 w-full md:w-[70%]">
              <h1 className="font-bold my-5 pl-5">Skill</h1>
              <div className="flex flex-wrap gap-5 py-2 px-6">
                {CurrentCivilUser?.skills &&
                  CurrentCivilUser?.skills?.length > 0 &&
                  CurrentCivilUser?.skills?.map((skill: string) => (
                    <div
                      key={skill}
                      className="border hover:bg-slate-800 hover:border-cyan-500 border-slate-600 rounded-[15px] p-2"
                    >
                      {skill}
                    </div>
                  ))}
              </div>
              <h1 className="font-semibold pl-5">Work experiance</h1>
              <div className="flex flex-col my-5 gap-4 px-6">
                {CurrentCivilUser?.workExperience &&
                  CurrentCivilUser?.workExperience.length > 0 &&
                  CurrentCivilUser?.workExperience.map((work: any) => (
                    <ExperianceCard key={work.id} work={work} />
                  ))}
              </div>
            </div>
          </div>
          <h1 className="font-bold my-5">My Projects </h1>
          <div className="flex flex-col">
            {CurrentCivilUser?.projects &&
              CurrentCivilUser?.projects?.length > 0 &&
              CurrentCivilUser?.projects?.map((Project: ProjectsType) => (
                <div className="" key={Project._id}>
                  <ProjectCard Project={Project} />
                </div>
              ))}
            {CurrentCivilUser?.projects?.length === 0 && (
              <center className="md:text-2xl my-20 text-sm text-cyan-500">
                No Projects Added !
              </center>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CivilUserProfile;
