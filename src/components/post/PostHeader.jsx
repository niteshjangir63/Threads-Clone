import { useState, useContext, useEffect } from "react";
import "./Post.css";
import Skeleton from "../skeleton/Skeleton";
import { AuthContext } from "../../context/AuthContext";
import { deletePost, handleFollow } from "../../api/postApi";
import { usePosts } from "../../context/PostContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function PostHeader({ postInfo }) {


  const [imageLoaded, setImageLoaded] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isFollow, setIsFollow] = useState(false);

  const { authUser } = useContext(AuthContext);
  const { removePost } = usePosts();

  if (!postInfo) return null;

  const isOwner = authUser && postInfo?.author?._id == authUser._id;

  useEffect(() => {
    if (authUser && postInfo?.author?.followers) {
      setIsFollow(postInfo.author.followers.includes(authUser._id));
    }
  }, [authUser, postInfo]);

  async function handleDelete(id) {
    try {
      setDeleting(true);
     const res =  await deletePost(id);
     toast.success(res.data.message);
      removePost(id);
    } catch (e) {
      
      toast.error(e.response.data.message)
      alert("Failed to delete post");
    } finally {
      setDeleting(false);
    }
  }



function confirmDelete(id) {
  Swal.fire({
    title: "Delete post?",
    text: "This action cannot be undone.",
    showCancelButton: true,

    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",

    background: "#181818",   
    color: "#f5f5f5",

    buttonsStyling: false,

    customClass: {
      popup: "threads-popup",
      confirmButton: "threads-delete",
      cancelButton: "threads-cancel",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      handleDelete(id);
    }
  });
}
















  const handleFollowing = async (userId) => {
    try {
      const res = await handleFollow(userId);
      toast.success(res.data.message)
      setIsFollow(prev => !prev);
    } catch (e) {
      toast.error(e.response.data.message)
      
    }
  };




  function timeAgo(timestamp) {
  const now = new Date();
  const seconds = Math.floor((now - new Date(timestamp)) / 1000);

  if (seconds < 60) return "just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} week ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month ago`;

  const years = Math.floor(days / 365);
  return `${years} year ago`;
}





  if(!postInfo) return null;

  return (
    <div className="d-flex flex-row align-items-center">

      <span className="post-profile">
        {!imageLoaded && <Skeleton />}

        <img
          src={postInfo.author.profile}
          alt="profile"
          onLoad={() => setImageLoaded(true)}
          style={{
            display: imageLoaded ? "block" : "none",
            opacity: imageLoaded ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />
      </span>

      <Link
        className="ms-2 mb-0 text-decoration-none text-light"
        to={`/profile/${postInfo?.author?.username}`}
      >
        {postInfo?.author?.username}
      </Link>
      <span className="ms-2 text-secondary " >{timeAgo(postInfo.createdAt)}</span>

      {authUser && !isOwner && (
        <button
          className="ms-2 mb-0 btn text-light border-0"
          onClick={() => handleFollowing(postInfo?.author?._id)}
        >
          {isFollow ? "" : "Follow"}
        </button>
      )}



      <div className="dropdown ms-auto">
        <button
          className="btn text-light border-0"
          type="button"
          data-bs-toggle="dropdown"
        >
          <i className="fa-solid fa-ellipsis"></i>
        </button>

        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">

          {isOwner && (
            <>
              <li>
                <button className="dropdown-item">Edit</button>
              </li>

              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={() => confirmDelete(postInfo._id)}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>
            </>
          )}

          <li>
            <button className="dropdown-item">Share</button>
          </li>

          {!isOwner && (
            <li>
              <button className="dropdown-item">Report</button>
            </li>
          )}

        </ul>
      </div>
    </div>
  );
}