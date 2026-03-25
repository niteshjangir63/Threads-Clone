import { useState } from "react";
import "./Post.css";
import Skeleton from "../skeleton/Skeleton";

export default function PostHeader() {
  const [loader, setLoader] = useState(false);

  return (
    <div className="d-flex flex-row align-items-center">

      <span className="post-profile">
        {!loader && <Skeleton />}

        <img
          src="https://img.freepik.com/premium-photo/nature-wallpaper-beautiful-nature-wallpaper-4k-nature-wallpapers-hd-nature-wallpaper-green-nature_722194-175.jpg?w=1380"
          alt="profile"
          onLoad={() => setLoader(true)}
          style={{
            display: loader ? "block" : "none",
            opacity: loader ? 1 : 0,
            transition: "opacity 0.4s ease"
          }}
        />
      </span>

     
      <p className="ms-2 mb-0">
        Username
      </p>

      
      <p className="ms-2 mb-0">
        Follow
      </p>

      
      <span className="ms-auto">
        <i className="fa-solid fa-ellipsis"></i>
      </span>

    </div>
  );
}