import CivilUserProfile from "@/components/BothUser/CivilUserProfile";
import ClientProfile from "@/components/BothUser/ClientProfile";
import userGetProfile from "@/Hooks/BothUserHooks/userGetProfile";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

const UserProfile = () => {
  const { userId } = useParams();
  const { getProfile, user } = userGetProfile();

  const { isLoading } = useQuery(
    ["getProfile", userId],
    () => getProfile(userId),
    {
      enabled: !!userId,
    }
  );

  useEffect(() => {
    getProfile(userId);
  }, [userId]);

  return (
    <>
      {!isLoading && (
        <div>
          {user?.user?.role === "client" ? (
            <ClientProfile
              Client={user?.user}
              userPosts={user?.userPosts}
              userJobPost={user?.userJobPost}
            />
          ) : (
            <CivilUserProfile Posts={user?.Posts} user={user?.user} />
          )}
        </div>
      )}
      {isLoading && (
        <span className="text-center mx-auto loading loading-dots"></span>
      )}
    </>
  );
};

export default UserProfile;
