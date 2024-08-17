import useJobPost from "@/Hooks/ClientHook/useJobPost";
import { JobPostType } from "@/types";
import { useEffect, useState } from "react";
import JobPostCard from "./JobPostCard";

const AllJobPost = () => {
  const { getJobPosts } = useJobPost();
  const [jobPost, setJobPost] = useState([]);

  const getAllPost = async () => {
    const res = await getJobPosts();
    setJobPost(res);
  };
  useEffect(() => {
    getAllPost();
  }, []);
  return (
    <div className="h-full w-full flex flex-col gap-8">
      {jobPost.length > 0 &&
        jobPost?.map((post: JobPostType) => (
          <div className="">
            <JobPostCard post={post} />
          </div>
        ))}
    </div>
  );
};

export default AllJobPost;
