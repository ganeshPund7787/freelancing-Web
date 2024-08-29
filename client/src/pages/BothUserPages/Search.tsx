import { SearchPostEmty } from "@/App/features/postSlice";
import { useAppSelectore } from "@/App/store";

import JobPostCard from "@/components/ClientUser/JobPostCard";
import ExperianceLevel from "@/components/Posts/ExperianceLevel";
import HoursePerWeakSearch from "@/components/Posts/HoursePerWeakSearch";
import SalarySearch from "@/components/Posts/SalarySearch";
import SkillsSearch from "@/components/Posts/SkillsSearch";
import useGetSearch from "@/Hooks/useGetSearch";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Search = () => {
  const [experianceLevel, setExperianceLevel] = useState<string>("EntryLevel");
  const [salary, setSalary] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [HoursePerWeak, setHoursePerWeak] = useState<number>(0);
  const { SearchFilter, searchJobs } = useGetSearch();
  const dispatch = useDispatch();

  const { SeacrhedPost } = useAppSelectore((state) => state.post);

  const search = {
    experianceLevel,
    salary,
    skills,
    HoursePerWeak,
  };

  const handleSkillsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSkills((skill) =>
      event.target.checked
        ? [...skill, facility]
        : skill.filter((preFacility) => preFacility !== facility)
    );
  };

  useEffect(() => {
    SearchFilter(search);
    if (searchJobs?.length != 0) {
      dispatch(SearchPostEmty());
    }
  }, []);

  
  return (
    <div className="flex flex-col lg:flex-row w-full justify-between gap-5">
      <div className="rounded-lg mx-10 md:mx-0 md:block p-3  h-fit top-10">
        <div className="space-y-5 overflow-y-auto overflow-hidden w-[20rem] h-[100vh]">
          <h1 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter By:
          </h1>
          <ExperianceLevel setExperianceLevel={setExperianceLevel} />
          <SalarySearch setSalary={setSalary} />
          <HoursePerWeakSearch setHoursePerWeak={setHoursePerWeak} />
          <SkillsSearch skills={skills} onChange={handleSkillsChange} />
        </div>
      </div>

      <div className="flex flex-col h-fit gap-4">
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

        {/* {searchJobs?.length === 0 || !SeacrhedPost ? <ClientPost /> : null} */}
      </div>
    </div>
  );
};

export default Search;
