import { useState } from "react";
import "./Forgot.css";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import toast from "react-hot-toast";
import { sendOtp, verifyOtp } from "../../api/forgotApi";

export default function Forgot() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    otp: "",
  });

  const [loading, setLoading] = useState(false);
  const [isOtp, setIsOtp] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!form.email.trim()) {
      return toast.error("Email is required");
    }

    if (!navigator.onLine) {
      return toast.error("No internet connection!");
    }

    try {
      setLoading(true);

      const res = await sendOtp({
        email: form.email,
      });

      toast.success(res?.data?.message || "OTP sent successfully");

      if (res?.data?.success) {
        setIsOtp(true);
      }
    } catch (e) {
      const message = e.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.otp.trim()) {
      return toast.error("Email and OTP are required");
    }

    try {
      setLoading(true);

      const res = await verifyOtp({
        email: form.email,
        otp: form.otp,
      });

      toast.success(res?.data?.message || "OTP verified");

      localStorage.setItem("isOtp", "true");

      setTimeout(() => {
        localStorage.removeItem("isOtp");
      }, 20000);

      navigate("/update-password", {
        state: { email: form.email },
      });
    } catch (e) {
      const message = e.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
      <div className="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3">
        <h5 className="text-light">Forgot Password</h5>

        <form
          onSubmit={isOtp ? handleVerify : handleSendOtp}
          className="p-4 rounded text-light shadow"
        >
          <div
            className="form-control text-bg-dark mb-3 loginInput"
            style={{ border: "1px solid rgba(135, 134, 134, 0.3)" }}
          >
            <input
              type="email"
              name="email"
              className="text-bg-dark p-2 w-100 border-0"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              disabled={isOtp}
            />
          </div>

          {isOtp && (
            <div
              className="form-control text-bg-dark mb-3 loginInput"
              style={{ border: "1px solid rgba(135, 134, 134, 0.3)" }}
            >
              <input
                type="text"
                name="otp"
                className="text-bg-dark p-2 w-100 border-0"
                placeholder="OTP"
                value={form.otp}
                onChange={handleChange}
              />
            </div>
          )}

          <button
            type="submit"
            className="btn btn-light w-100 p-2 fw-bold"
            disabled={loading || !form.email.trim()}
          >
            {loading ? (
              <Loader color="black" />
            ) : isOtp ? (
              "Verify"
            ) : (
              "Send OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}