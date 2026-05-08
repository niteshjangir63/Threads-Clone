import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./ImagePreview.css";

export default function ImagePreview({
  image,
  heights,
  height,
  width,
  radius,
  radiusInPer,
  setPreview,
  setFile,
  setForm,
  children,
}) {
  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const closePreview = () => {
    if (typeof setPreview === "function") {
      setPreview(null);
    }

    if (typeof setFile === "function") {
      setFile(null);
    }

    if (typeof setForm === "function") {
      setForm((prev) => ({
        ...prev,
        file: null,
      }));
    }
  };

  return createPortal(
    <div className="preview-overlay" onClick={closePreview}>
      <button
        type="button"
        className="preview-close-btn"
        onClick={(e) => {
          e.stopPropagation();
          closePreview();
        }}
      >
        ×
      </button>

      <div
        className="imagePreviewCard"
        onClick={(e) => e.stopPropagation()}
        style={{
          height: height ? `${height}px` : `${heights || 80}%`,
          width: width ? `${width}px` : "auto",
          borderRadius: radiusInPer
            ? `${radiusInPer}%`
            : `${radius || 12}px`,
        }}
      >
        <img src={image} alt="preview" />
      </div>

      {children && (
        <div className="preview-actions" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      )}
    </div>,
    document.body
  );
}