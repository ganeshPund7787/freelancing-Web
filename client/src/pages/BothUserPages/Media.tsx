import { useAppSelectore } from "@/App/store";
import PostCard from "@/components/Posts/PostCard";
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
      <div className="px-1 h-full md:px-36">
        <div className="flex flex-col gap-5">
          <div className="border border-slate-500">
            {posts &&
              !loading &&
              posts.length > 0 &&
              posts.map((post) => {
                if (defaultUser?._id === post.userId) return;
                return (
                  <PostCard key={post?._id} post={post} user={post?.user} />
                );
              })}
          </div>
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
