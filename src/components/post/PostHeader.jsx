import { useState } from "react";
import "./Post.css";
import Skeleton from "../skeleton/Skeleton";

export default function PostHeader() {
  const [loader, setLoader] = useState(false);
  const [visible, setVisible] = useState(false);
  function handleDropdown() {

    !!setVisible();

  }

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


      <div className="dropdown ms-auto">
  <button
    className="btn text-light border-0"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <i className="fa-solid fa-ellipsis"></i>
  </button>

  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
    <li>
      <button className="dropdown-item">Edit</button>
    </li>
    <li>
      <button className="dropdown-item">Share</button>
    </li>
    <li>
      <button className="dropdown-item">Report</button>
    </li>
    <li>
      <hr className="dropdown-divider" />
    </li>
    <li>
      <button className="dropdown-item text-danger">Delete</button>
    </li>
  </ul>
</div>


    </div>
  );
}