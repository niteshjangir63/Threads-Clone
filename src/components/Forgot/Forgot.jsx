import { useState } from "react";
import "./Forgot.css";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import toast from "react-hot-toast";
import { sendOtp, verifyOtp } from "../../api/forgotApi";
import { useTheme } from "../../context/Appearance";

export default function Forgot() {
  const navigate = useNavigate();
  const { theme } = useTheme();

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

      const res = await sendOtp({ email: form.email });

      toast.success(res?.data?.message || "OTP sent successfully");

      if (res?.data?.success) {
        setIsOtp(true);
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Something went wrong");
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
      toast.error(e.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`container-fluid min-vh-100 d-flex justify-content-center align-items-center ${
        theme ? "light-auth-page" : "dark-auth-page"
      }`}
    >
      <div className="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3">
        <h5 className={`mb-3 ${theme ? "text-dark" : "text-light"}`}>
          Forgot Password
        </h5>

        <form
          onSubmit={isOtp ? handleVerify : handleSendOtp}
          className={`p-4 rounded auth-box ${
            theme ? "light-auth-box" : "dark-auth-box"
          }`}
        >
          <div
            className={`form-control mb-3 loginInput ${
              theme ? "light-input-box" : "dark-input-box"
            }`}
          >
            <input
              type="email"
              name="email"
              className="p-2 w-100 border-0 auth-input"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              disabled={isOtp}
            />
          </div>

          {isOtp && (
            <div
              className={`form-control mb-3 loginInput ${
                theme ? "light-input-box" : "dark-input-box"
              }`}
            >
              <input
                type="text"
                name="otp"
                className="p-2 w-100 border-0 auth-input"
                placeholder="OTP"
                value={form.otp}
                onChange={handleChange}
              />
            </div>
          )}

          <button
            type="submit"
            className={`btn w-100 p-2 fw-bold ${
              theme ? "btn-dark" : "btn-light"
            }`}
            disabled={loading || !form.email.trim()}
          >
            {loading ? (
              <Loader color={theme ? "white" : "black"} />
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