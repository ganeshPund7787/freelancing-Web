import { BACKEND_API_URL } from "@/main";
import { useState } from "react";
import { toast } from "react-toastify";

export type Props = {
  postId?: any;
  comment?: string;
};

const useCommentPost = () => {
  const [loading, setLoading] = useState(false);
  const AddComment = async (postId: Props, comment: Props) => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_API_URL}/api/post/comment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ postId, comment }),
      });
      const data = await res.json();
      setLoading(false);
      console.log(data);
    } catch (error) {
      toast.warn("Ckeck Your Internet");
    }
  };

  return { AddComment, loading };
};

export default useCommentPost;
