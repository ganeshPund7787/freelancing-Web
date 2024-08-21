import useJobPost from "@/Hooks/ClientHook/useJobPost";
import { JobPostType } from "@/types";
import { useEffect, useState } from "react";
import JobPostCard from "./JobPostCard";

const AllJobPost = () => {
  const { getJobPosts } = useJobPost();
  const [jobPost, setJobPost] = useState<JobPostType[]>([]);

  const getAllPost = async () => {
    const res = await getJobPosts();

    if (res) {
      if (Array.isArray(res)) {
        setJobPost(res);
      } else {
        setJobPost([res]); 
      }
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div className="h-full w-full flex flex-col gap-8">
      {jobPost.length > 0 &&
        jobPost.map((post: JobPostType) => (
          <div key={post._id} className="">
            <JobPostCard post={post} />
          </div>
        ))}
    </div>
  );
};

export default AllJobPost;
