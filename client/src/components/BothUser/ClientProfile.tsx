import { ClientType, JobPostType, PostType } from "@/types";
import ClientAboutInfoProfile from "../Posts/ClientAboutInfoProfile";
import ClientProfileHead from "../Posts/ClientProfileHead";
import PostCard from "../Posts/PostCard";
import JobPostCard from "../ClientUser/JobPostCard";

type Props = {
  Client: ClientType;
  userPosts: PostType[];
  userJobPost: JobPostType[];
};

const ClientProfile = ({ Client, userPosts, userJobPost }: Props) => {
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
        <h1 className="text-sm sm:text-2xl">Posts/Activivty</h1>
        <div className=" rounded md:rounded-[1rem]">
          <div className="p-5">
            {userPosts &&
              userPosts?.map((post: PostType) => (
                <PostCard key={post._id} post={post} user={Client} />
              ))}
            {userPosts?.length === 0 && <h1>Not Post Found</h1>}
          </div>
        </div>
        <div className="rounded md:rounded-[1rem]">
          <h1 className="text-sm sm:text-2xl">Job Hiring Posts</h1>
          <div className="p-5">
            {userJobPost &&
              userJobPost?.map((post: JobPostType) => (
                <JobPostCard key={post._id} post={post} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
