import { BACKEND_API_URL } from "@/main";
import { PostType } from "@/types";
import { useEffect, useState } from "react";

const useGetAllJobPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchPosts = async (): Promise<PostType | undefined> => {
      try {
        setLoading(true);
        const res = await fetch(
          `${BACKEND_API_URL}/api/job-post/getAllJobPost`,
          {
            method: "GET",
            headers: {
              "Content-Type": "Application/json",
            },
            credentials: "include",
          }
        );
        const data = await res.json();
        setLoading(false);
        setPosts(data);
        return;
      } catch (error: any) {
        console.log(`Error while getAll Post: `, error);
      }
    };
    fetchPosts();
  }, []);
  return { posts, loading };
};

export default useGetAllJobPost;
