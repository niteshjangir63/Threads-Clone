import "./Create.css";
import Loader from "../loader/Loader";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/Appearance";

export default function CreateBottom(props) {
  const { handleCreate, loading, setForm } = props;

  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const { theme } = useTheme();

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    if (setForm) {
      setForm((prev) => ({ ...prev, file }));
    }

    return () => URL.revokeObjectURL(url);
  }, [file, setForm]);

  const removeImage = () => {
    setFile(null);
    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (setForm) {
      setForm((prev) => ({ ...prev, file: null }));
    }
  };

  return (
    <>
      <div className="d-flex m-2">
        <label
          htmlFor="image"
          style={{ cursor: "pointer", color: theme ? "black" : "white" }}
        >
          <i className="fa-solid fa-image"></i>
        </label>

        <input
          ref={fileInputRef}
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: "none" }}
        />
      </div>

      {preview && (
        <div className="create-image-preview">
          <button
            type="button"
            className="create-preview-close"
            onClick={removeImage}
          >
            ×
          </button>

          <img src={preview} alt="preview" />
        </div>
      )}

      <div className="card-bottom d-flex flex-row align-items-center mt-3">
        <span className={`${theme ? "text-dark" : "text-light"}`}>
          Anyone can reply or quote
        </span>

        <button
          className={`ms-auto btn ${theme ? "btn-dark" : "btn-light"}`}
          onClick={handleCreate}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader color={theme ? "white" : "black"} /> Posting..
            </>
          ) : (
            "Post"
          )}
        </button>
      </div>
    </>
  );
}