
import "./Create.css";
import CreateBottom from "./CreateBottom";
import CreateHeader from "./CreateHeader";
import CreateMid from "./CreateMid";
import { useState, useEffect } from "react";
import { usePosts } from "../../context/PostContext";
import toast from "react-hot-toast";
import API from "../../api/axios";
import { useTheme } from "../../context/Appearance";

export default function Create({ setDisplay }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    content: "",
    file: null,
  });

  const { addPost } = usePosts();
  const { theme } = useTheme();

  function handleOuterClick(e) {
    if (e.target === e.currentTarget) {
      setDisplay((prev) => !prev);
    }
  }

  const handleCreate = async () => {
    if (!form.content.trim() && !form.file) {
      toast.error("Please add some text or an image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("content", form.content);

      if (form.file) {
        formData.append("image", form.file);
      }

      const res = await API.post("/create", formData, {
        withCredentials: true,
      });

      if (res?.data?.success) {
        toast.success(res.data.message);
        addPost(res.data.post);
        setDisplay(false);
      }
    } catch (e) {
      toast.error(
        e?.response?.data?.message || "Post failed"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className={`Outer-Container ${
        theme ? "light-outer-container" : "dark-outer-container"
      }`}
      onClick={handleOuterClick}
    >
      <div
        className={`inner-container p-3 ${
          theme ? "light-inner-container" : "dark-inner-container"
        }`}
      >
        <CreateHeader />

        <CreateMid
          content={form.content}
          setData={(content) =>
            setForm((prev) => ({
              ...prev,
              content,
            }))
          }
        />

        <CreateBottom
          setForm={setForm}
          handleCreate={handleCreate}
          loading={loading}
        />
      </div>
    </div>
  );
}
