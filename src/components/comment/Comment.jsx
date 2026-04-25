import { useState } from "react";
import "../create-post/Create.css";
import MyInput from "../inputBox/MyInput";
import { addComment } from "../../api/postApi";
import { useNavigate } from "react-router-dom";
import { useComments } from "../../context/CommentContext";
import Loader from "../loader/Loader";
import toast from "react-hot-toast";

export default function Comment({ handleOuterClick, postId }) {
  const { addComments } = useComments();
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleComment = async () => {
    if (!value.trim()) return;

    setLoading(true);

    try {
      const res = await addComment(postId, value.trim());

      setValue("");
      addComments(res?.data?.comments);
        if(res?.data?.success){

            handleOuterClick?.(); 
        }
      navigate(`/post/${postId}`);
    } catch (e) {
      toast.error(e.response.data.message)
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      handleComment();
    }
  };

  return (
    <div className="Outer-Container" onClick={handleOuterClick}>
      <div
        className="inner-container h-25 text-light p-3 d-flex flex-row gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <MyInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a comment..."
        />

        <button
          className="btn btn-light ms-auto mt-auto"
          disabled={!value.trim() || loading}
          onClick={handleComment}
        >
          {loading ? <Loader color="black" /> : "Post"}
        </button>
      </div>
    </div>
  );
}