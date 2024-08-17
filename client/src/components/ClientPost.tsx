import useGetAllJobPost from "@/Hooks/Posts/useGetAllJobPost";
import JobPostCard from "./ClientUser/JobPostCard";

const ClientPost = () => {
  const { posts } = useGetAllJobPost();
  console.log(posts);
  return (
    <div className="flex flex-col gap-7">
      {posts?.map((post) => (
        <JobPostCard post={post} />
      ))}
    </div>
  );
};

export default ClientPost;
