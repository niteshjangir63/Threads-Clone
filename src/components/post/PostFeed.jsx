import { Link } from "react-router-dom";
import Skeleton from "../skeleton/Skeleton";
import "./Post.css";
import { useState } from "react";
import ImagePreview from "../Image-Preview/ImagePreview";
import { useTheme } from "../../context/Appearance";

export default function PostFeed({ postInfo }) {
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState(null);
  const { theme } = useTheme();

  const showImageFullScreen = () => {
    setImage(postInfo.image);
  };

  return (
    <>
      <Link
        to={`/post/${postInfo._id}`}
        className={`text-start d-flex mb-2 mt-2 ${
          theme ? "text-dark" : "text-light"
        } text-decoration-none`}
      >
        {postInfo.content}
      </Link>

      {postInfo.image && (
        <div className="col-6 post" onClick={showImageFullScreen}>
          {!loader && <Skeleton />}

          <img
            src={postInfo.image}
            alt="post"
            onLoad={() => setLoader(true)}
            style={{
              opacity: loader ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          />
        </div>
      )}

      {image && (
        <ImagePreview
          image={image}
          setPreview={setImage}
          heights={90}
          width={500}
          radius={12}
        />
      )}
    </>
  );
}