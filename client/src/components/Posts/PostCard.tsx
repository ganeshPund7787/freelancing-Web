import { BiLike } from "react-icons/bi";
import { CivilUserType, ClientType, PostType } from "@/types";
import { Button } from "../ui/button";
import { useState } from "react";
import EditPost from "./EditPost";
import { MdDelete } from "react-icons/md";
import useGetPost from "@/Hooks/useFetchPost";
import { toast } from "react-toastify";
import { useAppSelectore } from "@/App/store";
import CommentInput from "./CommentInput";
import { FaRegCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";

type Props = {
  post: PostType;
  user: ClientType | CivilUserType | any;
};

const PostCard = ({ post, user }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { deletePost } = useGetPost();
  const { Client } = useAppSelectore((state) => state.client);
  const { CurrentCivilUser } = useAppSelectore((state) => state.user);
  const [IsCommentVisible, setIsCommentVisible] = useState<boolean>(false);

  const defaultUser = Client != null ? { ...Client } : { ...CurrentCivilUser };

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

  const toggleCommentVisisble = () => {
    setIsCommentVisible((pre) => !pre);
  };

  if (!user) return <div>No Post Availabel</div>;
  return (
    <div className="flex flex-col border bg-slate-800 shadow-2xl hover:border-cyan-700 border-slate-400 rounded-[0.5rem] sm:h-full h-[40rem]">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center font-semibold p-3">
          <Link
            to={`/user/${user?._id}`}
            className="flex gap-3 items-center font-semibold px-3"
          >
            {imageUrl && (
              <img
                src={imageUrl}
                alt="User Picture"
                className="h-10 w-10 object-cover rounded-full"
              />
            )}
            <h1 className="hover:underline">{user.fullName}</h1>
          </Link>
        </div>
        <div className="flex gap-5 mx-2 items-center">
          {defaultUser?._id === post.userId && (
            <>
              <Button
                onClick={OnClickDeletePost}
                type="button"
                title="Delete Post"
              >
                <MdDelete size={20} />
              </Button>
              <EditPost post={post} />
            </>
          )}
        </div>
      </div>
      <hr className="text-slate-500" />
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
            className="h-[90vh] w-full object-cover object-center"
          />
        )}
      </div>
      <div className="flex justify-between mt-5 mb-1">
        <Button className="flex gap-3">
          <BiLike size={25} /> like
        </Button>
        <Button
          type="submit"
          onClick={toggleCommentVisisble}
          className="flex gap-3"
        >
          <FaRegCommentDots size={25} /> Comments
        </Button>
      </div>
      {post.likes?.length !== 0 && (
        <span className="my-1 mx-4">{post.likes?.length} likes</span>
      )}
      <div className="">{IsCommentVisible && <CommentInput />}</div>
    </div>
  );
};

export default PostCard;
