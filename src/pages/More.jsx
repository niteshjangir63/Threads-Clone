import { useContext, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/loader/Loader";
import toast from "react-hot-toast";

export default function More() {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { authUser, setAuthUser } = useContext(AuthContext)

    async function logout() {

        setLoading(true);
        try {

            const res = await API.post("/logout")
            toast.success(res.data.message);

          
            if (res.data.success) navigate("/login")
        }
        catch (e) {

            toast.error(e.response.data.message)
           
        }
        finally {

            setLoading(false)
            setAuthUser(null);
        }

    }


    return (

        <>

            <h1>More</h1>
            {authUser ? 
            <button className='btn btn-danger' onClick={logout} disabled={loading && true}>{loading ? <Loader/>  : <>Logout</>}</button> :
            
           <button className='btn btn-light' onClick={ ()=> navigate("/login")}>Login</button>  }



        </>
    )
}