import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updatePassword } from "../api/forgotApi";
import { useTheme } from "../context/Appearance";
import toast from "react-hot-toast";
import Loader from "../components/loader/Loader";
import "./UpdatePassword.css"

export default function UpdatePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const email = location?.state?.email;
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: email || "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!form.email) {
      toast.error("Email not found. Please verify OTP again.");
      navigate("/forgot-password");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await updatePassword({
        email: form.email,
        password: form.password,
      });

      toast.success(res.data.message);
      localStorage.clear();
      navigate("/login");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isMatch =
    form.password &&
    form.confirmPassword &&
    form.password === form.confirmPassword &&
    !loading;

  return (
    <div
      className={`container-fluid min-vh-100 d-flex justify-content-center align-items-center ${
        theme ? "light-auth-page" : "dark-auth-page"
      }`}
    >
      <div className="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3">
        {form.password &&
          form.confirmPassword &&
          form.password !== form.confirmPassword && (
            <span className="text-danger">Passwords do not match</span>
          )}

        <h5 className={`mb-3 ${theme ? "text-dark" : "text-light"}`}>
          Update Password
        </h5>

        <div
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
              type="password"
              name="password"
              className="p-2 w-100 border-0 auth-input"
              placeholder="New Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div
            className={`form-control mb-3 loginInput ${
              theme ? "light-input-box" : "dark-input-box"
            }`}
          >
            <input
              type="password"
              name="confirmPassword"
              className="p-2 w-100 border-0 auth-input"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            className={`btn w-100 p-2 fw-bold ${
              theme ? "btn-dark" : "btn-light"
            }`}
            onClick={handleUpdate}
            disabled={!isMatch}
          >
            {loading ? <Loader color={theme ? "white" : "black"} /> : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}