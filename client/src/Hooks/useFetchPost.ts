import { BACKEND_API_URL } from "@/main";
import { PostType } from "@/types";
import { toast } from "react-toastify";

type PostFormData = {
  description: string;
  image?: string | undefined;
};

const useGetPost = () => {
  const GetAllPost = async (): Promise<PostType | undefined> => {
    try {
      const res = await fetch(`${BACKEND_API_URL}/api/post/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!res.ok) {
        toast.error("Check Your Internet");
        return;
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(`Error while getApp Post frontend: `, error);
    }
  };

  const updatePost = async (postId: string, values: PostFormData) => {
    try {
      const res = await fetch(`${BACKEND_API_URL}/api/post/update/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          description: values.description,
          image: values.image,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false || !res.ok) {
        toast.error("error while update post. check your internet !");
        return;
      }
      toast.success("Post Updated !");
      return;
    } catch (error) {
      console.log(`Error while updating: `, error);
      toast.error("check your internet");
    }
  };

  const deletePost = async (postId: string) => {
    try {
      const res = await fetch(`${BACKEND_API_URL}/api/post/delete/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!res.ok) {
        toast.error("Error on delete post. ckeck Your internet!");
        return;
      }
      toast.success("Post Deleted !");
      return;
    } catch (error) {
      toast.error("Error on delete post. ckeck Your internet!");
      console.log(`Error while delete Post`, error);
    }
  };
  return { GetAllPost, updatePost, deletePost };
};

export default useGetPost;
