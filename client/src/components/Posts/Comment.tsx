import userGetProfile from "@/Hooks/BothUserHooks/userGetProfile";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export type Props = {
  comment: string;
  user?: any;
};
const Comment = ({ comment, user: userId }: Props) => {
  const { getProfile, user: CurrentUser, loading } = userGetProfile();

  useEffect(() => {
    getProfile(userId);
  }, [comment, userId]);
  console.log(CurrentUser?.user?.fullName);
  return (
    <>
      {!loading && (
        <div className="flex flex-col p-4 border-b border-slate-500 text-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              <img
                className="w-10 h-10 rounded-full bg-gray-200"
                src={
                  CurrentUser?.user?.photoUrl ||
                  CurrentUser?.user?.profilePictureUrl
                }
                alt={CurrentUser?.user?.fullName}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <Link
                  to={`/user/${CurrentUser?.user?._id}`}
                  className="font-bold text-xs"
                >
                  {CurrentUser?.user?.fullName}
                </Link>
              </div>
            </div>
          </div>
          <div className="sm:mx-14 mx-12 font-semibold">{comment}</div>
        </div>
      )}
    </>
  );
};

export default Comment;
