import { SearchPostEmty } from "@/App/features/postSlice";
import { useAppSelectore } from "@/App/store";

import JobPostCard from "@/components/ClientUser/JobPostCard";
import ExperianceLevel from "@/components/Posts/ExperianceLevel";
import HoursePerWeakSearch from "@/components/Posts/HoursePerWeakSearch";
import SkillsSearch from "@/components/Posts/SkillsSearch";
import useGetSearch from "@/Hooks/useGetSearch";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";

const Search = () => {
  const [experianceLevel, setExperianceLevel] = useState<string>("EntryLevel");
  const [skills, setSkills] = useState<string[]>([]);
  const [HoursePerWeak, setHoursePerWeak] = useState<number>(0);
  const { SearchFilter, searchJobs } = useGetSearch();
  const dispatch = useDispatch();

  const { SeacrhedPost } = useAppSelectore((state) => state.post);

  const search = {
    experianceLevel,
    skills,
    HoursePerWeak,
  };

  useQuery(["searchResults", search], () => SearchFilter(search), {
    onSuccess: (data) => {
      if (searchJobs?.length !== 0) {
        dispatch(SearchPostEmty());
      }
      console.log("Data: ", data);
    },
  });

  const handleSkillsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSkills((skill) =>
      event.target.checked
        ? [...skill, facility]
        : skill.filter((preFacility) => preFacility !== facility)
    );
  };

  return (
    <div className="flex flex-col lg:flex-row w-full justify-between gap-5 ">
      <div className="rounded-lg mx-10 md:mx-0 md:block p-3 w-[30%] h-[100vh] top-10">
        <div className="space-y-5 overflow-y-auto overflow-hidden ">
          <h1 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter By:
          </h1>
          <ExperianceLevel setExperianceLevel={setExperianceLevel} />
          <HoursePerWeakSearch setHoursePerWeak={setHoursePerWeak} />
          <SkillsSearch skills={skills} onChange={handleSkillsChange} />
        </div>
      </div>

      <div className="flex flex-col h-fit w-[70%]  gap-4">
        <h1>
          {searchJobs && searchJobs.length > 0 && (
            <div className="">{searchJobs?.length} Jobs Found</div>
          )}
        </h1>
        {searchJobs &&
          searchJobs?.length > 0 &&
          searchJobs?.map((job: any) => (
            <JobPostCard key={job._id} post={job} />
          ))}

        {SeacrhedPost &&
          SeacrhedPost.length > 0 &&
          SeacrhedPost?.map((job: any) => (
            <JobPostCard key={job._id} post={job} />
          ))}
      </div>
    </div>
  );
};

export default Search;
