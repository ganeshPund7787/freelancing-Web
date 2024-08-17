import { BiLike } from "react-icons/bi";
import { CivilUserType, ClientType, PostType } from "@/types";
import { Button } from "./ui/button";
import { useState } from "react";
import EditPost from "./EditPost";
import { MdDelete } from "react-icons/md";
import useGetPost from "@/Hooks/useFetchPost";
import { toast } from "react-toastify";

type Props = {
  post: PostType;
  user: ClientType | CivilUserType;
};

const PostCard = ({ post, user }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { deletePost } = useGetPost();
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  const imageUrl =
    "profilePictureUrl" in user
      ? user.profilePictureUrl
      : "photoUrl" in user
      ? user.photoUrl
      : null;

  const OnClickDeletePost = () => {
    const userConfirmed = confirm("Are you sure you delete post ?");
    if (!userConfirmed) {
      toast.warning("Cancle post delete");
      return;
    }
    deletePost(post._id);
  };

  return (
    <div className="flex flex-col md:mx-52 border border-slate-500">
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-3 items-center font-semibold p-3">
          {" "}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="User Picture"
              className="h-10 w-10 object-cover rounded-full"
            />
          )}
          <h1>{user.fullName}</h1>
        </div>
        <div className="flex gap-5 mx-2 items-center">
          <Button onClick={OnClickDeletePost} type="button" title="Delete Post">
            <MdDelete size={20} />
          </Button>
          <EditPost post={post} />
        </div>
      </div>

      <div className="relative mx-2 text-sm">
        <span>
          {isExpanded
            ? post.description
            : `${(post?.description as string).substring(0, 100)}...`}
        </span>
        {(post?.description as string).length > 60 && (
          <button
            onClick={toggleReadMore}
            className="text-blue-500 text-xs hover:text-blue-700 font-medium ml-2"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
      <div className="mx-3 mt-5">
        {post.image && (
          <img
            src={post.image}
            alt=""
            className="h-72 w-full object-cover object-center"
          />
        )}
      </div>
      <div className="mt-5 mb-1">
        <Button>
          <BiLike size={25} />
        </Button>
      </div>
      {post.likes?.length !== 0 && (
        <span className="my-1 mx-4">{post.likes?.length} likes</span>
      )}
    </div>
  );
};

export default PostCard;
