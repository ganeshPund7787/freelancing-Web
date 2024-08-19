import { BACKEND_API_URL } from "@/main";
import { JobPostType } from "@/types";
import { useState } from "react";

const useGetSearch = () => {
  const [searchJobs, setSearchJobs] = useState<string[] | undefined>([]);
  
  const SearchFilter = async (
    Search: JobPostType
  ): Promise<JobPostType | undefined> => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("experianceLevel", Search.experianceLevel || "");
      queryParams.append(
        "HoursePerWeak",
        Search.HoursePerWeak?.toString() || ""
      );
      queryParams.append("salary", Search.salary || "");

      Search.skills?.forEach((skill) => queryParams.append("skills", skill));

      const res = await fetch(
        `${BACKEND_API_URL}/api/job-post/search?${queryParams.toString()}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success === false) throw new Error(data.message);
      setSearchJobs(data);
      return;
    } catch (error) {
      console.log(`Error while searching:`, error);
    }
  };

  return { SearchFilter, searchJobs };
};

export default useGetSearch;
