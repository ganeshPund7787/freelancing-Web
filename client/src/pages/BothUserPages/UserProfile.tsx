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
  console.log("User: ", user);
  
  return (
    <>
      {!loading && (
        <div>
          {user?.role === "client" ? (
            <ClientProfile Client={user} />
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
