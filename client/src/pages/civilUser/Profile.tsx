import { useAppSelectore } from "@/App/store";
import AddLanguage from "@/components/civilUser/AddLanguage";
import AddEducation from "@/components/civilUser/AddEducation";
import AddSkills from "@/components/civilUser/AddSkills";
import AddWorkExperiance, {
  UserExperianceFormData,
} from "@/components/civilUser/AddWorkExperiance";

import { PostType } from "@/types";
import ExperianceCard from "@/components/civilUser/ExperianceCard";
import AddCertifications from "@/components/civilUser/AddCertifications";
import ProjectSection from "@/components/civilUser/ProjectSection";
import LogOut from "@/components/LogOut";
import { useEffect, useState } from "react";
import useGetPost from "@/Hooks/useFetchPost";
import UpdateProfileHead from "@/components/civilUser/UpdateProfileHead";
import CreatePost from "@/components/BothUser/CreatePost";
import CivilProfilHead from "@/components/Posts/Civil User/CivilProfilHead";
import UserLanguages from "@/components/Posts/Civil User/UserLanguages";
import UserEducation from "@/components/Posts/Civil User/UserEducation";
import ProfilePosts from "@/components/Posts/ProfilePosts";

const Profile = () => {
  const { CurrentCivilUser, loading } = useAppSelectore((state) => state.user);
  const { GetAllPost } = useGetPost();
  const [posts, setPosts] = useState<PostType | []>([]);
  const normalizedPosts = Array.isArray(posts) ? posts : [posts];

  const GetPost = async () => {
    if (CurrentCivilUser) {
      const res = await GetAllPost();
      if (res) {
        setPosts(res);
      }
    }
  };

  useEffect(() => {
    GetPost();
  }, [loading, posts]);

  return (
    <>
      {loading ? (
        <span className="loading loading-dots loading-lg fixed top-[50%] left-[50%]">
          loading...
        </span>
      ) : (
        <div>
          {CurrentCivilUser && (
            <div className="flex flex-col min-h-full md:p-5">
              <div className="flex justify-between items-center min-h-full rounded-t-[1rem] max-w-full p-1 md:p-5 border-b-2 border-slate-500">
                {/* Profile Img, name and Address */}
                <CivilProfilHead CurrentCivilUser={CurrentCivilUser} />

                {/* Profile Head & Update Button */}
                <div className="cursor-pointer relative right-0 p-2 border-cyan-500 hover:bg-opacity-30 rounded-full">
                  <UpdateProfileHead
                    user={CurrentCivilUser}
                    loading={loading}
                  />
                </div>
              </div>

              {/* User language, Skill, Work Experiance & Education section */}
              <div className="flex flex-col md:flex-row">
                <div className="w-full mt-5 md:w-[30%]">
                  <div className="flex flex-col items-center p-6">
                    <div className="flex w-full justify-between items-center">
                      <h1 className="text-2xl font-semibold tracking-wide">
                        Languages
                      </h1>
                      <div className="flex items-center">
                        <AddLanguage />
                      </div>
                    </div>
                    <UserLanguages CurrentCivilUser={CurrentCivilUser} />
                  </div>

                  {/* Education...  */}
                  <div className="flex items-center p-6">
                    <div className="flex w-full justify-between items-center">
                      <h1 className="text-2xl font-semibold tracking-wide">
                        Education
                      </h1>
                      <div className="flex gap-4 items-center">
                        <AddEducation />
                      </div>
                    </div>
                  </div>
                  <UserEducation CurrentCivilUser={CurrentCivilUser} />
                </div>

                {/* Skill & Work Experiance section */}
                <div className="border-t-2 md:border-l-2 md:border-t-0 border-slate-500 w-full md:w-[70%]">
                  {" "}
                  <div className="">
                    <div className="flex justify-between p-6">
                      <h1 className="font-semibold text-2xl">Skills</h1>
                      <AddSkills />
                    </div>
                    <div className="flex flex-wrap gap-5 py-2 px-6">
                      {CurrentCivilUser.skills.length > 0 &&
                        CurrentCivilUser?.skills?.map((skill: string) => (
                          <div
                            key={skill}
                            className="border hover:bg-slate-800 hover:border-cyan-500 border-slate-600 rounded-[15px] p-2"
                          >
                            {skill}
                          </div>
                        ))}
                    </div>
                    <hr className="text-slate-600" />
                  </div>
                  <div className="">
                    <div className="flex justify-between p-6">
                      <h1 className="font-semibold text-2xl">
                        Work experiance
                      </h1>
                      <AddWorkExperiance />
                    </div>
                    <div className="flex flex-col gap-4 px-6">
                      {CurrentCivilUser?.workExperience &&
                        CurrentCivilUser?.workExperience.map(
                          (work: UserExperianceFormData) => (
                            <ExperianceCard key={work.id} work={work} />
                          )
                        )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Certifications Section */}
              <div className="flex mt-5 flex-col min-h-full md:p-5">
                <AddCertifications user={CurrentCivilUser} />
              </div>

              {/* Project Section */}
              <div className="flex mt-5 flex-col min-h-full md:p-5">
                <ProjectSection user={CurrentCivilUser} />
              </div>

              {/* User Activity Section like posts */}
              <div className="flex mt-5 flex-col min-h-full md:p-5">
                <div className="border-2 border-slate-500 rounded md:rounded-[1rem]">
                  <div className="flex items-center justify-between p-5">
                    <h1 className="text-2xl font-semibold">
                      Activity / Posts{" "}
                    </h1>
                    <CreatePost />
                  </div>
                  <div className="flex flex-col gap-5 md:p-5 p-1">
                    <ProfilePosts
                      posts={normalizedPosts}
                      user={CurrentCivilUser}
                    />
                  </div>
                </div>
              </div>
              <LogOut />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
