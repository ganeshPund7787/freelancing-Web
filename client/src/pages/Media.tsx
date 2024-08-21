import { useAppSelectore } from "@/App/store";
import PostCard from "@/components/PostCard";
import useGetAllPost from "@/Hooks/Posts/useGetAllPost";
import { useEffect } from "react";

const Media = () => {
  const { getPosts, posts, loading } = useGetAllPost();
  const { Client } = useAppSelectore((state) => state.client);
  const { CurrentCivilUser } = useAppSelectore((state) => state.user);

  const defaultUser = Client != null ? { ...Client } : { ...CurrentCivilUser };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="px-1 sm:px-32 md:px-52">
        <div className="flex flex-col gap-3">
          {posts &&
            !loading &&
            posts.length > 0 &&
            posts.map((post) => {
              if (defaultUser?._id === post.userId) return;
              return <PostCard post={post} user={post?.user} />;
            })}
          {loading ? (
            <div className="text-center sm:text-[15rem]">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Media;
