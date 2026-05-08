import { useState, useContext } from "react";
import "./LoginTab.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/Appearance";
import Loader from "../loader/Loader";
import toast from "react-hot-toast";
import { socket } from "../../socket";

export default function LoginTab() {

  const navigate = useNavigate();
  const { setAuthUser } = useContext(AuthContext);
  const { theme } = useTheme();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.identifier.trim() || !form.password.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://threadsclone-42y4.onrender.com/login",
        form
      );

      if (res.data.success) {

        const user = res.data.user;

        localStorage.setItem("token", res.data.accessToken);

        setAuthUser(user);

        socket.emit("joinUser", user._id);

        toast.success(res.data.message);

        navigate("/");
      }

    } catch (e) {

      const msg = e?.response?.data?.message || "Login failed";

      setError(msg);

      toast.error(msg);

    } finally {
      setLoading(false);
    }
  };

  const isDisabled =
    !form.identifier.trim() || !form.password.trim() || loading;

  return (
    <div
      className={`container-fluid min-vh-100 d-flex justify-content-center align-items-center ${
        theme ? "light-login-page" : "dark-login-page"
      }`}
    >

      <div className="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3">

        {error && (
          <span className="text-danger small">
            {error}
          </span>
        )}

        <div
          className={`p-4 rounded shadow login-box ${
            theme ? "light-login-box" : "dark-login-box"
          }`}
        >

          <div className={`form-control mb-3 loginInput ${
            theme ? "light-input-box" : "dark-input-box"
          }`}>
            <input
              type="text"
              name="identifier"
              className="p-2 w-100 border-0 login-field"
              placeholder="Username, email, phone"
              value={form.identifier}
              onChange={handleChange}
            />
          </div>

          <div className={`form-control mb-3 loginInput ${
            theme ? "light-input-box" : "dark-input-box"
          }`}>
            <input
              type="password"
              name="password"
              className="p-2 w-100 border-0 login-field"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button
            className={`btn w-100 p-2 fw-bold ${
              theme ? "btn-dark" : "btn-light"
            }`}
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            {loading ? <Loader color={theme ? "white" : "black"} /> : "Login"}
          </button>

          <div className="text-center mt-3">

            <span className="small">
              Don&apos;t have an account?{" "}
              <Link to="/register">
                Register
              </Link>
            </span>

            <br />

            <Link
              className="small forgot-link"
              to="/forgot"
            >
              Forgot password?
            </Link>

          </div>

          <div className="d-flex align-items-center my-4">
            <hr className="flex-grow-1 text-secondary" />
            <span className="px-2 small">OR</span>
            <hr className="flex-grow-1 text-secondary" />
          </div>

          <button
            type="button"
            className={`btn w-100 p-2 d-flex justify-content-center align-items-center gap-2 ${
              theme ? "btn-outline-dark" : "btn-outline-light"
            }`}
          >
            <i className="fa-brands fa-instagram"></i>
            <span>Continue with Instagram</span>
          </button>

        </div>
      </div>
    </div>
  );
}