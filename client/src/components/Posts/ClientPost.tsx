import useGetAllJobPost from "@/Hooks/Posts/useGetAllJobPost";
import JobPostCard from "../ClientUser/JobPostCard";

const ClientPost = () => {
  const { posts, loading } = useGetAllJobPost();

  return (
    <div className="flex flex-col gap-7">
      {loading ? (
        <div className="text-center">
          <span className="loading text-cyan-600 loading-spinner"></span>
        </div>
      ) : (
        <>
          {posts?.map((post) => (
            <JobPostCard key={post} post={post} />
          ))}
        </>
      )}
    </div>
  );
};

export default ClientPost;
