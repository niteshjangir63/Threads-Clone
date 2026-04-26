import { Link } from "react-router-dom";
import "./CommentCard.css";
import Dropdown from "../Dropdown/Dropdown";
import CommentActions from "../CommentActions/CommentActions";
import { useComments } from "../../context/CommentContext";
import { useEffect, useState } from "react";


function timeAgo(timestamp) {
  const now = new Date();
  const seconds = Math.floor((now - new Date(timestamp)) / 1000);

  if (seconds < 60) return "just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

  const years = Math.floor(days / 365);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

export default function CommentCard({ userId, content }) {
  const { deleteComment } = useComments();

  
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate((p) => p + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!userId || !content) return null;

  return (
    <>
      <div className="d-flex flex-column text-light mt-3 p-3">
        <div className="d-flex align-items-center">
          
          
          <div className="commentProfile">
            <img
              src={userId.profile}
              alt={userId.username}
              className="thread-avatar"
            />
          </div>

         
          <div className="d-flex flex-column ms-3 text-start flex-grow-1">
            
            
            <div className="d-flex align-items-center gap-2">
              <Link
                to={`/profile/${userId.username}`}
                className="text-decoration-none text-light fw-semibold"
              >
                {userId.username}
              </Link>

              <span style={{ fontSize: "12px", color: "#8e8e8e" }}>
                {timeAgo(content.createdAt)}
              </span>
            </div>

            
            <span style={{ wordBreak: "break-word" }}>
              {content.content}
            </span>
          </div>

          
          <Dropdown userId={userId} id={content._id} />
        </div>

       
        <CommentActions />
      </div>

      <hr />
    </>
  );
}