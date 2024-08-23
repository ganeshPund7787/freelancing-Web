import { BACKEND_API_URL } from "@/main";

const useSearchHeading = () => {
  const search = async (query: string) => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("heading", query || "");
      const res = await fetch(
        `${BACKEND_API_URL}/api/job-post/search-heading?${queryParams.toString()}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return { search };
};

export default useSearchHeading;
