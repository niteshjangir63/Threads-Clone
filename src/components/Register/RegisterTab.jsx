
import { useEffect, useState } from "react";
import "./RegisterTab.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../loader/Loader";
import { useNavigate } from "react-router-dom";


export default function RegisterTab() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name:"",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    
    setLoading(true)
    try{

      const res = await axios.post("http://localhost:5000/signup",form);
      
      if(res.data.success){
        navigate("/")
      }
      
    }
    
    catch(e){
      
      setError(e.response.data.message)
      
    }
    finally{
      
      setLoading(false);

      
    }

  };

  setTimeout(() =>{
    setError("");
  },5000)

  


  let isDisabled = !form.name.trim() ||!form.email.trim().includes("@gmail") || !form.email.trim().includes(".com")|| !form.password.trim();

  return (<>
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
              name="name"
              className="text-bg-dark p-2 w-100 border-0"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
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
            {loading ? <Loader/> : <>Register</>}
          </button>

         
          <div className="text-center mt-3">
            <span className="small" style={{ cursor: "pointer" }}>
              Already have an account? <Link to={"/login"}>Login</Link>
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

    </>
  );
}