import { useContext, useEffect, useState } from "react";
import { likePost } from "../../api/postApi";
import { AuthContext } from "../../context/AuthContext";
import Comment from "../comment/Comment";
import { useComments } from "../../context/CommentContext";
import toast from "react-hot-toast";
import { useTheme } from "../../context/Appearance";

export default function PostActions({ postInfo }) {

  const { authUser } = useContext(AuthContext);
  const [like, setLike] = useState([]);
  const [show, setShow] = useState(false);
  const { comments } = useComments();
  const [count, setCount] = useState(0);
  const {theme} = useTheme();




  const openCommentBox = (id) => {
    if (!authUser) {
      toast.error("Unauthorized User!")
      return;
    }

    setShow(true);
  }

  const handleOuterClick = (e) => {
    if (e.target === e.currentTarget) setShow(false);

  }



  useEffect(() => {
    setLike(postInfo?.likes || []);
  }, [postInfo]);

  const handleLikes = async (id) => {
  if (!authUser) {
    toast.error("Unauthorized User!");
    return;
  }

  const alreadyLiked = like?.includes(authUser._id);

  
  setLike((prev) =>
    alreadyLiked
      ? prev.filter((userId) => userId !== authUser._id)
      : [...prev, authUser._id]
  );

  try {
    await likePost(id);
  } catch (e) {
    
    setLike((prev) =>
      alreadyLiked
        ? [...prev, authUser._id]
        : prev.filter((userId) => userId !== authUser._id)
    );

    toast.error(e?.response?.data?.message || "Something went wrong");
  }
};

  useEffect(() => {
    const count = comments.filter(
      (comment) => comment.postId === postInfo._id
    ).length;

    setCount(count);
  }, [comments, postInfo._id]);





  return (
    <>

      {show && <Comment handleOuterClick={handleOuterClick} postId={postInfo._id} />}
      <div className="d-flex flex-row mt-1 gap-2 ">

        <span title="Like" onClick={() => handleLikes(postInfo._id)}>
          <img
            className={`post-bottom-button ${theme ? "post-action-dark" : "post-action-light"}`}
            src={authUser && like?.includes(authUser._id)
              ? "/svgIcons/heart-red.svg"
              : "/svgIcons/heart.svg"}
            alt="like"
            style={{
              filter: authUser && like?.includes(authUser._id) ? "none" : ""
            }}
          />
          <span style={{ fontSize: "13px", marginLeft: "3px",color:theme ? "black" : "white"}}>
            {like?.length > 0 && like.length}
          </span>
        </span>

        <span title="Comment" onClick={openCommentBox}>
          <img className={`post-bottom-button ${theme ? "post-action-dark" : "post-action-light"}`} src="/svgIcons/comment.svg" alt="comment" />
          <span style={{ fontSize: "13px", marginLeft: "3px" ,color:theme ? "black" : "white"}}>
            {count > 0 && count}
          </span>
        </span>

        <span title="Repost ">
          <img className={`post-bottom-button ${theme ? "post-action-dark" : "post-action-light"}`} src="/svgIcons/repost.svg" alt="repost" />
        </span>

        <span title="Share">
          <img className={`post-bottom-button ${theme ? "post-action-dark" : "post-action-light"}`} src="/svgIcons/share.svg" alt="share" />
        </span>

      </div>
    </>
  );
}