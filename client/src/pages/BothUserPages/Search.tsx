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
import { JobSearchResponce } from "@/types";
import Pagination from "@/components/Posts/Client/Pagination";

export type searchType = {
  experianceLevel?: string;
  skills?: string[];
  HoursePerWeak?: number;
  page?: string | undefined;
};

const Search = () => {
  const [page, setPage] = useState<number>();
  const [experianceLevel, setExperianceLevel] = useState<string>("EntryLevel");
  const [skills, setSkills] = useState<string[]>([]);
  const [HoursePerWeak, setHoursePerWeak] = useState<number>(0);
  const [JobSearchResponce, setJobSearchResponce] =
    useState<JobSearchResponce | null>(null);
  const { SearchFilter, searchJobs } = useGetSearch();
  const dispatch = useDispatch();

  const { SeacrhedPost } = useAppSelectore((state) => state.post);

  const search: searchType = {
    experianceLevel,
    skills,
    HoursePerWeak,
    page: page?.toString(),
  };

  useQuery(["searchResults", search], () => SearchFilter(search), {
    onSuccess: (data: JobSearchResponce) => {
      if (searchJobs?.length !== 0) {
        dispatch(SearchPostEmty());
      }

      setJobSearchResponce(data);
      return data;
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
    <div className="">
      <div className="flex flex-col lg:flex-row w-full justify-between sm:gap-5">
        <div className="rounded-lg mx-10 md:mx-0 md:block p-3 sm:w-[30%] sm:h-[100vh] h-[85vh] top-10">
          <div className="space-y-5 overflow-y-auto overflow-hidden ">
            <h1 className="text-lg font-semibold border-b border-slate-300 pb-5">
              Filter By:
            </h1>
            <ExperianceLevel setExperianceLevel={setExperianceLevel} />
            <HoursePerWeakSearch setHoursePerWeak={setHoursePerWeak} />
            <SkillsSearch skills={skills} onChange={handleSkillsChange} />
          </div>
        </div>

        <div className="flex flex-col sm:h-fit sm:w-[70%] sm:mx-0 mx-3 gap-4">
          <h1>
            {searchJobs && searchJobs.length > 0 && (
              <div className="">some Jobs Found</div>
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
      {
        <Pagination
          page={JobSearchResponce?.pagination?.page || 1}
          pages={JobSearchResponce?.pagination?.pages || 1}
          onPageChange={(page) => setPage(page)}
        />
      }
    </div>
  );
};

export default Search;
