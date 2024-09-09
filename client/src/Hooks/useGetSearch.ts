import { BACKEND_API_URL } from "@/main";
import { searchType } from "@/pages/BothUserPages/Search";
import { JobPostType, JobSearchResponce } from "@/types";
import { useState } from "react";
import { toast } from "react-toastify";

const useGetSearch = () => {
  const [searchJobs, setSearchJobs] = useState<JobPostType[] | undefined>([]);

  const SearchFilter = async (
    search: searchType | any
  ): Promise<JobSearchResponce | void> => {
    try {
      const queryParams: any = new URLSearchParams();
      if (search.experianceLevel) {
        queryParams.append("experianceLevel", search.experianceLevel);
      }

      if (search.HoursePerWeak !== undefined) {
        queryParams.append("HoursePerWeak", search.HoursePerWeak.toString());
      }

      if (search.skills && search.skills.length > 0) {
        search.skills.forEach((skill: string) =>
          queryParams.append("skills", skill)
        );
      }
      queryParams.append("page", search?.page || "1");

      const res = await fetch(
        `${BACKEND_API_URL}/api/job-post/search?${queryParams.toString()}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();
      

      if (!res.ok) {
        throw new Error(data.message || "Search failed");
      }

      setSearchJobs(data?.data);
      return data;
    } catch (error) {
      toast.warn("Ckeck Your Internet");
    }
  };

  return { SearchFilter, searchJobs };
};

export default useGetSearch;
