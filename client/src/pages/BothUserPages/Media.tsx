// import { useAppSelectore } from "@/App/store";
// import PostCard from "@/components/Posts/PostCard";
// import Loader from "@/components/styleComponents/Loader";
// import useGetAllPost from "@/Hooks/Posts/useGetAllPost";
// import useLikePost from "@/Hooks/Posts/useLikePost";
// import { useEffect } from "react";

// const Media = () => {
//   const { getPosts, posts, loading } = useGetAllPost();
//   const { Client } = useAppSelectore((state) => state.client);
//   const { CurrentCivilUser } = useAppSelectore((state) => state.user);
//   const { like } = useLikePost();
//   const defaultUser = Client != null ? { ...Client } : { ...CurrentCivilUser };
//   useEffect(() => {
//     getPosts();
//     console.log(posts);
//   }, []);

//   return (
//     <>
//       <div className="px-1 h-full md:px-36">
//         <div className="">
//           <div className=" flex flex-col gap-5 ">
//             {posts &&
//               !loading &&
//               posts.length > 0 &&
//               posts.map((post) => {
//                 if (defaultUser?._id === post.userId) return;
//                 return (
//                   <PostCard key={post?._id} post={post} user={post?.user} />
//                 );
//               })}
//           </div>
//           {loading ? <Loader /> : null}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Media;

import { useAppSelectore } from "@/App/store";
import PostCard from "@/components/Posts/PostCard";
import Loader from "@/components/styleComponents/Loader";
import useGetAllPost from "@/Hooks/Posts/useGetAllPost";
import useLikePost from "@/Hooks/Posts/useLikePost";
import { useQuery } from "react-query";

const Media = () => {
  const { getPosts } = useGetAllPost();
  const { Client } = useAppSelectore((state) => state.client);
  const { CurrentCivilUser } = useAppSelectore((state) => state.user);
  const { like } = useLikePost();

  const defaultUser = Client != null ? { ...Client } : { ...CurrentCivilUser };

  const { data: posts, isLoading: loading } = useQuery("posts", getPosts, {
    enabled: !!like,
  });

  return (
    <>
      <div className="px-1 h-full md:px-36">
        <div className="">
          <div className=" flex flex-col gap-5 ">
            {posts &&
              !loading &&
              posts.length > 0 &&
              posts.map((post: any) => {
                if (defaultUser?._id === post.userId) return;
                return (
                  <PostCard key={post?._id} post={post} user={post?.user} />
                );
              })}
          </div>
          {loading ? <Loader /> : null}
        </div>
      </div>
    </>
  );
};

export default Media;
