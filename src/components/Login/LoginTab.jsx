import { useState } from "react";
import "./LoginTab.css";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import axios from "axios";

export default function LoginTab() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setLoading(true);
    try{

      const res = await axios.post("http://localhost:8080/login",form);
      console.log(res);
      
    }
    catch(e){
      console.log(e.response.data.message);
      setError(e.response.data.message);

    }
    finally{

      setLoading(false);
    }
  };


  let isDisabled = !form.email.trim().includes("@gmail") || !form.email.trim().includes(".com") || !form.password.trim();

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
      
      <div className="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3">
         {error && <span style={{color:"red"}}>{error}</span>}
        <div className="p-4 rounded text-light shadow">

          
          <div
            className="form-control text-bg-dark mb-3 loginInput"
            style={{ border: "1px solid rgba(135, 134, 134, 0.3)" }}
          >
            <input
              type="text"
              name="email"
              className="text-bg-dark p-2 w-100 border-0"
              placeholder="Username, email, phone"
              value={form.email}
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
            onClick={handleSubmit}  disabled={isDisabled}>
            {loading ? <Loader/> :<>Login</>}
          </button>

         
          <div className="text-center mt-3">
            <span className="small" style={{ cursor: "pointer" }}>
             Don't have an account? <Link to={"/register"}>Register</Link>
            </span>
            <br />
            <span className="small" style={{ cursor: "pointer" }}>
              Forgot password?
            </span>
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