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
import useLikePost from "@/Hooks/Posts/useLikePost";
import { FaThumbsUp } from "react-icons/fa";
import Comment from "./Comment";
import { useSocketContext } from "@/context/SocketContext";

type Props = {
  post: PostType;
  user: ClientType | CivilUserType | any;
};

const PostCard = ({ post, user }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { deletePost } = useGetPost();
  const { Client } = useAppSelectore((state) => state.client);
  const { CurrentCivilUser } = useAppSelectore((state) => state.user);
  const [isCommentVisible, setIsCommentVisible] = useState<boolean>(false);
  const [commentsToShow, setCommentsToShow] = useState(1);
  const [likes, setLikes] = useState(post.likes);
  const PostComments = post?.comments ? [...post?.comments].reverse() : [];

  const defaultUser = Client != null ? { ...Client } : { ...CurrentCivilUser };
  const { like } = useLikePost();

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
    const userConfirmed = confirm("Are you sure you want to delete this post?");
    if (!userConfirmed) {
      toast.warning("Cancelled post deletion");
      return;
    }
    deletePost(post._id);
  };

  const toggleCommentVisible = () => {
    setIsCommentVisible((prev) => !prev);
  };

  const handleShowMore = () => {
    if (post.comments) {
      if (commentsToShow < post.comments.length) {
        setCommentsToShow(post.comments.length);
      } else {
        setCommentsToShow(1);
      }
    }
  };

  const handleLike = async () => {
    const alreadyLiked = likes?.includes(defaultUser._id);

    setLikes((prevLikes) =>
      alreadyLiked
        ? prevLikes?.filter((id) => id !== defaultUser._id)
        : prevLikes
        ? [...prevLikes, defaultUser._id]
        : prevLikes
    );

    try {
      await like(post._id);
    } catch (error) {
      setLikes((prevLikes) =>
        alreadyLiked
          ? prevLikes
            ? [...prevLikes, defaultUser._id]
            : []
          : prevLikes?.filter((id) => id !== defaultUser._id)
      );
    }
  };
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user?._id);

  if (!user) return <div>No Post Available</div>;

  return (
    <div className="flex flex-col gap-4 border bg-slate-800 shadow-2xl hover:border-cyan-700 border-slate-400 rounded-[0.5rem] sm:h-full">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center font-semibold p-3">
          <Link
            onClick={() =>
              isOnline ? toast.info(`${user?.fullName} is online`) : null
            }
            title="View Profile"
            to={`/user/${user?._id}`}
            className="flex gap-3 hover:underline hover:text-cyan-400 items-center font-semibold px-3"
          >
            {imageUrl && (
              <div className={`size-12 avatar ${isOnline ? "online" : ""}`}>
                <img
                  src={imageUrl}
                  alt="User Picture"
                  className="size-full object-cover rounded-full"
                />
              </div>
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
      <div className="mx-3 h-[70%]">
        {post.image && (
          <img
            src={post.image}
            alt=""
            className="h-full sm:h-full w-full object-cover object-center"
          />
        )}
      </div>
      <div className="flex justify-between mb-1">
        <div className="flex flex-col">
          <Button
            onClick={handleLike}
            className={` ${
              likes?.includes(defaultUser._id) ? "text-blue-700 font-bold" : ""
            }`}
          >
            <FaThumbsUp />
          </Button>
          {likes && likes.length !== 0 && (
            <span className="my-1 mx-4 text-white">{likes.length} likes</span>
          )}
        </div>
        <Button
          type="submit"
          onClick={toggleCommentVisible}
          className="flex gap-3"
        >
          <FaRegCommentDots size={25} /> Comments
        </Button>
      </div>

      {isCommentVisible && <CommentInput postId={post?._id} />}

      <div className="flex flex-col">
        {isCommentVisible &&
          PostComments?.slice(0, commentsToShow).map((comment: any) => (
            <Comment
              key={comment._id}
              comment={comment.comment}
              user={comment.userId}
            />
          ))}

        {isCommentVisible && post.comments && post.comments.length > 1 && (
          <Button onClick={handleShowMore} className="text-blue-500 mt-2">
            {commentsToShow < post.comments.length ? "Show More" : "Show Less"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
