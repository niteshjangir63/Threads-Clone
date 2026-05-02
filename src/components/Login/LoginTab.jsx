import { useState, useContext } from "react";
import "./LoginTab.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../loader/Loader";
import toast from "react-hot-toast";
import { socket } from "../../socket";

export default function LoginTab() {
  const navigate = useNavigate();
  const { setAuthUser } = useContext(AuthContext);

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
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
      <div className="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3">
        {error && <span style={{ color: "red" }}>{error}</span>}

        <div className="p-4 rounded text-light shadow">
          <div
            className="form-control text-bg-dark mb-3 loginInput"
            style={{ border: "1px solid rgba(135, 134, 134, 0.3)" }}
          >
            <input
              type="text"
              name="identifier"
              className="text-bg-dark p-2 w-100 border-0"
              placeholder="Username, email, phone"
              value={form.identifier}
              onChange={handleChange}
            />
          </div>

          <div
            className="form-control text-bg-dark mb-3 loginInput"
            style={{ border: "1px solid rgba(135, 134, 134, 0.3)" }}
          >
            <input
              type="password"
              name="password"
              className="text-bg-dark p-2 w-100 border-0"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button
            className="btn btn-light w-100 p-2 fw-bold"
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            {loading ? <Loader color="black" /> : "Login"}
          </button>

          <div className="text-center mt-3">
            <span className="small" style={{ cursor: "pointer" }}>
              Don&apos;t have an account? <Link to="/register">Register</Link>
            </span>
            <br />
            <Link
              className="small"
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "white",
              }}
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
            className="btn btn-outline-light w-100 p-2 d-flex justify-content-center align-items-center gap-2"
          >
            <i className="fa-brands fa-instagram"></i>
            <span>Continue with Instagram</span>
          </button>
        </div>
      </div>
    </div>
  );
}