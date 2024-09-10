import { BACKEND_API_URL } from "@/main";
import { PostType } from "@/types";
import { useState } from "react";
import { toast } from "react-toastify";

const useGetAllPost = () => {
  const [posts, setPosts] = useState<PostType[] | undefined>([]);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_API_URL}/api/post/getAll-post`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        return toast.warning("Cheack Your Internet");
      }
      setPosts(data);
      return data;
    } catch (error) {
      setLoading(false);
      console.log(`Error while getAll Post`, error);
    }
  };
  return { getPosts, posts, loading };
};

export default useGetAllPost;
