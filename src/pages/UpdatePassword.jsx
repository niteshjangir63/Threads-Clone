import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updatePassword } from "../api/forgotApi";
import toast from "react-hot-toast";
import Loader from "../components/loader/Loader";

export default function UpdatePassword() {

    const navigate = useNavigate();
    const location = useLocation()
    const email = location?.state?.email
    const [loading, setLoading] = useState(false);


    const [form, setForm] = useState({
        email: email,
        password: "",
        confirmPassword: "",
    });



    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const res = await updatePassword(form);
            toast.success(res.data.message);
            navigate("/login")

        }
        catch (e) {

            toast.error(e.response.data.message);
        }
        finally {

            setLoading(false);
            localStorage.clear();
        }




    }

    let isMatch = form.password && form.password === form.confirmPassword;


    return (



        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">


            <div className="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3">
                {form.password &&
                    form.confirmPassword &&
                    form.password !== form.confirmPassword && (
                        <span style={{ color: "red" }}>Passwords do not match</span>
                    )}
                <h5 className="text-light">Update Password</h5>

                <div className="p-4 rounded text-light shadow">


                    <div
                        className="form-control text-bg-dark mb-3 loginInput"
                        style={{ border: "1px solid rgba(135, 134, 134, 0.3)" }}
                    >
                        <input
                            type="text"
                            name="password"
                            className="text-bg-dark p-2 w-100 border-0"
                            placeholder="New Password"
                            value={form.password}
                            onChange={handleChange} />
                    </div>
                    <div
                        className="form-control text-bg-dark mb-3 loginInput"
                        style={{ border: "1px solid rgba(135, 134, 134, 0.3)" }}
                    >
                        <input
                            type="text"
                            name="confirmPassword"
                            className="text-bg-dark p-2 w-100 border-0"
                            placeholder="Confirm Password"
                            value={form.confirmPassword}
                            onChange={handleChange} />
                    </div>


                    {<button
                        className="btn btn-light w-100 p-2 fw-bold"
                        onClick={handleUpdate} disabled={!isMatch}>
                        {loading ? <Loader color="black" /> : <>Update</>}
                    </button>}





                </div>
            </div>
        </div>

    )

}