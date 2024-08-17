import { BACKEND_API_URL } from "@/main";
import { JobPostType } from "@/types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useJobPost = () => {
  const navigate = useNavigate();

  const createPost = async (data: JobPostType) => {
    try {
      const res = await fetch(`${BACKEND_API_URL}/api/job-post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const respoceBody = await res.json();
      console.log(respoceBody);
      if (respoceBody.success === false) {
        toast.error("error on create job");
        return;
      }
      toast.success(respoceBody.message);
      navigate("/client-profile");
    } catch (error) {
      console.log(`Error while crea Job Post: `, error);
    }
  };

  const getJobPosts = async () => {
    try {
      const res = await fetch(`${BACKEND_API_URL}/api/job-post/getJobPost`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return { createPost, getJobPosts };
};

export default useJobPost;
