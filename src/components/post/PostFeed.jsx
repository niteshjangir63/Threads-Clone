import { Link } from "react-router-dom";
import Skeleton from "../skeleton/Skeleton";
import "./Post.css";
import { useState } from "react";
import { getPostById } from "../../api/postApi";
import ImagePreview from "../Image-Preview/ImagePreview";
import toast from "react-hot-toast";

export default function PostFeed({ postInfo }) {

  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState(null);

  

  const showImageFullScreen = async (id) => {
    try {
      const res = await getPostById(id);

      setImage(`${res.data.post.image}`);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };


  function closeImagePreviewImage(e) {

    if (e.target === e.currentTarget) {

      setImage(null)
    }
  }

  return (
    <>
      <Link
        to={`/post/${postInfo._id}`}
        className="text-start d-flex mb-2 mt-2 text-light text-decoration-none"
      >
        {postInfo.content}
      </Link>

      {postInfo.image && (
        <div className="col-6 post" onClick={() => showImageFullScreen(postInfo._id)}>

          {!loader && <Skeleton />}

          <img
            src={`${postInfo.image}`}
            alt="image"
            onLoad={() => setLoader(true)}
            style={{
              opacity: loader ? 1 : 0,
              transition: "opacity 0.4s ease"
            }}
          />

        </div>
      )}

      {image && <div className="imageOverlay" onClick={(e) => closeImagePreviewImage(e)}>

        <ImagePreview image={image} heights={100} />

      </div>}
    </>

  );
}