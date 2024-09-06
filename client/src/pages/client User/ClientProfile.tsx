import { updateStartClient } from "@/App/features/clientSlice";
import { useAppDispatch, useAppSelectore } from "@/App/store";
import CreatePost from "@/components/BothUser/CreatePost";
import AllJobPost from "@/components/ClientUser/AllJobPost";
import EditProfile from "@/components/ClientUser/EditProfile";
import LogOut from "@/components/LogOut";
import ClientAboutInfoProfile from "@/components/Posts/Client/ClientAboutInfoProfile";
import ClientProfileHead from "@/components/Posts/Client/ClientProfileHead";
import ProfilePosts from "@/components/Posts/ProfilePosts";
import { Button } from "@/components/ui/button";
import useGetPost from "@/Hooks/useFetchPost";
import { PostType } from "@/types";
import { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const ClientProfile = () => {
  const { Client, isUpdate, Clientloading } = useAppSelectore(
    (state) => state.client
  );
  const dispatch = useAppDispatch();
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
  }, [Clientloading, posts]);

  return (
    <>
      {Client && (
        <>
          {isUpdate ? (
            <EditProfile />
          ) : (
            <div className="flex flex-col min-h-full md:p-5">
              <div className="flex justify-between items-center min-h-full rounded-t-[1rem] max-w-full p-1 md:p-5 border-b-2 border-slate-500">
                <div>
                  <ClientProfileHead Client={Client} />
                </div>
                <div className="cursor-pointer relative right-0 p-2 border-cyan-500 hover:bg-opacity-30 rounded-full">
                  <Button
                    variant={"ghost"}
                    onClick={() => dispatch(updateStartClient())}
                  >
                    <MdModeEditOutline
                      className="border cursor-pointer p-2 border-cyan-500 rounded-full"
                      size={40}
                    />
                  </Button>
                </div>
              </div>
              <div>
                <ClientAboutInfoProfile Client={Client} />
              </div>
              <div className="flex mt-5 gap-7 flex-col min-h-full md:p-5">
                <div className="border-2 border-slate-500 rounded md:rounded-[1rem]">
                  <div className="flex items-center justify-between p-5">
                    <h1 className="text-2xl font-semibold">
                      Activity / Posts{" "}
                    </h1>
                    <CreatePost />
                  </div>

                  <ProfilePosts posts={normalizedPosts} user={Client} />
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
              <LogOut />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ClientProfile;
