import { useEffect, useRef } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Toast({ msg }) {

  const toastRef = useRef(null);

  useEffect(() => {
    const toast = new bootstrap.Toast(toastRef.current);
    toast.show();
  }, [msg]);

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      
      <div
        ref={toastRef}
        className="toast bg-primary text-white border-0"
        role="alert"
      >

        <div className="d-flex">
          <div className="toast-body">
            {msg}
          </div>

          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
          ></button>
        </div>

      </div>

    </div>
  );
}