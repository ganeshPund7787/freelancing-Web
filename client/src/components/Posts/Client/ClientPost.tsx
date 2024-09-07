import JobPostCard from "@/components/ClientUser/JobPostCard";
import Loader from "@/components/styleComponents/Loader";
import useGetAllJobPost from "@/Hooks/Posts/useGetAllJobPost";

const ClientPost = () => {
  const { posts, loading } = useGetAllJobPost();

  return (
    <div className="flex flex-col gap-7">
      {loading ? (
        <Loader />
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
