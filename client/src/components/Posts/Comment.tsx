import userGetProfile from "@/Hooks/BothUserHooks/userGetProfile";
import { useEffect } from "react";

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
        <div className="flex flex-col p-4 border-b dark:border-x-gray-600 text-sm">
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
                <span className="font-bold text-xs">
                  {CurrentUser?.user?.fullName}
                </span>
              </div>
            </div>
          </div>
          <div className="sm:mx-14 mx-8 font-semibold">{comment}</div>
        </div>
      )}
    </>
  );
};

export default Comment;
