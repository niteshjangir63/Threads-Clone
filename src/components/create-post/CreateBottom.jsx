import "./Create.css";
import Loader from "../loader/Loader";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/Appearance";

export default function CreateBottom(props) {
  const { handleCreate, loading, setForm } = props;

  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [captions, setCaptions] = useState([]);
  const [captionLoading, setCaptionLoading] = useState(false);
  const [captionError, setCaptionError] = useState("");

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



  const generateAICaption = async () => {
    if (!file) {
      setCaptionError("Please select an image first.");
      return;
    }

    try {
      setCaptionLoading(true);
      setCaptionError("");
      setCaptions([]);

      const formData = new FormData();
      formData.append("image", file);
      formData.append("tone", "casual");

      const response = await fetch(
        "http://localhost:5000/api/ai/caption",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate captions.");
      }

      setCaptions(data.captions || []);
    } catch (error) {
      setCaptionError(error.message || "Something went wrong.");
    } finally {
      setCaptionLoading(false);
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


      {/* AI Caption Generator */}
      <div className="ai-caption-wrapper">
        <button
          type="button"
          className="ai-caption"
          onClick={generateAICaption}
          disabled={!file || captionLoading}
        >
          <i className="fa-solid fa-robot"></i>

          <span>
            {captionLoading ? "Generating..." : "AI Caption"}
          </span>
        </button>
      </div>

      {captionError && (
        <p className="text-danger mt-2">{captionError}</p>
      )}

      {captions.length > 0 && (
        <div className="ai-caption-results mt-3">
          <p>Choose a caption:</p>

          {captions.map((caption, index) => (
            <button
              key={index}
              type="button"
              className="ai-caption-option"

              onClick={() => {
                if (setForm) {
                  setForm((prev) => ({
                    ...prev,
                    content: caption,
                  }));
                }

                setCaptions([]);
              }}

            >
              {caption}
            </button>
          ))}
        </div>
      )}



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
      )
      }

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