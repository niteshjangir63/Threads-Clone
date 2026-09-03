import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import Loader from "../components/loader/Loader";
import ImagePreview from "../components/Image-Preview/ImagePreview";

import { editPost, getPostById } from "../api/postApi";

import "./EditPost.css";

export default function EditPost() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    id: id,
    content: "",
  });

  const [image, setImage] = useState(null);

  // Controls whether fullscreen image preview is open
  const [preview, setPreview] = useState(null);

  // Fetch post
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);

      try {
        const res = await getPostById(id);

        const post = res.data.post;

        setForm({
          id: id,
          content: post.content || "",
        });

        setImage(post.image || null);
      } catch (e) {
        console.log(e);

        toast.error(
          e.response?.data?.message || "Post not found"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Handle input
  const handleForm = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Update post
  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await editPost(form);

      toast.success(
        res.data.message || "Post updated"
      );

      navigate(`/post/${id}`);
    } catch (e) {
      console.log(e);

      toast.error(
        e.response?.data?.message || "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h5 className="text-light mb-3 fw-semibold">
        Edit Post
      </h5>

      {loading ? (
        <Loader />
      ) : (
        <div className="threads-form text-light d-flex flex-column text-start">

          {/* Caption */}
          <div className="mb-2">
            <label className="threads-label">
              Caption
            </label>

            <textarea
              name="content"
              value={form.content}
              onChange={handleForm}
              className="threads-input"
              placeholder="Write something..?"
            />
          </div>

          {/* Existing Image */}
          {image && (
            <div
              className="mb-2"
              id="edit-image-preview"
            >
              <img
                src={image}
                alt="Post"
                className="edit-post-image"
                onClick={() => setPreview(image)}
              />
            </div>
          )}

          {/* Update */}
          <button
            type="button"
            className="threads-btn w-100 mb-15"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? <Loader /> : "Update"}
          </button>
        </div>
      )}

      {/* Fullscreen Image Preview */}
      {preview && (
        <ImagePreview
          image={preview}
          height={500}
          width={400}
          setPreview={setPreview}
        />
      )}
    </>
  );
}