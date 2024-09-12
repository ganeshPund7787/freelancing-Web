import CivilUserProfile from "@/components/BothUser/CivilUserProfile";
import ClientProfile from "@/components/BothUser/ClientProfile";
import userGetProfile from "@/Hooks/BothUserHooks/userGetProfile";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loader from "@/components/styleComponents/Loader";

const UserProfile = () => {
  const { userId } = useParams();
  const { getProfile, user } = userGetProfile();
  const navigate = useNavigate();

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

  if (user) {
    if (user?.user._id !== userId) {
      navigate("/media");
    }
  }
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
      {isLoading && <Loader />}
    </>
  );
};

export default UserProfile;
