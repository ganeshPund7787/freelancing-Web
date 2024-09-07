import { BACKEND_API_URL } from "@/main";
import { JobPostType } from "@/types";
import { useState } from "react";
import { toast } from "react-toastify";

const useGetSearch = () => {
  const [searchJobs, setSearchJobs] = useState<JobPostType[] | undefined>([]);

  const SearchFilter = async (search: JobPostType): Promise<void> => {
    try {
      const queryParams = new URLSearchParams();
      if (search.experianceLevel) {
        queryParams.append("experianceLevel", search.experianceLevel);
      }

      if (search.HoursePerWeak !== undefined) {
        queryParams.append("HoursePerWeak", search.HoursePerWeak.toString());
      }

      if (search.salary !== undefined) {
        queryParams.append("salary", search.salary.toString());
      }

      if (search.skills && search.skills.length > 0) {
        search.skills.forEach((skill) => queryParams.append("skills", skill));
      }

      console.log("queryParams : ", queryParams);

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

      setSearchJobs(data);
      return data;
    } catch (error) {
      toast.warn("Ckeck Your Internet");
    }
  };

  return { SearchFilter, searchJobs };
};

export default useGetSearch;
