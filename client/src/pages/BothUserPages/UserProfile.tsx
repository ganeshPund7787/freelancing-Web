import ClientProfile from "@/components/BothUser/ClientProfile";
import userGetProfile from "@/Hooks/BothUserHooks/userGetProfile";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { userId } = useParams();
  const { getProfile, user, loading } = userGetProfile();

  useEffect(() => {
    getProfile(userId);
  }, [userId]);

  
  return (
    <>
      {!loading && (
        <div>
          {user?.user?.role === "client" ? (
            <ClientProfile
              Client={user?.user}
              userPosts={user?.userPosts}
              userJobPost={user?.userJobPost}
            />
          ) : (
            "Civil Engineer"
          )}
        </div>
      )}
      {loading && (
        <span className="text-center mx-auto loading loading-dots"></span>
      )}
    </>
  );
};

export default UserProfile;
