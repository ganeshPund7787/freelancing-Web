import { BACKEND_API_URL } from "@/main";
import { toast } from "react-toastify";

const useLikePost = () => {
  const like = async (postId: string | any) => {
    try {
      const res = await fetch(`${BACKEND_API_URL}/api/post/like/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();

      console.log(data);
    } catch (error) {
      toast.warn("Ckeck Your Internet");
    }
  };
  return { like };
};

export default useLikePost;
