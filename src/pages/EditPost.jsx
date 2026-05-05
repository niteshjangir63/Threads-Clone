import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/profileApi";
import Loader from "../components/loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateProfile.css"
import { toast } from "react-hot-toast";
import { editPost, getPostById } from "../api/postApi";
import ImagePreview from "../components/Image-Preview/ImagePreview"; "src\components\Image-Preview\ImagePreview.jsx"
export default function EditPost() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    id: id,
    content: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);

      try {
        const res = await getPostById(id);

        setForm({
          id: id,
          content: res.data.post.content || "",
        });

        setImage(res.data.post.image);
      } catch (e) {
        console.log(e);
        toast.error(e.response?.data?.message || "Post not found");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await editPost(form);

      toast.success(res.data.message || "Post updated");
      navigate(`/post/${id}`);
    } catch (e) {
      toast.error(e.response?.data?.message || "Update failed");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleForm = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <h5 className="text-light mb-3 fw-semibold">Edit Post</h5>

      {loading ? (
        <Loader />
      ) : (
        <div className="threads-form text-light d-flex flex-column text-start">
          <div className="mb-2">
            <label className="threads-label">Caption</label>

            <textarea
              name="content"
              value={form.content}
              onChange={handleForm}
              className="threads-input"
              placeholder="Write something..?"
            />
          </div>

          {image && (
            <div className="mb-2">
              <ImagePreview image={image} height={300} width={200} />
            </div>
          )}

          <button
            className="threads-btn w-100 mb-15"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? <Loader /> : "Update"}
          </button>
        </div>
      )}
    </>
  );
}