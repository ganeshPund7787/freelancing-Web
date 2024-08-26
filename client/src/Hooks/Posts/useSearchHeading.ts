import { searchPost } from "@/App/features/postSlice";
import { useAppDispatch } from "@/App/store";
import { BACKEND_API_URL } from "@/main";
import { toast } from "react-toastify";

const useSearchHeading = () => {
  const dispatch = useAppDispatch();

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
      if (data?.success === false) {
        toast.warning("Check Your Internet");
        return;
      }
      if (data?.length === 0) {
        return toast.info("No result found");
      }
      dispatch(searchPost(data));
      return toast.info(`${data?.length} job's found`);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return { search };
};

export default useSearchHeading;
