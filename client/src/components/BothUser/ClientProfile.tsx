import { ClientType, PostType } from "@/types";
import ClientAboutInfoProfile from "../Posts/ClientAboutInfoProfile";
import ClientProfileHead from "../Posts/ClientProfileHead";
import PostCard from "../Posts/PostCard";
import { Link } from "react-router-dom";
import useGetPost from "@/Hooks/useFetchPost";
import { useEffect, useState } from "react";
import AllJobPost from "../ClientUser/AllJobPost";

type Props = {
  Client: ClientType;
};

const ClientProfile = ({ Client }: Props) => {
  const { GetAllPost } = useGetPost();
  const [posts, setPosts] = useState<PostType | []>([]);
  const normalizedPosts = Array.isArray(posts) ? posts : [posts];

  const GetPost = async () => {
    if (Client) {
      const res: PostType | undefined = await GetAllPost();
      setPosts(res as PostType);
    }
  };
  useEffect(() => {
    GetPost();
  }, [posts]);

  return (
    <div className="flex flex-col min-h-full md:p-5">
      <div className="flex justify-between items-center min-h-full rounded-t-[1rem] max-w-full p-1 md:p-5 border-b-2 border-slate-500">
        <div>
          <ClientProfileHead Client={Client} />
        </div>
      </div>
      <div>
        <ClientAboutInfoProfile Client={Client} />
      </div>
      <div className="flex mt-5 gap-7 flex-col min-h-full md:p-5">
        <div className="border-2 border-slate-500 rounded md:rounded-[1rem]">
          <div className="p-5">
            {" "}
            {posts &&
              normalizedPosts?.map((post: PostType) => (
                <PostCard key={post._id} post={post} user={Client} />
              ))}
          </div>
        </div>
        <div className=" rounded md:rounded-[1rem]">
          <div className="flex items-center justify-between p-5">
            <h1 className="text-2xl font-semibold">Hiring Updates </h1>
            <Link
              to={"/create-job-post"}
              className="border hover:bg-white p-3 text-sm font-semibold hover:text-black  rounded-full"
            >
              Post Hiring Updates
            </Link>
          </div>
          <div className="p-5">
            <AllJobPost />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
