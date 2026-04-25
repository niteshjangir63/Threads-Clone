import React from "react";
import "./NotificationCard.css";
import { Link } from "react-router-dom";

export default function NotificationCard({ data, onRead }) {
  if (!data) return null;



  const sender = data.senderId;

  const getMessage = () => {
    switch (data.type) {
      case "LIKE":
        return "liked your post";
      case "COMMENT":
        return "commented on your post";
      case "FOLLOW":
        return "started following you";
      default:
        return data.message || "sent you a notification";
    }
  };

  const handleClick = async () => {
    if (!data.isRead && onRead) {
      await onRead(data._id);
    }
  };

  const time = data.createdAt
    ? new Date(data.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div
      className={`notification-card ${!data.isRead ? "unread" : ""}`}
      onClick={handleClick}
    >
      <Link className="avatar-wrapper" to={`http://localhost:5173/profile/${sender.username}`} style={{textDecoration:"none"}}>
        <img
          src={sender?.profile || "https://via.placeholder.com/40"}
          alt="profile"
          className="notification-avatar"
        />

        <span className={`notification-icon ${data.type?.toLowerCase()}`}>
          {data.type === "LIKE" && "♥"}
          {data.type === "COMMENT" && "💬"}
          {data.type === "FOLLOW" && "＋"}
        </span>
      </Link>

      <Link className="notification-content" to={data.postId && `http://localhost:5173/post/${data.postId}`} style={{textDecoration:"none"}}>
        <p className="notification-text">
          <span className="notification-username">
            {sender?.username || "Someone"}
          </span>{" "}
          {getMessage()}{" "}
          <span className="notification-time">{time}</span>
        </p>

        {data.type === "COMMENT" && (
          <p className="notification-comment">
            {data.content || data.message}
          </p>
        )}
      </Link>

      {data.type === "FOLLOW" && (
        <button
          className="follow-btn"
          onClick={(e) => e.stopPropagation()}
        >
          Follow
        </button>
      )}

      {!data.isRead && <div className="notification-dot"></div>}
    </div>
  );
}