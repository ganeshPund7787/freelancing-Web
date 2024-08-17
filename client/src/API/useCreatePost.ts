import { BACKEND_API_URL } from "@/main";
import { PostType } from "@/types";
import { toast } from "react-toastify";

type Props = {
  formData: PostType;
};

const useCreatePost = () => {
  const createPost = async (formData: Props) => {
    try {
      const res = await fetch(`${BACKEND_API_URL}/api/post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData.formData),
      });
      const data = await res.json();

      if (data.success) {
        toast.error("Error while Post Create");
        return;
      }
      toast.success("Post created success");
    } catch (error: any) {
      toast.error("No Internet");
      console.log(`Error while post frontend : `, error);
    }
  };
  return { createPost };
};

export default useCreatePost;
