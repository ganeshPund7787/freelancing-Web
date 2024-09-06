import { PostType } from "@/types";
import PostCard from "./PostCard";

export type Props = {
  posts: PostType[];
  user: any;
};

const ProfilePosts = ({ posts, user }: Props) => {
  return (
    <>
      {posts &&
        posts?.map((post: PostType) => (
          <PostCard key={post._id} post={post} user={user} />
        ))}
      {posts.length === 0 && (
        <div className="text-center text-red-500 text-2xl">
          You are not post any Post
        </div>
      )}
    </>
  );
};

export default ProfilePosts;
